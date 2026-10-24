---
title: "Merging or Separating of Listings"
description: "The method merges and separates listings. Listings are merged if they have the same imtID."
---

# Merging or Separating of Listings

```http
POST /content/v2/cards/moveNm
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsMoveNm)

The method [merges and separates](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings. Listings are merged if they have the same `imtID`.

To merge listings, make a request \*\*specifying\*\* the `imtID`. You can merge up to 30 listings at a time.
To separate listings, make a request \*\*without specifying\*\* the `imtID`. New `imtID`s will be generated for the separated listings.

If you separate multiple listings simultaneously, these listings will merge into one and receive a new `imtID`.
To assign a unique `imtID` to each listing, you need to send one listing per request.

The maximum request size is 10 MB.

It is possible to merge listings containing only the same subcategories

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Content** category:

| Period                      | Limit        | Interval | Burst      |
| --------------------------- | ------------ | -------- | ---------- |
| 1 min                       | 100 requests | 600 ms   | 5 requests |
| Exceptions are the methods: |

- [creating listings](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- [creating listings with merge](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)
- [editing listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [recovering product card from trash](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsRecover)
- [getting item recommendation list](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsList)
- [setting item recommendations](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsSet)

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Content** methods in total.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description                                   | Schema             |
| ----- | --------------------------------------------- | ------------------ |
| `200` | Success                                       | `responseItemList` |
| `400` | Bad request                                   | `object`           |
| `401` | Unauthorized                                  | `object`           |
| `402` | Payment required                              | `object`           |
| `403` | Access denied                                 | `responseItemList` |
| `413` | The request body size exceeds the given limit | `string`           |
| `429` | Too many requests                             | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_move_nm(post_v2_cards_move_nm_request=...)
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

const { data } = await api.postV2CardsMoveNm(postV2CardsMoveNmRequest);
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

result, _, err := client.ItemsAPI.PostV2CardsMoveNm(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2CardsMoveNm(postV2CardsMoveNmRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsMoveNm());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsMoveNm(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsMoveNm());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_cards_move_nm(&cfg, post_v2_cards_move_nm_request).await;
    println!("{:#?}", result);
}
```

:::
