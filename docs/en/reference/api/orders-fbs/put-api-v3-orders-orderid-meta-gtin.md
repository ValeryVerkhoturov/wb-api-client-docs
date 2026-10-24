---
title: "Add GTIN to the Assembly Order"
description: "Sets the GTIN (Belarus item unique identifier) for the assembly order. The assembly order can only have one GTIN. You can add GTIN to the assembly order only…"
---

# Add GTIN to the Assembly Order

```http
PUT /api/v3/orders/{orderId}/meta/gtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)

Sets the GTIN (Belarus item unique identifier) for the assembly order. The assembly order can only have one GTIN.
You can add GTIN to the assembly order only if the `gtin` field is returned in the response of the [Assembly Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) method, and the assembly order is in the `confirm` status.

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

| Code  | Description                      | Schema   |
| ----- | -------------------------------- | -------- |
| `204` | Updated                          | —        |
| `400` | Bad request                      | `Error`  |
| `401` | Unauthorized                     | `object` |
| `402` | Payment required                 | `object` |
| `403` | Access denied                    | `Error`  |
| `409` | Error updating label identifiers | `Error`  |
| `429` | Too many requests                | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_gtin(order_id=..., put_v3_orders_order_id_meta_gtin_request=...)
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

const { data } = await api.putV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest);
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

result, _, err := client.OrdersFbsAPI.PutV3OrdersOrderIdMetaGtin(context.Background(), orderId).PutV3OrdersOrderIdMetaGtinRequest(putV3OrdersOrderIdMetaGtinRequest).Execute()
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

System.out.println(api.putV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaGtin($order_id, $put_v3_orders_order_id_meta_gtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaGtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest));
```

:::
