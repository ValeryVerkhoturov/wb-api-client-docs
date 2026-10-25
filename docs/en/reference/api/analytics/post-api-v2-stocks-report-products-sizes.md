---
title: "Size Data"
description: "Forms a dataset for inventory by the size of the item."
---

# Size Data

```http
POST /api/v2/stocks-report/products/sizes
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Stocks Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV2StocksReportProductsSizes)

Forms a dataset for inventory by the size of the item.

Possible cases:

1. The item has dimensions and `"includeOffice":true`, then the response body will contain data on the inventory for each of the sizes with nested details by warehouse.
2. The item has dimensions and `"includeOffice":false`, then the response body will contain data on the inventory for each of the sizes without nested details by warehouse.
3. The item has no size and `"include Office":true`, then the response body will contain details by warehouse without data on the inventory for each of the sizes.
4. The item has no size and `"include Office":false`, then the response body will be empty.
   `The item has no size` means the size of the item is the same and has `"techSize":"0"`. In responses of the method for getting data on [items](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport/operation/postV2StocksReportProductsProducts), such items have `hasSizes':false`.

The data on the seller warehouses are in an aggregated form — for all of them together without detailing specific warehouses — and responses contain `"regionName":"Свой склад"` and `"officeName":""` in such cases.

The report data is updated once every 2 hours.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `TableSizeRequest`, required

- `nmID` `integer<int64>` (required) — WB item number
- `currentPeriod` `PeriodInv` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 3 months from today
  - `end` `string` (required) — End date of the period. No earlier than 3 months from today
- `stockType` `StockType` (required)
- `orderBy` `TableOrderBy` (required)
  - `field` `TableGroupField` (required)
  - `mode` `OrderByMode` (required)
- `includeOffice` `boolean` (required) — Include warehouse details

## Responses

| Code  | Description       | Schema                                       |
| ----- | ----------------- | -------------------------------------------- |
| `200` | Success           | `PostV2StocksReportProductsSizesResponse200` |
| `400` | Bad request       | `ErrorObject400`                             |
| `401` | Unauthorized      | `object`                                     |
| `402` | Payment required  | `object`                                     |
| `403` | Access denied     | `ErrorObject403`                             |
| `429` | Too many requests | `object`                                     |

**Structure `200`:**

