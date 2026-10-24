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

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `PatchV1BidsResponse200` |
| `400` | Bad request       | `response400`            |
| `401` | Unauthorized      | `object`                 |
| `403` | Access denied     | `object`                 |
| `429` | Too many requests | `object`                 |

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
client.setBearerToken(new SecretString("<your WB JWT>"));
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
