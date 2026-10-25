---
title: "Search Texts by Item"
description: "Forms the top search texts by item. Search text selection parameters: - limit — number of queries, maximum 30. For the \\\\Advanced\\\\ and \\\\Premium\\\\ Jam rates,…"
---

# Search Texts by Item

```http
POST /api/v2/search-report/product/search-texts
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Search Queries for Your Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts)

Forms the top search texts by item.
Search text selection parameters:

- `limit` — number of queries, maximum 30. For the \*\*Advanced\*\* and \*\*Premium\*\* [Jam](https://seller.wildberries.ru/monetization/tariffs) rates, the maximum is 100.
- `topOrderBy` — method for selecting the top queries
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

`application/json` — schema `ItemSearchTextsRequest`, required

- `currentPeriod` `Period` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 365 days from today
  - `end` `string` (required) — End date of the period. No earlier than 365 days from today
- `pastPeriod` `pastPeriod`
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 365 days from today
  - `end` `string` (required) — End date of the period. No later than the day before the start date `currentPeriod`. No earlier than 365 days from today
- `nmIds` `integer<int64>[]` (required) — WB item numbers list
- `topOrderBy` `string` = `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` (required) — Filtering by the search queries that brought the most: - `openCard` — click-throughs - `addToCart` — adds-to-Cart - `openToCart` — conversion to cart - `orders` — items ordered - `cartToOrder` — conversion to order
- `includeSubstitutedSKUs` `boolean` — Show data for direct queries with [promo items](https://seller.wildberries.ru/help-center/article/A-524)
- `includeSearchTexts` `boolean` — Show data for search queries without promo items
- `orderBy` `OrderByGrTe` (required)
  - `field` `string` = `avgPosition` | `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` | `visibility` (required) — Field for sorting: - `avgPosition` — by average position - `addToCart` — by adds-to-Cart - `openCard` — by click-throughs - `orders` — by number of items ordered - `cartToOrder` — by conversion to order from search - `openToCart` — by conversion to cart from search - `visibility` — by item visibility
  - `mode` `string` = `asc` | `desc` (required) — Order of sorting: - `asc` — ascending - `desc` — descending
- `limit` `TextLimit` (required)
  - one of: `StandardTariff`, `AdvancedTariff`

## Responses

| Code  | Description       | Schema                                            |
| ----- | ----------------- | ------------------------------------------------- |
| `200` | Success           | `PostV2SearchReportProductSearchTextsResponse200` |
| `400` | Bad request       | `ErrorObject400`                                  |
| `401` | Unauthorized      | `object`                                          |
| `402` | Payment required  | `object`                                          |
| `403` | Access denied     | `ErrorObject403`                                  |
| `429` | Too many requests | `object`                                          |

**Structure `200`:**

- `data` `ItemSearchTextsResponse`
  - `items` `TableSearchTextItem[]` — Table elements
    - `text` `string` — Search text
    - `nmId` `integer<int64>` — WB item number
    - `subjectName` `string` — Subcategory name
    - `brandName` `string` — Brand
    - `vendorCode` `string` — Seller item number
    - `name` `string` — Item name
    - `isCardRated` `boolean` — If the listing has a rating
    - `rating` `number<float64>` — Listing rating
    - `feedbackRating` `number<float64>` — Feedbacks rating
    - `price` `object` — Price
      - `minPrice` `integer<int64>` — Minimal seller price with seller discount (excluding WB Club discount)
      - `maxPrice` `integer<int64>` — Maximal seller price with seller discount (excluding WB Club discount)
    - `frequency` `object` — Number of the search text requests
      - `current` `integer<int64>` — Current number
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `weekFrequency` `integer<int64>` — Number of the search text requests per week
    - `medianPosition` `object` — Median position. Only positions from which users added the item to the cart or visited its page are considered. It is the middle value of the position in search results, which excludes significant deviations from the average
      - `current` `integer<int64>` — Current number
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `avgPosition` `object` — Average item position in search results
      - `current` `integer<int64>` — Current average position
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `openCard` `object` — Number of transitions to the listing from search
      - `current` `integer<int64>` — Current click-throughs
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `percentile` `integer<int64>` — The percentage by which click-throughs is higher than that of other sellers' pages for the search text
    - `addToCart` `object` — How many times the item from search was added to the cart
      - `current` `integer<int64>` — Current number
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `percentile` `integer<int64>` — The percentage by which adds-to-Cart is higher than that of other sellers' listings for the search text
    - `openToCart` `object` — Conversion to cart from search — the ratio of item additions to the cart compared to all transitions to the listing from the search
      - `current` `integer<int64>` — Current conversion
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `percentile` `integer<int64>` — The percentage by which conversion to cart is higher than that of other sellers' pages for the search text
    - `orders` `object` — Items ordered from search
      - `current` `integer<int64>` — Current number
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `percentile` `integer<int64>` — The percentage by which the number of orders is higher than that of other sellers' pages for the search text
    - `cartToOrder` `object` — Conversion to order from search — the ratio of items ordered to all additions of the item from search to the cart
      - `current` `integer<int64>` — Current conversion
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `percentile` `integer<int64>` — The percentage by which conversion to order is higher than that of other sellers' pages for the search text
    - `visibility` `object` — Item visibility percent in search results
      - `current` `integer<int64>` — Current percent
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

result = api.post_v2_search_report_product_search_texts(item_search_texts_request=...)
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

const { data } = await api.postV2SearchReportProductSearchTexts(itemSearchTextsRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportProductSearchTexts(context.Background()).ItemSearchTextsRequest(itemSearchTextsRequest).Execute()
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

System.out.println(api.postV2SearchReportProductSearchTexts(itemSearchTextsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportProductSearchTexts($item_search_texts_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportProductSearchTexts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportProductSearchTexts(itemSearchTextsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_search_report_product_search_texts(&cfg, item_search_texts_request).await;
    println!("{:#?}", result);
}
```

:::
