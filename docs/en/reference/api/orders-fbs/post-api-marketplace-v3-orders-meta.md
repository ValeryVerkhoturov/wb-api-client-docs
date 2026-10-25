---
title: "Get Assembly Orders Label Identifiers"
description: "The method returns label identifiers for assembly orders and their validation statuses."
---

# Get Assembly Orders Label Identifiers

```http
POST /api/marketplace/v3/orders/meta
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta)

The method returns label identifiers for [assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) and their validation statuses.

You can get the list of label identifiers available for an assembly order in the `requiredMeta` and `optionalMeta` fields in the response of the [Get New Assembly Orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3OrdersNew) method. If the `requiredMeta` and `optionalMeta` fields do not contain the label identifier, it means that this label identifier cannot be added to this assembly order.
Possible label identifiers:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaImei)
- `uin` — [UIN](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)
- `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)
- `expiration` — [Expiration date](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaExpiration)
- `customsDeclaration` — [customs declaration number](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **getting and deleting FBS label identifiers**:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `v3.GetMetaMultiRequest`, required

- `orders` `integer<int64>[]` (required)

## Responses

| Code  | Description       | Schema             |
| ----- | ----------------- | ------------------ |
| `200` | Success           | `v3.OrdersMetaAPI` |
| `400` | Bad request       | `v3.APIError`      |
| `401` | Unauthorized      | `object`           |
| `402` | Payment required  | `object`           |
| `403` | Access denied     | `v3.APIError`      |
| `404` | Not found         | `v3.APIError`      |
| `429` | Too many requests | `object`           |

**Structure `200`:**

- `orders` `v3.OrderMetaAPI[]`
  - `id` `integer<int64>` — Assembly order ID
  - `metaDetails` `object[]` — Assembly order label identifiers
    - `key` `string` — Label identifier
    - `value` `string` — Label identifier value
    - `decision` `string` — Validation statuses. `imei` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `imeiMaySell` — The item is approved for sale. Validation passed - `imeiSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed `imei` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `imeiInvalidFormat` — Invalid format. Validation failed - `imeiAlreadySold` — The item with this IMEI has already been sold. Validation failed `uin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `uinMaySell` — The item is approved for sale. Validation passed `uin` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `uinInvalidFormat` — Invalid format. Validation failed - `uinBadStatus` — Invalid batch status. Validation failed - `uinBadProcess` — Invalid processing stage. Validation failed - `uinBadStatusAndBadProcess` — Invalid batch status. Invalid processing stage. Validation failed - `uinNotFound` — Not found in GIIS DMDK. Validation failed. The status may mean that the UIN: - is not specified in the uploaded Delivery Contract Specification - is not registered in GIIS DMDK - is specified incorrectly and is read from the tag with errors - is not in circulation `sgtin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `sgtinIntroduced` — The item is approved for sale. Validation passed - `sgtinSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed `sgtin` validation statuses with which the supply can not be transferred to delivery: - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `sgtinInvalidFormat` — Invalid format. Validation failed - `sgtinNoGS` — Label identifier does not contain the GS separator `\u001d`. Validation failed - `sgtinHasInvalidSymbols` — Label identifier contains incorrect characters or spaces. Validation failed - `sgtinHasNonLatinSymbols` — Label identifier contains non-special or Latin characters. Validation failed - `sgtinInvalidPattern` — Label identifier structure is incorrect. Validation failed - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/). Validation failed - `sgtinEmitted` — Label identifier has been issued. Validation failed - `sgtinApplied` — Putting into circulation not completed. Validation failed - `sgtinWrittenOff` — Written off. Validation failed - `sgtinRetired` — Retired. Validation failed - `sgtinWithdrawn` — Withdrawn. Validation failed - `sgtinDisaggregation` — Disaggregation. Validation failed - `sgtinDisaggregated` — Disaggregated. Validation failed - `sgtinAppliedNotPaid` — Not paid. Validation failed `gtin` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed `expiration` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed `customsDeclaration` validation statuses with which the supply can not be transferred to delivery: - `required` — Required label identifier is not added to the assembly order. Validation failed `customsDeclaration` validation statuses with which the supply can be transferred to delivery: - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_meta(v3_get_meta_multi_request=...)
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

const { data } = await api.postV3OrdersMeta(v3GetMetaMultiRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3OrdersMeta(context.Background()).V3GetMetaMultiRequest(v3GetMetaMultiRequest).Execute()
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

System.out.println(api.postV3OrdersMeta(v3GetMetaMultiRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersMeta($v3_get_meta_multi_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersMeta(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersMeta(v3GetMetaMultiRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::post_v3_orders_meta(&cfg, v3_period_get_meta_multi_request).await;
    println!("{:#?}", result);
}
```

:::
