---
title: "Закрепить УИН за сборочным заданием"
description: "Метод обновляет УИН, уникальный идентификационный номер, в идентификаторах маркировки сборочного задания. У одного сборочного задания может быть только один…"
---

# Закрепить УИН за сборочным заданием

```http
PUT /api/v3/dbw/orders/{orderId}/meta/uin
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-dbw`](/reference/api/orders-dbw/) · **Раздел:** Идентификаторы маркировки DBW · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaUin)

Метод обновляет УИН, уникальный идентификационный номер, в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails). У одного сборочного задания может быть только один УИН.
Закрепить УИН можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) есть поле `uin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBW**:

| Период                                                         | Лимит         | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 мин                                                          | 1000 запросов | 60 мс    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                                     | Схема    |
| ----- | -------------------------------------------- | -------- |
| `204` | Обновлено                                    | —        |
| `400` | Неправильный запрос                          | `Error`  |
| `401` | Не авторизован                               | `object` |
| `402` | Требуется платёж                             | `object` |
| `403` | Доступ запрещён                              | `Error`  |
| `404` | Не найдено                                   | `Error`  |
| `409` | Ошибка добавления идентификаторов маркировки | `Error`  |
| `429` | Слишком много запросов                       | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.put_v3_dbw_orders_order_id_meta_uin(order_id=..., put_v3_dbw_orders_order_id_meta_uin_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.putV3DbwOrdersOrderIdMetaUin(orderId, putV3DbwOrdersOrderIdMetaUinRequest);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PutV3DbwOrdersOrderIdMetaUin(context.Background(), orderId).PutV3DbwOrdersOrderIdMetaUinRequest(putV3DbwOrdersOrderIdMetaUinRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.putV3DbwOrdersOrderIdMetaUin(orderId, putV3DbwOrdersOrderIdMetaUinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->putV3DbwOrdersOrderIdMetaUin($order_id, $put_v3_dbw_orders_order_id_meta_uin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PutV3DbwOrdersOrderIdMetaUin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PutV3DbwOrdersOrderIdMetaUin(orderId, putV3DbwOrdersOrderIdMetaUinRequest));
```

:::
