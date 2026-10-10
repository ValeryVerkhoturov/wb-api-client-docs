---
title: "Закрепить код маркировки Честного знака за сборочным заданием"
description: "Метод обновляет код маркировки Честного знака в идентификаторах маркировки сборочного задания."
---

# Закрепить код маркировки Честного знака за сборочным заданием

```http
PUT /api/v3/orders/{orderId}/meta/sgtin
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Идентификаторы маркировки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)

Метод обновляет код маркировки [Честного знака](https://честныйзнак.рф/) в идентификаторах маркировки [сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders).

Закрепить код маркировки Честного знака можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) есть поле `sgtin`.

Получить загруженные маркировки можно в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки FBS**:

| Период                                                          | Лимит         | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 мин                                                           | 1000 запросов | 60 мс    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                     | Схема    |
| ----- | ---------------------------- | -------- |
| `204` | Отправлено                   | —        |
| `400` | Неправильный запрос          | `Error`  |
| `401` | Не авторизован               | `object` |
| `402` | Требуется платёж             | `object` |
| `403` | Доступ запрещён              | `Error`  |
| `404` | Не найдено                   | `Error`  |
| `409` | Ошибка добавления маркировки | `Error`  |
| `429` | Слишком много запросов       | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_sgtin(order_id=..., put_v3_orders_order_id_meta_sgtin_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.putV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PutV3OrdersOrderIdMetaSgtin(context.Background(), orderId).PutV3OrdersOrderIdMetaSgtinRequest(putV3OrdersOrderIdMetaSgtinRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.putV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaSgtin($order_id, $put_v3_orders_order_id_meta_sgtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaSgtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaSgtin(orderId, putV3OrdersOrderIdMetaSgtinRequest));
```

:::
