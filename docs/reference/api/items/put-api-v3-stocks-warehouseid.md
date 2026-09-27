---
title: "Обновить остатки товаров"
description: "Метод обновляет количество остатков товаров продавца в списке."
---

# Обновить остатки товаров

```http
PUT /api/v3/stocks/{warehouseId}
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Остатки на складах продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/putV3StocksWarehouseId)

Метод обновляет количество остатков товаров продавца [в списке](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/postV3StocksWarehouseId).

Названия параметров запроса не валидируются. При отправке некорректных названий вы получите успешный ответ (`204`), но остатки не обновятся.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **остатков на складах продавца** кроме метода [удаления остатков](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/deleteV3StocksWarehouseId):

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание                          | Схема                               |
| ----- | --------------------------------- | ----------------------------------- |
| `204` | Обновлено                         | —                                   |
| `400` | Неправильный запрос               | `Error`                             |
| `401` | Не авторизован                    | `object`                            |
| `402` | Требуется платёж                  | `object`                            |
| `403` | Доступ запрещён                   | `Error`                             |
| `404` | Не найдено                        | `Error`                             |
| `406` | Обновление остатков заблокировано | `UpdateBlocked`                     |
| `409` | Ошибка обновления остатков        | `PutV3StocksWarehouseIdResponse409` |
| `429` | Слишком много запросов            | `object`                            |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.put_v3_stocks_warehouse_id(warehouse_id=..., put_v3_stocks_warehouse_id_request=...)
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

const { data } = await api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PutV3StocksWarehouseId(context.Background(), warehouseId).Execute()
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

System.out.println(api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->putV3StocksWarehouseId($warehouse_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОстаткиНаСкладахПродавцаApi(Настройки);

Сообщить(Клиент.PutV3StocksWarehouseId(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PutV3StocksWarehouseId(warehouseId));
```

:::
