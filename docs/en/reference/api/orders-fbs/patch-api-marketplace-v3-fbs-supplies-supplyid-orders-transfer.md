---
title: "Transfer Orders From Supply To Assembly"
description: "The method transfers assembly orders from the complete status — in delivery to the confirm status — in assembly."
---

# Transfer Orders From Supply To Assembly

```http
PATCH /api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer)

The method transfers assembly orders from the `complete` status — in delivery to the `confirm` status — in assembly.

Use the method to moved an assembly order from a closed supply to an open one.

An assembly order can be moved from delivery to assembly if all conditions are met:

- the assembly order is in the `complete` status — in delivery
- the supply to which the assembly order needs to be moved [is not transferred to delivery](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)
- the assembly order has not previously been moved from delivery to assembly
  To check whether an assembly order can be transferred from delivery to assembly, use the [assembly order statuses](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus), the isTransferable field.

## Parameters

| Name       | In   | Type     | Req. | Description                                      |
| ---------- | ---- | -------- | ---- | ------------------------------------------------ |
| `supplyId` | path | `string` | yes  | ID of the supply from which orders will be moved |

## Request body

`application/json` — schema `object`, required

- `orderIds` `integer<int64>[]` (required) — List of assembly order IDs that need to be moved to assembly
- `newSupplyId` `string` (required) — ID of the supply to which orders will be moved. The supply must not be in a delivery status

## Responses

| Code  | Description   | Schema                                |
| ----- | ------------- | ------------------------------------- |
| `200` | Success       | `v3.TransferOrdersToAssemblyResponse` |
| `400` | Bad request   | `Error`                               |
| `401` | Unauthorized  | `object`                              |
| `403` | Access denied | `Error`                               |

**Structure `200`:**

- `transferredOrders` `v3.TransferOrderToAssembly[]`
  - `error` `object` — Error detail
    - `detail` `string` — Error details
    - `code` `integer<int64>` — Internal error code
  - `success` `boolean` — Whether the request was processed successfully. Can only be `true`
  - `newStickerId` `integer<int64>` — New sticker ID
  - `oldStickerId` `integer<int64>` — Old sticker ID
  - `orderId` `integer<int64>` — Assembly order ID

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

**Structure `403`:**

- `code` `string` — Error code
- `message` `string` — Error description
- `data` `object` — Additional data for the error

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_fbs_supplies_supply_id_orders_transfer(supply_id=..., patch_v3_fbs_supplies_supply_id_orders_transfer_request=...)
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

const { data } = await api.patchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest);
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

result, _, err := client.OrdersFbsAPI.PatchV3FbsSuppliesSupplyIdOrdersTransfer(context.Background(), supplyId).PatchV3FbsSuppliesSupplyIdOrdersTransferRequest(patchV3FbsSuppliesSupplyIdOrdersTransferRequest).Execute()
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

System.out.println(api.patchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3FbsSuppliesSupplyIdOrdersTransfer($supply_id, $patch_v3_fbs_supplies_supply_id_orders_transfer_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::patch_v3_fbs_supplies_supply_id_orders_transfer(&cfg, supply_id, patch_v3_fbs_supplies_supply_id_orders_transfer_request).await;
    println!("{:#?}", result);
}
```

:::
