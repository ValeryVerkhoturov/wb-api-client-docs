---
title: "Получить список новых сборочных заданий"
description: "Метод возвращает список всех новых сборочных заданий, которые есть у продавца на момент запроса."
---

# Получить список новых сборочных заданий

```http
GET /api/v3/dbw/orders/new
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-dbw`](/reference/api/orders-dbw/) · **Раздел:** Сборочные задания DBW · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrdersNew)

Метод возвращает список всех новых [сборочных заданий](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), которые есть у продавца на момент запроса.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Ответы

| Код   | Описание               | Схема                          |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `GetV3DbwOrdersNewResponse200` |
| `401` | Не авторизован         | `object`                       |
| `402` | Требуется платёж       | `object`                       |
| `403` | Доступ запрещён        | `Error`                        |
| `429` | Слишком много запросов | `object`                       |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import DBWApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DBWApi(ApiClient(cfg))

result = api.get_v3_dbw_orders_new()
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

const { data } = await api.getV3DbwOrdersNew();
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.DBWAPI.GetV3DbwOrdersNew(context.Background()).Execute()
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

System.out.println(api.getV3DbwOrdersNew());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\DBWApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DBWApi(new Client(), $config);

print_r($api->getV3DbwOrdersNew());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СборочныеЗаданияDBWApi(Настройки);

Сообщить(Клиент.GetV3DbwOrdersNew().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DBWApi(config);

Console.WriteLine(api.GetV3DbwOrdersNew());
```

:::
