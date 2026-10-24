---
title: "Get Orders Statuses"
description: "Returns the statuses of orders based on the provided list of assembly order IDs supplierStatus is a status of an order. The trigger for its change is the…"
---

# Get Orders Statuses

```http
POST /api/v3/dbw/orders/status
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus)

Returns the statuses of orders based on the provided list of assembly order IDs
`supplierStatus` is a status of an order. The trigger for its change is the action of the seller himself.
Possible values for this field are:

| Status                                                      | Description               | How to move an order to this status                                                                                                      |
| ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `new`                                                       | \*\*New order\*\*         |                                                                                                                                          |
| `confirm`                                                   | \*\*Order on assembly\*\* | [Transfer to assembly](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/patchV3DbwOrdersOrderIdConfirm)<br> | `complete` | \*\*Order on delivery\*\*<br> | [Transfer to delivery](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatusDeliver)<br> | `receive` | \*\*Received by the buyer\*\*<br> | Changed by the courier<br> | `reject` | \*\*Declined upon receipt\*\*<br> | Changed by the courier<br> | `cancel` | \*\*Canceled by the seller\*\* | [Cancel the order](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/patchV3DbwOrdersOrderIdCancel)<br> | `cancel\_missed\_call` | \*\*Cancellation due to unreachable buyer\*\* | The status changes automatically |
| `wbStatus` is a status of an order on the Wildberries side. |
| Possible values for this field are:                         |

- `waiting` — order in work
- `sold` — the buyer got the order
- `canceled` — order canceled
- `canceled\_by\_client` — the buyer canceled the order
- `declined\_by\_client` — the buyer canceled the order in the first hour
  Cancellation is available to the buyer in the first hour from the moment of order, if the order is not transferred to confirm status.
- `defect` — order canceled due to a defect
- `canceled\_by\_missed\_call` — cancellation due to unreachable buyer
- `postponed\_delivery` — courier delivery is postponed

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                             |
| ----- | ----------------- | ---------------------------------- |
| `200` | Success           | `PostV3DbwOrdersStatusResponse200` |
| `400` | Bad request       | `Error`                            |
| `401` | Unauthorized      | `object`                           |
| `402` | Payment required  | `object`                           |
| `403` | Access denied     | `Error`                            |
| `429` | Too many requests | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_status(post_v3_dbw_orders_status_request=...)
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

const { data } = await api.postV3DbwOrdersStatus(postV3DbwOrdersStatusRequest);
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

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersStatus(context.Background()).Execute()
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

System.out.println(api.postV3DbwOrdersStatus(postV3DbwOrdersStatusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersStatus());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersStatus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersStatus());
```

:::
