# Версионирование

Все восемь языковых пакетов делят одну версионную строку на релиз — полноценный **semver `MAJOR.MINOR.PATCH`** (начиная с `2.0.0`; более ранние релизы использовали формат `1.YYYYMMDD.N`).

## Формат

| Часть   | Когда растёт                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAJOR` | Ломающие изменения: удалённые или переименованные операции, параметры, поля; суженные типы; новые обязательные поля — то, что может сломать существующий код. |
| `MINOR` | Обратно-совместимые добавления: новые операции, опциональные параметры и поля, новые значения enum.                                                           |
| `PATCH` | Нефункциональные правки спецификации: описания, примеры, опечатки.                                                                                            |

Пример: `2.1.0` — обратно-совместимое пополнение после `2.0.0`.

## Как считается номер

`daily-check.yml` вызывает `scripts/compute-version.py`: скрипт берёт апстрим-дифф (`git diff HEAD -- specs/unprocessed/ru`) и просит **DeepSeek API** классифицировать его как `major` / `minor` / `patch`, затем инкрементирует старший `v2+` git-тег. Если тега `v2+` ещё нет — выпускается `2.0.0`. Без `DEEPSEEK_API_KEY` или при сбое API — по умолчанию `minor` (апстрим WB почти всегда растёт аддитивно); пустой дифф (форс-прогон) — `patch`.

Полученная строка вставляется в каждый языковой манифест — `pyproject.toml`, `package.json`, тег `go.mod`, `pom.xml`, `composer.json`, `Cargo.toml` — как есть. Никакой язык не видит переведённой формы.

`MAJOR ≥ 2` — причина суффикса `/v2` в пути Go-модуля: `github.com/ValeryVerkhoturov/wb-api-client-go/v2` (требование Go modules).

## Что резолвится как «последняя»

Все релизы — **стабильные** (не prerelease), поэтому `@latest` / `LATEST` / `^2.0.0` берут максимальную опубликованную:

::: code-group

```bash [Python]
pip install valeryverkhoturov-wb-api-client
```

```bash [TypeScript]
npm install @valeryverkhoturov/wb-api-client
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client-go/v2@latest
```

```xml [Java]
<version>[2.0.0,)</version>   <!-- диапазон: любая 2.x -->
```

```bash [PHP]
composer require valeryverkhoturov/wb-api-client
```

```bash [OneScript]
opm install wb-api-client
```

```bash [C#]
dotnet add package ValeryVerkhoturov.WbApiClient
```

```bash [Rust]
cargo add wb-api-client
```

:::

## Фиксация версии

Фиксируйте точный `X.Y.Z`, когда важна воспроизводимость (CI, production):

::: code-group

```txt [Python]
valeryverkhoturov-wb-api-client==2.0.0
```

```json [TypeScript]
"@valeryverkhoturov/wb-api-client": "2.0.0"
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client-go/v2@v2.0.0
```

```xml [Java]
<version>2.0.0</version>
```

```json [PHP]
"valeryverkhoturov/wb-api-client": "2.0.0"
```

```bsl [OneScript]
.ЗависитОт("wb-api-client", "2.0.0")
```

```xml [C#]
<PackageReference Include="ValeryVerkhoturov.WbApiClient" Version="2.0.0" />
```

```toml [Rust]
wb-api-client = "=2.0.0"
```

:::

## Каденция релизов

Новые версии выпускаются только когда апстрим-спецификации реально меняются. Технически: `daily-check.yml` запускается в 06:15 UTC, сверяет `specs/unprocessed/ru/checksums.txt` с предыдущим прогоном и перегенерирует + тегает только если что-то изменилось. Спокойная неделя = ноль релизов; выкатка портала WB обычно даёт один релиз следующим утром.

Ручной форс-релиз (например, чтобы забрать client-side фикс): `Actions → Daily upstream check → Run workflow` с `force: true`.

## Депрекации

WB убирает поля по собственному графику. Когда это случается:

1. Из спецификации пропадает поле.
2. На следующем прогоне daily-check перегенерирует без поля.
3. Публикуется новая версия без поля.
4. Клиенты на предыдущей версии продолжают работать — в их локальных моделях поле есть, просто приходят null'ы.

Формального окна депрекации нет — источник истины — контракт апстрима. Если нужно время на миграцию, фиксируйте старую версию.

## Расхождение версий между языками — невозможно по построению

Одна и та же строка `X.Y.Z` вставляется в манифест каждого языка в одном и том же вызове generate-clients.py, и все языки перегенерируются в каждом релизном прогоне — поэтому получить «Python 2.1.0, а Go 2.0.3» из одного апстрим-состояния невозможно.

Единственный способ уплыть: сломается публикация одного языка (например, Maven Central отклонит подпись). Тег и исходник уже в GitHub; ручной перезапуск конкретного publish-job для этого языка чинит ситуацию.

<p align="center">
  <img src="/pics/blueberry-calendar-ascii-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client logo">
</p>
