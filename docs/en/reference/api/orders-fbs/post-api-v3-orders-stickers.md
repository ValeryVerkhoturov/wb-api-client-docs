---
title: "Get Assembly Orders Stickers"
description: "Returns a list of stickers for assembly orders in the confirm — in assembly and complete — in delivery statuses."
---

# Get Assembly Orders Stickers

```http
POST /api/v3/orders/stickers
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStickers)

Returns a list of stickers for [assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders) in the `confirm` — in assembly and `complete` — in delivery [statuses](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus).

If the required [customs declaration number](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration) is not added to the assembly order, it is not possible to get stickers for this assembly order.

You can get a maximum of 100 stickers per request.

You can get a sticker in the following formats:

- SVG
- ZPLV (vertical)
- ZPLH (horizontal)
- PNG
  Available dimensions:
- 580x400 px, with parameters `width` = 58, `height` = 40
- 400x300 px, with parameters `width` = 40, `height` = 30

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Parameters

| Name     | In    | Type             | Req. | Description    |
| -------- | ----- | ---------------- | ---- | -------------- |
| `type`   | query | `string`         | yes  | Sticker format |
| `width`  | query | `integer<int64>` | yes  | Sticker width  |
| `height` | query | `integer<int64>` | yes  | Sticker height |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                            |
| ----- | ----------------- | --------------------------------- |
| `200` | Success           | `PostV3OrdersStickersResponse200` |
| `400` | Bad request       | `Error`                           |
| `401` | Unauthorized      | `object`                          |
| `402` | Payment required  | `object`                          |
| `403` | Access denied     | `Error`                           |
| `409` | Conflict          | `Error`                           |
| `429` | Too many requests | `object`                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_stickers(type=..., width=..., height=..., post_v3_orders_stickers_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3OrdersStickers(context.Background()).Width(width).Height(height).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStickers($type, $width, $height));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStickers(type, width, height, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStickers(type, width, height));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::post_v3_orders_stickers(&cfg, r#type, width, height, post_v3_orders_stickers_request).await;
    println!("{:#?}", result);
}
```

:::
