---
title: "Details for the Sales Reports by Report ID"
description: "Method is available by Personal token, Service token"
---

# Details for the Sales Reports by Report ID

```http
POST /api/finance/v1/sales-reports/detailed/{reportId}
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Financial Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns details for the [sales reports](https://seller.wildberries.ru/suppliers-mutual-settlements) by report IDs.

The data is available since January 29, 2024.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst     |
| ------ | --------- | -------- | --------- |
| 1 min  | 1 request | 1 min    | 1 request |

## Parameters

| Name       | In   | Type             | Req. | Description                                                                                                                                                                   |
| ---------- | ---- | ---------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reportId` | path | `integer<int64>` | yes  | Report ID. For daily reports, we recommend using non-standard libraries with [BigInt](https://www.npmjs.com/package/json-bigint) support, instead of standard deserialization |

## Request body

`application/json` — schema `FinancialReportsDetailedReportIdReq`, required

- `limit` `integer<int64>` — Number of rows in the response
- `rrdId` `integer<int64>` — Response row ID. Required to get the report in parts. Start report uploading with `"rrdid":0`. In subsequent requests, specify the `rrdId` value from the last row of the previous response. Repeat the request until you get `204` response
- `fields` `string[]` — List of fields that will be returned in response. If the parameter is not specified, all fields are returned

## Responses

| Code  | Description       | Schema                                          |
| ----- | ----------------- | ----------------------------------------------- |
| `200` | Success           | `PostV1SalesReportsDetailedReportIdResponse200` |
| `204` | No data           | —                                               |
| `400` | Bad request       | `object`                                        |
| `401` | Unauthorized      | `object`                                        |
| `402` | Payment required  | `object`                                        |
| `403` | Access denied     | `Response4XX`                                   |
| `404` | Not found         | `object`                                        |
| `429` | Too many requests | `object`                                        |

**Structure `200` — `SalesReportsDetailedRes[]`:**

- `reportId` `integer<int64>` — Report ID
- `dateFrom` `string` — Reporting period start date
- `dateTo` `string` — Reporting period end date
- `createDate` `string` — Report date
- `currency` `string` — Report currency
- `reportType` `integer<int64>` = `1` | `2` — Report type: - `1` — general - `2` — purchase
- `rrdId` `integer<int64>` — Row ID
- `giId` `integer<int64>` — Shipment ID
- `dlvPrc` `number` — Fixed warehouse multiplier for shipments
- `fixTariffDateFrom` `string` — Warehouse multiplier fixed on
- `fixTariffDateTo` `string` — Warehouse multiplier fixed until
- `subjectName` `string` — Subcategory
- `nmId` `integer<int64>` — WB item number
- `brandName` `string` — Brand
- `vendorCode` `string` — Seller item number
- `title` `string` — Item name
- `techSize` `string` — Size
- `sku` `string` — SKU
- `docTypeName` `string` — Purchased or returned
- `quantity` `integer<int64>` — Number of purchases and returns
- `retailPrice` `string` — Retail price
- `retailAmount` `string` — Sales on WB
- `salePercent` `integer<int64>` — Agreed seller discount (%)
- `commissionPercent` `number` — WB fee rate (%)
- `officeName` `string` — Warehouse
- `sellerOperName` `string` — Deduction reason
- `orderDt` `string` — Ordered on
- `saleDt` `string` — Purchased on
- `rrDate` `string` — Operation date
- `shkId` `integer<int64>` — Item No.
- `retailPriceWithDisc` `string` — Price with applied agreed discount
- `deliveryAmount` `integer<int64>` — Number of deliveries
- `returnAmount` `integer<int64>` — Number of returns
- `deliveryService` `string` — Delivery to user
- `giBoxTypeName` `string` — Type of boxes
- `productDiscountForReport` `number` — Final agreed discount (%)
- `sellerPromo` `number` — Promo code (%)
- `spp` `number` — WB discount (%)
- `kvwBase` `number` — VAT-exempt WB fee rate (%)
- `kvw` `number` — Final VAT-exempt WB fee rate (%)
- `supRatingUp` `number` — WB fee rate reduction due to rating (%)
- `isKgvpV2` `number` — WB fee rate reduction due to promos (%)
- `ppvzSalesCommission` `string` — VAT-exempt WB fee excluding attorney service cost
- `forPay` `string` — Net revenue for sold items
- `ppvzReward` `string` — Pickup point handover and return fee
- `acquiringFee` `string` — Compensation for payment services/payment services integration fee
- `acquiringPercent` `number` — Compensation amount for payment services/payment services integration fee amount (%)
- `paymentProcessing` `string` — Payment type: Compensation for payment services/payment services integration fee
- `acquiringBank` `string` — Acquiring bank
- `vw` `string` — VAT-exempt WB fee
- `vwNds` `string` — VAT on WB fee
- `ppvzOfficeName` `string` — Pickup point details
- `ppvzOfficeId` `integer<int64>` — Pickup point ID
- `ppvzSupplierName` `string` — Pickup point name
- `ppvzSupplierInn` `string` — Pickup point TIN
- `declarationNumber` `string` — Cargo Customs Declaration No.
- `bonusTypeName` `string` — Deduction reason
- `stickerId` `string` — FBS sticker
- `country` `string` — Delivery country
- `srvDbs` `boolean` — Paid delivery
- `penalty` `string` — Total penalties
- `additionalPayment` `string` — WB fee adjustment
- `rebillLogisticCost` `string` — Delivery and warehouse fee
- `rebillLogisticOrg` `string` — Carrier
- `paidStorage` `string` — Storage
- `deduction` `string` — Deductions/payments
- `paidAcceptance` `string` — Acceptance expenses
- `orderId` `integer<int64>` — Assembly order ID
- `kiz` `string` — Labeling code [Chestny ZNAK](https://chestnyznak.ru/en)
- `isB2b` `boolean` — B2B sale
- `trbxId` `string` — Master case ID
- `installmentCofinancingAmount` `string` — Co-financing discount
- `wibesDiscountPercent` `number` — Wibes discount (%)
- `cashbackAmount` `string` — Amount of rewards deducted for Loyalty Program
- `cashbackDiscount` `string` — Loyalty Program discount compensation
- `cashbackCommissionChange` `string` — Loyalty program participation cost
- `paymentSchedule` `string` — One-time payment period change
- `deliveryMethod` `string` — Sales model and item type
- `sellerPromoId` `integer<int64>` — Custom promo discount ID
- `sellerPromoDiscount` `number` — Custom promo discount (%)
- `loyaltyId` `integer<int64>` — Loyalty discount ID
- `loyaltyDiscount` `number` — Loyalty discount (%)
- `uuidPromocode` `string` — Promo code ID
- `salePricePromocodeDiscountPrc` `number` — Promo code discount (%)
- `articleSubstitution` `string` — Promo item number ID
- `salePriceAffiliatedDiscountPrc` `number` — Promo item number discount (%)
- `agencyVat` `number` — Tax agent VAT withholding (%). Only for sellers from Kyrgyzstan
- `salePriceWholesaleDiscountPrc` `number` — Wholesale discount for businesses (%)
- `b2bCustomerTin` `string` — Taxpayer identification number of B2B buyer
- `paidWithSocialCertificate` `boolean` — Paid with social voucher
- `warehouseLogisticsCoeff` `number` — Logistics multiplier
- `buyerTaxRegistrationReasonCode` `string` — Tax registration reason code of B2B-buyer
- `utdUcdNumber` `string` — Universal transfer or adjustment document number
- `utdUcdDate` `string` — Universal transfer or adjustment document date
- `orderUid` `string` — Cart ID. Orders in the same buyer's cart will have the same `orderUid`
- `srid` `string` — Order ID. In the responses of the [FBS](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders), [DBW](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), [DBS](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders), and [In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) assembly order methods, `srid` is `rid`

**Structure `400`:**

- `status` `integer<int64>` (required) — HTTP status code
- `title` `string` (required) — Error title
- `detail` `string` (required) — Error details
- `requestId` `string` (required) — Request ID
- `origin` `string` (required) — WB internal service ID

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

**Structure `404`:**

- `status` `integer<int64>` (required) — HTTP status code
- `title` `string` (required) — Error title
- `detail` `string` (required) — Error details
- `requestId` `string` (required) — Request ID
- `origin` `string` (required) — WB internal service ID

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
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FinancesApi(cfg);

const { data } = await api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.PostV1SalesReportsDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = finances_api::post_v1_sales_reports_detailed_report_id(&cfg, report_id, financial_reports_detailed_report_id_req).await;
    println!("{:#?}", result);
}
```

:::
