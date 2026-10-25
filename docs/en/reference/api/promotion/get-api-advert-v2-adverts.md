---
title: "Campaigns Information"
description: "The method returns information about campaigns with standard or custom bid via statuses, payment types and IDs."
---

# Campaigns Information

```http
GET /api/advert/v2/adverts
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaigns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaigns/operation/getV2Adverts)

The method returns information about campaigns with standard or custom bid via statuses, payment types and IDs.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 5 requests | 200 ms   | 5 requests |
| Service          | 1 s    | 5 requests | 200 ms   | 5 requests |
| Base with secret | 1 s    | 5 requests | 200 ms   | 5 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Parameters

| Name           | In    | Type     | Req. | Description                                                                                                                                                                                  |
| -------------- | ----- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ids`          | query | `string` | no   | Campaign IDs, maximum 50                                                                                                                                                                     |
| `statuses`     | query | `string` | no   | Campaign statuses: - `-1` — deleted, the deletion process will be completed within 10 minutes - `4` — ready to be launched - `7` — completed - `8` — declined - `9` — active - `11` — paused |
| `payment_type` | query | `string` | no   | Payment type: - `cpm` — cost per mille - `cpc` — cost per click                                                                                                                              |

## Responses

| Code  | Description       | Schema        |
| ----- | ----------------- | ------------- |
| `200` | Success           | `GetAdverts`  |
| `400` | Bad request       | `response400` |
| `401` | Unauthorized      | `object`      |
| `403` | Access denied     | `object`      |
| `429` | Too many requests | `object`      |

**Structure `200`:**

- `adverts` `object[]` — Campaigns
  - `bid_type` `string` — Bid type: - `unified` — standard bid - `manual` — custom bid
  - `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `id` `integer<int64>` — Campaign ID
  - `nm_settings` `AdvertNMsSettings[]` — Item settings
    - `bids_kopecks` `AdvertBidsKopecks`
      - `search` `integer<int64>` — Bid in search
      - `recommendations` `integer<int64>` — Bid in recommendations
    - `subject` `AdvertSubcategory`
      - `id` `integer<int64>` — Subcategory ID
      - `name` `string` — Subcategory name
    - `nm_id` `integer<int64>` — WB item number
  - `settings` `AdvertSettings`
    - `payment_type` `string` — Payment type: - `cpm` — cost per mille - `cpc` — cost per click
    - `name` `string` — Campaign name
    - `placements` `object` — Placements
      - `search` `boolean` — Placement in search: - `false` — disabled - `true` — enabled
      - `recommendations` `boolean` — Placement in recommendations: - `false` — disabled - `true` — enabled
  - `restrictions` `object` — Campaign restrictions
    - `can_change_nms` `boolean` — Can the list of campaign items be changed: - `true` — yes - `false` — no
  - `status` `integer<int64>` = `-1` | `4` | `7` | `8` | `9` | `11` — Campaign status: - `-1` — deleted, the deletion process will be completed within 10 minutes - `4` — ready to be launched - `7` — completed - `8` — declined - `9` — active - `11` — campaign is paused
  - `timestamps` `Timestamps`
    - `created` `string` — Campaign create time
    - `updated` `string` — Campaign last update time
    - `started` `string` — Campaign launch time
    - `deleted` `string` — Campaign delete date. If the campaign has not been deleted, the time will be indicated in the future

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

result = api.get_v2_adverts(ids=..., statuses=..., payment_type=...)
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

const { data } = await api.getV2Adverts(ids, statuses, paymentType);
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

result, _, err := client.PromotionAPI.GetV2Adverts(context.Background()).Execute()
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

System.out.println(api.getV2Adverts(ids, statuses, paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV2Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV2Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV2Adverts());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v2_adverts(&cfg, ids, statuses, payment_type).await;
    println!("{:#?}", result);
}
```

:::
