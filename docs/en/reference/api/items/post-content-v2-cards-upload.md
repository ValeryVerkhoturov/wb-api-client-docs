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

- `subjectID` `integer<int64>` (required) — Subcategory ID
- `variants` `object[]` (required) — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings. To list individual item, pass only one object.
  - `brand` `string` — Brand
  - `title` `string` — Item title
  - `gtin` `string` — Additional GTIN. Specify this parameter if you have previously indicated the same GTIN in the `skus` parameter of one of the listings. It is not possible to specify the same GTIN in `skus` for different listings or item sizes. Only for sellers from the Russian
  - `description` `string` — Item description. The maximum number of characters depends on the item category Standard — 2000, minimum — 1000, maximum — 5000 More details about \*\*rules for filling out the listing\*\* in [Instructions](https://seller.wildberries.ru/instructions/ru/ru/material/how-to-create-card) category of sellers portal
  - `vendorCode` `string` (required) — Seller item number
  - `kizMarked` `boolean` — Confirmation that required labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is specified: - `true` — the seller confirms that required labeling code is applied to the item - `false` — the seller does not confirm that required labeling code is applied to the item. Pass `true` in the request to confirm that the item has required labeling code. The item will not pass validation if there is no confirmation from the seller that required labeling code is applied to the item To check if labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is required, use the [Listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) method, the response field `needKiz`
  - `wholesale` `object` — B2B sale
    - `enabled` `boolean` — Is the item intended for sale only to B2B buyers: - `true` — the item is intended for sale only to B2B buyers - `false` — the item is intended for sale to B2B and B2C buyers
    - `quantum` `number<uint64>` — Minimum number of items in one cart of B2B buyer. Only when `"enable":true`
  - `dimensions` `object` — Dimensions and weight of the item \*\*with packaging\*\*. Specify in `centimeters` and `kilograms` for any item. If the data is not specified, zero values ​​for length, width, height and weight will be automatically generated. The process of synchronizing new data with service may take up to 30 minutes
    - `length` `integer<int64>` — Length, cm
    - `width` `integer<int64>` — Width, cm
    - `height` `integer<int64>` — Height, cm
    - `weightBrutto` `number` — Weight, kg Number of decimal places <=3
  - `sizes` `object[]` — Item sizes. If the item has sizes but you send empty parameter, it is generated automatically with values: `techSize` = "A", `wbSize` = "1" and some random SKU
    - `techSize` `string` — Item size (for example, L or 45)
    - `wbSize` `string` — Russian size
    - `price` `integer<int64>` — Price, ₽
    - `skus` `string[]` — Array of SKUs for the size. If not specified, SKU is generated automatically. Allows linking multiple SKUs to one size, for example, for different batches of the item
  - `characteristics` `object[]` — Item characteristics. Use the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId) method to get characteristics of the item
    - `id` `integer<int64>` (required) — Characteristic ID
    - `value` `object` (required) — Characteristic values. Data type — array of strings or number — depends on the characteristic data type. For more details see the description of the `charcType` field in the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/operation/getV2ObjectCharcsSubjectId) method. The allowed number of values is specified in the `maxCount` field of the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/operation/getV2ObjectCharcsSubjectId) method
  - `documents` `object` — Listing permits
    - `items` `documentsRequest[]` — Permits list and data. The document type `type` is required for each document
      - `type` `integer<int64>` — Document type. The types of documents that you can add for the item are listed in [subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId) in the `charcID` field. Possible document types:: - `1` — Certificate of Conformity. You can specify for `charcID`: 15001136, 15001137, 15001138 - `2` — The Correspondence Declaration. You can specify for `charcID`: 15001135, 15001137, 15001138 - `3` — Certificate of Registration of SGR. You can specify for `charcID`: 62945173, 15000785, 15004302 - `4` — Registration Certificate. You can specify for `charcID`: 15001574, 15002355, 15002356, 15002357 - `5` — Certificate of Registration of the Republic of Belarus. You can specify for `charcID`: 15003071, 15003939 - `7` — Registration of a Pesticide. You can specify for `charcID`: 15003924, 15003925 - `8` — Registration of an Agrochemical. You can specify for `charcID`: 15003920, 15003921 - `9` — Medicine Registration Certificate. You can specify for `charcID`: 1897013, 15004284
      - `number` `string` — Document number
      - `productNumber` `string` — Additional document number
      - `tradeName` `string` — Trade name
      - `applicant` `string` — Representative of the medical device manufacturer
      - `startDate` `string` — Document start date and time
      - `endDate` `string` — Document end date and time
      - `isEndless` `boolean` — Is the document valid indefinitely: - `true` — yes, the document is indefinite - `false` — no, the document has an expiration date
    - `excludeDocuments` `boolean` — Seller confirmation that no permits are required for the item: - `true` — yes, seller confirms that no permits are required. All values passed to `documents` will be replaced with empty values - `false` — no, seller does not confirm that no permits are required Whether the permits are required is checked when creating and changing the listing. If permits are required for the item and the value `true` is specified, the listing will not pass validation

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

**Structure `200`:**

- `data` `object` — Response data
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `object` — Any additional errors
  - one of: `object`, `string`, `object`

**Structure `400`:**

- `data` `object` — Error data
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `object` — Additional errors

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `413`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code

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
