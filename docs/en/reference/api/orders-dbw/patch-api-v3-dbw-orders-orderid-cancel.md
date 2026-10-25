---
title: "Cancel the Order"
description: "Moves the assembly order to cancel status — canceled by the seller."
---

# Cancel the Order

```http
PATCH /api/v3/dbw/orders/{orderId}/cancel
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/patchV3DbwOrdersOrderIdCancel)

Moves the assembly order to `cancel` status — canceled by the seller.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for the DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- for managing assembly orders

| Type                                                            | Period | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------ | ------------ | -------- | ----------- |
| Personal                                                        | 1 min  | 300 requests | 200 ms   | 20 requests |
| Service                                                         | 1 min  | 300 requests | 200 ms   | 20 requests |
| Base with secret                                                | 1 min  | 300 requests | 200 ms   | 20 requests |
| Base                                                            | 1 h    | 10 requests  | 6 min    | 1 request   |
| One request with `4XX` response codes is counted as 10 requests |

## Responses

| Code  | Description               | Schema   |
| ----- | ------------------------- | -------- |
| `204` | Canceled                  | —        |
| `400` | Bad request               | `Error`  |
| `401` | Unauthorized              | `object` |
| `402` | Payment required          | `object` |
| `403` | Access denied             | `Error`  |
| `404` | The resource is not found | `Error`  |
| `409` | Error updating a status   | `Error`  |
| `429` | Too many requests         | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.patch_v3_dbw_orders_order_id_cancel(order_id=...)
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

const { data } = await api.patchV3DbwOrdersOrderIdCancel(orderId);
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

result, _, err := client.OrdersDbwAPI.PatchV3DbwOrdersOrderIdCancel(context.Background(), orderId).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.patchV3DbwOrdersOrderIdCancel(orderId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->patchV3DbwOrdersOrderIdCancel($order_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PatchV3DbwOrdersOrderIdCancel(orderId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PatchV3DbwOrdersOrderIdCancel(orderId));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::patch_v3_dbw_orders_order_id_cancel(&cfg, order_id).await;
    println!("{:#?}", result);
}
```

:::
