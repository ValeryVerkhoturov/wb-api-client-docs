---
title: "Add Assembly Orders to the Supply"
description: "The method adds up to 100 assembly orders to the supply and moves it to the confirm status. It can also move the assembly orders: - between active supplies -…"
---

# Add Assembly Orders to the Supply

```http
PATCH /api/marketplace/v3/supplies/{supplyId}/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdOrders)

The method adds up to 100 [assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) to the supply and moves it to the `confirm` [status](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus).
It can also move the assembly orders:

- between active supplies
- from a closed to an active supply, if the assembly order requires [reshipment](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3SuppliesOrdersReshipment).

You can add any assembly orders that arrived at the same warehouse to an empty supply.
The supply acquires the attributes of the first assembly order added to it from the [fields](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId):

- `crossBorderType` — crossborder or non-crossborder
- `cargoType` — dimensional type
- `isB2b` — B2B-sale or not B2B-sale

After that, you can add to the supply only assembly orders with the same `crossBorderType`, `cargoType`, `isB2b` attributes as the supply.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                                   | Schema   |
| ----- | --------------------------------------------- | -------- |
| `204` | The assembly orders assigned to the supply    | —        |
| `400` | Bad request                                   | `Error`  |
| `401` | Unauthorized                                  | `object` |
| `402` | Payment required                              | `object` |
| `403` | Access denied                                 | `Error`  |
| `404` | Not found                                     | `Error`  |
| `409` | Error adding the assembly order to the supply | `Error`  |
| `429` | Too many requests                             | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_supplies_supply_id_orders(supply_id=..., patch_v3_supplies_supply_id_orders_request=...)
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

const { data } = await api.patchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest);
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

result, _, err := client.OrdersFbsAPI.PatchV3SuppliesSupplyIdOrders(context.Background(), supplyId).PatchV3SuppliesSupplyIdOrdersRequest(patchV3SuppliesSupplyIdOrdersRequest).Execute()
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

System.out.println(api.patchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3SuppliesSupplyIdOrders($supply_id, $patch_v3_supplies_supply_id_orders_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3SuppliesSupplyIdOrders(supplyId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest));
```

:::
