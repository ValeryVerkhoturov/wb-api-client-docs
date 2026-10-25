---
title: "Get Subcategories That Can't Be Returned to the Warehouse"
description: "The method returns the list of subcategory IDs those items cannot be stored in the WB warehouses and will be returned to the pickup point automatically."
---

# Get Subcategories That Can't Be Returned to the Warehouse

```http
GET /api/marketplace/v3/fbs/settings/autoreturns/subcategories/restricted
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Auto-return Settings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/autoreturnSettings/operation/getV3FbsSettingsAutoreturnsSubcategoriesRestricted)

The method returns the list of subcategory IDs those items cannot be stored in the WB warehouses and will be returned to the pickup point automatically.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name    | In    | Type             | Req. | Description                                                                                                                                                                                                                |
| ------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next`  | query | `integer<int64>` | yes  | Pagination parameter. Sets the value from which to retrieve the next batch. It should start at 0 to get the full list of data. For the subsequent requests, you must take the value from the `next` field in the response. |
| `limit` | query | `integer<int32>` | yes  | Number of subcategories in the response                                                                                                                                                                                    |

## Responses

| Code  | Description         | Schema                                                          |
| ----- | ------------------- | --------------------------------------------------------------- |
| `200` | Успешно             | `GetV3FbsSettingsAutoreturnsSubcategoriesRestrictedResponse200` |
| `400` | Неправильный запрос | `ApiErrorV3`                                                    |
| `401` | Unauthorized        | `object`                                                        |
| `403` | Access denied       | `Response4XX`                                                   |
| `429` | Too many requests   | `object`                                                        |

**Structure `200`:**

- `next` `integer<int64>` — Pagination parameter. Sets the value from which to get the next batch
- `data` `object[]` — Subcategory IDs those items are not stored in WB warehouses
  - `subjectId` `integer<int64>` — Subcategory ID

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

result = api.get_v3_fbs_settings_autoreturns_subcategories_restricted(next=..., limit=...)
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

const { data } = await api.getV3FbsSettingsAutoreturnsSubcategoriesRestricted(next, limit);
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

result, _, err := client.OrdersFbsAPI.GetV3FbsSettingsAutoreturnsSubcategoriesRestricted(context.Background()).Next(next).Limit(limit).Execute()
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

System.out.println(api.getV3FbsSettingsAutoreturnsSubcategoriesRestricted(next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsSettingsAutoreturnsSubcategoriesRestricted($next, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsSettingsAutoreturnsSubcategoriesRestricted(next, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsSettingsAutoreturnsSubcategoriesRestricted(next, limit));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_fbs_settings_autoreturns_subcategories_restricted(&cfg, next, limit).await;
    println!("{:#?}", result);
}
```

:::
