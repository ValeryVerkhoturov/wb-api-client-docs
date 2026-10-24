# Участие в разработке

## Сообщения об ошибках

Баги, странности спецификации, кривости генератора — заводите issue в основном репозитории кода: [`ValeryVerkhoturov/wb-api-client/issues`](https://github.com/ValeryVerkhoturov/wb-api-client/issues).

Что приложить:

- Какой языковой клиент (Python / TypeScript / Go / Java / PHP / OneScript / C#)
- Какой под-модуль (`items`, `orders_fbs`, `analytics`, …)
- Версию из манифеста (`1.YYYYMMDD.N`)
- Минимальный воспроизводимый пример — один вызов API, одно исключение, ожидание против факта

Проблемы сайта документации (опечатки, недостающее, битые примеры) — в репозиторий документации: [`ValeryVerkhoturov/wb-api-client-docs/issues`](https://github.com/ValeryVerkhoturov/wb-api-client-docs/issues).

## Сгенерированный код руками НЕ редактируется

Каждый файл под `clients/` в основном репозитории — сгенерирован. Правка там переписывается на следующем прогоне daily-check — PR-check тоже отметит правку до мерджа.

Если нашли ошибку в сгенерированном выходе, чинить нужно в одном из:

- **`scripts/pipeline/specs/postprocess.py`** — новый проход, если правка применяется к спецификации до генерации.
- **`scripts/pipeline/generation/secrets.py`** — если правка внутри сгенерированного `Configuration` / `ApiClient`.
- **`generator-configs/*.yaml`** — если это флаг openapi-generator.
- **`templates/{lang}/*`** — если это топ-уровневый манифест.

Карта пайплайна — в [справочнике по архитектуре](/guides/architecture).

## Локальная разработка

```bash
git clone --recurse-submodules https://github.com/ValeryVerkhoturov/wb-api-client
cd wb-api-client

pip install -r scripts/requirements.txt       # ruamel.yaml, markdownify, requests, black, flask
./scripts/download-specs.py                # тянет апстрим (локально может отдать 498)
python  scripts/process-specs.py               # -> swaggers/processed/
./scripts/generate-clients.py 1.20260920.0            # -> clients/{python,typescript,go,java,php,onescript,csharp}
make verify                                   # сборка + проверка форматирования на каждом языке
```

`generate-clients.py` всегда регенерирует все семь языков. Для одноязычной итерации при отладке комментируйте остальные вызовы `queue_generation`, а не добавляйте флаг. Переменная окружения `OPENAPI_GENERATOR_THREADS` управляет параллелизмом генерации (по умолчанию 2).

Форматирование гоняется в Docker, поэтому языковые рантаймы на хосте не нужны. `make verify-<lang>` и `make {black,prettier,gofmt,spotless,php-cs-fixer,dotnet-format}` — отдельные цели. У OneScript форматтера нет, поэтому `make verify-onescript` вместо него компилирует каждый модуль через `oscript -check` и загружает пакет целиком. `make help` перечисляет всё.

Сам пайплайн лежит в `scripts/pipeline/` по доменным контекстам (см. [архитектуру](/guides/architecture)); плоские `scripts/*.py` — лишь CLI-обёртки. Правки в `scripts/` дополнительно проверяются `make scripts-check` (smoke-проверки общего ядра, запрет `#`-комментариев и докстрингов), а black гоняется и по `scripts/`, не только по `clients/python`.

## Flow с PR

1. Форкните основной репозиторий.
2. Внесите изменение в `scripts/`, `templates/`, `generator-configs/` или воркфлоу.
3. Перегенерируйте локально, чтобы `clients/` совпало.
4. Закоммитьте `swaggers/`, `clients/` и свои правки исходников одним коммитом.
5. Откройте PR. PR-check-workflow перегенерирует всё с нуля и упадёт, если `git diff` непустой относительно вашего коммита — это ловит недетерминированность.

## Участие в документации

Этот сайт живёт в [`ValeryVerkhoturov/wb-api-client-docs`](https://github.com/ValeryVerkhoturov/wb-api-client-docs).

```bash
git clone https://github.com/ValeryVerkhoturov/wb-api-client-docs
cd wb-api-client-docs

npm install
npm run docs:dev
# → http://localhost:5173/wb-api-client-docs/
```

При пуше в `main` workflow деплоя сам собирает и публикует на GitHub Pages.

## Лицензия

Оба репозитория — Apache 2.0. Ваши правки считаются переданными под той же лицензией.

<p align="center">
  <img src="/pics/blueberry-laptop-ascii-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>
