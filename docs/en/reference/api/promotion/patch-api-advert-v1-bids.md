---
title: "Changing Campaigns Bids"
description: "The method changes the bids of listings by WB item numbers in campaigns: - with standard bid - with custom bid - with a cpc payment model — per click For…"
---

# Changing Campaigns Bids

```http
PATCH /api/advert/v1/bids
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaign Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/patchV1Bids)

The method changes the bids of listings by WB item numbers in campaigns:

- with standard bid
- with custom bid
- with a `cpc` payment model — per click
  For campaigns in statuses `4`, `9` and `11`.

Specify the placement in the request parameter `placement`:

- `combined` — in search and recommendations for campaigns with standard bid
- `search `or `recommendations` — in search or recommendations for campaigns with custom bid

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 5 requests | 200 ms   | 5 requests |
| Service          | 1 s    | 5 requests | 200 ms   | 5 requests |
| Base with secret | 1 s    | 5 requests | 200 ms   | 5 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `object`, required

- `bids` `object[]` (required) — Bids in campaigns
  - `advert_id` `integer<int64>` (required) — Campaign ID
  - `nm_bids` `object[]` (required) — Bids
    - `nm_id` `integer<int64>` (required) — WB item number
    - `bid_kopecks` `integer<int64>` (required) — Bid in minor currency units — 0.01 of the base unit of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `placement` `string` = `search` | `recommendations` | `combined` (required) — Placement: - `search` — in search (for campaigns with custom bid) - `recommendations`— in recommendations (for campaigns with custom bid) - `combined` — in search and recommendations (for campaigns with standard bid)

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `PatchV1BidsResponse200` |
| `400` | Bad request       | `response400`            |
| `401` | Unauthorized      | `object`                 |
| `403` | Access denied     | `object`                 |
| `429` | Too many requests | `object`                 |

**Structure `200`:**

- `bids` `object[]` — The result of processing the request
  - `advert_id` `integer<int64>` — Campaign ID
  - `nm_bids` `object[]` — Bids
    - `nm_id` `integer<int64>` — WB item number
    - `bid_kopecks` `integer<int64>` — Bid in minor currency units — 0.01 of the base unit of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `placement` `string` — Placement: - `search` — in search - `recommendations`— in recommendations
- `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency

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

result = api.patch_v1_bids(patch_v1_bids_request=...)
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

const { data } = await api.patchV1Bids(patchV1BidsRequest);
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

result, _, err := client.PromotionAPI.PatchV1Bids(context.Background()).PatchV1BidsRequest(patchV1BidsRequest).Execute()
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

System.out.println(api.patchV1Bids(patchV1BidsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->patchV1Bids($patch_v1_bids_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PatchV1Bids(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PatchV1Bids(patchV1BidsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::patch_v1_bids(&cfg, patch_v1_bids_request).await;
    println!("{:#?}", result);
}
```

:::
