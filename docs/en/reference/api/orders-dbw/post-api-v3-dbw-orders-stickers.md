---
title: "Get Orders Stickers"
description: "Returns a list of stickers for the assembly orders in the statuses: - confirm — on assembly - complete — on delivery You can get a maximum of 100 stickers per…"
---

# Get Orders Stickers

```http
POST /api/v3/dbw/orders/stickers
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStickers)

Returns a list of stickers for the [assembly orders](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrdersNew) in the [statuses](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus):

- `confirm` — on assembly
- `complete` — on delivery
  You can get a maximum of 100 stickers per request.
  Available sticker formats:
- SVG
- ZPLV (vertical)
- ZPLH (horizontal)
- PNG
  Available dimensions:
- 580x400 px, with `width=58&height=40` in request
- 400x300 px, with `width=40&height=30` in request

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name     | In    | Type             | Req. | Description    |
| -------- | ----- | ---------------- | ---- | -------------- |
| `type`   | query | `string`         | yes  | Sticker format |
| `width`  | query | `integer<int64>` | yes  | Sticker width  |
| `height` | query | `integer<int64>` | yes  | Sticker height |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                               |
| ----- | ----------------- | ------------------------------------ |
| `200` | Success           | `PostV3DbwOrdersStickersResponse200` |
| `400` | Bad request       | `Error`                              |
| `401` | Unauthorized      | `object`                             |
| `402` | Payment required  | `object`                             |
| `403` | Access denied     | `Error`                              |
| `429` | Too many requests | `object`                             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_stickers(type=..., width=..., height=..., post_v3_dbw_orders_stickers_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.postV3DbwOrdersStickers(type, width, height, postV3DbwOrdersStickersRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersdbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_dbw"
)

cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersStickers(context.Background()).Width(width).Height(height).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_dbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_dbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_dbw.api.OrdersDbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.postV3DbwOrdersStickers(type, width, height, postV3DbwOrdersStickersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersStickers($type, $width, $height));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersStickers(type, width, height, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersStickers(type, width, height));
```

:::
