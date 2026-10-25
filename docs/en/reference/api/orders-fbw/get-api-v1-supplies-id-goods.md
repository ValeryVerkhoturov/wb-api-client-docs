---
title: "Supply Items"
description: "The method returns information about the items in the supply."
---

# Supply Items

```http
GET /api/v1/supplies/{ID}/goods
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supplies Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesIdGoods)

The method returns information about the items in the supply.

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
| `limit`        | query | `integer<int64>` | no   | Number of objects in the response                                                                                         |
| `offset`       | query | `integer<int64>` | no   | From which element to start outputting data                                                                               |
| `isPreorderID` | query | `boolean`        | no   | Search by: - `true` — order ID, if you pass the order ID in `ID` - `false` — supply ID, if you pass the supply ID in `ID` |
| `ID`           | path  | `integer<int64>` | yes  | ID of the supply or the order                                                                                             |

## Responses

| Code  | Description       | Schema                            |
| ----- | ----------------- | --------------------------------- |
| `200` | Success           | `GetV1SuppliesIdGoodsResponse200` |
| `400` | Bad request       | `models.ErrorModel`               |
| `401` | Unauthorized      | `object`                          |
| `402` | Payment required  | `object`                          |
| `403` | Access denied     | `object`                          |
| `429` | Too many requests | `object`                          |

**Structure `200` — `models.GoodInSupply[]`:**

- `barcode` `string` — Item barcode
- `vendorCode` `string` — Seller item number
- `nmID` `integer<int64>` — WB item number
- `needKiz` `boolean` — Is a labeling code [Chestny ZNAK](https://chestnyznak.ru/en) required for this item: - `false` — not required - `true` — required
- `tnved` `string` — HS-code. If `"needKiz":true` and `"tnved":null`, it is required to specify the \*\*HS-codes\*\* in the [personal account](https://seller.wildberries.ru/new-goods) or through [API](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- `techSize` `string` — Item size specified by the seller
- `color` `string` — Item color
- `supplierBoxAmount` `integer<int64>` — Specified in the package, pieces
- `quantity` `integer<int64>` — Specified in the supply/order, pieces
- `readyForSaleQuantity` `integer<int64>` — Ready for sale, pieces
- `acceptedQuantity` `integer<int64>` — Accepted, pieces
- `unloadingQuantity` `integer<int64>` — Total items at putaway, pieces

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

result = api.get_v1_supplies_id_goods(id=..., limit=..., offset=..., is_preorder_id=...)
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

const { data } = await api.getV1SuppliesIdGoods(iD, limit, offset, isPreorderID);
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

result, _, err := client.OrdersFbwAPI.GetV1SuppliesIdGoods(context.Background(), iD).Execute()
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

System.out.println(api.getV1SuppliesIdGoods(ID, limit, offset, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesIdGoods($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesIdGoods(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesIdGoods(ID));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::get_v1_supplies_id_goods(&cfg, id, limit, offset, is_preorder_id).await;
    println!("{:#?}", result);
}
```

:::
