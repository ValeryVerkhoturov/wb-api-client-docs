---
title: "List of Campaign Minus Phrases"
description: "The method returns a list of minus phrases by: - campaign IDs - WB item numbers"
---

# List of Campaign Minus Phrases

```http
POST /adv/v0/normquery/get-minus
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Search Clusters · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/searchClusters/operation/postV0NormqueryGetMinus)

The method returns a list of minus phrases by:

- campaign IDs
- WB item numbers

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst       |
| ---------------- | ------ | ---------- | -------- | ----------- |
| Personal         | 1 s    | 5 requests | 200 ms   | 10 requests |
| Service          | 1 s    | 5 requests | 200 ms   | 10 requests |
| Base with secret | 1 s    | 5 requests | 200 ms   | 10 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request   |

## Request body

`application/json` — schema `V0GetNormQueryMinusRequest`, required

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `V0GetNormQueryMinusResponse` |
| `400` | Bad request       | `response400`                 |
| `401` | Unauthorized      | `object`                      |
| `403` | Access denied     | `StandardizedBatchError`      |
| `429` | Too many requests | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v0_normquery_get_minus(v0_get_norm_query_minus_request=...)
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

const { data } = await api.postV0NormqueryGetMinus(v0GetNormQueryMinusRequest);
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

result, _, err := client.PromotionAPI.PostV0NormqueryGetMinus(context.Background()).V0GetNormQueryMinusRequest(v0GetNormQueryMinusRequest).Execute()
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

System.out.println(api.postV0NormqueryGetMinus(v0GetNormQueryMinusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV0NormqueryGetMinus($v0_get_norm_query_minus_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV0NormqueryGetMinus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV0NormqueryGetMinus(v0GetNormQueryMinusRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v0_normquery_get_minus(&cfg, v0_get_norm_query_minus_request).await;
    println!("{:#?}", result);
}
```

:::
