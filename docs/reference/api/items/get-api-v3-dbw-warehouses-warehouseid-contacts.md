---
title: "Список контактов"
description: "Метод возвращает список контактов, привязанных к складу продавца."
---

# Список контактов

```http
GET /api/v3/dbw/warehouses/{warehouseId}/contacts
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Склады продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/getV3DbwWarehousesWarehouseIdContacts)

Метод возвращает список контактов, привязанных к [складу продавца](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/getV3Warehouses).

Только для складов с типом доставки `3` — Деливери WB ([DBW](https://dev.wildberries.ru/openapi/orders-dbw)).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Ответы

| Код   | Описание               | Схема                                              |
| ----- | ---------------------- | -------------------------------------------------- |
| `200` | Успешно                | `GetV3DbwWarehousesWarehouseIdContactsResponse200` |
| `400` | Неправильный запрос    | `Error`                                            |
| `401` | Не авторизован         | `object`                                           |
| `402` | Требуется платёж       | `object`                                           |
| `403` | Доступ запрещён        | `Error`                                            |
| `429` | Слишком много запросов | `object`                                           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV3DbwWarehousesWarehouseIdContacts(warehouseId);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV3DbwWarehousesWarehouseIdContacts(context.Background(), warehouseId).Execute()
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

System.out.println(api.getV3DbwWarehousesWarehouseIdContacts(warehouseId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV3DbwWarehousesWarehouseIdContacts($warehouse_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СкладыПродавцаApi(Настройки);

Сообщить(Клиент.GetV3DbwWarehousesWarehouseIdContacts(warehouseId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV3DbwWarehousesWarehouseIdContacts(warehouseId));
```

:::
