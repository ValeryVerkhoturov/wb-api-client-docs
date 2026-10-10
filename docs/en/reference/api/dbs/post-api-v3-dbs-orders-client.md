---
title: "Информация о покупателе"
description: "Метод возвращает информацию о покупателе по ID сборочных заданий."
---

# Информация о покупателе

```http
POST /api/v3/dbs/orders/client
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** Сборочные задания DBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/dbs/post-api-v3-dbs-orders-client) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient)

Метод возвращает информацию о покупателе по ID сборочных заданий.

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `OrdersRequestAPI`, required

## Responses

| Code  | Description            | Schema                  |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `DbsOnlyClientInfoResp` |
| `400` | Неправильный запрос    | `Error`                 |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Error`                 |
| `404` | Не найдено             | `Error`                 |
| `429` | Слишком много запросов | `object`                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_client(orders_request_api=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersClient(ordersRequestAPI);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersClient(context.Background()).OrdersRequestAPI(ordersRequestAPI).Execute()
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

System.out.println(api.postV3DbsOrdersClient(ordersRequestAPI));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersClient($orders_request_api));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersClient(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersClient(ordersRequestAPI));
```

:::
