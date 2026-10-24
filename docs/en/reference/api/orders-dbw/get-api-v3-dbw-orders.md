---
title: "Get Information on Completed Orders"
description: "Returns information on completed orders (either canceled or sold)."
---

# Get Information on Completed Orders

```http
GET /api/v3/dbw/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrders)

Returns information on completed orders (either canceled or sold).

You can get data for a specified period, maximum of 30 calendar days per request.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name       | In    | Type             | Req. | Description                                |
| ---------- | ----- | ---------------- | ---- | ------------------------------------------ |
| `dateFrom` | query | `integer<int64>` | yes  | Period start date in Unix timestamp format |
| `dateTo`   | query | `integer<int64>` | yes  | Period end date in Unix timestamp format   |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV3DbwOrdersResponse200` |
| `400` | Bad request       | `Error`                     |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `Error`                     |
| `429` | Too many requests | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.get_v3_dbw_orders(limit=..., next=..., date_from=..., date_to=...)
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

const { data } = await api.getV3DbwOrders(limit, next, dateFrom, dateTo);
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

result, _, err := client.OrdersDbwAPI.GetV3DbwOrders(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV3DbwOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->getV3DbwOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.GetV3DbwOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.GetV3DbwOrders(limit, next, dateFrom, dateTo));
```

:::
