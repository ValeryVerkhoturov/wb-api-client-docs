---
title: "Get Assembly Order Statuses"
description: "The method provides the statuses of assembly orders by their ID."
---

# Get Assembly Order Statuses

```http
POST /api/marketplace/v3/click-collect/orders/status/info
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo)

The method provides the statuses of [assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) by their ID.

`supplierStatus` — the status of the assembly order. The trigger for its change is the action of the seller himself.
Possible values for `supplierStatus`:

| Status                                                          | Description                                   | How to set the assembly order to this status                                                                                                                                               |
| --------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `new`                                                           | \*\*New assembly order\*\*                    |                                                                                                                                                                                            |
| `confirm`                                                       | \*\*In assembly\*\*                           | [Transfer to assembly](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusConfirm)                                 |
| `prepare`                                                       | \*\*Ready for pickup\*\*                      | [Notify that the assembly order is ready for delivery](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusPrepare) |
| `receive`                                                       | \*\*Received by buyer\*\*                     | [Notify that the order has been received by the buyer](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusReceive) |
| `reject`                                                        | \*\*Buyer refusal\*\*                         | [Notify that the buyer has declined the order](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusReject)          |
| `cancel`                                                        | \*\*Canceled by seller\*\*                    | [Cancel the order](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusCancel)                                      |
| `cancel\_shelf\_life`                                           | \*\*Canceled due to shelf life expiration\*\* | Automatically transitions upon event occurrence                                                                                                                                            |
| `wbStatus` — the status of the assembly order in the WB system. |
| Possible values for wbStatus:                                   |

- `waiting` - assembly order is in progress
- `sorted` - assembly order is sorted
- `sold` - the buyer got the order
- `canceled` - assembly order canceled
- `canceled\_by\_client` - buyer canceled the order upon receipt
- `declined\_by\_client` - buyer canceled the order within the first hour

Cancellation is available to the buyer within the first hour from the time of order, if the order has not been transitioned to assembly

- `defect` - order canceled due to defect
- `ready\_for\_pickup` - order is ready for pickup

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period                                                           | Limit     | Interval | Burst       |
| ---------------------------------------------------------------- | --------- | -------- | ----------- |
| 1 s                                                              | 1 request | 1 s      | 10 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

- `ordersIds` `integer<int64>[]` (required) — List of assembly order IDs

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `api.OrderStatusesV2` |
| `400` | Bad request       | `api.BatchError`      |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `403` | Access denied     | `api.BatchError`      |
| `429` | Too many requests | `object`              |

**Structure `200`:**

- `orders` `api.OrderStatusV2[]` — Status data
  - `errors` `api.OrdersErrorResponse[]` — Error detail
    - `code` `integer<int64>` — Error code
    - `detail` `string` — - `NotFound` — the assembly order is not found
  - `orderId` `integer<int64>` — Assembly order ID
  - `supplierStatus` `string` — Assembly order status set by the seller
  - `wbStatus` `string` — Assembly order status set by WB system

**Structure `400`:**

- `detail` `object` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

- `detail` `object` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

**Structure `429`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_status_info(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new InStorePickupApi(cfg);

const { data } = await api.postV3ClickCollectOrdersStatusInfo(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersStatusInfo(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersStatusInfo(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersStatusInfo($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersStatusInfo(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersStatusInfo(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = in_store_pickup_api::post_v3_click_collect_orders_status_info(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
