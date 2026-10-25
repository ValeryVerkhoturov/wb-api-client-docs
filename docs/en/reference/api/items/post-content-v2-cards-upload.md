---
title: "List Items"
description: "Lists items. You can specify item description and characteristics. How to list an item: 1. Get parent categories list 2. Get the category and get all…"
---

# List Items

```http
POST /content/v2/cards/upload
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listing Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)

Lists items. You can specify item description and characteristics.
How to list an item:

1. Get [parent categories list](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectParentAll)
2. Get [the category and get all subcategories](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll)
3. Choose [the subcategory and get all available characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId). For `Color`, `Gender`, `Country of origin`, `Season`, `VAT rate`, `HS-code` characteristics use values from [category](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics).
4. Send the request. If the response is Success (`200`) but the item was not listed, check errors using [failed listing with errors](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList) method.
   The dimensions of the items can only be specified in `centimeters`, and the weight of packed items must be specified in `kilograms`.
   With one request you can list maximum 100 individual items or 100 groups of [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings, 30 listings (`nmID`) in each. Maximum request size is 10 Mb.
   Items are listed asynchronously. The process of synchronizing a new listing with services may take up to 30 minutes. During this time, you can't add inventory to warehouses and set prices. In the sandbox, the product card is created immediately, without waiting.

To add documents to the listing, pass the document data in the `documents` request object.
To confirm that no documents are required for the item, pass `true` in the `excludeDocuments` parameter.

Document validation is performed asynchronously and can take up to 3 days. When the listing or document is changed, the validation is started again.
The validation results are displayed in the [listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), the `documents` object:

- the result for each document in the `verdict` fields of the `items` object. If `verdict` is not returned in the response, the document validation is not completed yet
- the final overall result for the listing in the `overallVerdict` field. During the listing validation, not only the results of the document validation are taken into account, but also other data. For example, the data of required labeling codes and information from external registries. If `overallVerdict` is not returned in the response, the listing validation is not completed yet

The types of documents that you can add for the item are specified in [subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId).

Not all the documents that you can add are required and are being validated. You independently determine which permits are required for the item in accordance with the law.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit       | Interval | Burst      |
| ------ | ----------- | -------- | ---------- |
| 1 min  | 10 requests | 6 s      | 5 requests |

## Request body

`application/json` — schema `object[]`, optional

## Responses

| Code  | Description                                   | Schema                         |
| ----- | --------------------------------------------- | ------------------------------ |
| `200` | Success                                       | `responseItemList`             |
| `400` | Bad request                                   | `responseBodyContentError400`  |
| `401` | Unauthorized                                  | `object`                       |
| `402` | Payment required                              | `object`                       |
| `403` | Access denied                                 | `object`                       |
| `413` | The request body size exceeds the given limit | `PostV2CardsUploadResponse413` |
| `429` | Too many requests                             | `object`                       |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_upload(post_v2_cards_upload_request_inner=...)
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

const { data } = await api.postV2CardsUpload(postV2CardsUploadRequestInner);
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

result, _, err := client.ItemsAPI.PostV2CardsUpload(context.Background()).Execute()
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

System.out.println(api.postV2CardsUpload(postV2CardsUploadRequestInner));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsUpload());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsUpload(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsUpload());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_cards_upload(&cfg, post_v2_cards_upload_request_inner).await;
    println!("{:#?}", result);
}
```

:::
