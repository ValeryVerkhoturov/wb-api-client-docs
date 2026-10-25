---
title: "Update Listings"
description: "Edits listings. Also use it to add new sizes."
---

# Update Listings

```http
POST /content/v2/cards/update
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)

Edits listings. Also use it to add new sizes.

The listing is overwritten when updated. So the request must also include those listing parameters that you are not going to update. To get their values, use [Listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) and [Listings in Trash](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash).

When the Listing is updated, the **documents** object is also completely overwritten. In the request, send the all documents data that should remain in the listing, including documents without changes.

You cannot use this method to update or delete:

- item size SKUs. You can only add additional SKUs
- the `photos`, `video` and `tags` parameters
- prices of items. The price can only be set if you add new sizes
  When adding a new size, specify its price using the `price` parameter. If no `price` is specified in the request, the size price will be `0`. In this case, you can update it using the methods:
- [Set Prices and Discounts](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask), if [item](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter) has `"editablePriceSize":false`
- [Set Size Prices](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize), if [item](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter) has `"editablePriceSize":true`
  The dimensions of the items can only be specified in `centimeters`, and the weight of packed items must be specified in `kilograms`.

If this method response is Success (`200`) but listing was not updated, check errors using [failed listings with errors](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList) method.
With one request you can edit maximum 3000 listings (`nmID`). Maximum request size is 10 Mb.
The process of synchronizing data with services may take up to 30 minutes. During this time, you can't add inventory to warehouses and set prices.
To add documents to the listing, pass the document data in the `documents` request object.
To update the added document, pass document ID `id` and data in the `documents` request object. To get the `id` use [listings](https://dev.wildberries.ru/item-management#tag/listings/operation/postV2GetCardsList) method.
When the listing or document is changed, the validation is started again.

Document validation is performed asynchronously and can take up to 3 days.
You can update the listing again before completing the current validation. In this case, the validation will be started again, and the listing will retain its current status until the new validation is completed.
If the listing was available for sale before the document was updated, it will be available until a new validation result is received. If the card has already been blocked, then after updating the data, it will remain blocked until a positive result of repeated validation is received.

The validation results are displayed in the [listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), the `documents` object:

- the result for each document in the `verdict` fields of the `items` object. If `verdict` is not returned in the response, the document validation is not completed yet.
- the final overall result for the listing in the `overallVerdict` field. During the listing validation, not only the results of the document validation are taken into account, but also other data. For example, the data of required labeling codes and information from external registries. If `overallVerdict` is not returned in the response, the listing validation is not completed yet.

The types of documents that you can add for the item are specified in [subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId).

Not all the documents that you can add are required and are being validated. You independently determine which permits are required for the item in accordance with the law.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit       | Interval | Burst      |
| ------ | ----------- | -------- | ---------- |
| 1 min  | 10 requests | 6 s      | 5 requests |

## Request body

`application/json` — schema `object[]`, optional

- `nmID` `integer<int64>` (required) — WB item number
- `vendorCode` `string` (required) — Seller item number
- `kizMarked` `boolean` — Confirmation that required labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is specified: - `true` — the seller confirms that required labeling code is applied to the item. - `false` — the seller does not confirm that required labeling code is applied to the item. Pass `true` in the request to confirm that the item has required labeling code. The item will not pass validation if there is no confirmation from the seller that required labeling code is applied to the item. To check if labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is required, use the [Listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) method, the response field `needKiz`
- `brand` `string` — Brand
- `title` `string` — Item title
- `gtin` `string` — Additional GTIN. Specify this parameter if you have previously indicated the same GTIN in the `skus` parameter of one of the listings. It is not possible to specify the same GTIN in `skus` for different listings or item sizes. Only for sellers from the Russian
- `description` `string` — Item description. The maximum number of characters depends on the item category Standard — 2000, minimum — 1000, maximum — 5000 More details about \*\*rules for filling out the listing\*\* in [Instructions](https://seller.wildberries.ru/instructions/ru/ru/material/how-to-create-card) category of sellers portal
- `dimensions` `object` — Dimensions and weight of the item \*\*with packaging\*\*. Specify in `centimeters` and `kilograms` for any item. The process of synchronizing new data with service may take up to 30 minutes
  - `length` `integer<int64>` — Length, cm
  - `width` `integer<int64>` — Width, cm
  - `height` `integer<int64>` — Height, cm
  - `weightBrutto` `number` — Weight, kg Number of decimal places <=3
- `documents` `object` — Listing permits
  - `items` `object[]` — Permits list and their data
    - `id` `string` — Document ID attached to the listing. Specify the `id` to rewrite previously attached document. The document ID is specified in the [listings](https://dev.wildberries.ru/item-management#tag/listings/operation/postV2GetCardsList). To add a new document, you do not need to specify the `id`.
    - `type` `integer<int64>` — Document type. The types of documents that you can add for the item are listed in [subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId) in the `charcID` field. Possible document types:: - `1` — Certificate of Conformity. You can specify for `charcID`: 15001136, 15001137, 15001138 - `2` — The Correspondence Declaration. You can specify for `charcID`: 15001135, 15001137, 15001138 - `3` — Certificate of Registration of SGR. You can specify for `charcID`: 62945173, 15000785, 15004302 - `4` — Registration Certificate. You can specify for `charcID`: 15001574, 15002355, 15002356, 15002357 - `5` — Certificate of Registration of the Republic of Belarus. You can specify for `charcID`: 15003071, 15003939 - `7` — Registration of a Pesticide. You can specify for `charcID`: 15003924, 15003925 - `8` — Registration of an Agrochemical. You can specify for `charcID`: 15003920, 15003921 - `9` — Medicine Registration Certificate. You can specify for `charcID`: 1897013, 15004284
    - `number` `string` — Document number
    - `productNumber` `string` — Additional document number
    - `tradeName` `string` — Trade name
    - `applicant` `string` — Representative of the medical device manufacturer
    - `startDate` `string` — Document start date and time
    - `endDate` `string` — Document end date and time
    - `isEndless` `boolean` — Is the document valid indefinitely: - `true` — yes, the document is indefinite - `false` — no, the document has an expiration date
  - `excludeDocuments` `boolean` — Seller confirmation that no documents are required for the item: - `true` — yes, seller confirms that no documents are required. All values passed to `documents` will be replaced with empty values - `false` — no, seller does not confirm that no documents are required Whether the documents are required is checked when creating and changing the listing. If documents are required for the item and the value `true` is specified, the listing will not pass validation
- `characteristics` `object[]` — Item characteristics Use the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId) method to get characteristics of the item
  - `id` `integer<int64>` (required) — Characteristic ID
  - `value` `object` (required) — Characteristic values. Data type — array of strings or number — depends on the characteristic data type. For more details see the description of the `charcType` field in the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/operation/getV2ObjectCharcsSubjectId) method. The allowed number of values is specified in the `maxCount` field of the [Subcategory characteristics](https://dev.wildberries.ru/openapi/item-management#tag/operation/getV2ObjectCharcsSubjectId) method
- `sizes` `object[]` (required) — Item sizes If item has no sizes, send only SKUs
  - `chrtID` `integer<int64>` — WB item number of this size Required for existing sizes If you add new size, do not send this ID
  - `techSize` `string` — Size (for example, XL, S, 45)
  - `wbSize` `string` — Russian size
  - `price` `integer<int64>` — Price, ₽ Specified when adding the size
  - `skus` `string[]` — SKUs

## Responses

| Code  | Description                                   | Schema                         |
| ----- | --------------------------------------------- | ------------------------------ |
| `200` | Success                                       | `responseItemList`             |
| `400` | Bad request                                   | `responseBodyContentError400`  |
| `401` | Unauthorized                                  | `object`                       |
| `402` | Payment required                              | `object`                       |
| `403` | Access denied                                 | `responseBodyContentError403`  |
| `413` | The request body size exceeds the given limit | `PostV2CardsUpdateResponse413` |
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

- `data` `object` — Error data
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `string` — Additional errors

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

result = api.post_v2_cards_update(post_v2_cards_update_request_inner=...)
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

const { data } = await api.postV2CardsUpdate(postV2CardsUpdateRequestInner);
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

result, _, err := client.ItemsAPI.PostV2CardsUpdate(context.Background()).Execute()
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

System.out.println(api.postV2CardsUpdate(postV2CardsUpdateRequestInner));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsUpdate());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsUpdate(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsUpdate());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_cards_update(&cfg, post_v2_cards_update_request_inner).await;
    println!("{:#?}", result);
}
```

:::
