---
title: "Get Stickers for Cross-Border Assembly Orders"
description: "Returns a list of stickers for Cross-Border assembly orders in PDF."
---

# Get Stickers for Cross-Border Assembly Orders

```http
POST /api/v3/orders/stickers/cross-border
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStickersCrossBorder)

Returns a list of stickers for Cross-Border assembly orders in PDF.

For each assembly order, the response contains the sticker generation status:

- `awaitingTrackNumber` — the sticker is not ready. Waiting for a carrier's track number.
- `ready` — the sticker is ready

Stickers may be generated with a delay. Repeat the request until you receive the `ready` status.

Method limitations:

- You cannot request more than 100 stickers at a time (no more than 100 assembly order IDs in a request).
- The method returns stickers only for assembly orders that are on assembly or in delivery [status](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus): `confirm`, `complete`.
  In the sandbox, this method always returns the `200` response.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                                       |
| ----- | ----------------- | -------------------------------------------- |
| `200` | Success           | `PostV3OrdersStickersCrossBorderResponse200` |
| `400` | Bad request       | `Error`                                      |
| `401` | Unauthorized      | `object`                                     |
| `402` | Payment required  | `object`                                     |
| `403` | Access denied     | `Error`                                      |
| `429` | Too many requests | `object`                                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_stickers_cross_border(post_v3_orders_stickers_cross_border_request=...)
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

const { data } = await api.postV3OrdersStickersCrossBorder(postV3OrdersStickersCrossBorderRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3OrdersStickersCrossBorder(context.Background()).Execute()
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

System.out.println(api.postV3OrdersStickersCrossBorder(postV3OrdersStickersCrossBorderRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStickersCrossBorder());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStickersCrossBorder(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStickersCrossBorder());
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::post_v3_orders_stickers_cross_border(&cfg, post_v3_orders_stickers_cross_border_request).await;
    println!("{:#?}", result);
}
```

:::
