---
title: "Subcategory HS-codes"
description: "The method provides list of HS-codes by subcategory ID and filter by HS-code."
---

# Subcategory HS-codes

```http
GET /content/v2/directory/tnved
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Categories, Subcategories, and Characteristics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnved)

The method provides list of HS-codes by subcategory ID and filter by HS-code.

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
| `subjectID` | query | `integer<int64>` | yes  | Subcategory ID                                                                                                                                                                         |
| `search`    | query | `integer<int64>` | no   | Search by HS-code. Works only with the subjectID parameter                                                                                                                             |
| `locale`    | query | `string`         | no   | Language for response of the `subjectName` and `name` fields: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `GetV2DirectoryTnvedResponse200` |
| `400` | Bad request       | `responseBodyContentError400`    |
| `401` | Unauthorized      | `object`                         |
| `403` | Access denied     | `responseBodyContentError403`    |
| `429` | Too many requests | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_directory_tnved(subject_id=..., search=..., locale=...)
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

const { data } = await api.getV2DirectoryTnved(subjectID, search, locale);
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

result, _, err := client.ItemsAPI.GetV2DirectoryTnved(context.Background()).SubjectID(subjectID).Execute()
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

System.out.println(api.getV2DirectoryTnved(subjectID, search, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2DirectoryTnved($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2DirectoryTnved(subjectID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2DirectoryTnved(subjectID));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v2_directory_tnved(&cfg, subject_id, search, locale).await;
    println!("{:#?}", result);
}
```

:::
