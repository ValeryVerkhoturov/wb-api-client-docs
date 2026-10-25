---
title: "Active and Inactive Search Cluster Lists"
description: "Returns lists of active and inactive search clusters with at least 100 views."
---

# Active and Inactive Search Cluster Lists

```http
POST /adv/v0/normquery/list
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Search Clusters · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/searchClusters/operation/postV0NormqueryList)

Returns lists of active and inactive search clusters with at least 100 views.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst       |
| ---------------- | ------ | ---------- | -------- | ----------- |
| Personal         | 1 s    | 5 requests | 200 ms   | 10 requests |
| Service          | 1 s    | 5 requests | 200 ms   | 10 requests |
| Base with secret | 1 s    | 5 requests | 200 ms   | 10 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request   |

## Request body

`application/json` — schema `V0GetNormQueryListRequest`, required

- `items` `V0GetNormQueryListRequestItem[]` (required)
  - `advertId` `integer<int64>` (required) — Campaign ID
  - `nmId` `integer<int64>` (required) — WB item number

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `V0GetNormQueryListResponse` |
| `400` | Bad request       | `response400`                |
| `401` | Unauthorized      | `object`                     |
| `403` | Access denied     | `object`                     |
| `429` | Too many requests | `object`                     |

**Structure `200`:**

- `items` `V0GetNormQueryListResponseItem[]`
  - `advertId` `integer<int64>` — Campaign ID
  - `nmId` `integer<int64>` — WB item number
  - `normQueries` `V0GetNormQueryListResponseItemNormQueries`
    - `active` `string[]` — Active search clusters
    - `excluded` `string[]` — Inactive search clusters
    - `archived` `string[]` — Archived search clusters

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

result = api.post_v0_normquery_list(v0_get_norm_query_list_request=...)
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

const { data } = await api.postV0NormqueryList(v0GetNormQueryListRequest);
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

result, _, err := client.PromotionAPI.PostV0NormqueryList(context.Background()).V0GetNormQueryListRequest(v0GetNormQueryListRequest).Execute()
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

System.out.println(api.postV0NormqueryList(v0GetNormQueryListRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV0NormqueryList($v0_get_norm_query_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV0NormqueryList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV0NormqueryList(v0GetNormQueryListRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v0_normquery_list(&cfg, v0_get_norm_query_list_request).await;
    println!("{:#?}", result);
}
```

:::
