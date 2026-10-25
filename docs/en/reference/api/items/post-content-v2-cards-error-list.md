---
title: "Failed Listings with Errors"
description: "Returns the listings (drafts) and the list of errors encountered during listing creation or editing."
---

# Failed Listings with Errors

```http
POST /content/v2/cards/error/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

Returns the listings ([drafts](https://seller.wildberries.ru/new-goods/error-cards)) and the list of errors encountered during listing creation or editing.

The data is returned in batches. One batch contains:

- all errors for one `variants` array in one request during listings [creation](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- all errors in one request during listings [creation with merge](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd) or [editing](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate).

To get more than 100 batches, use pagination:

1. Make first request:

```
        {
          "cursor": {
            "limit": 100
          },
          "order": {
            "ascending": true
          }
        }
```

2. Copy `"updatedAt":"\*\*\*","batchUUID":"\*\*\*"` from the response `cursor` and paste into the request `cursor`.
3. Repeat the request.
4. Repeat 2 and 3, until you receive in the response `"next":false`. This will mean that you have received all the batches.

To delete listing from the errors list, repeat the request for creating or creating with merge and updating request with fixed errors

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for the following methods:

- [getting limits for the listings](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/getV2CardsLimits)
- [getting failed listings with errors](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

| Period | Limit       | Interval | Burst      |
| ------ | ----------- | -------- | ---------- |
| 1 min  | 10 requests | 6 s      | 5 requests |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                                                             |
| -------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | no   | Language of subcategory names: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Request body

`application/json` — schema `requestPublicViewerPublicErrorsTableListV2`, required

- `cursor` `swagger.PublicErrorsCursorInput`
  - `limit` `number<int>` — Number of batches in the response
  - `updatedAt` `string` — Date and time of generation of the last batch in the response to the previous request
  - `batchUUID` `string<UUID>` — The ID of the last batch in the response to the previous request
- `order` `swagger.PublicErrorsOrderV2`
  - `ascending` `boolean` — - `false` — sort in descending - `true` — sort in ascending

## Responses

| Code  | Description       | Schema                                        |
| ----- | ----------------- | --------------------------------------------- |
| `200` | Success           | `responsePublicViewerPublicErrorsTableListV2` |
| `400` | Bad request       | `responseBodyContentError400`                 |
| `401` | Unauthorized      | `object`                                      |
| `403` | Access denied     | `responseBodyContentError403`                 |
| `429` | Too many requests | `object`                                      |

**Structure `200`:**

- `data` `models.ErrorTableListPublicRespV2`
  - `items` `models.ErrorTableListPublicRespV2Item[]` — Batches
    - `batchUUID` `string<UUID>` — Batch ID
    - `subjects` `object` — Subcategories. Layout by `vendorCodes`
    - `brands` `object` — Brands. Layout by `vendorCodes`
    - `vendorCodes` `string[]` — Seller item numbers
    - `errors` `object` — Errors. Layout by `vendorCodes`
    - `updatedAt` `string` — Date and time when the batch was created or edited
  - `cursor` `viewer_contract.PublicErrorsCursorOutput`
    - `next` `boolean` — Are there any more drafts: - `false` — no - `true` — yes
    - `updatedAt` `string` — Date and time of generation of the last batch in the response
    - `batchUUID` `string<UUID>` — The ID of the last batch in the response
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `object` — Additional errors

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

result = api.post_v2_cards_error_list(request_public_viewer_public_errors_table_list_v2=..., locale=...)
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

const { data } = await api.postV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2, locale);
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

result, _, err := client.ItemsAPI.PostV2CardsErrorList(context.Background()).RequestPublicViewerPublicErrorsTableListV2(requestPublicViewerPublicErrorsTableListV2).Locale(locale).Execute()
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

System.out.println(api.postV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsErrorList($request_public_viewer_public_errors_table_list_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsErrorList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v2_cards_error_list(&cfg, request_public_viewer_public_errors_table_list_v2, locale).await;
    println!("{:#?}", result);
}
```

:::
