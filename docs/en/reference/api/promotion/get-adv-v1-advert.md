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
client.setBearerToken(new SecretString("<your WB JWT>"));
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
