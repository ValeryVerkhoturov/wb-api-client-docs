---
title: "Supply Details"
description: "The method returns supply details by ID."
---

# Supply Details

```http
GET /api/v1/supplies/{ID}
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supplies Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesId)

The method returns supply details by ID.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 min  | 30 requests | 2 s      | 10 requests |
| Service          | 1 min  | 30 requests | 2 s      | 10 requests |
| Base with secret | 1 min  | 30 requests | 2 s      | 10 requests |
| Base             | 1 h    | 2 requests  | 30 min   | 1 request   |

## Parameters

| Name           | In    | Type             | Req. | Description                                                                                                               |
| -------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------- |
| `ID`           | path  | `integer<int64>` | yes  | ID of the supply or the order                                                                                             |
| `isPreorderID` | query | `boolean`        | no   | Search by: - `true` — order ID, if you pass the order ID in `ID` - `false` — supply ID, if you pass the supply ID in `ID` |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `models.SupplyDetails` |
| `400` | Bad request       | `models.ErrorModel`    |
| `401` | Unauthorized      | `object`               |
| `402` | Payment required  | `object`               |
| `403` | Access denied     | `object`               |
| `404` | Not found         | `models.ErrorModel`    |
| `429` | Too many requests | `object`               |

**Structure `200`:**

- `phone` `string` — Phone number of the user that created the supply
- `statusID` `integer<int64>` = `1` | `2` | `3` | `4` | `5` | `6` — Supply status ID: - `1` — Not planned - `2` — Planned - `3` — Dispatch allowed - `4` — Accepting - `5` — Accepted - `6` — Unloaded at the gate
- `virtualTypeID` `integer<int64>` — ID of virtual supply type. Displayed only for supplies with `"boxTypeID":0`. - `0` — Carryover of stock - `1` — Depersonalization - `4` — QR supply - `5` — Additional acceptance - `6` — Scan acceptance
- `boxTypeID` `integer<int64>` — Supply type ID: - `0` — Without boxes (virtual supply) - `1` and `2` — Boxes - `5` — Monopallets - `6` — Supersafe
- `createDate` `string` — Date and time the supply was created
- `supplyDate` `string` — Planned dispatch date
- `factDate` `string` — Actual dispatch date
- `updatedDate` `string` — Date of the supply update
- `warehouseID` `integer<int64>` — Warehouse ID for planned supply
- `warehouseName` `string` — Warehouse name for planned supply
- `actualWarehouseID` `integer<int64>` — Warehouse ID where the supply was delivered
- `actualWarehouseName` `string` — Warehouse name where the supply was delivered
- `transitWarehouseID` `integer<int64>` — Transit warehouse ID
- `transitWarehouseName` `string` — Transit warehouse name
- `acceptanceCost` `number` — Preliminary acceptance cost, ₽
- `paidAcceptanceCoefficient` `number` — Acceptance coefficient
- `rejectReason` `string` — Reason why the supply cannot be accepted
- `supplierAssignName` `string` — Short seller's name
- `storageCoef` `string` — Storage coefficient
- `deliveryCoef` `string` — Logistics coefficient
- `quantity` `integer<int64>` — Added to the supply/order, pieces
- `readyForSaleQuantity` `integer<int64>` — Ready for sale, pieces
- `acceptedQuantity` `integer<int64>` — Accepted, pieces
- `unloadingQuantity` `integer<int64>` — Total items at putaway, pieces
- `depersonalizedQuantity` `integer<int64>` — Quantity of depersonalized items, pieces
- `discrepancies` `integer<int64>` — Discrepancies between the declared and actual quantity of the item in the supply. Only when `"statusID":5`
- `isBoxOnPallet` `boolean` — **Pallet with Single Items** — supply type: - `true` — yes - `false` — no The field is returned only when `"boxTypeID": 2`

**Structure `400`:**

- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error ID
- `detail` `string` — Error description
- `requestId` `string` — Request ID
- `origin` `string` — Service that returned the error

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

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `404`:**

- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error ID
- `detail` `string` — Error description
- `requestId` `string` — Request ID
- `origin` `string` — Service that returned the error

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
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_id(id=..., is_preorder_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1SuppliesId(iD, isPreorderID);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1SuppliesId(context.Background(), iD).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesId(ID, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesId(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesId(ID));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::get_v1_supplies_id(&cfg, id, is_preorder_id).await;
    println!("{:#?}", result);
}
```

:::
