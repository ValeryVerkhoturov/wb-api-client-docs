---
title: "Campaigns Information"
description: "The method returns information about campaigns with a standard or custom bid by their statuses, payment types, or list of IDs."
---

# Campaigns Information

```http
GET /api/advert/v3/adverts
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaigns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaigns/operation/getV3Adverts)

The method returns information about campaigns with a standard or custom bid by their statuses, payment types, or list of IDs.

To get all campaigns:

1. Make the first request without the `next` parameter.
2. Repeat the request with the value of the `next` parameter from the previous response until `next` returns an empty value `""`. This means you have got all campaigns.

To get specific campaigns, pass their IDs in the `advertIds` parameter.
Do not use `advertIds` in the same request with other parameters.

RL

## Parameters

| Name          | In    | Type             | Req. | Description                                                                                      |
| ------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------ |
| `advertIds`   | query | `string`         | no   | Campaign IDs                                                                                     |
| `statuses`    | query | `string`         | no   | Campaign statuses: - `4` — ready to be launched - `7` — completed - `9` — active - `11` — paused |
| `next`        | query | `string`         | no   | Pagination parameter                                                                             |
| `limit`       | query | `integer<int64>` | no   | Number of campaigns in the response                                                              |
| `paymentType` | query | `string`         | no   | Payment type: - `cpm` — cost per mille - `cpc` — cost per click                                  |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `V3GetAdvertsResponse` |
| `400` | Bad request       | `response400`          |
| `401` | Unauthorized      | `object`               |
| `429` | Too many requests | `object`               |

**Structure `200`:**

- `adverts` `V3GetAdverts[]` — Campaigns
  - `id` `integer<int64>` — Campaign ID
  - `status` `integer<int64>` = `4` | `7` | `9` | `11` — Campaign status: - `4` — ready to be launched - `7` — completed - `9` — active - `11` — campaign is paused
  - `timestamps` `Timestamps`
    - `created` `string` — Campaign create time
    - `updated` `string` — Campaign last update time
    - `started` `string` — Campaign launch time
  - `settings` `V3AdvertSettings`
    - `paymentType` `string` — Payment type: - `cpm` — cost per mille - `cpc` — cost per click
    - `name` `string` — Campaign name
    - `placements` `V3Placements`
      - `search` `boolean` — Placement in search: - `false` — disabled - `true` — enabled
      - `recommendations` `boolean` — Placement in recommendations: - `false` — disabled - `true` — enabled
  - `nms` `V3AdvertNMsSettings[]` — Item settings
    - `nmId` `integer<int64>` — WB item number
    - `subject` `V3AdvertSubject`
      - `id` `integer<int64>` — Subcategory ID
      - `name` `string` — Subcategory name
    - `bids` `V3AdvertBidsKopecks`
      - `search` `integer<int64>` — Bid in search
      - `recommendations` `integer<int64>` — Bid in recommendations
  - `currency` `string<ISO 4217>` — Currency code
  - `restrictions` `object` — Campaign restrictions
    - `canChangeNms` `boolean` — Whether the list of campaign items can be changed: - `true` — yes - `false` — no
- `next` `string` — Pagination parameter. Specify this value in the request to get the next batch of campaigns. If the field is empty `""`, you received all the campaigns

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

result = api.get_v3_adverts(advert_ids=..., statuses=..., next=..., limit=..., payment_type=...)
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

const { data } = await api.getV3Adverts(advertIds, statuses, next, limit, paymentType);
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

result, _, err := client.PromotionAPI.GetV3Adverts(context.Background()).Execute()
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

System.out.println(api.getV3Adverts(advertIds, statuses, next, limit, paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV3Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV3Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV3Adverts());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v3_adverts(&cfg, advert_ids, statuses, next, limit, payment_type).await;
    println!("{:#?}", result);
}
```

:::
