---
title: "Get Assembly Orders Label Identifiers"
description: "Returns assembly orders label identifiers and their validation statuses."
---

# Get Assembly Orders Label Identifiers

```http
POST /api/marketplace/v3/click-collect/orders/meta/details
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails)

Returns [assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) label identifiers and their validation statuses.

You can get the list of label identifiers available for the assembly order with the [list of new assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrdersNew), field `requiredMeta`. If the `requiredMeta` field does not contain the label identifier, it means that this label identifier cannot be added to this assembly order.
Possible label identifiers:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaImei)
- `uin` — [UIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin)
- `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin)
- `customsDeclaration` — [customs declaration number](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration)
- `originCountryCode` — [numeric code of the country of origin](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) according to [Russian classification of countries of the world](https://esnsi.gosuslugi.ru/classifiers/16269)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **getting and deleting In-Store Pickup label identifiers**:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 150 requests | 400 ms   | 20 requests |
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
    - `key` `string` — Label identifier: - `imei` — [IMEI](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaImei) - `uin` — [UIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin) - `gtin` — [GTIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin) - `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin) - `customsDeclaration` — [customs declaration number](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) - `originCountryCode` — [numeric code of the country of origin](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) according to [Russian classification of countries of the world](https://esnsi.gosuslugi.ru/classifiers/16269)
    - `value` `string` — Label identifier value
    - `decision` `string` — Label identifiers validation statuses. - `imei` - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `imeiMaySell` — The item is approved for sale. Validation passed - `imeiSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `imeiInvalidFormat` — Invalid format. Validation failed - `imeiAlreadySold` — The item with this IMEI has already been sold. Validation failed - `uin` - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed - `sgtin` - `filled` — Label identifier is added to the assembly order, validation is not required - `deadlineExceeded` — Label identifier validation is not completed and will continue. The validation can pass or fail - `optional` — Label identifier is not required. Validation passed - `sgtinIntroduced` — The item is approved for sale. Validation passed - `sgtinSoldB2B` — The item was sold to a B2B buyer and approved for sale again. Validation passed - `pending` — Label identifier validation continues. Wait for the validation status to change - `required` — Required label identifier is not added to the assembly order. Validation failed - `sgtinInvalidFormat` — Invalid format. Validation failed - `sgtinNotFound` — Label identifier not found in [Chestny ZNAK](https://chestnyznak.ru/en/). Validation failed - `sgtinEmitted` — Label identifier has been issued. Validation failed - `sgtinApplied` — Putting into circulation not completed. Validation failed - `sgtinWrittenOff` — Written off. Validation failed - `sgtinRetired` — Retired. Validation failed - `sgtinWithdrawn` — Withdrawn. Validation failed - `sgtinDisaggregated` — Disaggregated. Validation failed - `sgtinDisaggregation` — Disaggregation. Validation failed - `sgtinAppliedNotPaid` — Not paid. Validation failed - `gtin` - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed - `customsDeclaration` - `filled` — Label identifier is added to the assembly order, validation is not required - `optional` — Label identifier is not required. Validation passed - `required` — Required label identifier is not added to the assembly order. Validation failed

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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_details(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new InStorePickupApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = in_store_pickup_api::post_v3_click_collect_orders_meta_details(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
