---
title: "Get Report"
description: "Method is available by Personal token, Service token"
---

# Get Report

```http
POST /api/analytics/v2/item-rating
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Item Rating · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/itemRating/operation/postV2ItemRating)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method forms a dataset for item rating.

The report data is updated once an hour.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit      | Interval | Burst      |
| ------ | ---------- | -------- | ---------- |
| 1 min  | 3 requests | 20 s     | 3 requests |

## Request body

`application/json` — schema `ItemRatingRequest`, required

- `currentPeriod` `PeriodItemRating` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 364 days from yesterday
  - `end` `string` (required) — End date of the period. No earlier than 364 days from yesterday
- `pastPeriod` `PastPeriodItemRating`
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 364 days from yesterday
  - `end` `string` (required) — End date of the period. No later than the day before the start date `currentPeriod`. No earlier than 364 days from yesterday
- `nmIds` `integer<int32>[]` — List of WB item numbers for filtering
- `subjectIds` `integer<int32>[]` — List of subcategory IDs for filtering
- `brandNames` `string[]` — List of brands for filtering
- `tagIds` `integer<int64>[]` — List of label IDs for filtering
- `isNotIncludeNmsWithoutSales` `boolean` — Are items with no sales returned: - `true` — yes, the method returns only items without sales for the period specified in the `currentPeriod` object - `false` — no, the method returns all items unless other parameters are specified
- `onlyShadowedNms` `boolean` — Are only hidden items returned in the response: - `true` — yes, the method returns only items hidden from catalog - `false` — no, the method returns all items unless other parameters are specified
- `orderBy` `OrderByItemRating` (required)
  - `field` `string` = `feedbackRating` | `feedbackCount` | `fiveStar` | `fourStar` | `threeStar` | `twoStar` | `oneStar` | `disqualified` (required) — Sorting field: - `feedbackRating` — Review-based rating - `feedbackCount` — Total reviews - `fiveStar` — 5 star reviews - `fourStar` — 4 star reviews - `threeStar` — 3 star reviews - `twoStar` — 2 star reviews - `oneStar` — 1 star reviews - `disqualified` — Excluded reviews
  - `mode` `string` = `asc` | `desc` (required) — Sorting order: - `asc` — ascending - `desc` — descending
- `limit` `integer<int64>` — Number of items in the response
- `offset` `integer<int64>` (required) — How many results to skip. For example, with value `10`, the response will start with the 11 element

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `PostV2ItemRatingResponse200` |
| `400` | Bad request       | `ErrorObject400`              |
| `401` | Unauthorized      | `object`                      |
| `403` | Access denied     | `ErrorObject403`              |
| `429` | Too many requests | `object`                      |

**Structure `200`:**

- `data` `ItemRatingResponse`
  - `sellerRating` `TableItemFloat`
    - `current` `number<float64>` — Current rating
    - `dynamics` `number<float64>` — Dynamics compared to the previous period (%)
  - `feedbackIncrease` `FeedbacksIncreaseItem`
    - `current` `integer<int64>` — Feedback increase for the period
    - `total` `integer<int64>` — Total ratings
    - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `fiveStar` `object` — 5 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `total` `integer<int64>` — Total ratings
    - `fourStar` `object` — 4 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `total` `integer<int64>` — Total ratings
    - `threeStar` `object` — 3 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `total` `integer<int64>` — Total ratings
    - `twoStar` `object` — 1 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `total` `integer<int64>` — Total ratings
    - `oneStar` `object` — 1 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
      - `total` `integer<int64>` — Total ratings
  - `items` `DistributionTableItem[]` — Item data
    - `nmId` `integer<int64>` — WB item number
    - `title` `string` — Item name
    - `vendorCode` `string` — Seller item number
    - `subjectId` `integer<int64>` — Subcategory ID
    - `subjectName` `string` — Subcategory name
    - `brandName` `string` — Brand
    - `tagName` `string` — Label name
    - `tagId` `integer<int64>` — Label ID
    - `pinnedFeedback` `boolean` — The review is pinned
    - `rating` `number<float64>` — Listing rating
    - `feedbackRating` `object` — Feedback rating
      - `current` `number<float64>` — Current rating
      - `dynamics` `number<float64>` — Dynamics compared to the previous period (%)
      - `percentile` `number<float64>` — How many percent of other sellers' items of this subcategory that have a lower feedback rating
    - `feedbackCount` `object` — Feedback count
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `fiveStar` `object` — 5 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `fourStar` `object` — 4 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `threeStar` `object` — 3 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `twoStar` `object` — 2 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `oneStar` `object` — 1 star reviews
      - `current` `integer<int64>` — Feedback increase for the period
      - `dynamics` `integer<int64>` — Dynamics compared to the previous period (%)
    - `disqualified` `integer<int64>` — Excluded reviews
    - `isShadowed` `boolean` — Is the item hidden from catalog: - `true` — the item is hidden from catalog - `false` — the item is not hidden from catalog

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

result = api.post_v2_item_rating(item_rating_request=...)
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

const { data } = await api.postV2ItemRating(itemRatingRequest);
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

result, _, err := client.AnalyticsAPI.PostV2ItemRating(context.Background()).ItemRatingRequest(itemRatingRequest).Execute()
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

System.out.println(api.postV2ItemRating(itemRatingRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2ItemRating($item_rating_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2ItemRating(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2ItemRating(itemRatingRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_item_rating(&cfg, item_rating_request).await;
    println!("{:#?}", result);
}
```

:::
