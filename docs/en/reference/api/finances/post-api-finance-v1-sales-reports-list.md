---
title: "Sales Reports List"
description: "Method is available by Personal token, Service token"
---

# Sales Reports List

```http
POST /api/finance/v1/sales-reports/list
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Financial Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsList)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns sales reports list in the [report table](https://seller.wildberries.ru/suppliers-mutual-settlements) format.

The list contains data since January 29, 2024.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst     |
| ------ | --------- | -------- | --------- |
| 1 min  | 1 request | 1 min    | 1 request |

## Request body

`application/json` — schema `SalesReportListReq`, required

- `dateFrom` `string` (required) — Report start date. Date in the [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) format. You may send date or date with time. Time could be specified in seconds or milliseconds. The time stands in Moscow time zone `UTC+3`. Examples: - `2025-06-20` - `2025-06-20T23:59:59` - `2025-06-20T00:00:00.12345` - `2025-06-25T00:00:00`
- `dateTo` `string` (required) — Report end date. Date in the [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) format. You may send date or date with time. Time could be specified in seconds or milliseconds. The time stands in Moscow time zone `UTC+3`. Examples: - `2025-06-20` - `2025-06-20T23:59:59` - `2025-06-20T00:00:00.12345` - `2025-06-20T00:00:00`
- `limit` `integer<int64>` — Number of reports in the response
- `offset` `integer<int64>` — How many results to skip. For example, with value `10`, the response will start with the 11 element
- `period` `string` = `daily` | `weekly` — Report periodicity: - `weekly` - `daily`

## Responses

| Code  | Description       | Schema                              |
| ----- | ----------------- | ----------------------------------- |
| `200` | Success           | `PostV1SalesReportsListResponse200` |
| `204` | No data           | —                                   |
| `400` | Bad request       | `object`                            |
| `401` | Unauthorized      | `object`                            |
| `403` | Access denied     | `Response4XX`                       |
| `429` | Too many requests | `object`                            |

**Structure `200` — `SalesReportListRes[]`:**

- `reportId` `integer<int64>` — Report ID
- `sellerFinanceName` `string` — Seller name
- `dateFrom` `string` — Reporting period start date
- `dateTo` `string` — Reporting period end date
- `createDate` `string` — Report date
- `currency` `string` — Report currency
- `reportType` `integer<int64>` = `1` | `2` — Report type: - `1` — general - `2` — by purchase
- `retailAmountSum` `string` — Sales
- `forPaySum` `string` — Net revenue
- `avgSalePercent` `number` — Agreed discount (%)
- `deliveryServiceSum` `string` — Logistics cost
- `paidStorageSum` `string` — Storage cost
- `paidAcceptanceSum` `string` — Acceptance cost
- `deductionSum` `string` — Other deductions and payments
- `penaltySum` `string` — Total penalties
- `additionalPaymentSum` `string` — WB fee adjustment
- `cashbackAmountSum` `string` — Amount of rewards deducted for Loyalty Program
- `cashbackDiscountSum` `string` — Loyalty Program discount compensation
- `cashbackCommissionChangeSum` `string` — Loyalty Program participation cost
- `paymentSchedule` `string` — One-time payment period change
- `bankPaymentSum` `string` — Total

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
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_list(sales_report_list_req=...)
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

const { data } = await api.postV1SalesReportsList(salesReportListReq);
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

result, _, err := client.FinancesAPI.PostV1SalesReportsList(context.Background()).SalesReportListReq(salesReportListReq).Execute()
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

System.out.println(api.postV1SalesReportsList(salesReportListReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsList($sales_report_list_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsList(salesReportListReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = finances_api::post_v1_sales_reports_list(&cfg, sales_report_list_req).await;
    println!("{:#?}", result);
}
```

:::
