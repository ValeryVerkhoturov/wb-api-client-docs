---
title: "Supply Details"
description: "The method returns supply details by ID."
---

# Supply Details

```http
GET /api/v1/supplies/{ID}
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supplies Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesId)

The method returns supply details by ID.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 min  | 30 requests | 2 s      | 10 requests |
| Service          | 1 min  | 30 requests | 2 s      | 10 requests |
| Base with secret | 1 min  | 30 requests | 2 s      | 10 requests |
| Base             | 1 h    | 2 requests  | 30 min   | 1 request   |

## Parameters

| Name           | In    | Type             | Req. | Description                                                                                                               |
| -------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------- |
| `ID`           | path  | `integer<int64>` | yes  | ID of the supply or the order                                                                                             |
| `isPreorderID` | query | `boolean`        | no   | Search by: - `true` — order ID, if you pass the order ID in `ID` - `false` — supply ID, if you pass the supply ID in `ID` |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `models.SupplyDetails` |
| `400` | Bad request       | `models.ErrorModel`    |
| `401` | Unauthorized      | `object`               |
| `402` | Payment required  | `object`               |
| `403` | Access denied     | `object`               |
| `404` | Not found         | `models.ErrorModel`    |
| `429` | Too many requests | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_id(id=..., is_preorder_id=...)
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

const { data } = await api.getV1SuppliesId(iD, isPreorderID);
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

result, _, err := client.OrdersFbwAPI.GetV1SuppliesId(context.Background(), iD).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesId(ID, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesId(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesId(ID));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::get_v1_supplies_id(&cfg, id, is_preorder_id).await;
    println!("{:#?}", result);
}
```

:::
