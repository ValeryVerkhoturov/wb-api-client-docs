# Свои заголовки

Иногда к каждому запросу нужно добавить заголовок, которого нет в спецификации WB: креденшелы шлюза или корпоративного прокси, стоящего перед API, идентификатор трассировки, метка окружения. Каждый клиент умеет добавлять такие заголовки — механизм свой в каждом языке, и ниже разобраны все семь.

## Что сюда не относится

Две вещи стоит отделить сразу, иначе легко добавить заголовок, который клиент и так проставляет.

**Токен WB.** Заголовок `Authorization` клиент формирует сам из токена — см. [Аутентификацию](/guides/authentication). Не собирайте его руками через механизмы этой страницы: в части языков (Go) это приведёт к двум заголовкам `Authorization` в одном запросе.

**Заголовки, описанные в спецификации.** Если заголовок объявлен в спецификации операции, генератор уже превратил его в обычный аргумент метода. В WB такие есть: `X-Nm-Id` и `X-Photo-Number` у `postV3MediaFile` в под-модуле `items`. Передавайте их аргументами, а не как «свои».

Остаётся всё остальное — заголовки, о которых спецификация не знает. Их и добавляем.

## Заголовки на весь клиент

Самый частый случай: заголовок нужен всем запросам. Задаётся один раз при сборке клиента.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

client = ApiClient(Configuration(access_token="<ваш JWT WB>"))
client.set_default_header("X-Gateway-Token", "<креденшелы шлюза>")
client.set_default_header("X-Request-Source", "erp-sync")

api = ItemsApi(client)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({
  baseOptions: {
    headers: {
      "X-Gateway-Token": "<креденшелы шлюза>",
      "X-Request-Source": "erp-sync",
    },
  },
});
cfg.setAccessToken("<ваш JWT WB>");

const api = new ItemsApi(cfg);
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
cfg.AddDefaultHeader("X-Gateway-Token", "<креденшелы шлюза>")
cfg.AddDefaultHeader("X-Request-Source", "erp-sync")

client := wbitems.NewAPIClient(cfg)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
client.addDefaultHeader("X-Gateway-Token", "<креденшелы шлюза>");
client.addDefaultHeader("X-Request-Source", "erp-sync");

ItemsApi api = new ItemsApi(client);
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));

// У Configuration в PHP нет реестра заголовков — их держит Guzzle-клиент.
$http = new Client([
    'headers' => [
        'X-Gateway-Token' => '<креденшелы шлюза>',
        'X-Request-Source' => 'erp-sync',
    ],
]);

$api = new ItemsApi($http, $config);
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Настройки.ДополнительныеЗаголовки.Вставить("X-Gateway-Token", "<креденшелы шлюза>");
Настройки.ДополнительныеЗаголовки.Вставить("X-Request-Source", "erp-sync");

Клиент = Новый ItemsApi(Настройки);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
config.DefaultHeaders["X-Gateway-Token"] = "<креденшелы шлюза>";
config.DefaultHeaders["X-Request-Source"] = "erp-sync";

var api = new ItemsApi(config);
```

:::

Заголовки живут на экземпляре `Configuration` / `ApiClient` — а он свой у каждого под-модуля. Используете `items` и `orders_fbs` — задайте заголовки обоим; подробнее про это в разделе [«Один токен на несколько под-модулей»](/guides/authentication#один-токен-на-несколько-под-модулеи).

## Заголовки на один запрос

Отдельный заголовок для одного вызова умеют не все клиенты: это зависит от того, что сгенерировал openapi-generator для конкретного языка.

| Язык       | Поддержка на уровне вызова                             |
| ---------- | ------------------------------------------------------ |
| Python     | да — именованный параметр `_headers=` у каждого метода |
| TypeScript | да — последний аргумент `RawAxiosRequestConfig`        |
| Go         | нет — методы не принимают заголовки                    |
| Java       | нет                                                    |
| PHP        | нет                                                    |
| C#         | нет                                                    |
| OneScript  | нет — `Заголовки` собираются внутри метода             |

::: code-group

```python [Python]
# Внимание: заголовки по умолчанию перекрывают _headers при совпадении имени.
tags = api.get_v2_tags(_headers={"X-Correlation-Id": "9f1c-…"})
```

```ts [TypeScript]
// Здесь наоборот: заголовок вызова перекрывает и baseOptions, и Authorization.
const tags = await api.getV2Tags({
  headers: { "X-Correlation-Id": "9f1c-…" },
});
```

:::

В остальных пяти языках, если заголовок нужен только части запросов, соберите второй экземпляр клиента со своим набором заголовков и ходите через него.

## Что чем перекрывается

Порядок слияния у каждого генератора свой, и он не везде интуитивен. Проверено по сгенерированному коду:

| Язык       | Порядок (побеждает правый)                                                             | Особенность                                                                                    |
| ---------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Python     | `_headers` → заголовки по умолчанию                                                    | **Умолчания побеждают**: `default_headers` применяются поверх `_headers`                       |
| TypeScript | авторизация → `baseOptions.headers` → заголовки вызова                                 | заголовком конфигурации можно перебить и `Authorization`                                       |
| Go         | —                                                                                      | используется `Header.Add`, то есть **добавление, а не замена**: дубль имени даст два заголовка |
| Java       | `defaultHeaderMap` поверх заголовков операции                                          | замена по имени                                                                                |
| PHP        | заголовки запроса → дефолты Guzzle                                                     | клиентские дефолты Guzzle применяются, только если заголовка ещё нет                           |
| C#         | `DefaultHeaders` → заголовки операции                                                  | замена по имени                                                                                |
| OneScript  | `Accept`/`User-Agent`/`Authorization` → `ДополнительныеЗаголовки` → заголовки операции | `Соответствие.Вставить` заменяет значение                                                      |

Практический вывод один: не используйте механизмы этой страницы, чтобы переопределить заголовок, который клиент уже ставит сам. Для `User-Agent` есть штатная настройка в каждом языке, для `Authorization` — сеттер токена.

## Секреты в заголовках

`SecretString` оборачивает **только** токен WB. Креденшелы шлюза или партнёрского сервиса — обычные строки, и клиент их не маскирует: в логе HTTP-клиента или в дампе конфигурации они будут видны целиком.

Поэтому к ним применимы те же правила, что и к токену WB:

1. Держите значение в секрет-менеджере (Vault, SSM, GitHub Actions secret), а не в исходниках.
2. Читайте в переменную окружения на старте процесса и собирайте клиент один раз.
3. Проверьте, что ваш логгер запросов не пишет заголовки целиком — либо внесите свои имена заголовков в список маскируемых.

Если вы логируете запросы через middleware, добавьте имена этих заголовков в тот же фильтр, где у вас уже лежит `Authorization`.
