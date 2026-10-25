---
title: "Subcategory Characteristics"
description: "Returns list of the subcategory characteristics by its ID"
---

# Subcategory Characteristics

```http
GET /content/v2/object/charcs/{subjectId}
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Categories, Subcategories, and Characteristics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId)

Returns list of the subcategory characteristics by its ID

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

| Name        | In    | Type             | Req. | Description                                                                                                                                                                            |
| ----------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subjectId` | path  | `integer<int64>` | yes  | Subcategory ID                                                                                                                                                                         |
| `locale`    | query | `string`         | no   | Language for response of the `subjectName` and `name` fields: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Responses

| Code  | Description       | Schema                                  |
| ----- | ----------------- | --------------------------------------- |
| `200` | Success           | `GetV2ObjectCharcsSubjectIdResponse200` |
| `400` | Bad request       | `object`                                |
| `401` | Unauthorized      | `object`                                |
| `403` | Access denied     | `responseBodyContentError403`           |
| `429` | Too many requests | `object`                                |

**Structure `200`:**

- `data` `object[]` — Data
  - `charcID` `integer<int64>` — Characteristics ID
  - `subjectName` `string` — Subcategory name
  - `subjectID` `integer<int64>` — Subcategory ID
  - `name` `string` — Characteristic name
  - `required` `boolean` — Characteristic required
  - `unitName` `string` — Unit (sm, gr and others)
  - `maxCount` `integer<int64>` — The maximum number of values that can be assigned to a characteristic when [creating](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) or [editing](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) listings. Used only for characteristics with `"charcType":1` — array of strings. For characteristics with `"charcType":4` — number, you can assign only one value. For characteristics with `"maxCount":0`, the number of values is unlimited.
  - `popular` `boolean` — The characteristic is popular with users
  - `charcType` `integer<int64>` — Characteristic data type that should be used when [creating](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) or [editing](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) listings: - `1` — array of strings - `4` — number - `0` — characteristic is not used
  - `hasFilter` `boolean` — Key characteristic. Is it an important characteristic for buyers: - `true` — yes - `false` — no
  - `isVariable` `boolean` — A sign of [variable characteristic](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings). The value marks out the characteristics by which the variations differ from each other: - `true` — item variations differ by this characteristic - `false` — item variations do not differ by this characteristic
  - `existNamedField` `boolean` — How to transfer a characteristic in requests for [creating](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload), [creating with merge](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd), and [editing](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) listings: - `true` — as a separate parameter in the request - `false` — in the `characteristics` array
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `string` — Additional errors

**Structure `400`:**

- one of: `responseBodyContentError400`, `responseBodyContentError400InvalidSyntax`

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

result = api.get_v2_object_charcs_subject_id(subject_id=..., locale=...)
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

const { data } = await api.getV2ObjectCharcsSubjectId(subjectId, locale);
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

result, _, err := client.ItemsAPI.GetV2ObjectCharcsSubjectId(context.Background(), subjectId).Execute()
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

System.out.println(api.getV2ObjectCharcsSubjectId(subjectId, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ObjectCharcsSubjectId($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ObjectCharcsSubjectId(subjectId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ObjectCharcsSubjectId(subjectId));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v2_object_charcs_subject_id(&cfg, subject_id, locale).await;
    println!("{:#?}", result);
}
```

:::
