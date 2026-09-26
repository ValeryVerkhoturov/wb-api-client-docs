# Участие в разработке

## Сообщения об ошибках

Баги, странности спецификации, кривости генератора — заводите issue в основном репозитории кода: [`ValeryVerkhoturov/wb-api-client/issues`](https://github.com/ValeryVerkhoturov/wb-api-client/issues).

Что приложить:

- Какой языковой клиент (Python / TypeScript / Go / Java / PHP)
- Какой под-модуль (`items`, `orders_fbs`, `analytics`, …)
- Версию из манифеста (`1.YYYYMMDD.N`)
- Минимальный воспроизводимый пример — один вызов API, одно исключение, ожидание против факта

Проблемы сайта документации (опечатки, недостающее, битые примеры) — в репозиторий документации: [`ValeryVerkhoturov/wb-api-client-docs/issues`](https://github.com/ValeryVerkhoturov/wb-api-client-docs/issues).

## Сгенерированный код руками НЕ редактируется

Каждый файл под `clients/` в основном репозитории — сгенерирован. Правка там переписывается на следующем прогоне daily-check — PR-check тоже отметит правку до мерджа.

Если нашли ошибку в сгенерированном выходе, чинить нужно в одном из:

- **`scripts/post-process.py`** — новый проход, если правка применяется к спецификации до генерации.
- **`scripts/inject-secret.py`** — если правка внутри сгенерированного `Configuration` / `ApiClient`.
- **`generator-configs/*.yaml`** — если это флаг openapi-generator.
- **`templates/{lang}/*`** — если это топ-уровневый манифест.

Карта пайплайна — в [справочнике по архитектуре](/reference/architecture).

## Локальная разработка

```bash
git clone --recurse-submodules https://github.com/ValeryVerkhoturov/wb-api-client
cd wb-api-client

./scripts/download-swaggers.sh                # тянет апстрим (локально может отдать 498)
pip install -r scripts/requirements.txt       # ruamel.yaml, markdownify, black, flask
python  scripts/post-process.py               # -> swaggers/processed/
./scripts/generate.sh 1.20260920.0            # -> clients/{python,typescript,go,java,php}
make verify                                   # сборка + проверка форматирования на каждом языке
```

`generate.sh` всегда регенерирует все пять языков. Для одноязычной итерации при отладке комментируйте оставшиеся четыре цикла, а не добавляйте флаг — скрипт меньше 200 строк и без параметризации.

Форматирование гоняется в Docker, поэтому языковые рантаймы на хосте не нужны. `make verify-<lang>` и `make {black,prettier,gofmt,spotless,php-cs-fixer}` — отдельные цели. `make help` перечисляет всё.

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

Пушьте в `main`; workflow деплоя сам собирает и публикует на GitHub Pages.

## Лицензия

Оба репозитория — Apache 2.0. Ваши правки считаются переданными под той же лицензией.
