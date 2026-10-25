---
title: "Create Campaign"
description: "The method creates campaign: - with custom bid for promo items in search and/or recommendations - with standard bid for promo items both in search and…"
---

# Create Campaign

```http
POST /adv/v2/seacat/save-ad
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Creating Campaigns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/creatingCampaigns/operation/postV2SeacatSaveAd)

The method creates campaign:

- with custom bid for promo items in search and/or recommendations
- with standard bid for promo items both in search and recommendations

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 5 requests | 12 s     | 5 requests |
| Service          | 1 min  | 5 requests | 12 s     | 5 requests |
| Base with secret | 1 min  | 5 requests | 12 s     | 5 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema    |
| ----- | ----------------- | --------- |
| `200` | Success           | `integer` |
| `400` | Bad request       | `string`  |
| `401` | Unauthorized      | `object`  |
| `403` | Access denied     | `object`  |
| `429` | Too many requests | `object`  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v2_seacat_save_ad(post_v2_seacat_save_ad_request=...)
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

const { data } = await api.postV2SeacatSaveAd(postV2SeacatSaveAdRequest);
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

result, _, err := client.PromotionAPI.PostV2SeacatSaveAd(context.Background()).Execute()
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

System.out.println(api.postV2SeacatSaveAd(postV2SeacatSaveAdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV2SeacatSaveAd());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV2SeacatSaveAd(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV2SeacatSaveAd());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v2_seacat_save_ad(&cfg, post_v2_seacat_save_ad_request).await;
    println!("{:#?}", result);
}
```

:::
