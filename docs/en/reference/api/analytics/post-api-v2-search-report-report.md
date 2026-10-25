---
title: "Main Page"
description: "Forms a dataset for the main report page with: - General information - Item positions - Data on visibility and transitions to the listing - Data for the table…"
---

# Main Page

```http
POST /api/v2/search-report/report
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Search Queries for Your Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport)

Forms a dataset for the main report page with:

- General information
- Item positions
- Data on visibility and transitions to the listing
- Data for the table by groups
  To get additional data in the table, use a separate request for:
- Pagination by groups
- Retrieval of items within a group
  Additional parameters for selecting the list of items in the table:
- `positionCluster` — average position in search
  The parameters `includeSubstitutedSKUs` and `includeSearchTexts` cannot both be set to `false`.

The report data is updated once every 2 hours.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Request body

`application/json` — schema `MainRequest`, required

- `currentPeriod` `Period` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 365 days from today
  - `end` `string` (required) — End date of the period. No earlier than 365 days from today
- `pastPeriod` `pastPeriod`
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 365 days from today
  - `end` `string` (required) — End date of the period. No later than the day before the start date `currentPeriod`. No earlier than 365 days from today
- `nmIds` `integer<int32>[]` — List of WB item numbers for filtering
- `subjectIds` `integer<int32>[]` — List of subcategory IDs for filtering
- `brandNames` `string[]` — List of brands for filtering
- `tagIds` `integer<int64>[]` — List of label IDs for filtering
- `positionCluster` `PositionCluster` (required)
- `orderBy` `OrderByMainAndDetails` (required)
  - `field` `string` = `avgPosition` | `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` | `visibility` | `minPrice` | `maxPrice` (required) — Field for sorting: - `avgPosition` — by average position - `addToCart` — by adds-to-Cart - `openCard` — by click-throughs - `orders` — by number of items ordered - `cartToOrder` — by conversion to order from search - `openToCart` — by conversion to cart from search - `visibility` — by item visibility - `minPrice` — by minimum price - `maxPrice` — by maximum price
  - `mode` `string` = `asc` | `desc` (required) — Order of sorting: - `asc` — ascending - `desc` — descending
- `includeSubstitutedSKUs` `boolean` — Show data for direct queries with [promo items](https://seller.wildberries.ru/help-center/article/A-524)
- `includeSearchTexts` `boolean` — Show data for search queries without promo items
- `limit` `integer<int64>` (required) — Number of item groups in the response
- `offset` `integer<int64>` (required) — From which element to start outputting data

## Responses

| Code  | Description       | Schema                                |
| ----- | ----------------- | ------------------------------------- |
| `200` | Success           | `PostV2SearchReportReportResponse200` |
| `400` | Bad request       | `ErrorObject400`                      |
| `401` | Unauthorized      | `object`                              |
| `402` | Payment required  | `object`                              |
| `403` | Access denied     | `ErrorObject403`                      |
| `429` | Too many requests | `object`                              |

**Structure `200`:**

- `data` `MainResponse`
  - `commonInfo` `CommonInfo`
    - `supplierRating` `object` — Seller rating
      - `current` `number<float64>` — Current seller rating
      - `dynamics` `number<float64>` — Dynamics compared to the previous period (%)
    - `advertisedProducts` `object` — Number of advertised items
      - `current` `integer<int64>` — Current number of advertised items
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `totalProducts` `integer<int64>` — Total number of items
  - `positionInfo` `PositionInfo`
    - `average` `object` — Average item position in search results
      - `current` `integer<int64>` — Current average item position
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `median` `object` — Median item position in search results
      - `current` `integer<int64>` — Current median item position
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `chartItems` `SearchReportPositionChartItem[]` — Data for the chart on the average and median position of the item in search results
      - `dt` `string` — Data
      - `average` `integer<int64>` — Average item position in search results
      - `median` `integer<int64>` — Median item position in search results
    - `clusters` `SearchReportPositionClusters`
      - `firstHundred` `object` — from 1 to 100
        - `current` `integer<int64>` — Current number of items
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `secondHundred` `object` — from 101 to 200
        - `current` `integer<int64>` — Current number of items
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `below` `object` — from 201 and below
        - `current` `integer<int64>` — Current number of items
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
  - `visibilityInfo` `VisibilityInfo`
    - `visibility` `object` — Probability percentage that a user will see the listing. Depends on the average position
      - `current` `integer<int64>` — Visibility in search results in the current period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `openCard` `object` — Click-throughs from search
      - `current` `integer<int64>` — Current click-throughs
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `byDay` `object[]` — Data for plotting a chart in the personal account on visibility and transitions to listings by day
      - `dt` `Date`
      - `visibility` `integer<int64>` — Listing visibility in search results, %
      - `open` `integer<int64>` — Number of transitions to the listing
    - `byWeek` `object[]` — Data for plotting a chart in the personal account on visibility and transitions to listings by week
      - `dt` `Date`
      - `visibility` `integer<int64>` — Listing visibility in search results, %
      - `open` `integer<int64>` — Number of transitions to the listing
    - `byMonth` `object[]` — Data for plotting a chart in the personal account on visibility and transitions to listings by month
      - `dt` `Date`
      - `visibility` `integer<int64>` — Listing visibility in search results, %
      - `open` `integer<int64>` — Number of transitions to the listing
  - `groups` `TableGroupItem[]` — Table elements list
    - `subjectName` `string` — Subcategory name
    - `subjectId` `integer<int64>` — Subcategory ID
    - `brandName` `string` — Brand
    - `tagName` `string` — Label name
    - `tagId` `integer<int64>` — Label ID
    - `metrics` `object` — Item metrics in the table
      - `avgPosition` `object` — Average item position in search results
        - `current` `integer<int64>` — Current average position
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `openCard` `object` — Click-throughs from search
        - `current` `integer<int64>` — Current click-throughs
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `addToCart` `object` — Adds-to-Cart from search
        - `current` `integer<int64>` — Current number
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `openToCart` `object` — Conversion to cart from search — the ratio of item additions to the cart compared to all transitions to the listing from the search
        - `current` `integer<int64>` — Current conversion
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `orders` `object` — Items ordered from search
        - `current` `integer<int64>` — Current number
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `cartToOrder` `object` — Conversion to order from search — the ratio of items ordered to all additions of the item from search to the cart
        - `current` `integer<int64>` — Current conversion
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `visibility` `object` — Item visibility percent in search results
        - `current` `integer<int64>` — Current visibility percent
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `items` `TableItem[]` — List of the group items
      - `nmId` `integer<int64>` — WB item number
      - `name` `string` — Item name
      - `vendorCode` `string` — Seller item number
      - `subjectName` `string` — Subcategory name
      - `brandName` `string` — Brand
      - `mainPhoto` `string` — URL of the main photo of the listing
      - `isAdvertised` `boolean` — Is the item being promoted in search results
      - `isSubstitutedSKU` `boolean` — If the item was searched by the promo item. The field will be in the response if the request contains `includeSubstitutedSKUs` and/or `includeSearchTexts`
      - `isCardRated` `boolean` — If the listing has a rating
      - `rating` `number<float64>` — Listing rating
      - `feedbackRating` `number<float64>` — Feedbacks rating
      - `price` `object` — Price
        - `minPrice` `integer<int64>` — Minimal price
        - `maxPrice` `integer<int64>` — Maximal price
      - `avgPosition` `object` — Average item position in search results
        - `current` `integer<int64>` — Current average position
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `openCard` `object` — Click-throughs from search
        - `current` `integer<int64>` — Current click-throughs
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `addToCart` `object` — Adds-to-Cart from search
        - `current` `integer<int64>` — Current number
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `openToCart` `object` — Conversion to cart from search — the ratio of item additions to the cart compared to all transitions to the listing from the search
        - `current` `integer<int64>` — Current conversion
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `orders` `object` — Items ordered from search
        - `current` `integer<int64>` — Current number
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `cartToOrder` `object` — Conversion to order from search — the ratio of items ordered to all additions of the item from search to the cart
        - `current` `integer<int64>` — Current conversion
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `visibility` `object` — Item visibility percent in search results
        - `current` `integer<int64>` — Current visibility percent
        - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
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

result = api.post_v2_search_report_report(main_request=...)
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

const { data } = await api.postV2SearchReportReport(mainRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportReport(context.Background()).MainRequest(mainRequest).Execute()
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

System.out.println(api.postV2SearchReportReport(mainRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportReport($main_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportReport(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportReport(mainRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_search_report_report(&cfg, main_request).await;
    println!("{:#?}", result);
}
```

:::