- `data` `TableSizeResponse`
  - `offices` `TableOfficeItem[]` — Set of warehouse data
    - `regionName` `string` — Shipping region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `Склад WB`, for WB warehouses
    - `officeID` `integer<int64>` — Warehouse ID. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `-999999`, for WB warehouses
    - `officeName` `string` — Warehouse name. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `""`, for WB warehouses
    - `metrics` `object` — Warehouse metrics
      - `ordersCount` `integer<int64>` — Items ordered
      - `ordersSum` `integer<int64>` — Total order value
      - `avgOrders` `number<float64>` — Average daily orders
      - `avgOrdersByMonth` `FloatGraphByPeriodItem[]` — Average monthly orders
        - `start` `string` — Beginning of the month
        - `end` `string` — End of the month
        - `value` `number<float64>` — Average items ordered
      - `buyoutCount` `integer<int64>` — Items purchased
      - `buyoutSum` `integer<int64>` — Total purchase value
      - `buyoutPercent` `integer<int64>` — Purchase rate
      - `stockCount` `integer<int64>` — Current inventory
      - `stockSum` `integer<int64>` — Current inventory value
      - `saleRate` `object` — Current DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `avgStockTurnover` `object` — Average DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `toClientCount` `integer<int64>` — On the way to user
      - `fromClientCount` `integer<int64>` — On the way from user
      - `officeMissingTime` `object` — Out-of-stock time. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration 4) `"hours":-4` — absence during the entire period
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `lostOrdersCount` `number<float64>` — Lost orders. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostOrdersSum` `number<float64>` — Lost order value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostBuyoutsCount` `number<float64>` — Lost sales. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostBuyoutsSum` `number<float64>` — Lost sales value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
  - `sizes` `object[]` — Set of data on the size of item
    - `name` `string` — Size name
    - `chrtID` `integer<int64>` — Size ID
    - `offices` `TableOfficeItem[]` — Warehouses
      - `regionName` `string` — Shipping region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `Склад WB`, for WB warehouses
      - `officeID` `integer<int64>` — Warehouse ID. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `-999999`, for WB warehouses
      - `officeName` `string` — Warehouse name. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `""`, for WB warehouses
      - `metrics` `object` — Warehouse metrics
        - `ordersCount` `integer<int64>` — Items ordered
        - `ordersSum` `integer<int64>` — Total order value
        - `avgOrders` `number<float64>` — Average daily orders
        - `avgOrdersByMonth` `FloatGraphByPeriodItem[]` — Average monthly orders
          - `start` `string` — Beginning of the month
            - …
          - `end` `string` — End of the month
            - …
          - `value` `number<float64>` — Average items ordered
            - …
        - `buyoutCount` `integer<int64>` — Items purchased
        - `buyoutSum` `integer<int64>` — Total purchase value
        - `buyoutPercent` `integer<int64>` — Purchase rate
        - `stockCount` `integer<int64>` — Current inventory
        - `stockSum` `integer<int64>` — Current inventory value
        - `saleRate` `object` — Current DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
          - `days` `integer<int32>` — Number of days
            - …
          - `hours` `integer<int32>` — Number of hours
            - …
        - `avgStockTurnover` `object` — Average DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
          - `days` `integer<int32>` — Number of days
            - …
          - `hours` `integer<int32>` — Number of hours
            - …
        - `toClientCount` `integer<int64>` — On the way to user
        - `fromClientCount` `integer<int64>` — On the way from user
        - `officeMissingTime` `object` — Out-of-stock time. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration 4) `"hours":-4` — absence during the entire period
          - `days` `integer<int32>` — Number of days
            - …
          - `hours` `integer<int32>` — Number of hours
            - …
        - `lostOrdersCount` `number<float64>` — Lost orders. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
        - `lostOrdersSum` `number<float64>` — Lost order value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
        - `lostBuyoutsCount` `number<float64>` — Lost sales. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
        - `lostBuyoutsSum` `number<float64>` — Lost sales value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
    - `metrics` `object` — Size metrics
      - `ordersCount` `integer<int64>` — Items ordered
      - `ordersSum` `integer<int64>` — Total order value
      - `avgOrders` `number<float64>` — Average daily orders
      - `avgOrdersByMonth` `FloatGraphByPeriodItem[]` — Average monthly orders
        - `start` `string` — Beginning of the month
        - `end` `string` — End of the month
        - `value` `number<float64>` — Average items ordered
      - `buyoutCount` `integer<int64>` — Items purchased
      - `buyoutSum` `integer<int64>` — Total purchase value
      - `buyoutPercent` `integer<int64>` — Purchase rate
      - `stockCount` `integer<int64>` — Current inventory
      - `stockSum` `integer<int64>` — Current inventory value
      - `saleRate` `object` — Current DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `avgStockTurnover` `object` — Average DSI. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `toClientCount` `integer<int64>` — On the way to user
      - `fromClientCount` `integer<int64>` — On the way from user
      - `officeMissingTime` `object` — Out-of-stock time. Special cases: 1) `"hours":-1` — infinite duration 2) `"hours":-2` — zero duration 3) `"hours":-3` — uncalculated duration 4) `"hours":-4` — absence during the entire period
        - `days` `integer<int32>` — Number of days
        - `hours` `integer<int32>` — Number of hours
      - `lostOrdersCount` `number<float64>` — Lost orders. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostOrdersSum` `number<float64>` — Lost order value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostBuyoutsCount` `number<float64>` — Lost sales. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `lostBuyoutsSum` `number<float64>` — Lost sales value. Special cases: 1. Value less than `0` and is not `-2` — the value is not calculated 2. Value is `-2` — zero value
      - `currentPrice` `object` — Current price
        - `minPrice` `integer<int64>` — Minimal seller price with seller discount (excluding WB Club discount)
        - `maxPrice` `integer<int64>` — Maximal seller price with seller discount (excluding WB Club discount)
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

result = api.post_v2_stocks_report_products_sizes(table_size_request=...)
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

const { data } = await api.postV2StocksReportProductsSizes(tableSizeRequest);
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

result, _, err := client.AnalyticsAPI.PostV2StocksReportProductsSizes(context.Background()).TableSizeRequest(tableSizeRequest).Execute()
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

System.out.println(api.postV2StocksReportProductsSizes(tableSizeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2StocksReportProductsSizes($table_size_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2StocksReportProductsSizes(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2StocksReportProductsSizes(tableSizeRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_stocks_report_products_sizes(&cfg, table_size_request).await;
    println!("{:#?}", result);
}
```

:::
