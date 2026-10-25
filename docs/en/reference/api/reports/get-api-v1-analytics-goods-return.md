---
title: "Get Report"
description: "The method will be disabled on October 26"
---

# Get Report

```http
GET /api/v1/analytics/goods-return
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Returns and Item Movement Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1AnalyticsGoodsReturn)

The method will be disabled on [October 26](https://dev.wildberries.ru/en/release-notes?id=577)

## Parameters

| Name       | In    | Type     | Req. | Description                            |
| ---------- | ----- | -------- | ---- | -------------------------------------- |
| `dateFrom` | query | `string` | yes  | Beginning date of the reporting period |
| `dateTo`   | query | `string` | yes  | End date of the reporting period       |

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `GetV1AnalyticsGoodsReturnResponse200` |
| `400` | Bad request       | `Http4XXResponse`                      |
| `401` | Unauthorized      | `object`                               |
| `402` | Payment required  | `object`                               |
| `403` | Access denied     | `object`                               |
| `429` | Too many requests | `object`                               |

**Structure `200`:**

- `report` `object[]` — Report
  - `barcode` `string` — SKU
  - `brand` `string` — Brand
  - `completedDt` `string` — Date and time the seller received return
  - `dstOfficeAddress` `string` — Address of pick-up point where the seller receives returns
  - `dstOfficeId` `integer<int64>` — ID of pick-up point where the seller receives returns
  - `expiredDt` `string` — Expiration date and time of the storage period
  - `isStatusActive` `integer<int64>` = `0` | `1` — Type of return status: * `0` — archive * `1` — active
  - `nmId` `integer<int64>` — WB item number
  - `orderDt` `string` — Date of the return order
  - `orderId` `integer<int64>` — Assembly order number
  - `readyToReturnDt` `string` — Date and time when the return is ready for delivery
  - `reason` `string` — The reason for the return
  - `returnType` `string` — Return type
  - `shkId` `integer<int64>` — Item No.
  - `srid` `string` — The unique ID of the return order
  - `status` `string` — Return status
  - `stickerId` `string` — Sticker of the return order
  - `subjectName` `string` — Subcategory name
  - `techSize` `string` — Size

**Structure `400`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
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

result = api.get_v1_analytics_goods_return(date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsGoodsReturn(dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1AnalyticsGoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsGoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsGoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_analytics_goods_return(&cfg, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
