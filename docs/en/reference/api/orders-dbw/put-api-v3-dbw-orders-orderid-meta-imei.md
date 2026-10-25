---
title: "Add IMEI to the Order"
description: "Sets the IMEI for the assembly orders label identifiers. The assembly order can have only one IMEI. If a device has two IMEIs — \\\\IMEI\\\\ and \\\\IMEI2\\\\ or…"
---

# Add IMEI to the Order

```http
PUT /api/v3/dbw/orders/{orderId}/meta/imei
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaImei)

Sets the IMEI for the [assembly orders label identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails).
The assembly order can have only one IMEI. If a device has two IMEIs — \*\*IMEI\*\* and \*\*IMEI2\*\* or \*\*IMEI1\*\* and \*\*IMEI2\*\* — you should only specify \*\*IMEI\*\* or \*\*IMEI1\*\*. You don't need to specify \*\*IMEI2\*\*.
You can add the IMEI only for assembly orders in the `confirm` status, and if the field `imei` is returned in the response of the [Get Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) method.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding DBW label identifiers**:

| Period                                                          | Limit         | Interval | Burst       |
| --------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 min                                                           | 1000 requests | 60 ms    | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, required

- `imei` `string` (required) — IMEI

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

**Structure `400`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `404`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `409`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

**Structure `429`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.put_v3_dbw_orders_order_id_meta_imei(order_id=..., put_v3_dbw_orders_order_id_meta_imei_request=...)
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

const { data } = await api.putV3DbwOrdersOrderIdMetaImei(orderId, putV3DbwOrdersOrderIdMetaImeiRequest);
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

result, _, err := client.OrdersDbwAPI.PutV3DbwOrdersOrderIdMetaImei(context.Background(), orderId).PutV3DbwOrdersOrderIdMetaImeiRequest(putV3DbwOrdersOrderIdMetaImeiRequest).Execute()
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

System.out.println(api.putV3DbwOrdersOrderIdMetaImei(orderId, putV3DbwOrdersOrderIdMetaImeiRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->putV3DbwOrdersOrderIdMetaImei($order_id, $put_v3_dbw_orders_order_id_meta_imei_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PutV3DbwOrdersOrderIdMetaImei(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PutV3DbwOrdersOrderIdMetaImei(orderId, putV3DbwOrdersOrderIdMetaImeiRequest));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::put_v3_dbw_orders_order_id_meta_imei(&cfg, order_id, put_v3_dbw_orders_order_id_meta_imei_request).await;
    println!("{:#?}", result);
}
```

:::
