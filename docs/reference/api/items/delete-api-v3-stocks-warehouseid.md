---
title: "Удалить остатки товаров"
description: "Метод удаляет запись об остатках товаров продавца из списка остатков."
---

# Удалить остатки товаров

```http
DELETE /api/v3/stocks/{warehouseId}
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Остатки на складах продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/deleteV3StocksWarehouseId)

Метод удаляет запись об остатках товаров продавца из [списка остатков](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/postV3StocksWarehouseId).

**Действие необратимо**. Удаленный остаток будет необходимо загрузить повторно для возобновления продаж.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период                                                          | Лимит       | Интервал | Всплеск   |
| --------------------------------------------------------------- | ----------- | -------- | --------- |
| 1 мин                                                           | 10 запросов | 6 сек    | 2 запроса |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                 | Схема    |
| ----- | ------------------------ | -------- |
| `204` | Удалено                  | —        |
| `400` | Неправильный запрос      | `Error`  |
| `401` | Не авторизован           | `object` |
| `402` | Требуется платёж         | `object` |
| `403` | Доступ запрещён          | `Error`  |
| `404` | Не найдено               | `Error`  |
| `409` | Ошибка удаления остатков | `Error`  |
| `429` | Слишком много запросов   | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.delete_v3_stocks_warehouse_id(warehouse_id=..., delete_v3_stocks_warehouse_id_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.deleteV3StocksWarehouseId(warehouseId, deleteV3StocksWarehouseIdRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.DeleteV3StocksWarehouseId(context.Background(), warehouseId).DeleteV3StocksWarehouseIdRequest(deleteV3StocksWarehouseIdRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.deleteV3StocksWarehouseId(warehouseId, deleteV3StocksWarehouseIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->deleteV3StocksWarehouseId($warehouse_id, $delete_v3_stocks_warehouse_id_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОстаткиНаСкладахПродавцаApi(Настройки);

Сообщить(Клиент.DeleteV3StocksWarehouseId(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.DeleteV3StocksWarehouseId(warehouseId, deleteV3StocksWarehouseIdRequest));
```

:::
