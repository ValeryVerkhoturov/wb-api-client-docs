---
title: "List of Media Campaigns"
description: "The method allows to get the list of media campaigns of the seller"
---

# List of Media Campaigns

```http
GET /adv/v1/adverts
```

**Base URL:** `https://advert-media-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Media · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/media/operation/getV1Adverts)

The method allows to get the list of media campaigns of the seller

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 s    | 10 requests | 100 ms   | 10 requests |
| Service          | 1 s    | 10 requests | 100 ms   | 10 requests |
| Base with secret | 1 s    | 10 requests | 100 ms   | 10 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request   |

## Parameters

| Name        | In    | Type             | Req. | Description                                                                                                                                                                                                                                                                                             |
| ----------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`    | query | `string`         | no   | Media campaign status: - `1` — template - `2` — moderation - `3` — rejected (with the possibility to resubmit for moderation) - `4` — ready for launch - `5` — scheduled - `6` — running - `7` — completed - `8` — declined - `9` — paused by seller - `10` — paused due to daily limit - `11` — paused |
| `type`      | query | `integer<int64>` | no   | Media campaign type: - `1` — daily basis - `2` — views basis                                                                                                                                                                                                                                            |
| `limit`     | query | `integer<int64>` | no   | Number of campaigns in the response                                                                                                                                                                                                                                                                     |
| `offset`    | query | `integer<int64>` | no   | Offset relative to the first media campaign                                                                                                                                                                                                                                                             |
| `order`     | query | `string`         | no   | The order in which the response is displayed: - `create` — by time of media campaign creation - `id` — by ID of media campaign creation                                                                                                                                                                 |
| `direction` | query | `string`         | no   | Sorting order: - `desc` — upward - `asc` — smaller to larger                                                                                                                                                                                                                                            |

## Responses

| Code  | Description               | Schema                    |
| ----- | ------------------------- | ------------------------- |
| `200` | Success                   | `GetV1AdvertsResponse200` |
| `204` | Media campaigns not found | —                         |
| `401` | Unauthorized              | `object`                  |
| `403` | Access denied             | `object`                  |
| `429` | Too many requests         | `object`                  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_adverts(status=..., type=..., limit=..., offset=..., order=..., direction=...)
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

const { data } = await api.getV1Adverts(status, type, limit, offset, order, direction);
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

result, _, err := client.PromotionAPI.GetV1Adverts(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.getV1Adverts(status, type, limit, offset, order, direction));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Adverts());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_adverts(&cfg, status, r#type, limit, offset, order, direction).await;
    println!("{:#?}", result);
}
```

:::
