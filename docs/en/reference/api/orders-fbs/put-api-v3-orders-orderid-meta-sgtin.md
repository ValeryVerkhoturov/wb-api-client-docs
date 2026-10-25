---
title: "Add Labeling Code Chestny ZNAK to the Assembly Order"
description: "The method sets the labeling code Chestny ZNAK for the assembly order."
---

# Add Labeling Code Chestny ZNAK to the Assembly Order

```http
PUT /api/v3/orders/{orderId}/meta/sgtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)

The method sets the labeling code [Chestny ZNAK](https://chestnyznak.ru/en) for the assembly order.

You can add a labeling code to an assembly order if this field is returned in the response of the [Assembly Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) method, and the assembly order is in the `confirm` status.

You can get the added labeling code with the [Assembly Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) method.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding FBS label identifiers**:

| Period                                                           | Limit         | Interval | Burst       |
| ---------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 min                                                            | 1000 requests | 60 ms    | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                  | Schema   |
| ----- | ---------------------------- | -------- |
| `204` | Sent                         | —        |
| `400` | Bad request                  | `Error`  |
| `401` | Unauthorized                 | `object` |
| `402` | Payment required             | `object` |
| `403` | Access denied                | `Error`  |
| `404` | Not found                    | `Error`  |
| `409` | Error adding a labeling code | `Error`  |
| `429` | Too many requests            | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_sgtin(order_id=..., put_v3_orders_order_id_meta_sgtin_request=...)
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

const { data } = await api.putV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest);
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

result, _, err := client.OrdersFbsAPI.PutV3OrdersOrderIdMetaSgtin(context.Background(), orderId).PutV3OrdersOrderIdMetaSgtinRequest(putV3OrdersOrderIdMetaSgtinRequest).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.putV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaSgtin($order_id, $put_v3_orders_order_id_meta_sgtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaSgtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::put_v3_orders_order_id_meta_sgtin(&cfg, order_id, put_v3_orders_order_id_meta_sgtin_request).await;
    println!("{:#?}", result);
}
```

:::
