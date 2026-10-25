---
title: "Add Labeling Codes Chestny ZNAK to Assembly Orders"
description: "Sets the labeling code Chestny ZNAK for the assembly orders. You can add the labeling code Chestny ZNAK only for orders in the confirm status, and if the field…"
---

# Add Labeling Codes Chestny ZNAK to Assembly Orders

```http
POST /api/marketplace/v3/dbw/orders/meta/sgtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaSgtin)

Sets the labeling code [Chestny ZNAK](https://chestnyznak.ru/en) for the assembly orders.
You can add the labeling code Chestny ZNAK only for orders in the `confirm` status, and if the field `sgtin` is returned in the response of the [Get Order Label Identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) method.

For more information about labeling code Chestny ZNAK please check: https://chestnyznak.ru/en/.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `api.OrdersSGTINsSetRequest`, required

- `orders` `api.SGTINs[]` (required)
  - `orderId` `integer<int64>` (required) — Assembly order ID
  - `sgtins` `string[]` (required) — List of labeling codes Chestny ZNAK. From 16 to 135 characters for one label

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `api.StatusSetResponses` |
| `400` | Bad request       | `Error`                  |
| `401` | Unauthorized      | `object`                 |
| `402` | Payment required  | `object`                 |
| `403` | Access denied     | `Error`                  |
| `429` | Too many requests | `object`                 |

**Structure `200`:**

- `requestId` `string` — Unique ID of the request with errors.
- `results` `api.StatusSetResponse[]`
  - `errors` `api.BatchErrorResponse[]` — Error details
    - `code` `integer<int64>` — Error code: - `404` - `409`
    - `detail` `string` — - `NotFound` — assembly order is not found - `StatusMismatch` — operation is not possible for this assembly order status - `ImeiIsNotFilled` — IMEI is not filled - `MetaValidationFail` — errors label identifier validation
    - `metaDetails` `object[]` — Label identifiers validation error details
      - `key` `string` — Label identifier
      - `value` `string` — Label identifier value
      - `decision` `string` — Статус проверки: - `sgtin` - `sgtinInvalidFormat` — Invalid format - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/) - `sgtinEmitted` — Label identifier has been issued - `sgtinApplied` — Putting into circulation not completed - `sgtinWrittenOff` — Written off - `sgtinRetired` — Retired - `sgtinWithdrawn` — Withdrawn - `sgtinDisaggregation` — Disaggregation - `sgtinDisaggregated` — Disaggregated - `sgtinAppliedNotPaid` — Not paid - `pending` — Label identifier for inspection
  - `isError` `boolean` — Are there any errors
  - `orderId` `integer<int64>` — Assembly order ID with successfully set data

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

result = api.post_v3_dbw_orders_meta_sgtin(api_orders_sgtins_set_request=...)
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

const { data } = await api.postV3DbwOrdersMetaSgtin(apiOrdersSGTINsSetRequest);
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

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersMetaSgtin(context.Background()).ApiOrdersSGTINsSetRequest(apiOrdersSGTINsSetRequest).Execute()
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

System.out.println(api.postV3DbwOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersMetaSgtin($api_orders_sgtins_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersMetaSgtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::post_v3_dbw_orders_meta_sgtin(&cfg, api_period_orders_sgtins_set_request).await;
    println!("{:#?}", result);
}
```

:::
