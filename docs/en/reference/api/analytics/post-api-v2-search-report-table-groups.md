---
title: "Pagination by Groups"
description: "Pagination by groups in the report. It is possible only if there is a filter by brand, subcategory, or label. Additional parameters for selecting the list of…"
---

# Pagination by Groups

```http
POST /api/v2/search-report/table/groups
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Search Queries for Your Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableGroups)

Pagination by groups in the report. It is possible only if there is a filter by brand, subcategory, or label.
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

`application/json` — schema `TableGroupRequest`, required

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
- `orderBy` `OrderByGrTe` (required)
  - `field` `string` = `avgPosition` | `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` | `visibility` (required) — Field for sorting: - `avgPosition` — by average position - `addToCart` — by adds-to-Cart - `openCard` — by click-throughs - `orders` — by number of items ordered - `cartToOrder` — by conversion to order from search - `openToCart` — by conversion to cart from search - `visibility` — by item visibility
  - `mode` `string` = `asc` | `desc` (required) — Order of sorting: - `asc` — ascending - `desc` — descending
- `positionCluster` `PositionCluster` (required)
- `includeSubstitutedSKUs` `boolean` — Show data for direct queries with [promo items](https://seller.wildberries.ru/help-center/article/A-524)
- `includeSearchTexts` `boolean` — Show data for search queries without promo items
- `limit` `integer<int64>` (required) — Number of item groups in the response
- `offset` `integer<int64>` (required) — From which element to start outputting data

## Responses

| Code  | Description       | Schema                                     |
| ----- | ----------------- | ------------------------------------------ |
| `200` | Success           | `PostV2SearchReportTableGroupsResponse200` |
| `400` | Bad request       | `ErrorObject400`                           |
| `401` | Unauthorized      | `object`                                   |
| `402` | Payment required  | `object`                                   |
| `403` | Access denied     | `ErrorObject403`                           |
| `429` | Too many requests | `object`                                   |

**Structure `200`:**

- `data` `TableGroupResponse`
  - `groups` `TableGroupItem[]` — List of item groups for the table
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

result = api.post_v2_search_report_table_groups(table_group_request=...)
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

const { data } = await api.postV2SearchReportTableGroups(tableGroupRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportTableGroups(context.Background()).TableGroupRequest(tableGroupRequest).Execute()
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

System.out.println(api.postV2SearchReportTableGroups(tableGroupRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportTableGroups($table_group_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportTableGroups(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportTableGroups(tableGroupRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_search_report_table_groups(&cfg, table_group_request).await;
    println!("{:#?}", result);
}
```

:::
