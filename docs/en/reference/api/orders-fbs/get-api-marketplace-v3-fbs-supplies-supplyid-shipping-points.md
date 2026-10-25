---
title: "Get Supply Shipping Points"
description: "The method returns shipping points available for the supply. Use this method data to set supply shipping methods."
---

# Get Supply Shipping Points

```http
GET /api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdShippingPoints)

The method returns shipping points available for the supply.
Use this method data to set [supply shipping methods](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod).

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Parameters

| Name         | In    | Type     | Req. | Description                                                                                                                                                                                                                                                               |
| ------------ | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `supplyId`   | path  | `string` | yes  | Supply ID                                                                                                                                                                                                                                                                 |
| `city`       | query | `string` | yes  | Locality for shipping the supply, Cyrillic                                                                                                                                                                                                                                |
| `officeType` | query | `string` | yes  | Shipping point type: - `sc` — sorting center - `sw` — warehouse - `pp` — pickup point - `pfc` — partner fulfillment center - `gpp` — items acceptance point                                                                                                               |
| `shippingDt` | query | `string` | no   | Planned supply shipping date, format `YYYY-MM-DD`. Required for orders for small-sized items (`"cargoType":1`) and dimensional cargo+ (`"cargoType":3`). If the value passed, you will get only the shipping points where the supply can be shipped on the specified date |

## Responses

| Code  | Description                      | Schema                         |
| ----- | -------------------------------- | ------------------------------ |
| `200` | Success                          | `SupplyShippingPointsResponse` |
| `400` | Bad request                      | `Error`                        |
| `401` | Unauthorized                     | `object`                       |
| `403` | Access denied                    | `object`                       |
| `404` | Supply not found                 | `Error`                        |
| `409` | No assembly orders in the supply | `Error`                        |
| `429` | Too many requests                | `object`                       |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_supplies_supply_id_shipping_points(supply_id=..., city=..., office_type=..., shipping_dt=...)
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

const { data } = await api.getV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType, shippingDt);
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

result, _, err := client.OrdersFbsAPI.GetV3FbsSuppliesSupplyIdShippingPoints(context.Background(), supplyId).City(city).OfficeType(officeType).Execute()
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

System.out.println(api.getV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType, shippingDt));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsSuppliesSupplyIdShippingPoints($supply_id, $city, $office_type));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::get_v3_fbs_supplies_supply_id_shipping_points(&cfg, supply_id, city, office_type, shipping_dt).await;
    println!("{:#?}", result);
}
```

:::
