---
title: "Отменить сборочное задание"
description: "Метод отменяет сборочное задание и переводит в статус cancel — отменено продавцом."
---

# Отменить сборочное задание

```http
PATCH /api/v3/orders/{orderId}/cancel
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/patchV3OrdersOrderIdCancel)

Метод отменяет [сборочное задание](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) и переводит в [статус](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `cancel` — отменено продавцом.

Сборочное задание можно отменить до его передачи Wildberries.
Чтобы проверить, можно ли отменить сборочное задание, используйте метод [POST /api/v3/orders/status](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus), поле `isCancellable`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 100 запросов | 600 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Ответы

| Код   | Описание                  | Схема    |
| ----- | ------------------------- | -------- |
| `204` | Отменено                  | —        |
| `400` | Неправильный запрос       | `Error`  |
| `401` | Не авторизован            | `object` |
| `402` | Требуется платёж          | `object` |
| `403` | Доступ запрещён           | `Error`  |
| `404` | Не найдено                | `Error`  |
| `409` | Ошибка обновления статуса | `Error`  |
| `429` | Слишком много запросов    | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_orders_order_id_cancel(order_id=...)
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

const { data } = await api.patchV3OrdersOrderIdCancel(orderId);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PatchV3OrdersOrderIdCancel(context.Background(), orderId).Execute()
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

System.out.println(api.patchV3OrdersOrderIdCancel(orderId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3OrdersOrderIdCancel($order_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3OrdersOrderIdCancel(orderId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3OrdersOrderIdCancel(orderId));
```

:::
