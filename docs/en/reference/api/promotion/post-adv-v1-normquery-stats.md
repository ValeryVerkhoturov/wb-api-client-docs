---
title: "Daily Search Clusters Statistics"
description: "Returns statistics (views, clicks, add-to-cart, orders, CTR, CPC, CPM, etc.) by search clusters for the specified period detailed by day. You can use this…"
---

# Daily Search Clusters Statistics

```http
POST /adv/v1/normquery/stats
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Statistics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/postV1NormqueryStats)

Returns statistics (views, clicks, add-to-cart, orders, CTR, CPC, CPM, etc.) by search clusters for the specified period detailed by day.
You can use this method for campaigns with `cpm` — for impressions, and `cpc` — for clicks payment models.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 min  | 10 requests | 6 s      | 20 requests |
| Service          | 1 min  | 10 requests | 6 s      | 20 requests |
| Base with secret | 1 min  | 10 requests | 6 s      | 20 requests |
| Base             | 1 h    | 2 requests  | 30 min   | 1 request   |

## Request body

`application/json` — schema `V1GetNormQueryStatsRequest`, required

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `V1GetNormQueryStatsResponse` |
| `400` | Bad request       | `response400`                 |
| `401` | Unauthorized      | `object`                      |
| `403` | Access denied     | `object`                      |
| `429` | Too many requests | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v1_normquery_stats(v1_get_norm_query_stats_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new PromotionApi(cfg);

const { data } = await api.postV1NormqueryStats(v1GetNormQueryStatsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV1NormqueryStats(context.Background()).V1GetNormQueryStatsRequest(v1GetNormQueryStatsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.postV1NormqueryStats(v1GetNormQueryStatsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1NormqueryStats($v1_get_norm_query_stats_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1NormqueryStats(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1NormqueryStats(v1GetNormQueryStatsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v1_normquery_stats(&cfg, v1_get_norm_query_stats_request).await;
    println!("{:#?}", result);
}
```

:::
