---
title: "Get Assembly Orders"
description: "The method returns information about assembly orders created no more than 3 months ago, without their current status To get data for a period, specify the…"
---

# Get Assembly Orders

```http
GET /api/v3/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders)

The method returns information about assembly orders created no more than 3 months ago, without their current status
To get data for a period, specify the start and end dates of the period in the request. Maximum of 30 calendar days per request. The method's response will contain assembly orders created during the specified period.

To get assembly orders created more than 3 months ago, use the method for getting the [list of archived assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3FbsOrdersArchive).

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                                |
| ---------- | ----- | ---------------- | ---- | ---------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `integer<int64>` | no   | Period start date in Unix timestamp format. By default date is 30 days before the request. Time zone — UTC |
| `dateTo`   | query | `integer<int64>` | no   | Period end date in Unix timestamp format. Time zone — UTC                                                  |

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `GetV3OrdersResponse200` |
| `400` | Bad request       | `Error`                  |
| `401` | Unauthorized      | `object`                 |
| `402` | Payment required  | `object`                 |
| `403` | Access denied     | `Error`                  |
| `429` | Too many requests | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_orders(limit=..., next=..., date_from=..., date_to=...)
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

const { data } = await api.getV3Orders(limit, next, dateFrom, dateTo);
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

result, _, err := client.OrdersFbsAPI.GetV3Orders(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.getV3Orders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3Orders($limit, $next));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3Orders(limit, next).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3Orders(limit, next));
```

:::
