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

**Structure `200`:**

- `next` `Next`
- `orders` `Order[]`
  - `address` `object` — Address of the buyer for delivery
    - `fullAddress` `string` — Delivery address
    - `longitude` `number<float64>` — Longitude
    - `latitude` `number<float64>` — Latitude
  - `options` `object` — Order options
    - `isB2b` `boolean` — Indicator of a B2B sale: - `false` — not B2B sale - `true` — B2B sale
  - `orderUid` `string` — Transaction ID for order grouping. Orders in the same buyer's cart will have the same `orderUid`
  - `groupId` `string<UUID>` — Assembly order group ID. It unites assembly orders received at a single warehouse (`warehouseId`) as part of a single buyer transaction (`orderUid`)
  - `article` `string` — Seller item number
  - `colorCode` `string` — Color code (for tinted items only)
  - `rid` `string` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `createdAt` `string` — Order creation date
  - `skus` `string[]` — Item SKU array
  - `id` `integer<int64>` — Assembly order ID
  - `warehouseId` `integer<int64>` — Seller warehouse ID where the order was received
  - `nmId` `integer<int64>` — WB item number
  - `chrtId` `integer<int64>` — Item size ID in WB systems
  - `price` `integer<int64>` — The price in the currency of sale including all discounts, except WB Wallet discount, multiplied by 100. You can find a currency code in the `currencyCode`. Provided for informational purposes only
  - `convertedPrice` `integer<int64>` — The price in the currency of the seller country including all discounts, except WB Wallet discount, multiplied by 100. Provided for informational purposes only
  - `currencyCode` `integer<ISO 4217>` — Sale currency code
  - `convertedCurrencyCode` `integer<ISO 4217>` — Currency code of the seller country
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Type of cargo: - `1` — small-sized items - `2` — over dimensional cargo (ODC) - `3` — dimensional cargo+ (CD+)
  - `comment` `string` — Buyer comment
  - `isZeroOrder` `boolean` — Indicator of an order for a item with zero inventory: - `false` — the order is made for a item with a non-zero inventory - `true` — the order is made for a item with zero inventory. Such an order can be canceled without a cancellation fee

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
client.setAccessToken(new SecretString("<your WB JWT>"));
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

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::get_v3_dbw_orders(&cfg, limit, next, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
