---
title: "Supply Discrepancies"
description: "Method is available by Personal token, Service token"
---

# Supply Discrepancies

```http
GET /api/supplies/v1/discrepancies/{supplyId}
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supplies Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns information about discrepancies between the declared and actual item quantity in the supply.

Available for supplies accepted no more than one year ago.

\*\*Discrepancy types:\*\*

Discrepancy upwards:

1. Excess of items with the declared SKU:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "surplus"`

2. Excess of items with a SKU that does not match the declared one:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "re-sorting"`
  Discrepancy downwards:

1. Missing items:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "shortage"`

2. Some SKUs do not match the declared ones:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "re-sorting"`

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst     |
| ------ | --------- | -------- | --------- |
| 1 min  | 1 request | 1 min    | 1 request |

## Parameters

| Name       | In   | Type              | Req. | Description |
| ---------- | ---- | ----------------- | ---- | ----------- |
| `supplyId` | path | `string<integer>` | yes  | Supply ID   |

## Responses

| Code  | Description       | Schema                                                  |
| ----- | ----------------- | ------------------------------------------------------- |
| `200` | Success           | `GetV1SuppliesSupplyIdDiscrepanciesQuantityResponse200` |
| `400` | Bad request       | `models.ErrorModel`                                     |
| `401` | Unauthorized      | `object`                                                |
| `403` | Доступ запрещён   | `models.SupplyAcceptedMoreThanYearAgo`                  |
| `404` | Not found         | `models.ErrorModel`                                     |
| `429` | Too many requests | `object`                                                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_supply_id_discrepancies_quantity(supply_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1SuppliesSupplyIdDiscrepanciesQuantity(context.Background(), supplyId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesSupplyIdDiscrepanciesQuantity($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::get_v1_supplies_supply_id_discrepancies_quantity(&cfg, supply_id).await;
    println!("{:#?}", result);
}
```

:::
