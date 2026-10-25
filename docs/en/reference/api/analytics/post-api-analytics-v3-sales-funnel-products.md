---
title: "Listings Statistics per Period"
description: "The method generates a report on items by comparing key metrics for the current period with a similar past one."
---

# Listings Statistics per Period

```http
POST /api/analytics/v3/sales-funnel/products
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Sales Funnel · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelProducts)

The method generates a report on items by comparing key metrics for the current period with a similar past one.

The report data is updated once every 2 hours.

Most of the data appears within an hour of the event:

- orders
- click-throughs
- adds-to-Cart
  A small part of this data may appear within a few days.

Purchases, cancellations, and returns are displayed in report for the day an item was ordered. For example, if an order was placed on January 1, and the customer returned the item on January 10, data about this return will appear in the report for January 1.
You can track the final sales results using [details for the realization reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

The `brandNames`, `subjectIds`, `tagIds`, and `nmIds` parameters can be empty `[]`, in which case the response will return all of the seller listings.

If you specify multiple parameters, the response will include listings that match all of these parameters simultaneously. If no listings match the request parameters, an empty response `[]` will be returned.

You can get a report for a maximum of the last 365 days.

In the previous period's data:
\* The data in `pastPeriod` covers the same duration as in `selectedPeriod`
\* If the `pastPeriod` start date is more than a year before the current date, it will be adjusted to: `pastPeriod.start = current date - 365 days`
Pagination can be used.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `ItemsRequest`, required

- `selectedPeriod` `object` (required)
  - `start` `string` — Period start
  - `end` `string` — Period end
- `pastPeriod` `object`
  - `start` `string` — Period start
  - `end` `string` — Period end
- `nmIds` `integer<int64>[]` — WB item numbers to include in the report. Leave empty to get a report for all items
- `brandNames` `string[]` — List of brands for filtering
- `subjectIds` `integer<int64>[]` — List of subcategory IDs for filtering
- `tagIds` `integer<int64>[]` — List of label IDs for filtering
- `skipDeletedNm` `boolean` — Skip deleted items
- `orderBy` `OrderBy`
  - `field` `string` = `openCard` | `addToCart` | `orderCount` | `orderSum` | `buyoutCount` | `buyoutSum` | `cancelCount` | `cancelSum` | `avgPrice` | `stockMpQty` | `stockWbQty` | `shareOrderPercent` | `addToWishlist` | `timeToReady` | `localizationPercent` | `wbClub.orderCount` | `wbClub.orderSum` | `wbClub.buyoutSum` | `wbClub.cancelSum` | `wbClub.buyoutCount` | `wbClub.avgPrice` | `wbClub.buyoutPercent` | `wbClub.avgOrderCountPerDay` | `wbClub.cancelCount` (required) — Sort field: - `openCard` — Click-throughs - `addToCart` — Adds-to-Cart - `orderCount` — Items ordered - `orderSum` — Total order value - `buyoutCount` — Items purchased - `buyoutSum` — Total purchase value - `cancelCount` — Items canceled and returned - `cancelSum` — Canceled and returned item value - `avgPrice` — Average item price - `stockMpQty` — Seller warehouse inventory - `stockWbQty` — WB warehouse inventory - `shareOrderPercent` — Share in revenue - `addToWishlist` — Adds-to-Favorites - `timeToReady` — Average delivery time - `localizationPercent` — Local orders within the same region - `wbClub.orderCount` — Items ordered (WB Club) - `wbClub.orderSum` — Total order value (WB Club) - `wbClub.buyoutSum` — Total purchase value (WB Club) - `wbClub.buyoutCount` — Items purchased (WB Club) - `wbClub.cancelSum` — Canceled and returned item value (WB Club) - `wbClub.avgPrice` — Average item price (WB Club) - `wbClub.buyoutPercent` — Purchase rate (WB Club) - `wbClub.avgOrderCountPerDay` — Average daily orders (WB Club) - `wbClub.cancelCount` — Items canceled and returned (WB Club)
  - `mode` `string` = `asc` | `desc` (required) — Sorting order: - `asc` — ascending - `desc` — descending
- `limit` `integer<int64>` — Number of listings in the response
- `offset` `integer<int64>` — How many results to skip. For example, with value `10`, the response will start with the 11 element

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `PostV3SalesFunnelProductsResponse200` |
| `400` | Bad request       | `ErrorObject`                          |
| `401` | Unauthorized      | `object`                               |
| `402` | Payment required  | `object`                               |
| `403` | Access denied     | `ErrorObject`                          |
| `429` | Too many requests | `object`                               |

**Structure `200`:**

- `data` `object`
  - `products` `object[]` — List of listings
    - `product` `object`
      - `nmId` `integer<int64>` — WB item number
      - `title` `string<int64>` — Listing name
      - `vendorCode` `string` — Seller item number
      - `brandName` `string` — Brand
      - `subjectId` `integer<int64>` — Subcategory ID
      - `subjectName` `string` — Subcategory name
      - `tags` `Tag[]` — Labels
        - `id` `integer<int64>` — Label ID
        - `name` `string` — Label name
      - `productRating` `number<float32>` — Item rating
      - `feedbackRating` `number<float32>` — Feedback rating
      - `stocks` `object` — Inventory
        - `wb` `integer<int64>` — WB warehouse inventory for the current day
        - `mp` `integer<int64>` — Seller warehouse inventory for the current day
        - `balanceSum` `integer<int64>` — Warehouse inventory value for the current day
    - `statistic` `object`
      - `selected` `object`
        - `period` `object`
          - `start` `string` — Period start
            - …
          - `end` `string` — Period end
            - …
        - `openCount` `integer<int64>` — Click-throughs
        - `cartCount` `integer<int32>` — Adds-to-Cart
        - `orderCount` `integer<int64>` — Items ordered
        - `orderSum` `integer<int64>` — Total order value
        - `buyoutCount` `integer<int64>` — Items purchased
        - `buyoutSum` `integer<int64>` — Total purchase value
        - `cancelCount` `integer<int64>` — Items canceled and returned
        - `cancelSum` `integer<int64>` — Canceled and returned item value
        - `avgPrice` `integer<int64>` — Average item price
        - `avgOrdersCountPerDay` `number<float64>` — Average daily orders
        - `shareOrderPercent` `number<float64>` — Share in revenue
        - `addToWishlist` `integer<int64>` — Adds-to-Favorites
        - `timeToReady` `object`
          - `days` `integer<int64>` — Days
            - …
          - `hours` `integer<int64>` — Hours
            - …
          - `mins` `integer<int64>` — Minutes
            - …
        - `localizationPercent` `integer<int64>` — Local orders within the same region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `100`
        - `wbClub` `object`
          - `orderCount` `integer<int64>` — Items ordered (WB Club)
            - …
          - `orderSum` `integer<int64>` — Total order value (WB Club)
            - …
          - `buyoutSum` `integer<int64>` — Total purchase value (WB Club)
            - …
          - `buyoutCount` `integer<int64>` — Items purchased (WB Club)
            - …
          - `cancelSum` `integer<int64>` — Canceled and returned item value (WB Club)
            - …
          - `cancelCount` `integer<int64>` — Items canceled and returned (WB Club)
            - …
          - `avgPrice` `integer<int64>` — Average item price (WB Club)
            - …
          - `buyoutPercent` `integer<int64>` — Purchase rate (WB Club)
            - …
          - `avgOrderCountPerDay` `number<float64>` — Average daily orders (WB Club)
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Conversion to cart. What percentage of visitors who opened the listing, added the item to the cart, %
            - …
          - `cartToOrderPercent` `integer<int>` — Conversion to order. What percentage of visitors who added the item to the cart, placed an order, %
            - …
          - `buyoutPercent` `integer<int>` — Buyout Percentage. Percentage of visitors who ordered a item and successfully completed the purchase. Excludes items still in transit to the buyer, %
            - …
      - `past` `object`
        - `period` `object`
          - `start` `string` — Period start
            - …
          - `end` `string` — Period end
            - …
        - `openCount` `integer<int64>` — Click-throughs
        - `cartCount` `integer<int32>` — Adds-to-Cart
        - `orderCount` `integer<int64>` — Items ordered
        - `orderSum` `integer<int64>` — Total order value
        - `buyoutCount` `integer<int64>` — Items purchased
        - `buyoutSum` `integer<int64>` — Total purchase value
        - `cancelCount` `integer<int64>` — Items canceled and returned
        - `cancelSum` `integer<int64>` — Canceled and returned item value
        - `avgPrice` `integer<int64>` — Average item price
        - `avgOrdersCountPerDay` `number<float64>` — Average daily orders
        - `shareOrderPercent` `number<float64>` — Share in revenue
        - `addToWishlist` `integer<int64>` — Adds-to-Favorites
        - `timeToReady` `object`
          - `days` `integer<int64>` — Days
            - …
          - `hours` `integer<int64>` — Hours
            - …
          - `mins` `integer<int64>` — Minutes
            - …
        - `localizationPercent` `integer<int64>` — Local orders within the same region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `100`
        - `wbClub` `object`
          - `orderCount` `integer<int64>` — Items ordered (WB Club)
            - …
          - `orderSum` `integer<int64>` — Total order value (WB Club)
            - …
          - `buyoutSum` `integer<int64>` — Total purchase value (WB Club)
            - …
          - `buyoutCount` `integer<int64>` — Items purchased (WB Club)
            - …
          - `cancelSum` `integer<int64>` — Canceled and returned item value (WB Club)
            - …
          - `cancelCount` `integer<int64>` — Items canceled and returned (WB Club)
            - …
          - `avgPrice` `integer<int64>` — Average item price (WB Club)
            - …
          - `buyoutPercent` `integer<int64>` — Purchase rate (WB Club)
            - …
          - `avgOrderCountPerDay` `number<float64>` — Average daily orders (WB Club)
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Conversion to cart. What percentage of visitors who opened the listing, added the item to the cart, %
            - …
          - `cartToOrderPercent` `integer<int>` — Conversion to order. What percentage of visitors who added the item to the cart, placed an order, %
            - …
          - `buyoutPercent` `integer<int>` — Buyout Percentage. Percentage of visitors who ordered a item and successfully completed the purchase. Excludes items still in transit to the buyer, %
            - …
      - `comparison` `object`
        - `openCountDynamic` `integer<int>` — Dynamics of click-throughs
        - `cartCountDynamic` `integer<int>` — Dynamics of adds-to-Cart
        - `orderCountDynamic` `integer<int>` — Dynamics of items ordered
        - `orderSumDynamic` `integer<int>` — Order value dynamics
        - `buyoutCountDynamic` `integer<int>` — Dynamics of items purchased
        - `buyoutSumDynamic` `integer<int>` — Dynamics of total purchase value
        - `cancelCountDynamic` `integer<int>` — Dynamics of items canceled and returned
        - `cancelSumDynamic` `integer<int>` — Dynamics of canceled and returned item value
        - `avgOrdersCountPerDayDynamic` `integer<int>` — Dynamics of average daily orders
        - `avgPriceDynamic` `integer<int>` — Dynamics of average item price. Discounts for promos are taken into account
        - `shareOrderPercentDynamic` `integer<int>` — Dynamics of share in revenue
        - `addToWishlistDynamic` `integer<int>` — Dynamics of adds-to-Favorites
        - `timeToReadyDynamic` `object`
          - `days` `integer<int64>` — Days
            - …
          - `hours` `integer<int64>` — Hours
            - …
          - `mins` `integer<int64>` — Minutes
            - …
        - `localizationPercentDynamic` `integer<int>` — Dynamics of local orders within the same region. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `0`
        - `wbClubDynamic` `object`
          - `orderCount` `integer<int>` — Dynamics of items ordered (WB Club)
            - …
          - `orderSum` `integer<int>` — Order value dynamics (WB Club)
            - …
          - `buyoutSum` `integer<int>` — Dynamics of total purchase value (WB Club)
            - …
          - `buyoutCount` `integer<int>` — Dynamics of items purchased (WB Club)
            - …
          - `cancelSum` `integer<int>` — Dynamics of canceled and returned item value (WB Club)
            - …
          - `cancelCount` `integer<int>` — Dynamics of items canceled and returned (WB Club)
            - …
          - `avgPrice` `integer<int>` — Dynamics of average item price (WB Club)
            - …
          - `buyoutPercent` `integer<int>` — Dynamics of purchase rate (WB Club)
            - …
          - `avgOrderCountPerDay` `number<int>` — Dynamics of average daily orders (WB Club)
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Conversion to cart. What percentage of visitors who opened the listing, added the item to the cart, %
            - …
          - `cartToOrderPercent` `integer<int>` — Conversion to order. What percentage of visitors who added the item to the cart, placed an order, %
            - …
          - `buyoutPercent` `integer<int>` — Buyout Percentage. Percentage of visitors who ordered a item and successfully completed the purchase. Excludes items still in transit to the buyer, %
            - …
  - `currency` `Currency`

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID

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
- `origin` `string` — WB internal service ID

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

result = api.post_v3_sales_funnel_products(items_request=...)
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

const { data } = await api.postV3SalesFunnelProducts(itemsRequest);
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

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelProducts(context.Background()).ItemsRequest(itemsRequest).Execute()
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

System.out.println(api.postV3SalesFunnelProducts(itemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelProducts($items_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelProducts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelProducts(itemsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v3_sales_funnel_products(&cfg, items_request).await;
    println!("{:#?}", result);
}
```

:::
