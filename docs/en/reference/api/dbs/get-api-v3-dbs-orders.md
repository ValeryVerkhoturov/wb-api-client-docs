---
title: "Get Information on Completed Orders"
description: "Returns information on completed orders (either canceled or sold). You can get data for a specified period, maximum of 30 calendar days per request."
---

# Get Information on Completed Orders

```http
GET /api/v3/dbs/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrders)

Returns information on completed orders (either canceled or sold).
You can get data for a specified period, maximum of 30 calendar days per request.

[Request limit](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **DBS assembly orders** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Parameters

| Name       | In    | Type             | Req. | Description                                |
| ---------- | ----- | ---------------- | ---- | ------------------------------------------ |
| `dateFrom` | query | `integer<int64>` | yes  | Period start date in Unix timestamp format |
| `dateTo`   | query | `integer<int64>` | yes  | Period end date in Unix timestamp format   |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV3DbsOrdersResponse200` |
| `400` | Bad request       | `Error`                     |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `Error`                     |
| `429` | Too many requests | `object`                    |

**Structure `200`:**

- `next` `Next`
- `orders` `OrderDBS[]`
  - `address` `object` — When delivering orders to a pickup point, the address of the pickup point is specified
    - `fullAddress` `string` — Delivery address
    - `longitude` `number<float64>` — Longitude
    - `latitude` `number<float64>` — Latitude
  - `deliveryType` `string` — Delivery type: - `dbs` — Delivery By Seller - `dbsPickupPoint` — Delivery By Seller to Pickup Point - `edbs` — Express Delivery By Seller
  - `options` `object` — Order options
    - `isB2b` `boolean` — Indicator of a B2B sale: - `false` — not B2B sale - `true` — B2B sale
  - `orderUid` `string` — Transaction ID for order grouping. Orders in the same buyer's cart will have the same `orderUid`.
  - `groupId` `string<UUID>` — Assembly order group ID. It unites assembly orders received at a single warehouse (`warehouseId`) as part of a single buyer transaction (`orderUid`)
  - `article` `string` — Seller item number
  - `colorCode` `string` — Color code (for tinted items only)
  - `rid` `object` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `createdAt` `string` — Order creation date
  - `skus` `string[]` — Item SKU array
  - `id` `integer<int64>` — Assembly order ID
  - `warehouseId` `integer<int64>` — Seller warehouse ID where the order was received.
  - `nmId` `integer<int64>` — WB item number
  - `chrtId` `integer<int64>` — Item size ID in WB systems
  - `scanPrice` `integer<int64>` — Acceptance price for orders to a pickup point, in kopecks. Displayed only for orders to a pickup point
  - `price` `integer<int64>` — The price in the currency of sale including all discounts, except WB Wallet discount, multiplied by 100. You can find a currency code in the `currencyCode`. Provided for informational purposes only
  - `convertedPrice` `integer<int64>` — The price in the currency of the seller country including all discounts, except WB Wallet discount, multiplied by 100. Provided for informational purposes only
  - `currencyCode` `integer<ISO 4217>` — Sale currency code
  - `convertedCurrencyCode` `integer<ISO 4217>` — Currency code of the seller country
  - `convertedFinalPrice` `integer<int64>` — The sum charged to the buyer in the currency of the seller country including all discounts, multiplied by 100. Provided for informational purposes only. Use the value of the `convertedFinalPrice` field only if the response of the method for getting [seller prices and amounts charged to the buyer](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice) returned `"data": null`. In all other cases, use the value of the `convertedOriginalFinalPrice` field from the response of the specified method
  - `finalPrice` `integer<int64>` — The sum charged to the buyer in the currency of sale including all discounts, multiplied by 100. You can find a currency code in the `currencyCode` field. Provided for informational purposes only. Use the value of the `finalPrice` field only if the response of the method for getting [seller prices and amounts charged to the buyer](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice) returned `"data": null`. In all other cases, use the value of the `originalFinalPrice` field from the response of the same method
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Type of cargo: - `1` — small-sized items - `2` — over dimensional cargo (ODC) - `3` — dimensional cargo+ (CD+)
  - `comment` `string` — Buyer comment
  - `isZeroOrder` `boolean` — Indicator of an order for a item with zero inventory: - `false` — the order is made for a item with a non-zero inventory - `true` — the order is made for a item with zero inventory. Such an order can be canceled without a cancellation fee
  - `wbStickerId` `integer<int64>` — Sticker ID. Only displayed for orders to pickup point

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
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.get_v3_dbs_orders(limit=..., next=..., date_from=..., date_to=...)
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

const { data } = await api.getV3DbsOrders(limit, next, dateFrom, dateTo);
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

result, _, err := client.DbsAPI.GetV3DbsOrders(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
DbsApi api = new DbsApi(client);

System.out.println(api.getV3DbsOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->getV3DbsOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.GetV3DbsOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.GetV3DbsOrders(limit, next, dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = dbs_api::get_v3_dbs_orders(&cfg, limit, next, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
