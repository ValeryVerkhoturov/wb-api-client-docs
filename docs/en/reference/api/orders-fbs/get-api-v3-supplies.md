---
title: "Get a Supplies List"
description: "Returns the supplies list."
---

# Get a Supplies List

```http
GET /api/v3/supplies
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3Supplies)

Returns the supplies list.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Responses

| Code  | Description       | Schema                     |
| ----- | ----------------- | -------------------------- |
| `200` | Success           | `GetV3SuppliesResponse200` |
| `400` | Bad request       | `Error`                    |
| `401` | Unauthorized      | `object`                   |
| `402` | Payment required  | `object`                   |
| `403` | Access denied     | `Error`                    |
| `429` | Too many requests | `object`                   |

**Structure `200`:**

- `next` `Next`
- `supplies` `Supply[]` — Supplies list
  - `id` `string` — Supply ID
  - `isB2b` `boolean` — Indicator of a B2B sale: - `true` — B2B sale - `false` — not B2B sale - `null` — no value, no assembly orders added to the supply
  - `isPickupPointShipmentAllowed` `boolean` — Whether you can dispatch the order to a pickup point: - `false` — no - `true` — yes
  - `done` `boolean` — An indication that the supply is closed - `true` — closed - `false` — open
  - `createdAt` `string` — Supply creation date (RFC3339)
  - `closedAt` `string` — Supply close date (RFC3339)
  - `scanDt` `string` — Supply scan date (RFC3339). If `"scanDt":null`, the supply was not scanned
  - `name` `string` — Supply name
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Type of cargo: - `1` — small-sized items - `2` — over dimensional cargo (ODC) - `3` — dimensional cargo+ (CD+)
  - `crossBorderType` `integer<int32>` = `0` | `1` — Supply type: - `0` — Non-Cross-Border - `1` — Cross-Border - `null` — no value
  - `destinationOfficeId` `integer<int64>` — ID of the office where assembly tasks for the supply are stored. If `null`, office ID is not specified
  - `recommendedWhId` `integer<int64>` — ID of the recommended warehouse for acceptance of the supply for Moscow and Moscow region. The warehouse closest to the customers chain is defined automatically when the supply is transferred to delivery, taking into account the parameters of all assembly orders in the supply. If `0`, the recommended warehouse is not determined
  - `shippingDt` `string` — Planned supply shipping date, format `YYYY-MM-DD`
  - `shippingPointId` `integer<int64>` — Shipping point ID. You can get it using a method for getting [supply shipping points](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints)
  - `shippingType` `string` = `selfShipping` | `transportCompany` — Type of shipping to the shipping point: - `selfShipping` — shipping at the seller's expense - `transportCompany` — delivery via a transport company
  - `waybillUuid` `string` — Electronic waybill ID
  - `spotAvailable` `boolean` — Whether SPOT is available for this supply: - `true` — yes. Use the method for [getting SPOT data](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList) - `false` — no

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

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

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

result = api.get_v3_supplies(limit=..., next=...)
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

const { data } = await api.getV3Supplies(limit, next);
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

result, _, err := client.OrdersFbsAPI.GetV3Supplies(context.Background()).Execute()
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

System.out.println(api.getV3Supplies(limit, next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3Supplies($limit, $next));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3Supplies(limit, next).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3Supplies(limit, next));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_supplies(&cfg, limit, next).await;
    println!("{:#?}", result);
}
```

:::
