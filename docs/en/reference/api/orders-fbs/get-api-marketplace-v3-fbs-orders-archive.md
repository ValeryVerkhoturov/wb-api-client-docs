---
title: "Get the List of Archived Assembly Orders"
description: "The method returns assembly orders created more than 3 months ago. Some assembly orders are archived later than 3 months after creation, as the supply is…"
---

# Get the List of Archived Assembly Orders

```http
GET /api/marketplace/v3/fbs/orders/archive
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3FbsOrdersArchive)

The method returns assembly orders created more than 3 months ago.
Some assembly orders are archived later than 3 months after creation, as the supply is archived only after all orders in it are completed.
For example, this happens if the seller did not deliver one of the orders in the supply and the order was canceled automatically after a few days.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name    | In    | Type             | Req. | Description                                                                                                                                                                                                                |
| ------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`  | query | `integer<int64>` | yes  | Year the order was created                                                                                                                                                                                                 |
| `month` | query | `integer<int64>` | yes  | Month the order was created                                                                                                                                                                                                |
| `next`  | query | `integer<int64>` | yes  | Pagination parameter. Sets the value from which to retrieve the next batch. It should start at 0 to get the full list of data. For the subsequent requests, you must take the value from the `next` field in the response. |
| `limit` | query | `integer<int32>` | yes  | Number of assembly orders in the response                                                                                                                                                                                  |

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `v3.ArchiveOrders`    |
| `400` | Bad request       | `ArhiveOrderError400` |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `403` | Access denied     | `object`              |
| `429` | Too many requests | `object`              |

**Structure `200`:**

- `next` `integer<int64>` — Pagination parameter. Sets the value from which to get the next batch
- `orders` `v3.ArchiveOrder[]` — Archived assembly orders
  - `cargoType` `string` — Type of cargo: - `mgt` — small-sized items - `sgt` — over dimensional cargo (ODC) - `kgtPlus` — dimensional cargo+ (CD+)
  - `colorCode` `string` — Color code for tinted items
  - `createdAt` `string` — Date when the order was created
  - `crossBorder` `object` — Cross-border order information
    - `parcel` `string` — Parcel ID
  - `crossBorderType` `string` — Assembly order type: - `local` — Non-Cross-Border - `crossBorder` — Cross-Border
  - `id` `integer<int64>` — Assembly order ID
  - `isZeroOrder` `boolean` — Indicator of an order for an item with zero inventory: - `false` — the order is made for an item with a non-zero inventory - `true` — the order is made for an item with zero inventory
  - `metaDetails` `object[]` — Assembly order label identifiers
    - `key` `string` — Label identifier
    - `value` `string` — Label identifier value
    - `decision` `string` — Validation statuses. `imei` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `imeiMaySell` — The item is approved for sale. Validation passed - `imeiSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed `imei` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `imeiInvalidFormat` — Invalid format. Validation failed - `imeiAlreadySold` — The item with this IMEI has already been sold. Validation failed `uin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `uinMaySell` — The item is approved for sale. Validation passed `uin` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `uinInvalidFormat` — Invalid format. Validation failed - `uinBadStatus` — Invalid batch status. Validation failed - `uinBadProcess` — Invalid processing stage. Validation failed - `uinBadStatusAndBadProcess` — Invalid batch status. Invalid processing stage. Validation failed - `uinNotFound` — Not found in GIIS DMDK. Validation failed. The status may mean that the UIN: - is not specified in the uploaded Delivery Contract Specification - is not registered in GIIS DMDK - is specified incorrectly and is read from the tag with errors - is not in circulation `sgtin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `sgtinIntroduced` — The item is approved for sale. Validation passed - `sgtinSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed `sgtin` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `sgtinInvalidFormat` — Invalid format. Validation failed - `sgtinNoGS` — Label identifier does not contain the GS separator `\u001d`. Validation failed - `sgtinHasInvalidSymbols` — Label identifier contains incorrect characters or spaces. Validation failed - `sgtinHasNonLatinSymbols` — Label identifier contains non-special or Latin characters. Validation failed - `sgtinInvalidPattern` — Label identifier structure is incorrect. Validation failed - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/). Validation failed - `sgtinEmitted` — Label identifier has been issued. Validation failed - `sgtinApplied` — Putting into circulation not completed. Validation failed - `sgtinWrittenOff` — Written off. Validation failed - `sgtinRetired` — Retired. Validation failed - `sgtinWithdrawn` — Withdrawn. Validation failed - `sgtinDisaggregation` — Disaggregation. Validation failed - `sgtinDisaggregated` — Disaggregated. Validation failed - `sgtinAppliedNotPaid` — Not paid. Validation failed `gtin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed `expiration` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed `customsDeclaration` validation statuses with which the supply can not be transferred to delivery: - `required` — Required label identifier is not added to the assembly order. Validation failed `customsDeclaration` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed
  - `options` `object` — Order options
    - `isB2B` `boolean` — Indicator of a B2B sale: - `false` — not B2B sale - `true` — B2B sale
  - `orderUid` `string` — Transaction ID for order grouping. Orders in the same buyer's cart will have the same `orderUid`
  - `priceInfo` `object` — Order price data
    - `convertedCurrencyCode` `integer<int64>` — Currency code of the seller country
    - `convertedPrice` `integer<int64>` — The sum charged to the buyer in the currency of the seller country including all discounts, multiplied by 100
    - `currencyCode` `integer<int64>` — Sale currency code
    - `price` `integer<int64>` — The price in the currency of sale including all discounts, except WB Wallet discount, multiplied by 100
  - `product` `object` — Item information
    - `article` `string` — Seller item number
    - `chrtId` `integer<int64>` — Item size ID in WB systems
    - `nmId` `integer<int64>` — WB item number
    - `skus` `string[]` — List of SKUs
  - `rid` `string` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `scanPrice` `integer<int64>` — Acceptance price in kopecks
  - `status` `object` — The latest assembly order statuses
    - `supplierStatus` `string` — Assembly order status set by the seller
    - `wbStatus` `string` — Assembly order status set by WB system
  - `stickerId` `integer<int64>` — Sticker ID
  - `supplyId` `string` — Supply ID
  - `warehouseId` `integer<int64>` — ID of the seller warehouse from which the item was shipped

**Structure `400`:**

- `code` `string` — Error code
- `detail` `string` — Error details
- `errors` `object[]` — Error data
  - `location` `string` — Parameter where the error occurred
  - `message` `string` — Error text
  - `value` `object` — Value of the parameter where the error occurred
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `status` `integer<int64>` — HTTP status code
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

- one of: `ArhiveOrderError400`, `Response4XX`

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

result = api.get_v3_fbs_orders_archive(year=..., month=..., next=..., limit=...)
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

const { data } = await api.getV3FbsOrdersArchive(year, month, next, limit);
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

result, _, err := client.OrdersFbsAPI.GetV3FbsOrdersArchive(context.Background()).Year(year).Month(month).Next(next).Limit(limit).Execute()
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

System.out.println(api.getV3FbsOrdersArchive(year, month, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsOrdersArchive($year, $month, $next, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsOrdersArchive(year, month, next, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsOrdersArchive(year, month, next, limit));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_fbs_orders_archive(&cfg, year, month, next, limit).await;
    println!("{:#?}", result);
}
```

:::
