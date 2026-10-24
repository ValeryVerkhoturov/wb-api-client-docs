---
title: "Changing Placements in Campaigns with Custom Bid"
description: "The method allows you to change placements in campaigns with custom bid and per mille payment model — cpm."
---

# Changing Placements in Campaigns with Custom Bid

```http
PUT /adv/v0/auction/placements
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaign Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/putV0AuctionPlacements)

The method allows you to change placements in campaigns with custom bid and per mille payment model — `cpm`.

For campaigns in statuses `4`, `9` and `11`.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 s    | 1 request  | 1 s      | 1 request |
| Service          | 1 s    | 1 request  | 1 s      | 1 request |
| Base with secret | 1 s    | 1 request  | 1 s      | 1 request |
| Base             | 1 h    | 2 requests | 30 min   | 1 request |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description       | Schema        |
| ----- | ----------------- | ------------- |
| `204` | Success           | —             |
| `400` | Bad request       | `response400` |
| `401` | Unauthorized      | `object`      |
| `403` | Access denied     | `object`      |
| `429` | Too many requests | `object`      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.put_v0_auction_placements(put_v0_auction_placements_request=...)
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

const { data } = await api.putV0AuctionPlacements(putV0AuctionPlacementsRequest);
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

result, _, err := client.PromotionAPI.PutV0AuctionPlacements(context.Background()).PutV0AuctionPlacementsRequest(putV0AuctionPlacementsRequest).Execute()
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

System.out.println(api.putV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0AuctionPlacements($put_v0_auction_placements_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0AuctionPlacements(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::put_v0_auction_placements(&cfg, put_v0_auction_placements_request).await;
    println!("{:#?}", result);
}
```

:::
