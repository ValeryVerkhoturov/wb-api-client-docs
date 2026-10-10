---
title: "Обновить склад продавца"
description: "Метод обновляет данные склада продавца, кроме складов для сверхгабаритных товаров (СГТ, \"cargoType\":2)."
---

# Обновить склад продавца

```http
PUT /api/v3/warehouses/{warehouseId}
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Склады продавца · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/items/put-api-v3-warehouses-warehouseid) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/sellerWarehouses/operation/putV3WarehousesWarehouseId)

Метод обновляет данные [склада продавца](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/getV3Warehouses), кроме складов для сверхгабаритных товаров (СГТ, `"cargoType":2`).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **складов продавца**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                 | Схема    |
| ----- | ------------------------ | -------- |
| `204` | Обновлено                | —        |
| `400` | Неправильный запрос      | `Error`  |
| `401` | Не авторизован           | `object` |
| `402` | Требуется платёж         | `object` |
| `403` | Доступ запрещён          | `Error`  |
| `404` | Не найдено               | `Error`  |
| `409` | Ошибка обновления склада | `Error`  |
| `429` | Слишком много запросов   | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.put_v3_warehouses_warehouse_id(warehouse_id=..., put_v3_warehouses_warehouse_id_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ItemsApi(cfg);

const { data } = await api.putV3WarehousesWarehouseId(warehouseId, putV3WarehousesWarehouseIdRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PutV3WarehousesWarehouseId(context.Background(), warehouseId).PutV3WarehousesWarehouseIdRequest(putV3WarehousesWarehouseIdRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.putV3WarehousesWarehouseId(warehouseId, putV3WarehousesWarehouseIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->putV3WarehousesWarehouseId($warehouse_id, $put_v3_warehouses_warehouse_id_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PutV3WarehousesWarehouseId(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PutV3WarehousesWarehouseId(warehouseId, putV3WarehousesWarehouseIdRequest));
```

:::
