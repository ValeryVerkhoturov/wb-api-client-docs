---
title: "Get Campaign Daily Limits Settings"
description: "Method is available by Personal token, Service token"
---

# Get Campaign Daily Limits Settings

```http
GET /api/advert/v0/daily-limits
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaign Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/getV0DailyLimits)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns the current daily limit settings for CPC campaigns — the maximum amounts that campaigns can spend on promotion during a day.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type     | Period | Limit      | Interval | Burst      |
| -------- | ------ | ---------- | -------- | ---------- |
| Personal | 1 min  | 5 requests | 12 s     | 5 requests |
| Service  | 1 min  | 5 requests | 12 s     | 5 requests |

## Parameters

| Name        | In    | Type     | Req. | Description                                                   |
| ----------- | ----- | -------- | ---- | ------------------------------------------------------------- |
| `advertIds` | query | `string` | yes  | Campaign IDs, maximum 100. Specify values separated by commas |

## Responses

| Code  | Description       | Schema                     |
| ----- | ----------------- | -------------------------- |
| `200` | Success           | `V0GetDailyLimitsResponse` |
| `400` | Bad request       | `response400`              |
| `401` | Unauthorized      | `object`                   |
| `403` | Access denied     | `object`                   |
| `429` | Too many requests | `object`                   |

**Structure `200`:**

- `adverts` `V0DailyLimitAdvert[]`
  - `advertId` `integer<int64>` — Campaign ID
  - `enabled` `boolean` — - `true` — daily limit is enabled - `false` — daily limit is disabled
  - `dailyLimit` `integer<int64>` — Daily limit amount in minor currency units — 0.01 of the base currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances)
  - `spentToday` `integer<int64>` — Amount spent today in minor currency units — 0.01 of the base currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances)
  - `currency` `string<ISO 4217>` — Currency code
  - `carryOverEnabled` `boolean` — Carry-over of the remaining daily limit to the next day. If the limit is not fully spent within 24 hours, the remaining amount will be added to the next day's limit. Promotion spend will not increase. - `true` — carry-over is enabled - `false` — carry-over is disabled
  - `valid` `boolean` — Whether the current daily limit is sufficient for the campaign bids: - `true` — yes - `false` — no, we recommend to increase the limit, otherwise the campaign budget may be spent unevenly
  - `requiredLimit` `integer<int64>` — Recommended minimum daily limit based on the campaign’s current bids. Specified in minor currency units — 0.01 of the base currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances)

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

result = api.get_v0_daily_limits(advert_ids=...)
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

const { data } = await api.getV0DailyLimits(advertIds);
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

result, _, err := client.PromotionAPI.GetV0DailyLimits(context.Background()).AdvertIds(advertIds).Execute()
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

System.out.println(api.getV0DailyLimits(advertIds));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV0DailyLimits($advert_ids));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV0DailyLimits(advertIds).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV0DailyLimits(advertIds));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v0_daily_limits(&cfg, advert_ids).await;
    println!("{:#?}", result);
}
```

:::
