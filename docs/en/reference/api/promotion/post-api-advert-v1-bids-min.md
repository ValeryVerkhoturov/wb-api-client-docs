---
title: "Minimum Bids for Listings"
description: "Method allows minimum bids for listings in minor currency units — 0.01 of the base unit of the seller account currency — depending on the payment type and…"
---

# Minimum Bids for Listings

```http
POST /api/advert/v1/bids/min
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Creating Campaigns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/creatingCampaigns/operation/postV1BidsMin)

Method allows minimum bids for listings in minor currency units — 0.01 of the base unit of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency — depending on the payment type and placements.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 20 requests | 3 s      | 5 requests |
| Service          | 1 min  | 20 requests | 3 s      | 5 requests |
| Base with secret | 1 min  | 20 requests | 3 s      | 5 requests |
| Base             | 1 h    | 5 requests  | 12 min   | 1 request  |

## Request body

`application/json` — schema `object`, required

- `advert_id` `integer<int64>` (required) — Campaign ID
- `nm_ids` `integer<int64>[]` (required) — WB item numbers list
- `payment_type` `string` = `cpm` | `cpc` (required) — Payment type: - `cpm` — per mille - `cpc` — per click
- `placement_types` `string[]` (required) — Placements: - `search` — search - `recommendation` — recommendation - `combined` — search and recommendation

## Responses

| Code  | Description       | Schema                     |
| ----- | ----------------- | -------------------------- |
| `200` | Success           | `PostV1BidsMinResponse200` |
| `400` | Bad request       | `StandardizedBatchError`   |
| `401` | Unauthorized      | `object`                   |
| `403` | Access denied     | `object`                   |
| `429` | Too many requests | `object`                   |

**Structure `200`:**

- `bids` `object[]` — List of listings with bids
  - `bids` `object[]` — List of bids by placements
    - `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `type` `PlacementType`
    - `value` `integer<int64>` — Minimum bid in minor currency units — 0.01 of the base unit of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `nm_id` `integer<int64>` — WB item number

**Structure `400`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `request_id` `string` — Unique request ID
- `status` `integer<int64>` — HTTP Status Code
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

result = api.post_v1_bids_min(post_v1_bids_min_request=...)
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

const { data } = await api.postV1BidsMin(postV1BidsMinRequest);
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

result, _, err := client.PromotionAPI.PostV1BidsMin(context.Background()).PostV1BidsMinRequest(postV1BidsMinRequest).Execute()
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

System.out.println(api.postV1BidsMin(postV1BidsMinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1BidsMin($post_v1_bids_min_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1BidsMin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1BidsMin(postV1BidsMinRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v1_bids_min(&cfg, post_v1_bids_min_request).await;
    println!("{:#?}", result);
}
```

:::
