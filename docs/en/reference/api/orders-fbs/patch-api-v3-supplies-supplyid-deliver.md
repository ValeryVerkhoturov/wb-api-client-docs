---
title: "Move the Supply to the Delivery"
description: "Closes the supply and moves all assembly orders to complete (In Delivery) status. You cannot add any assembly orders to the supply after it is closed. If the…"
---

# Move the Supply to the Delivery

```http
PATCH /api/v3/supplies/{supplyId}/deliver
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)

Closes the supply and moves all assembly orders to `complete` (`In Delivery`) status. You cannot add any assembly orders to the supply after it is closed.
If the supply wasn't handed over for delivery, than scanning its QR code or accepting the first item will automatically close the supply.
You can transfer the supply to delivery only if:

- there is at least one assembly order
- required labeling is specified for all assembly orders
- labeling of all assembly orders passed validation
  If the supply contains assembly orders with required UIN, make sure that you have created and uploaded the Delivery Contract Specification in advance. The [GIIS DMDK](https://minfin.gov.ru/ru/perfomance/jewels/dmdk) takes about 30 minutes to process changes in UIN statuses.
  It is required to [specify the shipping parameters](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod) for supplies from Russian sellers to Russia shipping points. If the shipping method, shipping date, or shipping point is not specified, a `409` error is returned.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Responses

| Code  | Description                      | Schema                      |
| ----- | -------------------------------- | --------------------------- |
| `204` | The supply moved to the delivery | —                           |
| `400` | Bad request                      | `Error`                     |
| `401` | Unauthorized                     | `object`                    |
| `402` | Payment required                 | `object`                    |
| `403` | Access denied                    | `Error`                     |
| `404` | Not found                        | `Error`                     |
| `409` | Error closing supply             | `Http409SupplyDeliverError` |
| `429` | Too many requests                | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_supplies_supply_id_deliver(supply_id=...)
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

const { data } = await api.patchV3SuppliesSupplyIdDeliver(supplyId);
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

result, _, err := client.OrdersFbsAPI.PatchV3SuppliesSupplyIdDeliver(context.Background(), supplyId).Execute()
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

System.out.println(api.patchV3SuppliesSupplyIdDeliver(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3SuppliesSupplyIdDeliver($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3SuppliesSupplyIdDeliver(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3SuppliesSupplyIdDeliver(supplyId));
```

:::
