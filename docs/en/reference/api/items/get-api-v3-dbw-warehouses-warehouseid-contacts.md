---
title: "Contacts List"
description: "Returns a list of contacts linked to the seller warehouse."
---

# Contacts List

```http
GET /api/v3/dbw/warehouses/{warehouseId}/contacts
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Seller Warehouses · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/sellerWarehouses/operation/getV3DbwWarehousesWarehouseIdContacts)

Returns a list of contacts linked to the seller warehouse.

Only for warehouses with delivery type `3` — Delivery WB ([DBW](https://dev.wildberries.ru/openapi/orders-dbw)).

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for DBW methods:

- for getting and updating contact lists
- for getting and deleting label identifiers
- assembly orders

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Responses

| Code  | Description       | Schema                                             |
| ----- | ----------------- | -------------------------------------------------- |
| `200` | Success           | `GetV3DbwWarehousesWarehouseIdContactsResponse200` |
| `400` | Bad request       | `Error`                                            |
| `401` | Unauthorized      | `object`                                           |
| `402` | Payment required  | `object`                                           |
| `403` | Access denied     | `Error`                                            |
| `429` | Too many requests | `object`                                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v3_dbw_warehouses_warehouse_id_contacts(warehouse_id=...)
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

const { data } = await api.getV3DbwWarehousesWarehouseIdContacts(warehouseId);
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

result, _, err := client.ItemsAPI.GetV3DbwWarehousesWarehouseIdContacts(context.Background(), warehouseId).Execute()
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

System.out.println(api.getV3DbwWarehousesWarehouseIdContacts(warehouseId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV3DbwWarehousesWarehouseIdContacts($warehouse_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV3DbwWarehousesWarehouseIdContacts(warehouseId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV3DbwWarehousesWarehouseIdContacts(warehouseId));
```

:::
