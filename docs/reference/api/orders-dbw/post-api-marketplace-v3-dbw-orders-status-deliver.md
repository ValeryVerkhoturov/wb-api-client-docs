---
title: "Перевести сборочные задания в доставку"
description: "Метод переводит сборочные задания из статуса confirm в статус complete — в доставке."
---

# Перевести сборочные задания в доставку

```http
POST /api/marketplace/v3/dbw/orders/status/deliver
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-dbw`](/reference/api/orders-dbw/) · **Раздел:** Сборочные задания DBW · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatusDeliver)

Метод переводит [сборочные задания](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrders) из [статуса](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus) `confirm` в статус `complete` — в доставке.

Проверяйте ответ метода. Сборочные задания, переведённые в доставку, вернутся с признаком `"isError":false`. Для остальных сборочных заданий смотрите причину ошибки в массиве `errors`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `api.OrdersRequestV2`, обязательно

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `api.StatusSetResponses` |
| `400` | Неправильный запрос    | `Error`                  |
| `401` | Не авторизован         | `object`                 |
| `402` | Требуется платёж       | `object`                 |
| `403` | Доступ запрещён        | `Error`                  |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import DBWApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DBWApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_status_deliver(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DBWApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DBWApi(cfg);

const { data } = await api.postV3DbwOrdersStatusDeliver(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.DBWAPI.PostV3DbwOrdersStatusDeliver(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_dbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_dbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_dbw.api.DbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DbwApi api = new DbwApi(client);

System.out.println(api.postV3DbwOrdersStatusDeliver(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\DBWApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DBWApi(new Client(), $config);

print_r($api->postV3DbwOrdersStatusDeliver($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СборочныеЗаданияDBWApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersStatusDeliver(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DBWApi(config);

Console.WriteLine(api.PostV3DbwOrdersStatusDeliver(apiOrdersRequestV2));
```

:::
