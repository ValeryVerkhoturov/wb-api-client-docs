---
title: "Listings in Trash"
description: "Returns the listings in trash. To get \\\\more than 100\\\\ listings, use pagination. 1. Make the first request:"
---

# Listings in Trash

```http
POST /content/v2/get/cards/trash
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2GetCardsTrash)

Returns the listings in trash.
To get \*\*more than 100\*\* listings, use pagination.

1. Make the first request:

```
        {
          "settings": {
            "sort": {
              "ascending": true
            },
            "cursor": {
              "limit": 100
            }
          }
        }
```

To get only listings that were transferred to the trash after data export, use ascending sorting: `"sort":{"ascending":true}`. 2. Copy `"trashedAt":"\*\*\*","nmID":\*\*\*` from the `cursor` in the response and insert into the `cursor` of your next request. 3. Make the next request. 4. Repeat 2 and 3 until `total` value in the response is less than the `limit` value in the request. This will mean you got all listings.
To get only listings that were transferred to the trash after the previous data export:

1. Save `"trashedAt":"\*\*\*","nmID":\*\*\*` from the `cursor` of the previous data export. When data export, use ascending sorting: `"sort":{"ascending":true}`.
2. Specify the `"cursor":{"trashedAt":"\*\*\*","nmID":"\*\*\*"}` saved fields in the first request. Keep using ascending sorting.
3. Save the `"cursor":{"trashedAt":"\*\*\*","nmID":"\*\*\*"}` fields from the last response of the current data export.

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

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                                                                                                |
| -------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locale` | query | `string` | no   | Language for response of the `name`, `value` and `object` fields: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Request body

`application/json` — schema `object`, required

- `settings` `object` — Settings
  - `sort` `object` — Sorting by `trashedAt` — date and time listings were transferred to the trash
    - `ascending` `boolean` — Sorting order: - `true` — ascending - `false` — descending
  - `cursor` `object` — Paginator
    - `limit` `integer<int64>` — Number of listings in the response
    - `trashedAt` `string` — Date and time the listing was transferred to the trash
    - `nmID` `integer<int64>` — WB item number for the next listing page
  - `filter` `object` — Filters
    - `textSearch` `string` — Seller item number, WB item number or SKU to search

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `PostV2GetCardsTrashResponse200` |
| `400` | Bad request       | `responseBodyContentError400`    |
| `401` | Unauthorized      | `object`                         |
| `402` | Payment required  | `object`                         |
| `403` | Access denied     | `responseBodyContentError403`    |
| `429` | Too many requests | `object`                         |

**Structure `200`:**

- `cards` `object[]` — Requested listings
  - `nmID` `integer<int64>` — WB item number
  - `vendorCode` `string` — Seller item number
  - `kizMarked` `boolean` — Confirmation that required labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is specified: - `true` — the seller confirms that required labeling code is applied to the item. - `false` — the seller does not confirm that required labeling code is applied to the item. Pass `true` in the request to confirm that the item has required labeling code. The item will not pass validation if there is no confirmation from the seller that required labeling code is applied to the item. To check if labeling code [Chestny ZNAK](https://chestnyznak.ru/en) is required, use the [Listings](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) method, the response field `needKiz`
  - `subjectID` `integer<int64>` — Subcategory ID
  - `subjectName` `string` — Subcategory name
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
  - `sizes` `object[]` — Item sizes
    - `chrtID` `integer<int64>` — Size ID
    - `techSize` `string` — Item size (eg S, M, L, XL, 42, 42-43)
    - `wbSize` `string` — Russian item size
    - `skus` `string[]` — Array of SKUs
  - `dimensions` `object` — Dimensions and weight of packed item in cm and kg
    - `length` `integer<int64>` — Length, cm
    - `width` `integer<int64>` — Width, cm
    - `height` `integer<int64>` — Height, cm
    - `weightBrutto` `number` — Weight, kg Number of decimal places <=3
    - `isValid` `boolean` — Potential inaccuracy of item dimensions: - `true` — not detected. `"isValid": true` does not guarantee that the dimensions are correct. In some cases (for example, when creating a new item category), `"isValid": true` will be returned for any values except zero. - `false` — the specified dimensions significantly differ from the average for the category (subcategory). it is recommended to double-check whether the item dimensions in the packaging are correctly specified in `centimeters`. The functionality of the listing, including the calculation of logistics and storage, will not be limited. Logistics and storage will continue to be calculated based on the current dimensions. Also, `"isValid": false` is returned when there are missing values or any dimension is zero.
  - `characteristics` `object[]` — Characteristics
    - `id` `integer<int64>` — Characteristic ID
    - `name` `string` — Characteristic name
    - `value` `object` — Characteristic value
  - `createdAt` `string` — Characteristics
  - `trashedAt` `string` — Date and time the listing was transferred to the trash
- `cursor` `object` — Paginator
  - `trashedAt` `string` — Date and time for the next listing page
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

result = api.post_v2_get_cards_trash(post_v2_get_cards_trash_request=..., locale=...)
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

const { data } = await api.postV2GetCardsTrash(postV2GetCardsTrashRequest, locale);
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

result, _, err := client.ItemsAPI.PostV2GetCardsTrash(context.Background()).PostV2GetCardsTrashRequest(postV2GetCardsTrashRequest).Locale(locale).Execute()
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

System.out.println(api.postV2GetCardsTrash(postV2GetCardsTrashRequest, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2GetCardsTrash($post_v2_get_cards_trash_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2GetCardsTrash(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2GetCardsTrash(postV2GetCardsTrashRequest));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_get_cards_trash(&cfg, post_v2_get_cards_trash_request, locale).await;
    println!("{:#?}", result);
}
```

:::
