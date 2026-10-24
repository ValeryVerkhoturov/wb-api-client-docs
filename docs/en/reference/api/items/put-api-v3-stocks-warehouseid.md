---
title: "Update Inventory"
description: "Updates item inventory."
---

# Update Inventory

```http
PUT /api/v3/stocks/{warehouseId}
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Seller Warehouses Inventory · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/sellerWarehousesInventory/operation/putV3StocksWarehouseId)

Updates item inventory.

The names of the query parameters are not validated. If invalid names are sent, the response will be successful(204), but the remaining amounts will not be updated.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all **inventory** methods except for the [deleting inventory](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/deleteV3StocksWarehouseId) method:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                              |
| ----- | ----------------- | ----------------------------------- |
| `204` | Updated           | —                                   |
| `400` | Bad request       | `Error`                             |
| `401` | Unauthorized      | `object`                            |
| `402` | Payment required  | `object`                            |
| `403` | Access denied     | `Error`                             |
| `404` | Not found         | `Error`                             |
| `406` | Not Acceptable    | `UpdateBlocked`                     |
| `409` | Conflict          | `PutV3StocksWarehouseIdResponse409` |
| `429` | Too many requests | `object`                            |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.put_v3_stocks_warehouse_id(warehouse_id=..., put_v3_stocks_warehouse_id_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PutV3StocksWarehouseId(context.Background(), warehouseId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->putV3StocksWarehouseId($warehouse_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PutV3StocksWarehouseId(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PutV3StocksWarehouseId(warehouseId));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::put_v3_stocks_warehouse_id(&cfg, warehouse_id, put_v3_stocks_warehouse_id_request).await;
    println!("{:#?}", result);
}
```

:::
