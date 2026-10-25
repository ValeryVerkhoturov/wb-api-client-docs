---
title: "Item Recommendations List"
description: "Method is available by Personal token, Service token"
---

# Item Recommendations List

```http
POST /api/content/v1/recommendations/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Recommendations · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/recommendations/operation/postV1RecommendationsList)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns item [recommendations](https://seller.wildberries.ru/recommendations-v3) list.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit        | Interval | Burst      |
| ------ | ------------ | -------- | ---------- |
| 1 min  | 100 requests | 600 ms   | 5 requests |

## Request body

`application/json` — schema `GetRecomReq`, optional

- `brandNames` `string[]` — Brands
- `limit` `integer<int64>` — Number of items in the response
- `next` `integer<int64>` — Cursor. The last `nmId` in the response
- `search` `string` — Search: - by WB item number `nmId` — full match - by seller item number `vendorCode` — partial match
- `subjectIds` `integer<int64>[]` — Subject IDs

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `GetRecomRes`         |
| `400` | Bad request       | `response400GetRecom` |
| `401` | Unauthorized      | `object`              |
| `403` | Access denied     | `Response4XX`         |
| `429` | Too many requests | `object`              |

**Structure `200`:**

- `data` `object[]` — Data about items and their recommendations
  - `nmId` `integer<int64>` — WB item number
  - `imtId` `integer<int64>` — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID
  - `vendorCode` `string` — Seller item number
  - `brandName` `string` — Brand
  - `updatedAt` `string` — Date and time of the last recommendations update
  - `picsCount` `integer<int64>` — Number of listing pics
  - `title` `string` — Item name
  - `subjectName` `string` — Subject
  - `pic` `string` — URL of the main listing pic
  - `recomCount` `integer<int64>` — Number of recommended items
  - `recomPics` `string[]` — List of URLs of the recommended items' main pics
  - `recomNms` `integer<int64>[]` — List of recommended items' `nmId`
- `next` `integer<int64>` — Cursor. The last `nmId` in the response

**Structure `400`:**

- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `title` `string` — Error title
- `detail` `string` — Error details

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
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v1_recommendations_list(get_recom_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.postV1RecommendationsList(getRecomReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV1RecommendationsList(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV1RecommendationsList(getRecomReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV1RecommendationsList());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV1RecommendationsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV1RecommendationsList());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v1_recommendations_list(&cfg, get_recom_req).await;
    println!("{:#?}", result);
}
```

:::
