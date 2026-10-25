---
title: "Details for the Acquiring Expenses Reports by Report ID"
description: "Method is available by Personal token, Service token"
---

# Details for the Acquiring Expenses Reports by Report ID

```http
POST /api/finance/v1/acquiring/detailed/{reportId}
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Financial Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns details for the [acquiring expenses reports](https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/acquiring-reports) by report IDs.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst     |
| ------ | --------- | -------- | --------- |
| 1 min  | 1 request | 1 min    | 1 request |

## Parameters

| Name       | In   | Type             | Req. | Description |
| ---------- | ---- | ---------------- | ---- | ----------- |
| `reportId` | path | `integer<int64>` | yes  | Report ID   |

## Request body

`application/json` — schema `FinancialReportsDetailedReportIdReq`, required

- `limit` `integer<int64>` — Number of rows in the response
- `rrdId` `integer<int64>` — Response row ID. Required to get the report in parts. Start report uploading with `"rrdid":0`. In subsequent requests, specify the `rrdId` value from the last row of the previous response. Repeat the request until you get `204` response
- `fields` `string[]` — List of fields that will be returned in response. If the parameter is not specified, all fields are returned

## Responses

| Code  | Description       | Schema                                       |
| ----- | ----------------- | -------------------------------------------- |
| `200` | Success           | `PostV1AcquiringDetailedReportIdResponse200` |
| `204` | No data           | —                                            |
| `400` | Bad request       | `object`                                     |
| `401` | Unauthorized      | `object`                                     |
| `402` | Payment required  | `object`                                     |
| `403` | Access denied     | `Response4XX`                                |
| `404` | Not found         | `object`                                     |
| `429` | Too many requests | `object`                                     |

**Structure `200` — `AcquiringReportsDetailedRes[]`:**

- `rrdId` `integer<int64>` — Row ID
- `reportId` `integer<int64>` — Report ID
- `acqDate` `string` — Operation date
- `acquiringBank` `string` — Acquiring bank
- `tin` `string` — Taxpayer identification number
- `taxRegistrationReasonCode` `string` — Tax registration reason code
- `saleDate` `string` — Purchased on
- `srid` `string` — Order ID. In the responses of the [FBS](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders), [DBW](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), [DBS](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders), and [In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) assembly order methods, `srid` is `rid`
- `documentType` `string` — Purchased or returned
- `nmId` `integer<int64>` — WB item number
- `retailAmount` `string` — Sales on WB
- `acquiringFee` `string` — Acquiring fee including VAT
- `acquiringFeeVat` `string` — VAT amount
- `invoiceNumber` `string` — Invoice No.
- `invoiceDate` `string` — Invoice date
- `shkId` `integer<int64>` — Item No.
- `currency` `string` — Report currency

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

result = api.post_v1_acquiring_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
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

const { data } = await api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq);
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

result, _, err := client.FinancesAPI.PostV1AcquiringDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
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

System.out.println(api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1AcquiringDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1AcquiringDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = finances_api::post_v1_acquiring_detailed_report_id(&cfg, report_id, financial_reports_detailed_report_id_req).await;
    println!("{:#?}", result);
}
```

:::
