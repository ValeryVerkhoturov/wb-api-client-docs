---
title: "Information About Media Campaign"
description: "The method allows to get information about a media campaign"
---

# Information About Media Campaign

```http
GET /adv/v1/advert
```

**Base URL:** `https://advert-media-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Media · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/media/operation/getV1Advert)

The method allows to get information about a media campaign

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 s    | 10 requests | 100 ms   | 10 requests |
| Service          | 1 s    | 10 requests | 100 ms   | 10 requests |
| Base with secret | 1 s    | 10 requests | 100 ms   | 10 requests |
| Base             | 1 h    | 5 requests  | 12 min   | 1 request   |

## Parameters

| Name | In    | Type             | Req. | Description       |
| ---- | ----- | ---------------- | ---- | ----------------- |
| `id` | query | `integer<int64>` | yes  | Media campaign ID |

## Responses

| Code  | Description              | Schema                   |
| ----- | ------------------------ | ------------------------ |
| `200` | Success                  | `GetV1AdvertResponse200` |
| `204` | Media campaign not found | —                        |
| `400` | Bad request              | `string`                 |
| `401` | Unauthorized             | `object`                 |
| `403` | Access denied            | `object`                 |
| `429` | Too many requests        | `object`                 |

**Structure `200`:**

- `advertId` `integer<int64>` — Media campaign ID
- `name` `string` — Media campaign name
- `brand` `string` — Brand name
- `type` `integer<int64>` — Media campaign type: - `1` — daily basis - `2` — views basis
- `status` `integer<int64>` — Media campaign status: - `1` — template - `2` — moderation - `3` — rejected (with the possibility to resubmit for moderation) - `4` — ready for launch - `5` — scheduled - `6` — running - `7` — completed - `8` — declined - `9` — paused by seller - `10` — paused due to daily limit - `11` — paused
- `createTime` `string` — Time of media campaign creation
- `extended` `object`
  - `reason` `string` — Moderator's remark
  - `expenses` `integer<int64>` — Expenses
  - `from` `string` — Media campaign impressions start date and time
  - `to` `string` — Media campaign impressions end date and time
  - `updated_at` `string` — Campaign update date and time
  - `price` `integer<int64>` — Cost of placement by day for type `1`
  - `budget` `integer<int64>` — Budget balance for type `2`
  - `operation` `integer<int64>` — Source of charge-off: - `1` — balance sheet - `2` — account
  - `contract_id` `integer<int64>` — Contract ID, for contracted sellers
- `items` `object[]` — Banner information. The response may not contain all fields, it depends on your media campaign configuration.
  - `id` `integer<int64>` — Banner ID
  - `name` `string` — Brand
  - `status` `integer<int64>` — Status (same as media campaign status)
  - `place` `integer<int64>` — Placement on the page
  - `budget` `integer<int64>` — Budget
  - `daily_limit` `integer<int64>` — Daily limit (for impression banners)
  - `category_name` `string` — Category name
  - `cpm` `integer<int64>` — Bid
  - `url` `string` — The URL of the page the user lands on when they click on the banner
  - `advert_type` `integer<int64>` — Campaign type: - `1` — banner - `2` — pop-up menu - `3` — mailings - `4` — social networks - `5` — push notification in WB app
  - `created_at` `string` — Banner creation date
  - `updated_at` `string` — Banner update date and time
  - `date_from` `string` — Banner start date
  - `date_to` `string` — Banner stop date
  - `nms` `integer<int64>[]` — WB item numbers
  - `bottomText1` `string` — Text under the banner
  - `bottomText2` `string` — Text under the banner, second string
  - `message` `string` — Notification or mailing text
  - `additionalSettings` `integer<int64>` — Additional information. Mailing format: - `1` — common - `2` — segment - `3` — unique Social network: - `1` — VK - `2` — OK
  - `receiversCount` `integer<int64>` — Number of push notification recipients
  - `subject_id` `integer<int64>` — Parent category ID for the good
  - `subject_name` `string` — Parent category name for the good
  - `action_name` `string` — Promo name
  - `show_hours` `object[]` — Display time
    - `From` `integer<int64>` — Start time
    - `To` `integer<int64>` — End time
  - `Erid` `string` — Unique campaign ID for the ad data operator

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

result = api.get_v1_advert(id=...)
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

const { data } = await api.getV1Advert(id);
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

result, _, err := client.PromotionAPI.GetV1Advert(context.Background()).Id(id).Execute()
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

System.out.println(api.getV1Advert(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Advert($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Advert(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Advert(id));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_advert(&cfg, id).await;
    println!("{:#?}", result);
}
```

:::
