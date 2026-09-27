---
title: "Информация о покупателе"
description: "Метод возвращает информацию о покупателях по ID сборочных заданий."
---

# Информация о покупателе

```http
POST /api/marketplace/v3/dbw/orders/client
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** Сборочные задания DBW · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersClient)

Метод возвращает информацию о покупателях по ID сборочных заданий.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `OrdersRequestAPI`, required

## Responses

| Code  | Description            | Schema                             |
| ----- | ---------------------- | ---------------------------------- |
| `200` | Успешно                | `ClientInfoResp`                   |
| `400` | Неправильный запрос    | `PostV3DbwOrdersClientResponse400` |
| `401` | Не авторизован         | `object`                           |
| `402` | Требуется платёж       | `object`                           |
| `403` | Доступ запрещён        | `Error`                            |
| `429` | Слишком много запросов | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import DBWApi

cfg = Configuration(access_token="<your WB JWT>")
api = DBWApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_client(orders_request_api=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DBWApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DBWApi(cfg);

const { data } = await api.postV3DbwOrdersClient(ordersRequestAPI);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.DBWAPI.PostV3DbwOrdersClient(context.Background()).OrdersRequestAPI(ordersRequestAPI).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
DbwApi api = new DbwApi(client);

System.out.println(api.postV3DbwOrdersClient(ordersRequestAPI));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\DBWApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DBWApi(new Client(), $config);

print_r($api->postV3DbwOrdersClient($orders_request_api));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СборочныеЗаданияDBWApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersClient(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DBWApi(config);

Console.WriteLine(api.PostV3DbwOrdersClient(ordersRequestAPI));
```

:::
