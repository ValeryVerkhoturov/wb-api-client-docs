---
title: "Get Information on Completed Orders"
description: "The method provides information on completed assembly orders after the sale or cancellation of an order. You can get data for a specified period, maximum of 30…"
---

# Get Information on Completed Orders

```http
GET /api/v3/click-collect/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrders)

The method provides information on completed assembly orders after the sale or cancellation of an order.
You can get data for a specified period, maximum of 30 calendar days per request.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **In-Store Pickup assembly orders** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                                                                              |
| ---------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`    | query | `integer<int64>` | yes  | Number of items in the response                                                                                                                          |
| `next`     | query | `integer<int64>` | yes  | Pagination parameter. To get the full list of data, specify 0 in the first request. To get the next data package, use the `next` value from the response |
| `dateFrom` | query | `integer<int64>` | yes  | Period start date in the Unix timestamp format                                                                                                           |
| `dateTo`   | query | `integer<int64>` | yes  | Period end date in the Unix timestamp format                                                                                                             |

## Responses

| Code  | Description       | Schema       |
| ----- | ----------------- | ------------ |
| `200` | Success           | `api.Orders` |
| `400` | Bad request       | `Error`      |
| `401` | Unauthorized      | `object`     |
| `402` | Payment required  | `object`     |
| `403` | Access denied     | `Error`      |
| `429` | Too many requests | `object`     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.get_v3_click_collect_orders(limit=..., next=..., date_from=..., date_to=...)
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

const { data } = await api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo);
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

result, _, err := client.InStorePickupAPI.GetV3ClickCollectOrders(context.Background()).Limit(limit).Next(next).DateFrom(dateFrom).DateTo(dateTo).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->getV3ClickCollectOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = in_store_pickup_api::get_v3_click_collect_orders(&cfg, limit, next, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
