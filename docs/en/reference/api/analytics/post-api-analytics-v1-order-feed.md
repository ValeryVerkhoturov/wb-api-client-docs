---
title: "Get Report"
description: "The method forms a dataset for orders and sales."
---

# Get Report

```http
POST /api/analytics/v1/order-feed
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Order Feed · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed)

The method forms a dataset for orders and sales.

The report data is updated in real time.

> 1 order means 1 assembly order and means 1 item
> The `brandNames`, `subjectIds`, `tagIds`, and `nmIds` parameters can be empty `[]`, in which case the response will return all of the seller orders.
> If you specify multiple parameters, the response will include orders that match all of these parameters simultaneously. If no orders match the request parameters, an empty array `[]` will be returned.

You can get a report for a maximum of the last 31 days.

Orders are sorted by current status time, from the newest to the earliest.

Pagination can be used.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst     |
| ---------------- | ------ | --------- | -------- | --------- |
| Personal         | 1 min  | 1 request | 1 min    | 1 request |
| Service          | 1 min  | 1 request | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request | 1 min    | 1 request |
| Base             | 3 h    | 1 request | 3 h      | 1 request |

## Request body

`application/json` — schema `OrderFeedRequest`, optional

- `selectedPeriod` `object` (required) — Requested period. By date of the current order status
  - `start` `string` (required) — Start date and time of the period. No later than `end`. No earlier than 31 days from today
  - `end` `string` — End date and time of the period. No earlier than 31 days from today
- `nmIds` `integer<int64>[]` — List of WB item numbers for filtering
- `subjectIds` `integer<int64>[]` — List of subcategory IDs for filtering
- `brandNames` `string[]` — List of brands for filtering
- `tagIds` `integer<int64>[]` — List of label IDs for filtering
- `pagination` `object` — Pagination
  - `snapshotTime` `string` — Data snapshot timestamp within which pagination is performed. The report data is updated asynchronously. In order not to skip or duplicate orders, requests for the same data selection must have the same `snapshotTime`. In the first data selection request (`"offset":0`) the parameter is not specified. In every subsequent request (`offset`>`0`), specify the value of the `snapshotTime` field from the response to the first request. When changing the values of the period and filters, start selecting again with `"offset":0` and without `snapshotTime`
  - `offset` `integer<int32>` — How many results to skip. For example, with value `10`, the response will start with the 11 element
  - `limit` `integer<int32>` — Number of orders in the response

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `PostV1OrderFeedResponse200` |
| `400` | Bad request       | `ErrorObject400`             |
| `401` | Unauthorized      | `object`                     |
| `403` | Access denied     | `ErrorObject403`             |
| `429` | Too many requests | `object`                     |

**Structure `200`:**

- `data` `OrderFeedResponse`
  - `snapshotTime` `string` — Cursor. Date and time of the last update of the data
  - `currency` `Currency`
  - `orders` `Order[]` — Orders
    - `nmId` `integer<int64>` — WB item number
    - `chrtId` `integer<int64>` — Size ID
    - `srid` `string` — Order ID
    - `createdAt` `string` — Order date and time
    - `updatedAt` `string` — Current status date and time. When `"status":"created"`, the value of the `createdAt` field is returned
    - `status` `string` = `created` | `buyout` | `cancel` | `return` | `returnDefective` — [Order status](https://seller.wildberries.ru/instructions/ru/ru/material/order-feed-report#a92fa9b0-86ab-4990-b905-33f6c38b385c): - `created` — placed - `buyout` — purchased - `cancel` — canceled - `return` — returned - `returnDefective` — returned due to defect
    - `cancelType` `string` = `app` | `receipt` | `expire` | `other` — [Cancellation type](https://seller.wildberries.ru/instructions/ru/ru/material/order-feed-report#a92fa9b0-86ab-4990-b905-33f6c38b385c) (when `"status":"cancel"`): - `app` — refuse prior to receipt - `receipt` — refuse at pickup - `expire` — pickup period ended - `other` — other
    - `warehouseName` `string` — Warehouse name. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `Склад WB`, for WB warehouses
    - `warehouseRegion` `string` — The federal district where the warehouse is located. If the warehouse is not in Russia, the country is returned. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `""`, for WB warehouses
    - `isMp` `boolean` — Warehouse type: - `true` — seller warehouse - `false` — WB warehouse
    - `destinationCity` `string` — Delivery location
    - `destinationDistrict` `string` — The federal district to which the order is delivered. If the delivery is not in Russia, the country is returned
    - `sellerPrice` `number<float64>` — Seller price with seller discount (excluding WB Club discount and wholesale discount for B2B)
    - `isB2b` `boolean` — Sale type - `true` — B2B - `false` — B2C

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

result = api.post_v1_order_feed(order_feed_request=...)
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

const { data } = await api.postV1OrderFeed(orderFeedRequest);
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

result, _, err := client.AnalyticsAPI.PostV1OrderFeed(context.Background()).Execute()
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

System.out.println(api.postV1OrderFeed(orderFeedRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV1OrderFeed());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV1OrderFeed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV1OrderFeed());
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v1_order_feed(&cfg, order_feed_request).await;
    println!("{:#?}", result);
}
```

:::
