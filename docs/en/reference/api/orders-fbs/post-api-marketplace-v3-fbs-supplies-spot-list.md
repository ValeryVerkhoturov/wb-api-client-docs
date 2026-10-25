---
title: "Get SPOT Data for Supply List"
description: "The method returns SPOT data for a list of supplies. You can get SPOT data only if all of the following conditions are met: - the supply is in the delivery…"
---

# Get SPOT Data for Supply List

```http
POST /api/marketplace/v3/fbs/supplies/spot/list
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList)

The method returns SPOT data for a list of supplies.
You can get SPOT data only if all of the following conditions are met:

- the supply is in the delivery stage
- the seller is registered in any EAEU country other than the Russian Federation
- the destination warehouse is located in the Russian Federation

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, required

- `supplyIds` `string[]` (required) — Supply IDs list

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `SupplySpotDataResponse` |
| `400` | Bad request       | `ApiErrorV3`             |
| `401` | Unauthorized      | `object`                 |
| `403` | Access denied     | `object`                 |
| `429` | Too many requests | `object`                 |

**Structure `200`:**

- `supplies` `object[]`
  - `id` `string` — Supply ID
  - `spot` `object`
    - `status` `string` = `pending` | `completed` | `failed` — SPOT status: - `pending` — waiting for the result of DOPP — Declaration of Upcoming Supply — formation - `completed` — DOPP successfully formed. You can [get the QR code](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdStickersSpot) - `failed` — DOPP formation error. See the `errorCode` field for details
    - `carrierName` `string` — Carrier name
    - `carrierTaxNumber` `string` — Carrier tax number
    - `carrierCountryCode` `string` — Carrier [OKSM](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm) country code
    - `vehicleRegistrationNumber` `string` — Vehicle registration number
    - `trailerRegistrationNumber` `string` — Trailer registration number
    - `errorCode` `string` = `doppFailed` — Error code from the DOPP — Declaration of Upcoming Supply — formation service. Returned when `"status": "failed"`. To fix the error, check the SPOT data and [add it to the supply](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdSpot) again.
  - `error` `object`
    - `title` `string` — Error title
    - `detail` `string` — Error details

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_fbs_supplies_spot_list(post_v3_fbs_supplies_spot_list_request=...)
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

const { data } = await api.postV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3FbsSuppliesSpotList(context.Background()).PostV3FbsSuppliesSpotListRequest(postV3FbsSuppliesSpotListRequest).Execute()
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

System.out.println(api.postV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3FbsSuppliesSpotList($post_v3_fbs_supplies_spot_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3FbsSuppliesSpotList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::post_v3_fbs_supplies_spot_list(&cfg, post_v3_fbs_supplies_spot_list_request).await;
    println!("{:#?}", result);
}
```

:::
