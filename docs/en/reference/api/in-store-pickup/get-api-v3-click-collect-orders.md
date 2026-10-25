---
title: "Get Information on Completed Orders"
description: "The method provides information on completed assembly orders after the sale or cancellation of an order. You can get data for a specified period, maximum of 30…"
---

# Get Information on Completed Orders

```http
GET /api/v3/click-collect/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrders)

The method provides information on completed assembly orders after the sale or cancellation of an order.
You can get data for a specified period, maximum of 30 calendar days per request.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **In-Store Pickup assembly orders** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                                                                              |
| ---------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`    | query | `integer<int64>` | yes  | Number of items in the response                                                                                                                          |
| `next`     | query | `integer<int64>` | yes  | Pagination parameter. To get the full list of data, specify 0 in the first request. To get the next data package, use the `next` value from the response |
| `dateFrom` | query | `integer<int64>` | yes  | Period start date in the Unix timestamp format                                                                                                           |
| `dateTo`   | query | `integer<int64>` | yes  | Period end date in the Unix timestamp format                                                                                                             |

## Responses

| Code  | Description       | Schema       |
| ----- | ----------------- | ------------ |
| `200` | Success           | `api.Orders` |
| `400` | Bad request       | `Error`      |
| `401` | Unauthorized      | `object`     |
| `402` | Payment required  | `object`     |
| `403` | Access denied     | `Error`      |
| `429` | Too many requests | `object`     |

**Structure `200`:**

- `next` `integer<int64>` — Pagination parameter. Contains the value which should be specified in the request to retrieve the next batch of data
- `orders` `api.Order[]` — Assembly orders list
  - `article` `string` — Seller item number
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Type of cargo: - `1` — small-sized items - `2` — over dimensional cargo (ODC) - `3` — dimensional cargo+ (CD+)
  - `chrtId` `integer<int64>` — Item size ID in WB systems
  - `createdAt` `string` — Date and time the assembly order was created
  - `price` `integer<int64>` — The price in the currency of sale including all discounts, except WB Wallet discount, multiplied by 100. You can find a currency code in the `currencyCode`. Provided for informational purposes only
  - `finalPrice` `integer<int64>` — The sum charged to the buyer in the currency of sale including all discounts, multiplied by 100. You can find a currency code in the `currencyCode` field. Provided for informational purposes only. Use the value of the `finalPrice` field only if the response of the method [POST /api/marketplace/v3/click-collect/orders/final-price](https://dev.wildberries.ru/openapi/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice) returned `"data": null`. In all other cases, use the value of the `originalFinalPrice` field from the response of the specified methodd
  - `convertedPrice` `integer<int64>` — The price in the currency of the seller country including all discounts, except WB Wallet discount, multiplied by 100. You can find a currency code in the `currencyCode` field. Provided for informational purposes only
  - `convertedFinalPrice` `integer<int64>` — The sum charged to the buyer in the currency of the seller country including all discounts, multiplied by 100. Provided for informational purposes only. Use the value of the `convertedFinalPrice` field only if the response of the method [POST /api/marketplace/v3/click-collect/orders/final-price](https://dev.wildberries.ru/openapi/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice) returned `"data": null`. In all other cases, use the value of the `convertedOriginalFinalPrice` field from the response of the same method
  - `currencyCode` `integer<ISO 4217>` — Sale currency code
  - `convertedCurrencyCode` `integer<ISO 4217>` — Seller country currency code
  - `id` `integer<int64>` — Assembly order ID
  - `isZeroOrder` `boolean` — Indicator of an order for a item with zero inventory: - `false` — the order is made for a item with a non-zero inventory - `true` — the order is made for a item with zero inventory. Such an order can be canceled without a cancellation fee
  - `nmId` `integer<int64>` — WB item number
  - `orderCode` `string` — Unique buyer order ID
  - `payMode` `string` — Pay mode: - `prepaid` — prepaid - `postpaid` — postpaid - `unknown` — unknown
  - `rid` `string` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `skus` `string[]` — Item SKU array
  - `warehouseAddress` `string` — Store address (seller warehouse) where the assembly order was received
  - `warehouseId` `integer<int64>` — Seller warehouse ID where the assembly order was received
  - `tireService` `boolean` — Whether the buyer indicated that he needs a tire service: - `false` — no, tire service is not needed - `true` — yes, tire service is needed
  - `options` `object` — Order options
    - `isB2b` `boolean` — Indicator of a B2B sale: - `false` — not B2B sale - `true` — B2B sale

**Structure `400`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data enriching the error

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
- `data` `object` — Additional data enriching the error

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

result = api.get_v3_click_collect_orders(limit=..., next=..., date_from=..., date_to=...)
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

const { data } = await api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo);
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

result, _, err := client.InStorePickupAPI.GetV3ClickCollectOrders(context.Background()).Limit(limit).Next(next).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->getV3ClickCollectOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = in_store_pickup_api::get_v3_click_collect_orders(&cfg, limit, next, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
