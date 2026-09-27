# Архитектура

Один экран о том, что реально лежит в [основном репозитории](https://github.com/ValeryVerkhoturov/wb-api-client), чтобы про сгенерированные клиенты ничего не казалось магией.

## Пайплайн

```
download-swaggers.sh   →  swaggers/*.yaml         (сырой апстрим, checksummed)
post-process.py        →  swaggers/processed/     (8 проходов)
generate.sh <ver>      →  clients/<lang>/…        (openapi-generator-cli, 6 языков)
    ├── inject-secret.py           (SecretString-обёртка на каждый язык)
    ├── {black|prettier|gofmt|spotless|php-cs-fixer}   (канонизация форматирования)
    └── gen-readmes.py             (README.md на каждый язык)
     ↓ коммитится тегом v<version>, один тег покрывает все 6 языков
publish.yml            →  PyPI / npm / Go tag / Maven Central / Packagist / hub.oscript.io
```

Каждый шаг — обычный shell-скрипт или Python-файл, ничего не скрыто за непрозрачной тулингой.

## Зачем генерировать

WB выпускает OpenAPI-спецификации. Написать 13 клиентов × 6 языков вручную — уплывут за неделю. Плюс генерации из спецификации: каждое поле, каждый enum, каждая обёртка ответа — ровно то, что задокументировал WB. И повторная синхронизация стоит нуля усилий после сборки пайплайна.

Минус — выхлоп генератора остаётся выхлопом генератора: местами уродливым, местами со следами кривостей спецификации. Именно поэтому есть слой пост-обработки.

## post-process.py — 8 проходов

1. **`inject_bearer_auth`** — удаляет схему `HeaderApiKey` (дублирует реальный bearer JWT) и ставит одну `BearerAuth`. Каждый сгенерированный клиент получает ровно один путь авторизации.
2. **`fix_untyped_arrays`** — добавляет `items: {type: string}` массивам без указания внутреннего типа (иначе Go / TS сгенерируют `[]any`).
3. **`inline_top_level_arrays`** — инлайнит все `$ref` на компоненты с `type: array` и схлопывает обёртки `allOf: [array, description-only]` (openapi-generator плохо работает с массивом на корне). Гоняется до неподвижной точки, потому что заинлайненные поддеревья могут содержать другие ссылки.
4. **`rename_digit_prefixed_schemas`** — `409SupplyDeliverError` → `Http409SupplyDeliverError` (иначе невалидный Go-идентификатор).
5. **`name_inline_response_schemas`** — поднимает анонимные inline-тела 4xx/5xx в схемы `<OperationId>Response<code>` (снова ради валидных Go-идентификаторов).
6. **`sanitize_non_ascii_enums`** — добавляет `x-enum-varnames` для русских значений вроде `"Склад WB"` (иначе — пустые идентификаторы в JS/Go/Java).
7. **`htmlize_descriptions_to_markdown`** — каждое поле `description` прогоняется через `markdownify`, чтобы HTML в докстрингах рендерился как Markdown.
8. **`absolutize_description_links`** — к относительным ссылкам `[…](/openapi/…)` добавляется `https://dev.wildberries.ru`, чтобы ссылки в сгенерированных докстрингах открывались.

## generate.sh

- Гоняет `openapi-generator-cli` (закреплённый Docker-образ) для каждой спецификации и каждого языка во временные каталоги.
- Склеивает пер-спецификационные SDK в единое дерево на язык — Python-пакеты под `wb_api_client.<slug>`, TypeScript subpath-экспорты, Go под-пакеты, Java под-пакеты, PHP под-пространства, OneScript — по префиксу имени класса (пространств имён в языке нет).
- Запускает `inject-secret.py`, чтобы патчить каждый сгенерированный `Configuration` / `ApiClient` соответствующей языковой обёрткой секрета.
- Запускает закреплённый форматтер: `black`, `prettier`, `gofmt`, spotless (google-java-format), `php-cs-fixer`. Всё внутри Docker — без языковых рантаймов на хосте.
- Подставляет `__VERSION__` в топ-уровневые манифесты (`pyproject.toml`, `package.json`, `go.mod`, `pom.xml`, `composer.json`).
- Запускает `gen-readmes.py`, чтобы выпустить README на каждый язык.

Итог: `clients/{python,typescript,go,java,php,onescript}/` — шесть пакетов, готовых к публикации.

## Детерминизм

Ежедневная задача постоянно бы «дрожала», не будь генерация детерминированной. Что для этого сделано:

- Docker-тег `openapi-generator-cli` закреплён.
- В конфиге openapi-generator для каждого языка выставлено `hideGenerationTimestamp: true`.
- Все форматтеры закреплены на конкретных версиях.
- PR-check-workflow перегенерирует всё с нуля и падает, если `git diff swaggers/ clients/` непустой. Это ловит любое изменение, из-за которого следующие прогоны разъедутся.

## Публикация

`daily-check.yml` считает версию, регенерирует, коммитит, тегает. Затем шлёт 5 событий `workflow_dispatch` в `publish.yml` — по одному на язык — с тегом в качестве входа `ref`. Каждая языковая ветка `publish.yml`:

- Python — OIDC → PyPI trusted publishing (`pypa/gh-action-pypi-publish`).
- TypeScript — OIDC → npm trusted publishing (`npm publish --provenance`).
- Go — no-op. `proxy.golang.org` тянет прямо из пушнутого тега.
- Java — подписанный GPG-деплой в Maven Central через `central-publishing-maven-plugin`.
- PHP — пинг API `packagist.org/api/update-package`.
- OneScript — `opm build` и `opm push` в hub.oscript.io.

Reusable-воркфлоу (`workflow_call`) был бы аккуратнее, но PyPI и npm trusted publishing их не поддерживают: и OIDC-claim `job_workflow_ref` (callee), и Sigstore-attestation `workflow_ref` (caller) должны указывать на один и тот же файл, что с `workflow_call` невозможно. Поэтому — `workflow_dispatch`.

## Соседние репозитории

Два языка живут в своих репозиториях, подключённых сюда как git-submodule:

- [`ValeryVerkhoturov/wb-api-client-php`](https://github.com/ValeryVerkhoturov/wb-api-client-php) → `clients/php`. Причина: Packagist требует `composer.json` в КОРНЕ обходимого репозитория.
- [`ValeryVerkhoturov/wb-api-client-1c`](https://github.com/ValeryVerkhoturov/wb-api-client-1c) → `clients/onescript`. Так пользователи 1С могут склонировать только клиент и поставить его из тега.

Ежедневный прогон коммитит и тегает оба соседних репозитория ДО основного — иначе записанные указатели сабмодулей ссылались бы на коммиты, которых на их удалённых ещё нет, и свежий `git clone --recurse-submodules` падал бы.

## Генератор OneScript

В openapi-generator нет генератора OneScript, поэтому он вынесен в отдельный репозиторий — [`ValeryVerkhoturov/onescript-openapi-generator`](https://github.com/ValeryVerkhoturov/onescript-openapi-generator). Это обычный плагин: класс наследует `DefaultCodegen`, регистрируется через `META-INF/services` и подключается рядом с `openapi-generator-cli.jar`, так что `-g onescript` работает как встроенный генератор. В основном репозитории он закреплён по коммиту — это аналог закреплённого тега Docker-образа для остальных языков.

## Что НЕ генерируется

Ручные части основного репозитория:

- `scripts/*` — сам пайплайн (download, post-process, generate, inject-secret, gen-readmes).
- `generator-configs/*.yaml` — по одному конфигу openapi-generator на язык.
- `templates/*` — топ-уровневые манифесты с плейсхолдерами `__VERSION__`.
- `.github/workflows/*` — daily-check, per-language publish, PR drift check.
- `Makefile`, `README.md`, `CLAUDE.md`.

Всё под `clients/` — сгенерированный выхлоп, руками не редактируется. Перегенерируйте.

## Полное описание пайплайна

Файл [`CLAUDE.md`](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/CLAUDE.md) в основном репозитории — рабочая, машиночитаемая версия того же содержимого, поддерживается в актуальном состоянии, потому что CI сам её читает.
