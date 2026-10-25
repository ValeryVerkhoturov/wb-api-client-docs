---
title: "Transfer to Delivery"
description: "The method transfers assembly orders with the confirm status to the deliver status — order on delivery."
---

# Transfer to Delivery

```http
POST /api/marketplace/v3/dbs/orders/status/deliver
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusDeliver)

The method transfers [assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) with the `confirm` [status](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) to the `deliver` status — order on delivery.

[Request limit](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period                                                           | Limit     | Interval | Burst       |
| ---------------------------------------------------------------- | --------- | -------- | ----------- |
| 1 s                                                              | 1 request | 1 s      | 10 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

- `ordersIds` `integer<int64>[]` (required) — List of assembly order IDs

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `api.StatusSetDeliverResponses` |
| `400` | Bad request       | `api.BatchError`                |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `api.BatchError`                |
| `429` | Too many requests | `object`                        |

**Structure `200`:**

- `requestId` `string` — Unique request ID
- `results` `api.StatusSetDeliverResponse[]`
  - `errors` `api.BatchErrorDeliverResponse[]` — Error details
    - `code` `integer<int64>` — Error code: - `404` - `409`
    - `detail` `string` — - `NotFound` — assembly order is not found - `StatusMismatch` — operation is not possible for this assembly order status - `ImeiIsNotFilled` — IMEI is not filled - `MetaValidationFail` — label identifiers validation errors
    - `metaDetails` `object[]` — Label identifiers validation error details
      - `key` `string` — Label identifier
      - `value` `string` — Label identifier value
      - `decision` `string` — Статус проверки: - `sgtin` - `sgtinInvalidFormat` — Invalid format - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/) - `sgtinEmitted` — Label identifier has been issued - `sgtinApplied` — Putting into circulation not completed - `sgtinWrittenOff` — Written off - `sgtinRetired` — Retired - `sgtinWithdrawn` — Withdrawn - `sgtinDisaggregation` — Disaggregation - `sgtinDisaggregated` — Disaggregated - `sgtinAppliedNotPaid` — Not paid - `pending` — Label identifier for inspection
  - `isError` `boolean` — Are there any errors
  - `orderId` `integer<int64>` — Assembly order ID with successfully set data

**Structure `400`:**

- `detail` `object` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

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

- `detail` `object` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

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
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_status_deliver(api_orders_request_v2=...)
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

const { data } = await api.postV3DbsOrdersStatusDeliver(apiOrdersRequestV2);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersStatusDeliver(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
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

System.out.println(api.postV3DbsOrdersStatusDeliver(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersStatusDeliver($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStatusDeliver(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersStatusDeliver(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = dbs_api::post_v3_dbs_orders_status_deliver(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
