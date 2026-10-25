---
title: "Get Assembly Orders Label Identifiers"
description: "Returns assembly orders label identifiers and their validation statuses."
---

# Get Assembly Orders Label Identifiers

```http
POST /api/marketplace/v3/dbs/orders/meta/details
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails)

Returns [assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) label identifiers and their validation statuses.

You can get the list of label identifiers available for the assembly order via the [list of new assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew) method, field `requiredMeta`. If the `requiredMeta` field does not contain the label identifier, it means that this label identifier cannot be added to this assembly order.
Possible label identifiers:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei)
- `uin` — [UIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin)
- `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin)
- `customsDeclaration` — [customs declaration number](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration)
- `originCountryCode` — [numeric code of the country of origin](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) according to [Russian classification of countries of the world](https://esnsi.gosuslugi.ru/classifiers/16269)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **getting and deleting DBS label identifiers**:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

- `ordersIds` `integer<int64>[]` (required) — List of assembly order IDs

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `api.OrdersMetaDetailsResponse` |
| `400` | Bad request       | `api.BatchError`                |
| `401` | Unauthorized      | `object`                        |
| `402` | Payment required  | `object`                        |
| `403` | Access denied     | `api.BatchError`                |
| `429` | Too many requests | `object`                        |

**Structure `200`:**

- `requestId` `string` — Unique request ID
- `orders` `object[]` — Assembly orders label identifiers and validation statuses
  - `orderId` `integer<int64>` — Assembly order ID
  - `isError` `boolean` — Are there any errors
  - `errors` `object[]` — Error data
    - `code` `integer<int64>` — Error code
    - `detail` `string` — Additional error data
  - `metaDetails` `object[]` — Label identifiers and their validation statuses
    - `key` `string` — Label identifier: - `imei` — [IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei) - `uin` — [UIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin) - `gtin` — [GTIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin) - `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin) - `customsDeclaration` — [customs declaration number](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) - `originCountryCode` — [numeric code of the country of origin](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) according to [Russian classification of countries of the world](https://esnsi.gosuslugi.ru/classifiers/16269)
    - `value` `string` — Label identifier value
    - `decision` `string` — State: - `imei` - `pending` — Label identifier for inspection - `optional` — Label identifier is not required - `filled` — Validation passed - `deadlineExceeded` — Validation passed - `imeiMaySell` — The item is approved for sale. Validation passed - `imeiSoldB2B` — The item was sold to a B2B buyer and allowed to be sold again. Validation passed - `required` — Required label identifier is not filled. Validation failed - `imeiInvalidFormat` — Invalid format. Validation failed - `imeiAlreadySold` — The item with this IMEI has already been sold. Validation failed - `uin` - `filled` — Validation passed - `optional` — Label identifier is not required - `sgtin` - `pending` — Label identifier for inspection - `optional` — Label identifier is not required - `filled` — Validation passed - `deadlineExceeded` — Validation passed - `sgtinIntroduced` — The item is approved for sale. Validation passed - `sgtinSoldB2B` — The item was sold to a B2B buyer and allowed to be sold again. Validation passed - `required` — Required label identifier is not filled. Validation failed - `sgtinInvalidFormat` — Invalid format. Validation failed - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/). Validation failed - `sgtinEmitted` — Label identifier has been issued. Validation failed - `sgtinApplied` — Putting into circulation not completed. Validation failed - `sgtinWrittenOff` — Written off. Validation failed - `sgtinRetired` — Retired. Validation failed - `sgtinWithdrawn` — Withdrawn. Validation failed - `sgtinDisaggregation` — Disaggregation. Validation failed - `sgtinDisaggregated` — Disaggregated. Validation failed - `sgtinAppliedNotPaid` — Not paid. Validation failed - `gtin` - `optional` — Label identifier is not required - `filled` — Validation passed - `customsDeclaration` - `optional` — Label identifier is not required - `filled` — Validation passed

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

result = api.post_v3_dbs_orders_meta_details(api_orders_request_v2=...)
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

const { data } = await api.postV3DbsOrdersMetaDetails(apiOrdersRequestV2);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
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

System.out.println(api.postV3DbsOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaDetails(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = dbs_api::post_v3_dbs_orders_meta_details(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
