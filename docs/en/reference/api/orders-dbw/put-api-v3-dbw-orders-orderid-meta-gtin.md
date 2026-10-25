---
title: "Add GTIN to the Order"
description: "Sets the GTIN (Belarus item unique identifier) for the assembly order. The assembly order can only have one GTIN. You can add the GTIN only for assembly orders…"
---

# Add GTIN to the Order

```http
PUT /api/v3/dbw/orders/{orderId}/meta/gtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaGtin)

Sets the GTIN (Belarus item unique identifier) for the assembly order. The assembly order can only have one GTIN.
You can add the GTIN only for assembly orders in the `confirm` status, and if the field `gtin` is returned in the response of the [Get Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) method.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding DBW label identifiers**:

| Period                                                          | Limit         | Interval | Burst       |
| --------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 min                                                           | 1000 requests | 60 ms    | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                    | Schema   |
| ----- | ------------------------------ | -------- |
| `204` | Updated                        | —        |
| `400` | Bad request                    | `Error`  |
| `401` | Unauthorized                   | `object` |
| `402` | Payment required               | `object` |
| `403` | Access denied                  | `Error`  |
| `404` | The resource is not found      | `Error`  |
| `409` | Label identifiers update error | `Error`  |
| `429` | Too many requests              | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.put_v3_dbw_orders_order_id_meta_gtin(order_id=..., put_v3_dbw_orders_order_id_meta_gtin_request=...)
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

const { data } = await api.putV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest);
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

result, _, err := client.OrdersDbwAPI.PutV3DbwOrdersOrderIdMetaGtin(context.Background(), orderId).PutV3DbwOrdersOrderIdMetaGtinRequest(putV3DbwOrdersOrderIdMetaGtinRequest).Execute()
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

System.out.println(api.putV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->putV3DbwOrdersOrderIdMetaGtin($order_id, $put_v3_dbw_orders_order_id_meta_gtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PutV3DbwOrdersOrderIdMetaGtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PutV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::put_v3_dbw_orders_order_id_meta_gtin(&cfg, order_id, put_v3_dbw_orders_order_id_meta_gtin_request).await;
    println!("{:#?}", result);
}
```

:::
