---
title: "Subcategories List"
description: "Returns the list of all available subcategories, parent categories and their IDs"
---

# Subcategories List

```http
GET /content/v2/object/all
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Categories, Subcategories, and Characteristics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll)

Returns the list of all available subcategories, parent categories and their IDs

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

| Name       | In    | Type             | Req. | Description                                                                                                                                                         |
| ---------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`   | query | `string`         | no   | Language for response of the `name` field: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |
| `name`     | query | `string`         | no   | Search by item name (Socks), the search works by substring and can be conducted in any of the supported languages                                                   |
| `limit`    | query | `integer<int64>` | no   | Number of search results, maximum 1,000                                                                                                                             |
| `offset`   | query | `integer<int64>` | no   | How many results to skip. For example, with value `10`, the response will start with the 11 element                                                                 |
| `parentID` | query | `integer<int64>` | no   | Subcategory parent category ID                                                                                                                                      |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV2ObjectAllResponse200` |
| `401` | Unauthorized      | `object`                    |
| `403` | Access denied     | `object`                    |
| `429` | Too many requests | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_object_all(locale=..., name=..., limit=..., offset=..., parent_id=...)
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

const { data } = await api.getV2ObjectAll(locale, name, limit, offset, parentID);
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

result, _, err := client.ItemsAPI.GetV2ObjectAll(context.Background()).Execute()
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

System.out.println(api.getV2ObjectAll(locale, name, limit, offset, parentID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ObjectAll());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ObjectAll().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ObjectAll());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v2_object_all(&cfg, locale, name, limit, offset, parent_id).await;
    println!("{:#?}", result);
}
```

:::
