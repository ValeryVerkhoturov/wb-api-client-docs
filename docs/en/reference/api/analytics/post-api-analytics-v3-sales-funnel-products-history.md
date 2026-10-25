---
title: "Listings Statistics per Days"
description: "The method returns statistics for listings by day or by week. You can get data for a maximum of the last week."
---

# Listings Statistics per Days

```http
POST /api/analytics/v3/sales-funnel/products/history
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Sales Funnel · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelProductsHistory)

The method returns statistics for listings by day or by week.
You can get data for a maximum of the last week.

The report data is updated once every 2 hours.

Most of the data appears within an hour of the event:

- orders
- click-throughs
- adds-to-Cart
  A small part of this data may appear within a few days.

Purchases, cancellations, and returns are displayed in report for the day an item was ordered. For example, if an order was placed on January 1, and the customer returned the item on January 10, data about this return will appear in the report for January 1.
You can track the final sales results using [details for the realization reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

To get reports for a period of up to a year, use the [Seller Analytics CSV](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv) methods — the `DETAIL_HISTORY_REPORT` type. Reports of this type are available only with [Jam](https://seller.wildberries.ru/monetization/jam) subscription

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `ItemHistoryRequest`, required

- `selectedPeriod` `object` (required)
  - `start` `string` — Period start
  - `end` `string` — Period end
- `nmIds` `integer<int64>[]` (required) — WB item numbers to include in the report
- `skipDeletedNm` `boolean` — Skip deleted items
- `aggregationLevel` `Level`

## Responses

| Code  | Description       | Schema                                        |
| ----- | ----------------- | --------------------------------------------- |
| `200` | Success           | `PostV3SalesFunnelProductsHistoryResponse200` |
| `400` | Bad request       | `ErrorObject`                                 |
| `401` | Unauthorized      | `object`                                      |
| `402` | Payment required  | `object`                                      |
| `403` | Access denied     | `ErrorObject`                                 |
| `429` | Too many requests | `object`                                      |

**Structure `200` — `object[]`:**

- `product` `object`
  - `nmId` `integer<int64>` — WB item number
  - `title` `string<int64>` — Listing name
  - `vendorCode` `string` — Seller item number
  - `brandName` `string` — Brand
  - `subjectId` `integer<int64>` — Subcategory ID
  - `subjectName` `string` — Subcategory name
- `history` `History[]` — Statistics per period
  - `date` `string` — Statistics collection date
  - `openCount` `integer<int64>` — Click-throughs
  - `cartCount` `integer<int64>` — Adds-to-Cart
  - `orderCount` `integer<int64>` — Items ordered
  - `orderSum` `integer<int64>` — Total order value
  - `buyoutCount` `integer<int64>` — Items purchased
  - `buyoutSum` `integer<int64>` — Total purchase value
  - `buyoutPercent` `integer<int64>` — Purchase rate
  - `addToCartConversion` `integer<int64>` — Conversion to Cart. What percentage of visitors who opened the listing, added the item to the cart, %
  - `cartToOrderConversion` `integer<int64>` — Conversion to order. Percentage of visitors who made an order after adding the item to the cart
  - `addToWishlistCount` `integer<int64>` — Adds-to-Favorites
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

result = api.post_v3_sales_funnel_products_history(item_history_request=...)
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

const { data } = await api.postV3SalesFunnelProductsHistory(itemHistoryRequest);
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

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelProductsHistory(context.Background()).ItemHistoryRequest(itemHistoryRequest).Execute()
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

System.out.println(api.postV3SalesFunnelProductsHistory(itemHistoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelProductsHistory($item_history_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelProductsHistory(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelProductsHistory(itemHistoryRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v3_sales_funnel_products_history(&cfg, item_history_request).await;
    println!("{:#?}", result);
}
```

:::
