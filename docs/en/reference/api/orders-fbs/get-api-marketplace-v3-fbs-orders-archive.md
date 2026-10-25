---
title: "Get the List of Archived Assembly Orders"
description: "The method returns assembly orders created more than 3 months ago. Some assembly orders are archived later than 3 months after creation, as the supply is…"
---

# Get the List of Archived Assembly Orders

```http
GET /api/marketplace/v3/fbs/orders/archive
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3FbsOrdersArchive)

The method returns assembly orders created more than 3 months ago.
Some assembly orders are archived later than 3 months after creation, as the supply is archived only after all orders in it are completed.
For example, this happens if the seller did not deliver one of the orders in the supply and the order was canceled automatically after a few days.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name    | In    | Type             | Req. | Description                                                                                                                                                                                                                |
| ------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`  | query | `integer<int64>` | yes  | Year the order was created                                                                                                                                                                                                 |
| `month` | query | `integer<int64>` | yes  | Month the order was created                                                                                                                                                                                                |
| `next`  | query | `integer<int64>` | yes  | Pagination parameter. Sets the value from which to retrieve the next batch. It should start at 0 to get the full list of data. For the subsequent requests, you must take the value from the `next` field in the response. |
| `limit` | query | `integer<int32>` | yes  | Number of assembly orders in the response                                                                                                                                                                                  |

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `v3.ArchiveOrders`    |
| `400` | Bad request       | `ArhiveOrderError400` |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `403` | Access denied     | `object`              |
| `429` | Too many requests | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_orders_archive(year=..., month=..., next=..., limit=...)
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

const { data } = await api.getV3FbsOrdersArchive(year, month, next, limit);
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

result, _, err := client.OrdersFbsAPI.GetV3FbsOrdersArchive(context.Background()).Year(year).Month(month).Next(next).Limit(limit).Execute()
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

System.out.println(api.getV3FbsOrdersArchive(year, month, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsOrdersArchive($year, $month, $next, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsOrdersArchive(year, month, next, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsOrdersArchive(year, month, next, limit));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_fbs_orders_archive(&cfg, year, month, next, limit).await;
    println!("{:#?}", result);
}
```

:::
