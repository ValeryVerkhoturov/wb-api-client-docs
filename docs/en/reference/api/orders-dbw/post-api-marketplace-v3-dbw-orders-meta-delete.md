---
title: "Delete Assembly Orders Label Identifiers"
description: "Removes all assembly order label identifiers values."
---

# Delete Assembly Orders Label Identifiers

```http
POST /api/marketplace/v3/dbw/orders/meta/delete
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** DBW Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDelete)

Removes all [assembly order label identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) values.

You can only delete one type of label identifiers in one request.
Specify the label identifiers type in the request:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaImei)
- `uin` — [UIN](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaGtin)
- `sgtin` — [labeling code Chestny ZNAK](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaSgtin)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `api.OrdersMetaDleteRequestV2`, required

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `PostV3DbwOrdersMetaDeleteResponse200` |
| `400` | Bad request       | `Error`                                |
| `401` | Unauthorized      | `object`                               |
| `402` | Payment required  | `object`                               |
| `403` | Access denied     | `Error`                                |
| `429` | Too many requests | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_meta_delete(api_orders_meta_dlete_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.postV3DbwOrdersMetaDelete(apiOrdersMetaDleteRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersdbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_dbw"
)

cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersMetaDelete(context.Background()).ApiOrdersMetaDleteRequestV2(apiOrdersMetaDleteRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_dbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_dbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_dbw.api.OrdersDbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.postV3DbwOrdersMetaDelete(apiOrdersMetaDleteRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersMetaDelete($api_orders_meta_dlete_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersMetaDelete(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersMetaDelete(apiOrdersMetaDleteRequestV2));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_dbw_api::post_v3_dbw_orders_meta_delete(&cfg, api_period_orders_meta_dlete_request_v2).await;
    println!("{:#?}", result);
}
```

:::
