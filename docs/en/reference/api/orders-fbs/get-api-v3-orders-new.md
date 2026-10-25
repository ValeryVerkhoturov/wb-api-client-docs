---
title: "Get New Assembly Orders"
description: "Returns a list of all new assembly orders."
---

# Get New Assembly Orders

```http
GET /api/v3/orders/new
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3OrdersNew)

Returns a list of all new [assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders).

Label identifiers specified in the `requiredMeta` and `optionalMeta` fields in assembly orders only affects the ability to transfer a supply to delivery. If your item requires mandatory marking with identification means, you must specify all needed label identifiers whether it was received in `requiredMeta` or `optionalMeta` field (see 4.6 of the [Offer](https://seller.wildberries.ru/confirm-offer-condition/product/view)).

We recommend adding all label identifiers received in the `requiredMeta` and `optionalMeta` fields to the assembly orders

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV3OrdersNewResponse200` |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `Error`                     |
| `429` | Too many requests | `object`                    |

**Structure `200`:**

- `orders` `OrderNew[]` — New assembly orders list
  - `address` `object` — Exact buyer's address for delivery, if applicable. Some of the fields may be empty due to the specifics of the address
    - `fullAddress` `string` — Delivery address
    - `longitude` `number<float64>` — Longitude
    - `latitude` `number<float64>` — Latitude
  - `ddate` `string` — Planned delivery date of the order to the buyer. The field is displayed for assembly orders with over dimensional items `ODC`, `cargoType: 2`
  - `sellerDate` `string` — Recommended delivery date for `ODC` items to sorting center or warehouse. The field is displayed for assembly orders with over dimensional items `ODC`, `cargoType: 2`
  - `salePrice` `integer<int64>` — Seller price in the currency of sale, including seller discount, except the WB Club discount, multiplied by 100
  - `requiredMeta` `string[]` — List of label identifiers need to be added to the assembly order to tranfer a supply with this assembly order to the delivery
  - `optionalMeta` `string[]` — List of label identifiers that can to be added to the assembly order. A supply with the assembly order without these label identifiers can be transferred to the delivery, but label identifiers may be required, for example, when a customer returns a item
  - `deliveryType` `string` = `fbs` — Delivery type: - `fbs` — Fulfillment By Seller (FBS)
  - `comment` `string` — Buyer's comment
  - `scanPrice` `number<uint32>` — Acceptance price in kopecks. Displayed after the actual acceptance of the order. For this method will `null` always be returned
  - `orderUid` `string` — Transaction ID for assembly orders grouping. Orders in the same buyer's cart will have the same `orderUid`.
  - `article` `string` — Seller item number
  - `colorCode` `string` — Color code (for tinted items only)
  - `rid` `string` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `createdAt` `string` — Assembly order creation date (RFC3339)
  - `offices` `string[]` — List of offices where you should deliver the order
  - `skus` `string[]` — List of SKUs
  - `id` `integer<int64>` — Assembly order ID
  - `warehouseId` `integer<int64>` — Seller warehouse ID where the assembly order was received
  - `officeId` `integer<int64>` — ID of the WB warehouse associated with the seller warehouse
  - `nmId` `integer<int64>` — WB item number
  - `chrtId` `integer<int64>` — Item size ID in WB systems
  - `price` `integer<int64>` — The price in the currency of sale, including all discounts except the amount from the WB Wallet, multiplied by 100. The currency code of the sale is in the `currencyCode` field
  - `finalPrice` `integer<int64>` — The sum charged to the buyer in the currency of sale including all discounts, multiplied by 100. You can find a currency code in the `currencyCode` field. Provided for informational purposes only
  - `convertedPrice` `integer<int64>` — The price in the currency of the seller country including all discounts, except WB Wallet discount, multiplied by 100. Provided for informational purposes only.
  - `convertedFinalPrice` `integer<int64>` — The sum charged to the buyer in the currency of the seller country including all discounts, multiplied by 100. Provided for informational purposes only
  - `currencyCode` `integer<ISO 4217>` — Sale currency code
  - `convertedCurrencyCode` `integer<ISO 4217>` — Currency code of the seller country
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Type of cargo: - `1` — small-sized items - `2` — over dimensional cargo (ODC) - `3` — dimensional cargo+ (CD+)
  - `crossBorderType` `integer<int32>` = `0` | `1` — Assembly order type: - `0` — Non-Cross-Border - `1` — Cross-Border
  - `isZeroOrder` `boolean` — Indicator of an order for a item with zero inventory: - `false` — the order is made for a item with a non-zero inventory - `true` — the order is made for a item with zero inventory. Such an order can be canceled without a cancellation fee
  - `isPickupPointShipmentAllowed` `boolean` — Whether you can dispatch the order to a pickup point: - `false` — no - `true` — yes
  - `options` `object` — Order options
    - `isB2B` `boolean` — Indicator of a B2B sale: - `false` — not B2B sale - `true` — B2B sale

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

result = api.get_v3_orders_new()
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

const { data } = await api.getV3OrdersNew();
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

result, _, err := client.OrdersFbsAPI.GetV3OrdersNew(context.Background()).Execute()
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

System.out.println(api.getV3OrdersNew());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3OrdersNew());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3OrdersNew().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3OrdersNew());
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_orders_new(&cfg).await;
    println!("{:#?}", result);
}
```

:::
