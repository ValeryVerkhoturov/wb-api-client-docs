---
title: "Set Bids for Search Clusters in the Currency of the Seller Account"
description: "Method is available by Personal token, Service token"
---

# Set Bids for Search Clusters in the Currency of the Seller Account

```http
POST /api/advert/v1/normquery/bids
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Search Clusters · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/searchClusters/operation/postV1NormqueryBids)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method sets bids for search clusters in the currency of the seller account.
You can use this method only for campaigns with manual bids and `cpm` payment model — per impressions.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type     | Period | Limit      | Interval | Burst      |
| -------- | ------ | ---------- | -------- | ---------- |
| Personal | 1 s    | 2 requests | 500 ms   | 4 requests |
| Service  | 1 s    | 2 requests | 500 ms   | 4 requests |

## Request body

`application/json` — schema `V1SetNormQueryBidsRequest`, required

- `bids` `V1SetNormQueryBidsRequestItem[]` (required)
  - `advertId` `integer<int64>` (required) — Campaign ID
  - `nmId` `integer<int64>` (required) — WB item number
  - `normQuery` `string` (required) — Search cluster
  - `bidMinorUnits` `integer<int64>` (required) — Bid in minor currency units — 0.01 of the base unit of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency. The allowed bid increment is specified in the response of the method [GET /api/advert/v1/config](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV1Config)

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `V1SetNormQueryBidsResponse` |
| `400` | Bad request       | `response400`                |
| `401` | Unauthorized      | `object`                     |
| `403` | Access denied     | `Response4XX`                |
| `429` | Too many requests | `object`                     |

**Structure `200`:**

- `success` `V1SetNormQueryBidsSuccessResponseItem[]`
  - `advertId` `integer<int64>` — Campaign ID
  - `nmId` `integer<int64>` — WB item number
  - `normQuery` `string` — Search cluster - a group of similar search queries by which buyers find items
  - `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
- `failed` `NormQueryBidFailResponseItem[]`
  - `advertId` `integer<int64>` — Campaign ID
  - `nmId` `integer<int64>` — WB item number
  - `normQuery` `string` — Search cluster - a group of similar search queries by which buyers find items
  - `reason` `string` — Error reason description

**Structure `400`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `request_id` `string` — Unique request ID
- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error title

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
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

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
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v1_normquery_bids(v1_set_norm_query_bids_request=...)
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

const { data } = await api.postV1NormqueryBids(v1SetNormQueryBidsRequest);
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

result, _, err := client.PromotionAPI.PostV1NormqueryBids(context.Background()).V1SetNormQueryBidsRequest(v1SetNormQueryBidsRequest).Execute()
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

System.out.println(api.postV1NormqueryBids(v1SetNormQueryBidsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1NormqueryBids($v1_set_norm_query_bids_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1NormqueryBids(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1NormqueryBids(v1SetNormQueryBidsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v1_normquery_bids(&cfg, v1_set_norm_query_bids_request).await;
    println!("{:#?}", result);
}
```

:::
