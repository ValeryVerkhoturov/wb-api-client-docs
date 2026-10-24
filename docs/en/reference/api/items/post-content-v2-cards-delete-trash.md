---
title: "Transfer Listing to Trash"
description: "Transfers the listing to the trash. In doing so, the listing would not be deleted."
---

# Transfer Listing to Trash

```http
POST /content/v2/cards/delete/trash
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Listings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsDeleteTrash)

Transfers the listing to the trash. In doing so, the listing would not be deleted.

When transferring listings to the trash, this listing is removed from the listing, meaning it is assigned a new `imtID` — [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID

After 30 days in the trash the listing would be deleted automatically. The trash is cleared every night according to Moscow time.
The listing can be deleted at any time in [personal account](https://seller.wildberries.ru/new-goods/basket-cards).

A listing will remain for sale as long as there is any inventory left, even if moved to the trash. To completely remove the listing from sale, set its inventory to zero.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description       | Schema                              |
| ----- | ----------------- | ----------------------------------- |
| `200` | Success           | `PostV2CardsDeleteTrashResponse200` |
| `400` | Bad request       | `responseBodyContentError400`       |
| `401` | Unauthorized      | `object`                            |
| `402` | Payment required  | `object`                            |
| `403` | Access denied     | `responseBodyContentError403`       |
| `429` | Too many requests | `object`                            |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_delete_trash(post_v2_cards_delete_trash_request=...)
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

const { data } = await api.postV2CardsDeleteTrash(postV2CardsDeleteTrashRequest);
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

result, _, err := client.ItemsAPI.PostV2CardsDeleteTrash(context.Background()).PostV2CardsDeleteTrashRequest(postV2CardsDeleteTrashRequest).Execute()
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

System.out.println(api.postV2CardsDeleteTrash(postV2CardsDeleteTrashRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsDeleteTrash($post_v2_cards_delete_trash_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsDeleteTrash(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsDeleteTrash(postV2CardsDeleteTrashRequest));
```

:::
