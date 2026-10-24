# Архитектура

Один экран о том, что реально лежит в [основном репозитории](https://github.com/ValeryVerkhoturov/wb-api-client), чтобы про сгенерированные клиенты ничего не казалось магией.

## Пайплайн

```
download-swaggers.py   →  swaggers/*.yaml         (сырой апстрим, checksummed)
post-process.py        →  swaggers/processed/     (13 проходов)
generate.py <ver>      →  clients/<lang>/…        (openapi-generator-cli, 7 языков)
    ├── inject-secret.py           (SecretString-обёртка на каждый язык)
    ├── {black|prettier|gofmt|spotless|php-cs-fixer}   (канонизация форматирования)
    └── gen-readmes.py             (README.md на каждый язык)
     ↓ коммитится тегом v<version>, один тег покрывает все 7 языков
publish.yml            →  PyPI / npm / Go tag / Maven Central / Packagist / hub.oscript.io / NuGet
gen-api-reference.py   →  wb-api-client-docs      (справка по API: страницы операций,
                                                   сниппеты и структуры данных на 7 языках, RU/EN)
```

Каждый шаг — обычный Python-файл, ничего не скрыто за непрозрачным тулингом.

## Зачем генерировать

WB выпускает OpenAPI-спецификации. Написать 13 клиентов × 7 языков вручную — уплывут за неделю. Плюс генерации из спецификации: каждое поле, каждый enum, каждая обёртка ответа — ровно то, что задокументировал WB. И повторная синхронизация стоит нуля усилий после сборки пайплайна.

Минус — выхлоп генератора остаётся выхлопом генератора: местами уродливым, местами со следами кривостей спецификации. Именно поэтому есть слой пост-обработки.

## post-process.py — 13 проходов

1. **`inject_bearer_auth`** — удаляет схему `HeaderApiKey` (дублирует реальный bearer JWT) и ставит одну `BearerAuth`. Каждый сгенерированный клиент получает ровно один путь авторизации.
2. **`fix_untyped_arrays`** — добавляет `items: {type: string}` массивам без указания внутреннего типа (иначе Go / TS сгенерируют `[]any`).
3. **`widen_integer_formats`** — ставит `format: int64` целым полям без формата и с форматами `uint32`/`uint64`/Unix-timestamp: WB использует их для ID и миллисекундных меток времени, которые переполняют знаковый 32-битный int. Явные `int32` и коды валют не трогаются.
4. **`inline_top_level_arrays`** — инлайнит все `$ref` на компоненты с `type: array` и схлопывает обёртки `allOf: [array, description-only]` (openapi-generator плохо работает с массивом на корне). Гоняется до неподвижной точки, потому что заинлайненные поддеревья могут содержать другие ссылки.
5. **`rename_digit_prefixed_schemas`** — `409SupplyDeliverError` → `Http409SupplyDeliverError` (иначе невалидный Go-идентификатор).
6. **`name_inline_response_schemas`** — поднимает анонимные inline-тела 4xx/5xx в схемы `<OperationId>Response<code>` (снова ради валидных Go-идентификаторов).
7. **`drop_response_required`** — WB помечает `required` почти каждое поле ответа, но живой API опускает поля когда хочет, и тогда каждый язык падает на десериализации. Проход удаляет `required` у всех схем, достижимых из ответов; у тел запросов `required` сохраняется, так что валидация ввода не страдает.
8. **`sanitize_non_ascii_enums`** — добавляет `x-enum-varnames` для русских значений вроде `"Склад WB"` (иначе — пустые идентификаторы в JS/Go/Java).
9. **`rename_tags_to_module`** — теги WB русские (`Финансовые отчёты`), openapi-generator зачищает их до пустого имени класса, и все языки получают `Api`/`DefaultApi`. Проход переписывает теги каждой операции на имя модуля (`Finances`, `Reports`, …), поэтому у модуля один нормально названный класс (`FinancesApi`, …), а исходные теги сохраняются в `x-original-tags` для генератора документации.
10. **`drop_date_formats`** — WB возвращает `""` для неустановленных дат (`fixTariffDateFrom`, `utdUcdDate`), что не парсится ни одним строгим date-парсером. Проход снимает `format: date` / `format: date-time` со строковых схем, и клиенты типизируют их как обычные строки.
11. **`htmlize_descriptions_to_markdown`** — каждое поле `description` прогоняется через `markdownify`, чтобы HTML в докстрингах рендерился как Markdown.
12. **`absolutize_description_links`** — к относительным ссылкам `[…](/openapi/…)` добавляется `https://dev.wildberries.ru`, чтобы ссылки в сгенерированных докстрингах открывались.
13. **`add_docs_links`** — добавляет строку `Library doc: <url>` в `description` каждой операции со ссылкой на страницу операции на этом сайте. Генераторы копируют `description` в докстринги/Javadoc, поэтому каждый метод клиента ссылается на свою страницу документации. `gen-api-reference.py` вырезает эту строку обратно, так что сам сайт не затрагивается.

## generate.py

- Гоняет `openapi-generator-cli` (закреплённый Docker-образ) для каждой спецификации и каждого языка во временные каталоги.
- Склеивает пер-спецификационные SDK в единое дерево на язык — Python-пакеты под `wb_api_client.<slug>`, TypeScript subpath-экспорты, Go под-пакеты, Java под-пакеты, PHP под-пространства, OneScript — по префиксу имени класса (пространств имён в языке нет), C# — пространства имён.
- Запускает `inject-secret.py`, чтобы патчить каждый сгенерированный `Configuration` / `ApiClient` соответствующей языковой обёрткой секрета.
- Запускает закреплённый форматтер: `black`, `prettier`, `gofmt`, spotless (google-java-format), `php-cs-fixer`, `dotnet format`. Всё внутри Docker — без языковых рантаймов на хосте.
- Подставляет `__VERSION__` в топ-уровневые манифесты (`pyproject.toml`, `package.json`, `go.mod`, `pom.xml`, `composer.json`).
- Запускает `gen-readmes.py`, чтобы выпустить README на каждый язык.

Итог: `clients/{python,typescript,go,java,php,onescript,csharp}/` — семь пакетов, готовых к публикации.

## Детерминизм

Ежедневная задача постоянно бы «дрожала», не будь генерация детерминированной. Что для этого сделано:

- Docker-тег `openapi-generator-cli` закреплён.
- В конфиге openapi-generator для каждого языка выставлено `hideGenerationTimestamp: true`.
- Все форматтеры закреплены на конкретных версиях.
- PR-check-workflow перегенерирует всё с нуля и падает, если `git diff swaggers/ clients/` непустой. Это ловит любое изменение, из-за которого следующие прогоны разъедутся.

## Публикация

`daily-check.yml` считает версию, регенерирует, коммитит, тегает. Затем шлёт 7 событий `workflow_dispatch` в `publish.yml` — по одному на язык — с тегом в качестве входа `ref`. Каждая языковая ветка `publish.yml`:

- Python — OIDC → PyPI trusted publishing (`pypa/gh-action-pypi-publish`).
- TypeScript — OIDC → npm trusted publishing (`npm publish --provenance`).
- Go — тег пушится в [`wb-api-client-go`](https://github.com/ValeryVerkhoturov/wb-api-client-go) (см. ниже), сама джоба — no-op: `proxy.golang.org` тянет прямо из тега.
- Java — подписанный GPG-деплой в Maven Central через `central-publishing-maven-plugin`. Maven закреплён на 3.9.x (`stCarolas/setup-maven`): плагин собирает bundle через Maven-2 stager, и Resolver из Maven 3.10 роняет туда служебный `maven-metadata-local.xml`, из-за чего Central отклоняет bundle («Bundle has content that does NOT have a .pom file»).
- PHP — пинг API `packagist.org/api/update-package`.
- OneScript — `opm build` и `opm push` в hub.oscript.io.
- C# — `dotnet pack` и `dotnet nuget push` в NuGet.

Отдельно daily-check перегенерирует справку по API (`gen-api-reference.py` — страницы операций, сниппеты вызова и структуры входящих/исходящих данных на каждом языке, ссылки на спецификацию WB) и пушит её в `wb-api-client-docs`, откуда сайт деплоится на GitHub Pages.

Reusable-воркфлоу (`workflow_call`) был бы аккуратнее, но PyPI и npm trusted publishing их не поддерживают: и OIDC-claim `job_workflow_ref` (callee), и Sigstore-attestation `workflow_ref` (caller) должны указывать на один и тот же файл, что с `workflow_call` невозможно. Поэтому — `workflow_dispatch`.

## Соседние репозитории

Три языка живут в своих репозиториях, подключённых сюда как git-submodule:

- [`ValeryVerkhoturov/wb-api-client-php`](https://github.com/ValeryVerkhoturov/wb-api-client-php) → `clients/php`. Причина: Packagist требует `composer.json` в КОРНЕ обходимого репозитория.
- [`ValeryVerkhoturov/wb-api-client-1c`](https://github.com/ValeryVerkhoturov/wb-api-client-1c) → `clients/onescript`. Так пользователи 1С могут склонировать только клиент и поставить его из тега.
- [`ValeryVerkhoturov/wb-api-client-go`](https://github.com/ValeryVerkhoturov/wb-api-client-go) → `clients/go`. Причина: Go версионирует модули тегами репозитория, поэтому модуль обязан лежать в корне репо (`go get github.com/ValeryVerkhoturov/wb-api-client-go`) — модуль в подкаталоге потребовал бы тегов вида `clients/go/v…` и тянул бы весь монорепозиторий.

Ежедневный прогон коммитит и тегает все три соседних репозитория ДО основного — иначе записанные указатели сабмодулей ссылались бы на коммиты, которых на их удалённых ещё нет, и свежий `git clone --recurse-submodules` падал бы.

Четвёртый сосед — [`ValeryVerkhoturov/wb-api-client-docs`](https://github.com/ValeryVerkhoturov/wb-api-client-docs), этот сайт. Он не сабмодуль: daily-check клонирует его, запускает `gen-api-reference.py` и пушит результат обратно.

## Генератор OneScript

В openapi-generator нет генератора OneScript, поэтому он вынесен в отдельный репозиторий — [`ValeryVerkhoturov/onescript-openapi-generator`](https://github.com/ValeryVerkhoturov/onescript-openapi-generator). Это обычный плагин: класс наследует `DefaultCodegen`, регистрируется через `META-INF/services` и подключается рядом с `openapi-generator-cli.jar`, так что `-g onescript` работает как встроенный генератор. В основном репозитории он закреплён по коммиту — это аналог закреплённого тега Docker-образа для остальных языков.

## Что НЕ генерируется

Ручные части основного репозитория:

- `scripts/` — сам пайплайн, разложенный по доменным контекстам в `scripts/pipeline/`: `core/` (общее ядро: пути репозитория, именование спецификаций/модулей/языков, YAML IO, subprocess), `specs/` (download, post-process), `generation/` (generate, inject-secret), `onescript/` (toolchain, manifests, verify), `docs/` (gen-api-reference, gen-readmes). Плоские `scripts/*.py` — тонкие CLI-обёртки над этими модулями, так что команды выше не меняются. Домашнее правило: ни `#`-комментариев, ни докстрингов под `scripts/` — проверяется в `make scripts-check` и в PR-check.
- `generator-configs/*.yaml` — по одному конфигу openapi-generator на язык.
- `templates/*` — топ-уровневые манифесты с плейсхолдерами `__VERSION__`.
- `.github/workflows/*` — daily-check, per-language publish, PR drift check.
- `Makefile`, `README.md`, `CLAUDE.md`.

Всё под `clients/` — сгенерированный выхлоп, руками не редактируется. Перегенерируйте.

## Полное описание пайплайна

Файл [`CLAUDE.md`](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/CLAUDE.md) в основном репозитории — рабочая, машиночитаемая версия того же содержимого, поддерживается в актуальном состоянии.

<p align="center">
  <img src="/pics/blueberry-academic-cap-ascii-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>
