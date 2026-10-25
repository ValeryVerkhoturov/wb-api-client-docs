---
title: "Get Report"
description: "Returns a report on the brand share in sales. Data can be obtained starting from 1 November 2022, for up to 365 days."
---

# Get Report

```http
GET /api/v1/analytics/brand-share
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Share of Brand in Sales · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/shareOfBrandInSales/operation/getV1AnalyticsBrandShare)

Returns a report on the brand share in sales.
Data can be obtained starting from 1 November 2022, for up to 365 days.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst       |
| ---------------- | ------ | --------- | -------- | ----------- |
| Personal         | 5 s    | 1 request | 5 s      | 20 requests |
| Service          | 5 s    | 1 request | 5 s      | 20 requests |
| Base with secret | 5 s    | 1 request | 5 s      | 20 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request   |

## Parameters

| Name       | In    | Type             | Req. | Description        |
| ---------- | ----- | ---------------- | ---- | ------------------ |
| `parentId` | query | `integer<int64>` | yes  | Parent category ID |
| `brand`    | query | `string`         | yes  | Brand              |

## Responses

| Code  | Description       | Schema            |
| ----- | ----------------- | ----------------- |
| `200` | Success           | `object`          |
| `400` | Bad request       | `Http4XXResponse` |
| `401` | Unauthorized      | `object`          |
| `402` | Payment required  | `object`          |
| `403` | Access denied     | `object`          |
| `429` | Too many requests | `object`          |

**Structure `200`:**

- `report` `object[]` — Report
  - `applyDate` `string<ГГГГ-ММ-ДД>` — Date
  - `brandRating` `integer<int64>` — Brand rating in parent category
  - `pricePercent` `number<float>` — Share of sales in the parent category — price, %
  - `qtyPercent` `number<float>` — Share of sales in the parent category — quantity, %

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

result = api.get_v1_analytics_brand_share(parent_id=..., brand=..., date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsBrandShare(parentId, brand, dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1AnalyticsBrandShare(context.Background()).ParentId(parentId).Brand(brand).Execute()
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

System.out.println(api.getV1AnalyticsBrandShare(parentId, brand, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsBrandShare($parent_id, $brand, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsBrandShare(parentId, brand, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsBrandShare(parentId, brand, dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_analytics_brand_share(&cfg, parent_id, brand, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
