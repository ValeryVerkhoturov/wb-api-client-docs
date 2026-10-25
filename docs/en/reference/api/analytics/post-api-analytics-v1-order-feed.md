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

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `PostV1OrderFeedResponse200` |
| `400` | Bad request       | `ErrorObject400`             |
| `401` | Unauthorized      | `object`                     |
| `403` | Access denied     | `ErrorObject403`             |
| `429` | Too many requests | `object`                     |

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
