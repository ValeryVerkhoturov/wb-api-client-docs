---
title: "Get Assembly Order Statuses"
description: "Returns the statuses of assembly orders based on the list of assembly order IDs. supplierStatus is a status of an order. The trigger for its change is the…"
---

# Get Assembly Order Statuses

```http
POST /api/marketplace/v3/dbs/orders/status/info
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo)

Returns the statuses of [assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) based on the list of assembly order IDs.
`supplierStatus` is a status of an order. The trigger for its change is the action of the seller himself.
Possible values for this field are:

| Status                                                      | Description               | How to move an order to this status                                                                                                              |
| ----------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `new`                                                       | \*\*New order\*\*         |                                                                                                                                                  |
| `confirm`                                                   | \*\*Order on assembly\*\* | [Transfer to assembly](https://dev.wildberries.ru/openapi/orders-dbs?locale=ru#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusConfirm)<br> | `deliver` | \*\*Order on delivery\*\*<br> | [Transfer to delivery](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusDeliver)<br> | `receive` | \*\*Received by the buyer\*\*<br> | [Notify that the order has been accepted by the buyer](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusReceive)<br> | `reject` | \*\*Declined upon receipt\*\*<br> | [Notify that the buyer has declined the order](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusReject)<br> | `cancel` | \*\*Canceled by the seller\*\* | [Cancel the order](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusCancel)<br> | `cancel\_missed\_call` | \*\*Cancellation due to unreachable buyer\*\*<br> | The status changes automatically |
| `wbStatus` is a status of an order on the Wildberries side. |
| Possible values for this field are:                         |

- `waiting` — assembly order in work
- `sold` — the buyer got the order
- `canceled` — assembly order canceled
- `canceled\_by\_client` — the buyer canceled the order
- `declined\_by\_client` — the buyer canceled the order in the first hour
  Cancellation is available to the buyer in the first hour from the moment of order, if the order is not transferred to confirm status.
- `defect` — order canceled due to a defect
- `ready\_for\_pickup` — the order arrived the pickup point
- `canceled\_by\_missed\_call`— cancellation due to unreachable buyer. For delivery by seller

[Request limit](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **DBS assembly orders** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `api.OrderStatusesV2` |
| `400` | Bad request       | `api.BatchError`      |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `403` | Access denied     | `api.BatchError`      |
| `404` | Not found         | `api.BatchError`      |
| `429` | Too many requests | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_status_info(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersStatusInfo(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersStatusInfo(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersStatusInfo(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersStatusInfo($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStatusInfo(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersStatusInfo(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = dbs_api::post_v3_dbs_orders_status_info(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
