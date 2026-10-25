---
title: "Set Campaign Daily Limits"
description: "Method is available by Personal token, Service token"
---

# Set Campaign Daily Limits

```http
PUT /api/advert/v0/daily-limits
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaign Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/putV0DailyLimits)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method allows you to enable, update or disable the daily budget limit.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type     | Period | Limit      | Interval | Burst      |
| -------- | ------ | ---------- | -------- | ---------- |
| Personal | 1 min  | 5 requests | 12 s     | 5 requests |
| Service  | 1 min  | 5 requests | 12 s     | 5 requests |

## Request body

`application/json` — schema `V0PutDailyLimitsRequest`, required

- `advertIds` `integer<int64>[]` (required) — Campaign IDs
- `enabled` `boolean` (required) — Enable the limit: - `true` — yes - `false` — no
- `dailyLimit` `integer<int64>` — Daily limit amount. Required when `"enabled": true`. The minimum allowed amount is specified in the `minDailyLimit` field of the [GET /api/advert/v1/config](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV1Config) method
- `carryOverEnabled` `boolean` — Carry over the unused remaining limit to the next day: - `true` — yes - `false` — no Required when `"enabled": true`

## Responses

| Code  | Description       | Schema                     |
| ----- | ----------------- | -------------------------- |
| `200` | Success           | `V0PutDailyLimitsResponse` |
| `400` | Bad request       | `response400`              |
| `401` | Unauthorized      | `object`                   |
| `403` | Access denied     | `object`                   |
| `429` | Too many requests | `object`                   |

**Structure `200`:**

- `adverts` `V0PutDailyLimitsAdvertResult[]`
  - `advertId` `integer<int64>` — Campaign ID
  - `belowMinLimit` `boolean` — Whether the set daily limit is lower than the recommended minimum relative to the current bids (`requiredLimit`): - `true` — yes - `false` — no
  - `requiredLimit` `integer<int64>` — Recommended minimum daily limit based on the campaign’s current bids. Specified in minor currency units — 0.01 of the base currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances). With a lower limit, the budget may be spent unevenly and errors may occur in the campaign

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

result = api.put_v0_daily_limits(v0_put_daily_limits_request=...)
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

const { data } = await api.putV0DailyLimits(v0PutDailyLimitsRequest);
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

result, _, err := client.PromotionAPI.PutV0DailyLimits(context.Background()).V0PutDailyLimitsRequest(v0PutDailyLimitsRequest).Execute()
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

System.out.println(api.putV0DailyLimits(v0PutDailyLimitsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0DailyLimits($v0_put_daily_limits_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0DailyLimits(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0DailyLimits(v0PutDailyLimitsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::put_v0_daily_limits(&cfg, v0_put_daily_limits_request).await;
    println!("{:#?}", result);
}
```

:::
