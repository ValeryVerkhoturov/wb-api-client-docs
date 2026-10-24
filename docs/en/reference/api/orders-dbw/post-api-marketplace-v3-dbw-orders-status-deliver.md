---
title: "Transfer Assembly Orders to Delivery"
description: "The method transfers assembly orders with the confirm status to the complete status — in delivery."
---

# Transfer Assembly Orders to Delivery

```http
POST /api/marketplace/v3/dbw/orders/status/deliver
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatusDeliver)

The method transfers [assembly orders](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrders) with the `confirm` [status](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus) to the `complete` status — in delivery.

Check the method response. Assembly orders that have been successfully transferred to delivery will be returned with the flag "isError": false.
For all other assembly orders, see the error reason in the errors array.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `api.StatusSetResponses` |
| `400` | Bad request       | `Error`                  |
| `401` | Unauthorized      | `object`                 |
| `402` | Payment required  | `object`                 |
| `403` | Access denied     | `Error`                  |
| `429` | Too many requests | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_status_deliver(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.postV3DbwOrdersStatusDeliver(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersdbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_dbw"
)

cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersStatusDeliver(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_dbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_dbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_dbw.api.OrdersDbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.postV3DbwOrdersStatusDeliver(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersStatusDeliver($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersStatusDeliver(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersStatusDeliver(apiOrdersRequestV2));
```

:::
