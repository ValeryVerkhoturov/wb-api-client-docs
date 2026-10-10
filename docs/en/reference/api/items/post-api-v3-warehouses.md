---
title: "Создать склад продавца"
description: "Метод создаёт склад продавца для работы с остатками товаров, кроме сверхгабаритных (СГТ), по модели FBS (Fulfillment by Seller)."
---

# Создать склад продавца

```http
POST /api/v3/warehouses
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Склады продавца · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/postV3Warehouses)

Метод создаёт склад продавца для работы с [остатками товаров](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory), кроме сверхгабаритных (СГТ), по модели [FBS](https://dev.wildberries.ru/openapi/orders-fbs) (Fulfillment by Seller).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **складов продавца**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                   | Schema                        |
| ----- | ----------------------------- | ----------------------------- |
| `201` | Создано                       | `PostV3WarehousesResponse201` |
| `400` | Неправильный запрос           | `Error`                       |
| `401` | Не авторизован                | `object`                      |
| `402` | Требуется платёж              | `object`                      |
| `403` | Доступ запрещён               | `Error`                       |
| `404` | Не найдено                    | `Error`                       |
| `409` | Ошибка создания нового склада | `Error`                       |
| `429` | Слишком много запросов        | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v3_warehouses(post_v3_warehouses_request=...)
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

const { data } = await api.postV3Warehouses(postV3WarehousesRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV3Warehouses(context.Background()).PostV3WarehousesRequest(postV3WarehousesRequest).Execute()
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

System.out.println(api.postV3Warehouses(postV3WarehousesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV3Warehouses($post_v3_warehouses_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV3Warehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV3Warehouses(postV3WarehousesRequest));
```

:::
