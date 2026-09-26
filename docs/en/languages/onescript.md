# OneScript (1С)

Package: [`wb-api-client`](https://hub.oscript.io/package/wb-api-client) on hub.oscript.io.

- **OneScript:** 1.9.0+
- **HTTP:** the built-in `HTTPСоединение`
- **Dependencies:** none — standard library only
- **Secret wrapper:** `СекретнаяСтрока` class

## Install

```bash
opm install wb-api-client
```

Or point at a package directory directly — for example by cloning the sibling repo at a tag:

```bash
git clone --branch v1.20260926.0 https://github.com/ValeryVerkhoturov/wb-api-client-1c.git
```

```bsl
#Использовать "path/to/wb-api-client-1c"
```

## Where the source lives

Like PHP, OneScript lives in its own repository — [`ValeryVerkhoturov/wb-api-client-1c`](https://github.com/ValeryVerkhoturov/wb-api-client-1c) — mounted into the mono-repo as a `clients/onescript` git submodule. That lets 1C users clone just the client instead of dragging along the whole pipeline, and install it straight from a tag.

Daily-check regenerates all six languages in one place, then commits and tags both sibling repos under the same `v<version>` tag.

## How categories are separated

OneScript has no namespaces: every class name is global. Categories are therefore separated by **name**, not by import path:

- **API classes** are named after the spec's tag: `КарточкиТоваровApi`, `СборочныеЗаданияFBSApi`, `ФинансовыеОтчётыApi`. Tag names are unique across all 13 specs, so they need no prefix.
- **Model classes** carry the category as a prefix: `ItemsResponse4XX`, `OrdersFbsResponse4XX`. Without it they would collide — `Response4XX` alone appears in 12 of the 13 specs.

Files are grouped under `src/Классы/<Category>/` and `src/Модели/<Category>/`, but the directories are for humans only: `lib.config` is what resolves a class.

A single `#Использовать` brings in every category at once.

## Authentication

```bsl
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");

Клиент = Новый ПроверкаПодключенияКWBAPIApi(Настройки);
Ответ = Клиент.GetPing();

Сообщить(Ответ.КодСостояния);
Сообщить(Ответ.Данные["Status"]);
```

`УстановитьТокен` accepts either a plain string or a ready `СекретнаяСтрока`.

The token does not leak when printed: the object exposes no property holding the value, and `Строка(Объект)` in OneScript returns only the class name.

```bsl
Сообщить(Настройки.Токен());              // СекретнаяСтрока
Сообщить(Настройки.Токен().Раскрыть());   // eyJhbGciOi...  (on request)
```

## Method shape

Required parameters are positional; optional ones arrive as a single collection in the last argument:

```bsl
Клиент = Новый КарточкиТоваровApi(Настройки);

// Request body only
Ответ = Клиент.PostV2CardsDeleteTrash(Тело);

// Body + optional query parameters
Ответ = Клиент.PostV2CardsErrorList(Тело, Новый Структура("locale", "ru"));
```

Keys in `ДопПараметры` match the names from the spec. When a name is not a legal `Структура` identifier — anything with a dash, such as the `X-Trace` header — pass a `Соответствие` instead:

```bsl
ДопПараметры = Новый Соответствие;
ДопПараметры.Вставить("X-Trace", "trace-1");
```

## The response

Every method returns an `ОтветAPI`:

| Property / method | Type | Description |
| --- | --- | --- |
| `КодСостояния` | Число | HTTP status code |
| `Данные` | Произвольный | body parsed from JSON |
| `Тело` | Строка | raw response body |
| `Заголовки` | Соответствие | response headers |
| `Успешно()` | Булево | 2xx |
| `ЭтоОшибка()` | Булево | 4xx or 5xx |
| `Заголовок(Имя)` | Строка | case-insensitive header lookup |

When the body is not JSON (`text/plain`, `application/zip`), `Данные` is `Неопределено` and the content stays in `Тело`.

## Error handling

By default a 4xx or 5xx response raises an exception whose text reads `HTTP 404 — GET /api/v3/orders: <body>`.

`ВызватьИсключение` in OneScript does not preserve the object for the handler — `ОписаниеОшибки()` would return only a class name — so there is no dedicated exception class here: the detail is all in the text. To inspect an error field by field, turn the raise off:

```bsl
Настройки.ВыбрасыватьИсключениеПриОшибке = Ложь;

Ответ = Клиент.GetPing();
Если Ответ.ЭтоОшибка() Тогда
	Сообщить(Ответ.КодСостояния);
	Сообщить(Ответ.Данные["detail"]);
КонецЕсли;
```

## Service address

Each WB category sits behind its own host, and that address is baked into the operation. `БазовыйURL` is empty by default, which means "use the address from the spec". Fill it in to send **every** request elsewhere — a sandbox or a test stand:

```bsl
Настройки.БазовыйURL = "https://marketplace-api-sandbox.wildberries.ru";
```

## User-Agent and headers

Every request sends `ValeryVerkhoturov/wb-api-client/onescript`. To replace or extend it:

```bsl
Настройки.ПользовательскийАгент = "MyApp/1.2.3 ValeryVerkhoturov/wb-api-client/onescript";
Настройки.ДополнительныеЗаголовки.Вставить("X-Request-Id", "…");
```

::: warning ASCII-only headers
Header values must be ASCII — a limitation of the .NET HTTP stack OneScript runs on. Cyrillic in query parameters, path segments and request bodies works fine: those are encoded separately.
:::

## Timeout and proxy

```bsl
Настройки.Таймаут = 120;                      // seconds
Настройки.Прокси = Новый ИнтернетПрокси(Истина);
```

## Models

Models are classes with properties plus a pair of conversion methods. Unset properties are omitted from the request body, so a missing field never goes out as `null`.

```bsl
Товар = Новый ItemsItem();
Товар.nmID = 123;
Товар.price = 1000;

Данные = Товар.Данные();          // Соответствие keyed by the spec's names

// And back, from a response
Восстановленный = Новый ItemsItem(Ответ.Данные);
```

A request body can be passed either as a model or as a plain `Соответствие` / `Структура` — the transport handles both.

## What generates it

openapi-generator ships no OneScript target, so one was written separately: [`ValeryVerkhoturov/onescript-openapi-generator`](https://github.com/ValeryVerkhoturov/onescript-openapi-generator), a plugin extending `DefaultCodegen` and loaded next to `openapi-generator-cli.jar` through `META-INF/services`. The main repo pins it by commit, exactly as it pins the openapi-generator image tag for the other languages.

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Sibling repo readme](https://github.com/ValeryVerkhoturov/wb-api-client-1c#readme)
