---
title: "Получить статусы сборочных заданий"
description: "Метод возвращает статусы сборочных заданий по их ID."
---

# Получить статусы сборочных заданий

```http
POST /api/v3/dbw/orders/status
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** Сборочные задания DBW · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus)

Метод возвращает статусы сборочных заданий по их ID.

`supplierStatus` — статус сборочного задания.
Триггер его изменения — действие самого продавца.
Возможные значения `supplierStatus`:

| Статус    | Описание                        | Как перевести сборочное задание в данный статус                                                                                                           |
| --------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new`     | \*\*Новое сборочное задание\*\* |                                                                                                                                                           |
| `confirm` | \*\*На сборке\*\*               | [Перевести сборочное задание на сборку](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/patchV3DbwOrdersOrderIdConfirm)<br> | `complete` | \*\*В доставке\*\*                     | [Перевести сборочное задание в доставку](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatusDeliver) |
| `receive` | \*\*Получено покупателем\*\*    | Переводится курьером<br>                                                                                                                                  | `reject`   | \*\*Отказ покупателя при получении\*\* | Переводится курьером<br>                                                                                                                             | `cancel` | \*\*Отменено продавцом\*\* | [Отменить сборочное задание](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/patchV3DbwOrdersOrderIdCancel)<br> | `cancel\_missed\_call` | \*\*Отмена по причине недозвона\*\*<br> | Статус меняется автоматически |

`wbStatus` — статус системы Wildberries.
Возможные значения `wbStatus`:

- `waiting` — сборочное задание в работе
- `sold` — заказ получен покупателем
- `canceled` — отмена сборочного задания
- `canceled\_by\_client` — покупатель отменил заказ при получении
- `declined\_by\_client` — покупатель отменил заказ в первый чаc

Отмена доступна покупателю в первый час с момента заказа, если заказ не переведен на сборку

- `defect` — отмена заказа по причине брака
- `canceled\_by\_missed\_call` — отмена заказа по причине недозвона
- `postponed\_delivery` — курьерская доставка отложена

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                             |
| ----- | ---------------------- | ---------------------------------- |
| `200` | Успешно                | `PostV3DbwOrdersStatusResponse200` |
| `400` | Неправильный запрос    | `Error`                            |
| `401` | Не авторизован         | `object`                           |
| `402` | Требуется платёж       | `object`                           |
| `403` | Доступ запрещён        | `Error`                            |
| `429` | Слишком много запросов | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_status(post_v3_dbw_orders_status_request=...)
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

const { data } = await api.postV3DbwOrdersStatus(postV3DbwOrdersStatusRequest);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersStatus(context.Background()).Execute()
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

System.out.println(api.postV3DbwOrdersStatus(postV3DbwOrdersStatusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersStatus());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersStatus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersStatus());
```

:::
