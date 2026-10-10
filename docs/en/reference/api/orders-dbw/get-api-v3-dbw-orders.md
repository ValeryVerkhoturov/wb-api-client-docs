---
title: "Получить информацию о завершенных сборочных заданиях"
description: "Метод возвращает информацию о завершенных сборочных заданиях."
---

# Получить информацию о завершенных сборочных заданиях

```http
GET /api/v3/dbw/orders
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** Сборочные задания DBW · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrders)

Метод возвращает информацию о завершенных [сборочных заданиях](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders).

Можно получить данные за заданный период, максимум 30 календарных дней одним запросом.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Parameters

| Name       | In    | Type      | Req. | Description                                  |
| ---------- | ----- | --------- | ---- | -------------------------------------------- |
| `dateFrom` | query | `integer` | yes  | Дата начала периода в формате Unix timestamp |
| `dateTo`   | query | `integer` | yes  | Дата конца периода в формате Unix timestamp  |

## Responses

| Code  | Description            | Schema                      |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `GetV3DbwOrdersResponse200` |
| `400` | Неправильный запрос    | `Error`                     |
| `401` | Не авторизован         | `object`                    |
| `402` | Требуется платёж       | `object`                    |
| `403` | Доступ запрещён        | `Error`                     |
| `429` | Слишком много запросов | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.get_v3_dbw_orders(limit=..., next=..., date_from=..., date_to=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.getV3DbwOrders(limit, next, dateFrom, dateTo);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.GetV3DbwOrders(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.getV3DbwOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->getV3DbwOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.GetV3DbwOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.GetV3DbwOrders(limit, next, dateFrom, dateTo));
```

:::
