---
title: "Orders and Positions by Item Search Texts"
description: "The method forms data for the table: - about orders for each search query for a specific item - about item positions in search results for each query The data…"
---

# Orders and Positions by Item Search Texts

```http
POST /api/v2/search-report/product/orders
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Search Queries for Your Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductOrders)

The method forms data for the table:

- about orders for each search query for a specific item
- about item positions in search results for each query
  The data is provided within the period for the [requested item](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts) and grouped by day. The maximum period is 7 days.

The report data is updated once every 2 hours.

You can get a report for a maximum of the last 365 days from the moment of the request

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Request body

`application/json` — schema `ItemOrdersRequest`, required

- `period` `PeriodOrdersRequest` (required)
  - `start` `string` (required) — Start date of the period. No later than `end`. No earlier than 365 days from today
  - `end` `string` (required) — End date of the period. No earlier than 365 days from today
- `nmId` `integer<int64>` (required) — WB item number
- `searchTexts` `string[]` (required) — Search texts. For the **Advanced** and **Premium** [Jam](https://seller.wildberries.ru/monetization/tariffs) rates, the maximum is 100

## Responses

| Code  | Description       | Schema                                       |
| ----- | ----------------- | -------------------------------------------- |
| `200` | Success           | `PostV2SearchReportProductOrdersResponse200` |
| `400` | Bad request       | `ErrorObject400`                             |
| `401` | Unauthorized      | `object`                                     |
| `402` | Payment required  | `object`                                     |
| `403` | Access denied     | `ErrorObject403`                             |
| `429` | Too many requests | `object`                                     |

**Structure `200`:**

- `data` `ItemOrdersResponse`
  - `total` `ItemOrdersMetrics[]` — Total for items
    - `dt` `string` — Date of statistics collection
    - `avgPosition` `integer<int64>` — Average item position in search results
    - `orders` `integer<int64>` — Items ordered from search
  - `items` `ItemOrdersTextItem[]` — Table elements
    - `text` `string` — Search text
    - `frequency` `integer<int64>` — Number of the search text requests
    - `dateItems` `ItemOrdersMetrics[]` — Statistics by dates
      - `dt` `string` — Date of statistics collection
      - `avgPosition` `integer<int64>` — Average item position in search results
      - `orders` `integer<int64>` — Items ordered from search

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

result = api.post_v2_search_report_product_orders(item_orders_request=...)
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

const { data } = await api.postV2SearchReportProductOrders(itemOrdersRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportProductOrders(context.Background()).ItemOrdersRequest(itemOrdersRequest).Execute()
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

System.out.println(api.postV2SearchReportProductOrders(itemOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportProductOrders($item_orders_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportProductOrders(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportProductOrders(itemOrdersRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_search_report_product_orders(&cfg, item_orders_request).await;
    println!("{:#?}", result);
}
```

:::
