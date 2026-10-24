---
title: "List Items with Merge"
description: "The method lists items by merging it with existing individual listings and groups of merged listings. There can be no more than 30 listings in one group of…"
---

# List Items with Merge

```http
POST /content/v2/cards/upload/add
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listing Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)

The method lists items by merging it with existing individual listings and groups of [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings. There can be no more than 30 listings in one group of merged listings, respectively, you can list no more than 29 items in one request.

The dimensions of the items can only be specified in `centimeters`, and the weight of packed items must be specified in `kilograms`.
If this method response is Success (`200`) but listing was not updated, check errors using [failed listings with errors](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList) method.
Items are listed asynchronously. The process of synchronizing a new listing with services may take up to 30 minutes. During this time, you can't add inventory to warehouses and set prices. In the sandbox, the product card is created immediately, without waiting.

To add documents to the listing, pass the document data in the `documents` request object.
To confirm that no documents are required for the item, pass `true` in the `excludeDocuments` parameter.
Document validation is performed asynchronously and can take up to 3 days. When the listing or document is changed, the validation is started again.
The validation results are displayed in the [listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), the `documents` object:

- the result for each document in the `verdict` fields of the `items` object. If `verdict` is not returned in the response, the document validation is not completed yet.
- the final overall result for the listing in the `overallVerdict` field. During the listing validation, not only the results of the document validation are taken into account, but also other data. For example, the data of required labeling codes and information from external registries. If `overallVerdict` is not returned in the response, the listing validation is not completed yet.

The types of documents that you can add for the item are specified in [subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId).

Not all the documents that you can add are required and are being validated. You independently determine which permits are required for the item in accordance with the law.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 10 requests | 6 s      | 5 requests |
| Service          | 1 min  | 10 requests | 6 s      | 5 requests |
| Base with secret | 1 min  | 10 requests | 6 s      | 5 requests |
| Base             | 2 h    | 1 request   | 2 h      | 1 request  |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description                                   | Schema                            |
| ----- | --------------------------------------------- | --------------------------------- |
| `200` | Success                                       | `responseItemList`                |
| `400` | Bad request                                   | `responseBodyContentError400`     |
| `401` | Unauthorized                                  | `object`                          |
| `402` | Payment required                              | `object`                          |
| `403` | Access denied                                 | `object`                          |
| `413` | The request body size exceeds the given limit | `PostV2CardsUploadAddResponse413` |
| `429` | Too many requests                             | `object`                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_upload_add(post_v2_cards_upload_add_request=...)
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

const { data } = await api.postV2CardsUploadAdd(postV2CardsUploadAddRequest);
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

result, _, err := client.ItemsAPI.PostV2CardsUploadAdd(context.Background()).Execute()
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

System.out.println(api.postV2CardsUploadAdd(postV2CardsUploadAddRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsUploadAdd());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsUploadAdd(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsUploadAdd());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_cards_upload_add(&cfg, post_v2_cards_upload_add_request).await;
    println!("{:#?}", result);
}
```

:::
