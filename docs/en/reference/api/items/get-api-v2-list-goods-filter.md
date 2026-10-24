---
title: "Get Items with Prices"
description: "Returns item data."
---

# Get Items with Prices

```http
GET /api/v2/list/goods/filter
```

**Base URL:** `https://discounts-prices-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Prices and Discounts · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter)

Returns item data.

You can specify only one item number in one request.

To get data for all items, do not set the item number, set `limit=1000`, and use the `offset` field to set the data offset. The offset should be calculated using the formula: `offset` plus `limit` from the previous request. Repeat the request until you receive a response with an empty array.

Use separate methods to get data:

- for [more than one item by item number](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2ListGoodsFilter)
- for [the size of the item](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsSizeNm)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Prices and Discounts** category:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 6 s    | 10 requests | 600 ms   | 5 requests |
| Service          | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base with secret | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 4 requests  | 15 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Responses

| Code  | Description       | Schema          |
| ----- | ----------------- | --------------- |
| `200` | Success           | `object`        |
| `400` | Bad request       | `ResponseError` |
| `401` | Unauthorized      | `object`        |
| `402` | Payment required  | `object`        |
| `403` | Access denied     | `ResponseError` |
| `429` | Too many requests | `object`        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_list_goods_filter(limit=..., offset=..., filter_nm_id=...)
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

const { data } = await api.getV2ListGoodsFilter(limit, offset, filterNmID);
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

result, _, err := client.ItemsAPI.GetV2ListGoodsFilter(context.Background()).Execute()
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

System.out.println(api.getV2ListGoodsFilter(limit, offset, filterNmID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ListGoodsFilter($limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ListGoodsFilter(limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ListGoodsFilter(limit));
```

:::
