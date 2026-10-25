---
title: "Listings"
description: "Returns the listings."
---

# Listings

```http
POST /content/v2/get/cards/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)

Returns the listings.

Listings from the trash are not provided in the method response. You can get these listings via [different method](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash)

To get \*\*more than 100\*\* listings, use pagination:

1. Make the first request:

```
        {
          "settings": {
            "sort": {
              "ascending": true
            },
            "cursor": {
              "limit": 100
            },
            "filter": {
              "withPhoto": -1
            }
          }
        }
```

To get only new or updated listings after data export, use ascending sorting: `"sort":{"ascending":true}`. 2. Copy `"updatedAt": "\*\*\*","nmID":"\*\*\*"` from the `cursor` in the response and insert into the `cursor` of your next request. 3. Make the next request. 4. Repeat 2 and 3 until `total` value in the response is less than the `limit` value in the request. This will mean you got all listings.
To get only items that were listed or updated after the previous data export:

1. Save the `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}` fields from the last response of the previous data export. When exporting the data, use ascending sorting: `"sort":{"ascending":true}`.
2. Specify the saved `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}` fields in the first request. Keep using ascending sorting.
3. Save the `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}` fields from the last response of the current data export.
   In the `documents` object, the method returns:

- information about the added documents — the `items` array
- the validation results for each document — the `verdict` object in `items'. If `verdict` is not returned in the response, the document validation is not completed yet
- the validation result for the entire listing — the `overallVerdict` object. During the listing validation, not only the results of the document validation are taken into account, but also other data. For example, the data of required labeling codes and information from external registries. If `overallVerdict` is not returned in the response, the listing validation is not completed yet
  Document and listing validations are performed asynchronously and can take up to 3 days.
  Each change in the validation result updates the date and time in the `updatedAt` response field.
  To get new validation results, use pagination uploads sorted in ascending order.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit        | Interval | Burst      |
