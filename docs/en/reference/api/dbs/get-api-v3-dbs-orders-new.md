---
title: "Получить список новых сборочных заданий"
description: "Метод возвращает список всех новых сборочных заданий, которые есть у продавца на момент запроса."
---

# Получить список новых сборочных заданий

```http
GET /api/v3/dbs/orders/new
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** Сборочные задания DBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew)

Метод возвращает список всех новых [сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders), которые есть у продавца на момент запроса.

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Responses

| Code  | Description            | Schema                         |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `GetV3DbsOrdersNewResponse200` |
| `401` | Не авторизован         | `object`                       |
| `402` | Требуется платёж       | `object`                       |
| `403` | Доступ запрещён        | `Error`                        |
| `429` | Слишком много запросов | `object`                       |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DBSApi

cfg = Configuration(access_token="<your WB JWT>")
api = DBSApi(ApiClient(cfg))

result = api.get_v3_dbs_orders_new()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DBSApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DBSApi(cfg);

const { data } = await api.getV3DbsOrdersNew();
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DBSAPI.GetV3DbsOrdersNew(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DbsApi api = new DbsApi(client);

System.out.println(api.getV3DbsOrdersNew());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DBSApi(new Client(), $config);

print_r($api->getV3DbsOrdersNew());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СборочныеЗаданияDBSApi(Настройки);

Сообщить(Клиент.GetV3DbsOrdersNew().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DBSApi(config);

Console.WriteLine(api.GetV3DbsOrdersNew());
```

:::
