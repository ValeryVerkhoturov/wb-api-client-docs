---
title: "Warehouse Data"
description: "Forms a dataset for inventory by warehouses."
---

# Warehouse Data

```http
POST /api/v2/stocks-report/offices
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Stocks Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV2StocksReportOffices)

Forms a dataset for inventory by warehouses.

The data on the seller warehouses are in an aggregated form — for all of them together without detailing specific warehouses — and responses contain `"regionName":"Свой склад"` and `"offices":[]`.

The report data is updated once every 2 hours.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `TableShippingOfficeRequest`, required

- `nmIDs` `integer<int64>[]` — List of WB item numbers for filtering
- `subjectIDs` `integer<int32>[]` — List of subcategory IDs for filtering
- `brandNames` `string[]` — List of brands for filtering
- `tagIDs` `integer<int64>[]` — List of label IDs for filtering
- `currentPeriod` `PeriodInv` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 3 months from today
  - `end` `string` (required) — End date of the period. No earlier than 3 months from today
- `stockType` `StockType` (required)
- `skipDeletedNm` `boolean` (required) — Skip deleted items

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `PostV2StocksReportOfficesResponse200` |
| `400` | Bad request       | `ErrorObject400`                       |
| `401` | Unauthorized      | `object`                               |
| `402` | Payment required  | `object`                               |
| `403` | Access denied     | `ErrorObject403`                       |
| `429` | Too many requests | `object`                               |

**Structure `200`:**

- `data` `TableShippingOfficeResponse`
  - `regions` `TableShippingOfficeItem[]` — Set of data on shipping regions
    - `regionName` `string` — Shipping region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `Склад WB`, for WB warehouses
    - `metrics` `object` — Metrics by region
      - `stockCount` `integer<int64>` — Current inventory
      - `stockSum` `integer<int64>` — Current inventory value
      - `saleRate` `object` — Current DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `toClientCount` `integer<int64>` — On the way to user
      - `fromClientCount` `integer<int64>` — On the way from user
    - `offices` `object[]` — Warehouse data. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `[]`
      - `officeID` `integer<int64>` — Warehouse ID
      - `officeName` `string` — Warehouse name
      - `metrics` `object` — Warehouse metrics
        - `stockCount` `integer<int64>` — Current inventory
        - `stockSum` `integer<int64>` — Current inventory value
        - `saleRate` `object` — Current DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
          - `days` `integer<int32>` — Number of days
            - …
          - `hours` `integer<int32>` — Number of hours
            - …
        - `toClientCount` `integer<int64>` — On the way to user
        - `fromClientCount` `integer<int64>` — On the way from user
  - `currency` `Currency`

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `requestId` `string` — Unique request ID
- `origin` `string` — Internal WB service ID

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
- `requestId` `string` — Unique request ID
- `origin` `string` — Internal WB service ID

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
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v2_stocks_report_offices(table_shipping_office_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV2StocksReportOffices(tableShippingOfficeRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV2StocksReportOffices(context.Background()).TableShippingOfficeRequest(tableShippingOfficeRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV2StocksReportOffices(tableShippingOfficeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2StocksReportOffices($table_shipping_office_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2StocksReportOffices(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2StocksReportOffices(tableShippingOfficeRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_stocks_report_offices(&cfg, table_shipping_office_request).await;
    println!("{:#?}", result);
}
```

:::
