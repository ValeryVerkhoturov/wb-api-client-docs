---
title: "Get Assembly Orders Statuses"
description: "Returns the statuses of assembly orders from the request. supplierStatus is a status of an assembly order. Its change is always triggered only by the seller.…"
---

# Get Assembly Orders Statuses

```http
POST /api/v3/orders/status
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus)

Returns the statuses of assembly orders from the request.
`supplierStatus` is a status of an assembly order. Its change is always triggered only by the seller.
Possible values of `supplierStatus`:

| Status                                                        | Description                                                                       | How to move the assembly orders to this status                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new`                                                         | \*\*New order\*\*                                                                 |                                                                                                                                                                                                                                                                                                           |
| `confirm`                                                     | \*\*In assembly\*\*<br>For delivery by Wildberries `fbs`                          | [Add assembly orders to the supply](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdOrders)<br>[Transfer orders from supply to assembly](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer) |
| `complete`                                                    | \*\*In delivery\*\*<br>For delivery by Wildberries `fbs` and by WB courier `wbgo` | [Transfer the supply to delivery](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)                                                                                                                                                                 |
| `cancel`                                                      | \*\*Canceled by seller\*\*                                                        | [Cancel the order](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/patchV3OrdersOrderIdCancel)                                                                                                                                                                              |
| `cancel\_carrier`                                             | \*\*Canceled by carrier\*\*<br>For crossborder only                               | Changed by the carrier                                                                                                                                                                                                                                                                                    |
| `wbStatus` — is a status of an order on the Wildberries side. |
| Possible values for this field are:                           |

- `waiting` — the seller confirmed the order, and the Wildberries has not received it yet
- `sorted` — the Wildberries warehouse sorted the order
- `sold` — the order is sold
- `canceled` — the seller canceled the order
- `canceled\_by\_client` — the buyer canceled the order upon receipt
- `declined\_by\_client` — the buyer canceled the order in the first hour
  Cancellation is available to the buyer in the first hour from the moment of order, if the order is not transferred to confirm status.
- `defect` — cancellation of the order due to a defect
- `ready\_for\_pickup` — the order came at pickup point and waiting for the client
- `postponed\_delivery` — courier delivery is postponed
- `accepted\_by\_carrier` — accepted by carrier. The order is handed over to delivery service in the seller country
- `sent\_to\_carrier` — dispatched to carrier. The order is on the way to delivery service's warehouse in the seller
- `canceled\_by\_carrier` — the order was cancelled by the carrier. For crossborder only

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `PostV3OrdersStatusResponse200` |
| `400` | Bad request       | `Error`                         |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `Error`                         |
| `429` | Too many requests | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_status(post_v3_orders_status_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3OrdersStatus(postV3OrdersStatusRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3OrdersStatus(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3OrdersStatus(postV3OrdersStatusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStatus());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStatus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStatus());
```

:::