| ------ | ------------ | -------- | ---------- |
| 1 min  | 100 requests | 600 ms   | 5 requests |

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                                                                                                |
| -------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locale` | query | `string` | no   | Language for response of the `name`, `value` and `object` fields: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Request body

`application/json` — schema `object`, required

- `settings` `object` — Settings
  - `sort` `object` — Sorting by `updatedAt` — date and time listings were updated
    - `ascending` `boolean` — Sorting order: - `false` — descending - `true` — ascending
  - `filter` `object` — Filters
    - `withPhoto` `integer<int64>` = `-1` | `0` | `1` | `2` — Photo: * `-1` — any listings * `0` — any listings * `1` — only listings with photos * `2` — only listings without photos
    - `textSearch` `string` — Seller item number, WB item number or SKU search
    - `tagIDs` `integer<int64>[]` — Label ID search
    - `allowedCategoriesOnly` `boolean` — Category: - `true` — permitted - `false` — forbidden Not used in the sandbox
    - `objectIDs` `integer<int64>[]` — Subcategory ID search
    - `brands` `string[]` — Brand search
    - `imtID` `integer<int64>` — [Merged listing ID](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) search
  - `cursor` `object` — Cursor
    - `limit` `integer<int64>` — Number of listings in the response
    - `updatedAt` `string` — Update date and time
    - `nmID` `integer<int64>` — WB item number for the next listing page

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `PostV2GetCardsListResponse200` |
| `400` | Bad request       | `responseBodyContentError400`   |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `responseBodyContentError403`   |
| `429` | Too many requests | `object`                        |

**Structure `200`:**

- `cards` `object[]` — Listings
  - `nmID` `integer<int64>` — WB item number
  - `imtID` `integer<int64>` — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID. The same for all WB item number of group of merged listings. Every listing has `imtID`, even if is not merged with any other listing
  - `nmUUID` `string<UUID>` — Internal system ID of the listing
  - `subjectID` `integer<int64>` — Subcategory ID
  - `subjectName` `string` — Subcategory name
  - `vendorCode` `string` — Seller item number
  - `brand` `string` — Brand
  - `title` `string` — Item title
  - `gtin` `string` — Additional GTIN. The field is returned only if an additional GTIN is specified. Only for sellers from the Russian
  - `description` `string` — Item description
  - `needKiz` `boolean` — Is labeling code [Chestny ZNAK](https://chestnyznak.ru/en) required for the item: - `false` — labeling code is not required -`true` — labeling code is required
  - `kizMarked` `boolean` — Is there the confirmation from the seller that required labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is applied to the item: - `true` — yes - `false` — no Whether labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is required is specified in the `needKiz` field
  - `photos` `object[]` — Photo array
    - `big` `string` — URL of `900x1200` photo
    - `c246x328` `string` — URL of `248x328` photo
    - `c516x688` `string` — URL of `516x688` photo
    - `square` `string` — URL of `600x600` photo
    - `tm` `string` — URL of `75x100` photo
  - `video` `string` — Video URL
  - `wholesale` `object` — B2B sale
    - `enabled` `boolean` — Is the item intended for sale only to B2B buyers: - `true` — the item is intended for sale only to B2B buyers - `false` — the item is intended for sale to B2B and B2C buyers
    - `quantum` `number<uint64>` — Minimum number of items in one cart of B2B buyer. Only when `"enable":true`
  - `dimensions` `object` — Dimensions and weight of packed item in cm and kg
    - `length` `integer<int64>` — Length, cm
    - `width` `integer<int64>` — Width, cm
    - `height` `integer<int64>` — Height, cm
    - `weightBrutto` `number` — Weight, kg Number of decimal places <=3
    - `isValid` `boolean` — Potential inaccuracy of item dimensions: - `true` — not detected. `"isValid": true` does not guarantee that the dimensions are correct. In some cases (for example, when creating a new item category), `"isValid": true` will be returned for any values except zero. - `false` — the specified dimensions significantly differ from the average for the category (subcategory). it is recommended to double-check whether the item dimensions in the packaging are correctly specified in `centimeters`. The functionality of the listing, including the calculation of logistics and storage, will not be limited. Logistics and storage will continue to be calculated based on the current dimensions. Also, `"isValid": false` is returned when there are missing values or any dimension is zero.
  - `documents` `object` — Documents added to the listing. Validation results for each document specified in `items`. Validation result of the entire listing specified in `overallVerdict`
    - `items` `object[]` — Document list and validation results for each document
      - `id` `string` — Document ID
      - `type` `integer<int64>` — Document type: - `1` — Certificate of Conformity - `2` — The Correspondence Declaration - `3` — Certificate of Registration of SGR - `4` — Registration Certificate - `5` — Certificate of Registration of the Republic of Belarus - `7` — Registration of a Pesticide - `8` — Registration of an Agrochemical - `9` — Medicine Registration Certificate
      - `number` `string` — Document number
      - `productNumber` `string` — Additional document number
      - `tradeName` `string` — Trade name
      - `applicant` `string` — Representative of the medical device manufacturer
      - `startDate` `string` — Document start date and time
      - `endDate` `string` — Document end date and time
      - `isEndless` `boolean` — Is the document valid indefinitely: - `true` — yes, the document is indefinite - `false` — no, the document has an expiration date
      - `verdict` `object` — Document validation result. Returns when the document validation is completed
        - `verified` `boolean` — - `true` — the document is validated - `false` — the document is not validated
        - `status` `integer<int64>` — Document validation result: - `1` — validation passed - `2` — validation failed
        - `reason` `reasonDocument`
        - `additionalData` `object` — Additional data
        - `createdAt` `string` — Listing validation date
      - `createdAt` `string` — Date the document was added
    - `overallVerdict` `object` — The overall result of the entire listing validation. Returns when the validation is completed. The results of current documents validation and the overall result of the listing may vary. For example, a listing can pass validation if the required document passed validation, but the additional document failed
      - `isFullyChecked` `boolean` — - `true` — the listing is validated - `false` — the listing is not validated
      - `status` `integer<int64>` — Listing validation result: - `1` — validation passed - `2` — validation failed
      - `reason` `reasonListing`
      - `createdAt` `string` — Listing validation date and time
    - `excludeDocuments` `boolean` — Seller confirmation that no permits are required for the item: - `true` — yes, seller confirms that no permits are required. All values passed to `documents` will be replaced with empty values - `false` — no, seller does not confirm that no permits are required Whether the permits are required is checked when creating and changing the listing. If permits are required for the item and the value `true` is specified, the listing will not pass validation
  - `characteristics` `object[]` — Characteristics
    - `id` `integer<int64>` — Characteristic ID
    - `name` `string` — Characteristic name
    - `value` `object` — Characteristic value
  - `sizes` `object[]` — Item sizes
    - `chrtID` `integer<int64>` — Size ID
    - `techSize` `string` — Size (for example, S or 42)
    - `wbSize` `string` — Russian size
    - `skus` `string[]` — SKU
  - `tags` `object[]` — Labels
    - `id` `integer<int64>` — Label ID
    - `name` `string` — Label name
    - `color` `string` — Label color: - `D1CFD7` — grey - `FEE0E0` — red - `ECDAFF` — purple - `E4EAFF` — blue - `DEF1DD` — green - `FFECC7` — yellow
  - `createdAt` `string` — Creation date and time
  - `updatedAt` `string` — Update date and time
- `cursor` `object` — Paginator
  - `updatedAt` `string` — Date and time for the next listing page
  - `nmID` `integer<int64>` — WB item number for the next listing page
  - `total` `integer<int64>` — Number of listings

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

result = api.post_v2_get_cards_list(post_v2_get_cards_list_request=..., locale=...)
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

const { data } = await api.postV2GetCardsList(postV2GetCardsListRequest, locale);
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

result, _, err := client.ItemsAPI.PostV2GetCardsList(context.Background()).PostV2GetCardsListRequest(postV2GetCardsListRequest).Locale(locale).Execute()
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

System.out.println(api.postV2GetCardsList(postV2GetCardsListRequest, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2GetCardsList($post_v2_get_cards_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2GetCardsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2GetCardsList(postV2GetCardsListRequest));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_get_cards_list(&cfg, post_v2_get_cards_list_request, locale).await;
    println!("{:#?}", result);
}
```

:::
