---
title: "Get Seller Prices and Amounts Charged to the Buyer"
description: "The method returns: - seller prices excluding discounts - sums charged to the buyer including all discounts and cashback"
---

# Get Seller Prices and Amounts Charged to the Buyer

```http
POST /api/marketplace/v3/dbs/orders/final-price
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice)

The method returns:

- seller prices excluding discounts
- sums charged to the buyer including all discounts and cashback

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **getting and deleting DBS label identifiers**:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 150 requests | 400 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `OrdersRequestAPI`, optional

- `orders` `integer<int64>[]` — Assembly order IDs list

## Responses

| Code  | Description       | Schema                         |
| ----- | ----------------- | ------------------------------ |
| `200` | Success           | `api.OrdersFinalPriceResponse` |
| `400` | Bad request       | `api.BatchError`               |
| `401` | Unauthorized      | `object`                       |
| `403` | Access denied     | `api.BatchError`               |
| `429` | Too many requests | `object`                       |

**Structure `200`:**

- `requestId` `string` — Unique request ID
- `results` `api.OrderFinalPriceResult[]`
  - `orderId` `integer<int64>` — Assembly order ID
  - `data` `object` — Assembly order data. If `"data":{}`, the data is being generated. Please try again later. Maximum data generation time is approximately 1 minute. If `data` is absent, the assembly order data is not provided. Use the data from the responses of the methods: - [Get New Assembly Orders List](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew) - [Get Information on Completed Orders](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrders)
    - `originalPrice` `integer<int64>` — Seller price in the currency of sale, excluding discounts, multiplied by 100
    - `convertedOriginalPrice` `integer<int64>` — Seller price in the currency of the seller country, excluding discounts, multiplied by 100
    - `originalFinalPrice` `integer<int64>` — The sum charged to the buyer in the currency of sale including all discounts and cashback, multiplied by 100. You can find a currency code in the `currencyCode` field. Provided for informational purposes only
    - `convertedOriginalFinalPrice` `integer<int64>` — The sum charged to the buyer in the currency of the seller country including all discounts and cashback, multiplied by 100. Provided for informational purposes only
    - `currencyCode` `integer<ISO 4217>` — Sale currency code
    - `convertedCurrencyCode` `integer<ISO 4217>` — Currency code of the seller country
  - `errors` `api.BatchErrorFinalPriceResponse[]` — Error detail
    - `code` `integer<int64>` — Error code: - `404` — `NotFound` - `400` — `StatusMismatch` - `422` — `PriceNotCalculated`
    - `detail` `string` — - `NotFound` — the assembly order is not found (`404`) - `StatusMismatch` — operation is not possible for this assembly order status (`400`) - `PriceNotCalculated` — operation is not available for assembly orders created before 23.07.2026 (`422`)
  - `isError` `boolean` — Are there any errors

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
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_final_price(orders_request_api=...)
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

const { data } = await api.postV3DbsOrdersFinalPrice(ordersRequestAPI);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersFinalPrice(context.Background()).Execute()
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

System.out.println(api.postV3DbsOrdersFinalPrice(ordersRequestAPI));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersFinalPrice());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersFinalPrice(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersFinalPrice());
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = dbs_api::post_v3_dbs_orders_final_price(&cfg, orders_request_api).await;
    println!("{:#?}", result);
}
```

:::
