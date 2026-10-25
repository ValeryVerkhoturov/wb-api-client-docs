---
title: "Set Supply Shipping Method"
description: "The method sets shipping method, shipping date, and shipping point for the supplies."
---

# Set Supply Shipping Method

```http
PATCH /api/marketplace/v3/fbs/supplies/shipping-method
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod)

The method sets shipping method, shipping date, and shipping point for the supplies.

The shipping method must be specified before transferring supply to delivery. You can update the shipping method until the supply and its boxes are scanned at the shipping point. Once the supply has been scanned, this method will start returning a `409` error.

You can specify a maximum of 100 supplies per request. The processing result is returned for each supply separately.

Available only for sellers from the Russian Federation.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, required

- `data` `UpdateSupplyShippingMethod[]` (required)
  - `shippingDt` `string` (required) — Planned supply shipping date, format `YYYY-MM-DD`
  - `shippingPointId` `integer<int64>` (required) — Shipping point ID. You can get it using a [separate method](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints)
  - `shippingType` `string` = `selfShipping` | `transportCompany` (required) — Type of shipping to the shipping point: - `selfShipping` — shipping at the seller's expense - `transportCompany` — delivery via a transport company
  - `supplyId` `string` (required) — Supply ID

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `UpdateSuppliesShippingMethodResponse` |
| `400` | Bad request       | `Error`                                |
| `401` | Unauthorized      | `object`                               |
| `403` | Access denied     | `Error`                                |
| `409` | Conflict          | `v3.APIError`                          |
| `429` | Too many requests | `object`                               |

**Structure `200`:**

- `results` `UpdatedSuppliesShippingMethod[]`
  - `error` `object` — Error processing the request for the supply. Possible errors: - `400 IncorrectRequestBody`: - incorrect supply ID - shipping point not found - destination warehouse is not located in the Russian Federation - unknown `shippingType` - date does not match the `YYYY-MM-DD` format - `400 FulfillmentRequired` — the **Fulfillment at SC** service is not available at the shipping point - `404 NotFound` — supply not found - `409 SupplyAlreadyScanned` — the supply or its boxes have already been scanned at the shipping point - `409 InvalidShippingDt` — invalid supply shipping date
    - `code` `integer<int64>` — Error code
    - `detail` `string` — Additional error data
  - `success` `boolean` — Whether the request was processed successfully for this supply. Can only be `true`
  - `supplyId` `string` — Supply ID

**Structure `400`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `403`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `409`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_fbs_supplies_shipping_method(patch_v3_fbs_supplies_shipping_method_request=...)
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

const { data } = await api.patchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest);
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

result, _, err := client.OrdersFbsAPI.PatchV3FbsSuppliesShippingMethod(context.Background()).PatchV3FbsSuppliesShippingMethodRequest(patchV3FbsSuppliesShippingMethodRequest).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.patchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3FbsSuppliesShippingMethod($patch_v3_fbs_supplies_shipping_method_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3FbsSuppliesShippingMethod(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::patch_v3_fbs_supplies_shipping_method(&cfg, patch_v3_fbs_supplies_shipping_method_request).await;
    println!("{:#?}", result);
}
```

:::
