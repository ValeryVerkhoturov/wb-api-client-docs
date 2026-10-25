---
title: "Sales"
description: "The method returns purchase and return information. The data updated every 30 minutes."
---

# Sales

```http
GET /api/v1/supplier/sales
```

**Base URL:** `https://statistics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Main Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/mainReports/operation/getV1SupplierSales)

The method returns purchase and return information.
The data updated every 30 minutes.

1 line means 1 purchase/return and means 1 item.
The `srid` field should be used to identify the order.

Data storage is guaranteed for no more than 90 days from the date of sale.

The data in this report is preliminary and is used for operational monitoring

- The responses do not include orders for which payment was not confirmed, even if these orders are in details for the realization reports. For example, it could be orders with delayed payments or installment payments
- The values of the `priceWithDisc` and `forPay` fields are calculated using a simplified logic and may differ from `retail\_price\_withdisc\_rub` and `ppvz\_for\_pay`, respectively, in details for the realization reports
- The fields `finishedPrice`, `priceWithDisc`, and `forPay` may temporarily have the value `0`: data is filled in asynchronously and updated within 24 hours
- For orders that are paid in a currency other than the seller currency, prices may be rounded due to currency conversion
  Use [details for the realization reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports) for accurate financial calculations, reconciliation, and reporting.

For a single response to a request with `flag=0` or without `flag`, a conditional limit of 80,000 rows is set. Therefore, more than one request may be necessary to retrieve all purchases and returns. In the second and subsequent requests, use the full value of the `lastChangeDate` field of the last row from the response of the previous request in the `dateFrom` parameter.
If the response returns an empty array `[]`, all sales and returns have already been retrieved.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst     |
| ---------------- | ------ | --------- | -------- | --------- |
| Personal         | 1 min  | 1 request | 1 min    | 1 request |
| Service          | 1 min  | 1 request | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request | 1 min    | 1 request |
| Base             | 2 h    | 1 request | 2 h      | 1 request |

## Parameters

| Name       | In    | Type     | Req. | Description                                                                                                                                                                                                                                                                                                             |
| ---------- | ----- | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string` | yes  | Date and time of last change on the purchase/return. Date format: RFC3339. You may send date or date with time. Time could be specified in seconds or milliseconds. The time stands in Moscow time zone (UTC+3). Examples: - `2019-06-20` - `2019-06-20T23:59:59` - `2019-06-20T00:00:00.12345` - `2017-03-25T00:00:00` |

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `GetV1SupplierSalesResponse200` |
| `400` | Bad request       | `object`                        |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `object`                        |
| `429` | Too many requests | `object`                        |

**Structure `200` — `SalesItem[]`:**

- `date` `string` — Date and time of sale. This field equals to `dateFrom` in request if `flag`=1. If the time zone is not specified, then Moscow time (UTC+3) is taken
- `lastChangeDate` `string` — Date and time of refreshing info of service. This field corresponds to the `dateFrom` parameter in the request if the `flag`=0 parameter exist or not specified. If the time zone is not specified, then Moscow time (UTC+3) is taken
- `warehouseName` `string` — Shipping warehouse
- `warehouseType` `string` = `Склад WB` | `Склад продавца` — Type of items storage warehouse: - `Склад WB` — WB warehouse - `Склад продавца` — seller warehouse
- `countryName` `string` — Country
- `oblastOkrugName` `string` — Area
- `regionName` `string` — Region
- `supplierArticle` `string` — Seller item number
- `nmId` `integer<int64>` — WB item number
- `barcode` `string` — SKU
- `category` `string` — Category
- `subject` `string` — Subcategory
- `brand` `string` — Brand
- `techSize` `string` — Item size
- `incomeID` `integer<int64>` — Supply number
- `isSupply` `boolean` — Supply contract
- `isRealization` `boolean` — Implementation contract
- `totalPrice` `number` — Price without discounts
- `discountPercent` `integer<int64>` — Seller discount, %
- `spp` `number` — WB discount, %
- `paymentSaleAmount` `integer<int64>` — Discount for payment with WB Wallet, ₽
- `forPay` `number` — To transfer to the seller. Data synchronization takes up to 24 hours, during which time the value `0` can be displayed in the field
- `finishedPrice` `number` — Price with all discounts. Data synchronization takes up to 24 hours, during which time the value `0` can be displayed in the field
- `priceWithDisc` `number` — Price with seller discount, including WB Club discount, from which the amount to be transferred to the seller `forPay` is calculated. Data synchronization takes up to 24 hours, during which time the value `0` can be displayed in the field
- `saleID` `string` — The unique ID of the purchase/return. - `S**********` — purchase - `R**********` — return (to WB warehouse)
- `sticker` `string` — sticker ID
- `gNumber` `string` — Buyer cart ID. Orders within a single transaction will have the same `gNumber`
- `srid` `string` — Unique order ID. Note for those working with Marketplace API: `srid` equals `rid` in response of orders methods

**Structure `400`:**

- one of: `responseErrorStatistics`, `responseErrorStatistics2`

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

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

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
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_supplier_sales(date_from=..., flag=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1SupplierSales(dateFrom, flag);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1SupplierSales(context.Background()).DateFrom(dateFrom).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.ReportsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1SupplierSales(dateFrom, flag));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1SupplierSales($date_from));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1SupplierSales(dateFrom).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1SupplierSales(dateFrom));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_supplier_sales(&cfg, date_from, flag).await;
    println!("{:#?}", result);
}
```

:::
