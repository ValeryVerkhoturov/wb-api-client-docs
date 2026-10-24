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

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `PostV2GetCardsListResponse200` |
| `400` | Bad request       | `responseBodyContentError400`   |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `responseBodyContentError403`   |
| `429` | Too many requests | `object`                        |

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
client.setBearerToken(new SecretString("<your WB JWT>"));
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
