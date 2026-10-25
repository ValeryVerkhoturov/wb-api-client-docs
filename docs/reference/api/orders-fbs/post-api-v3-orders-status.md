---
title: "Получить статусы сборочных заданий"
description: "Метод возвращает статусы сборочных заданий по их ID."
---

# Получить статусы сборочных заданий

```http
POST /api/v3/orders/status
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus)

Метод возвращает статусы [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) по их ID.

`supplierStatus` — статус сборочного задания. Триггер его изменения — действие самого продавца.
Возможные значения `supplierStatus`:

| Статус            | Описание                                                            | Как перевести сборочное задание в данный статус                                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new`             | \*\*Новое сборочное задание\*\*                                     |                                                                                                                                                                                                                                                                                                                         |
| `confirm`         | \*\*На сборке\*\*                                                   | [Добавить сборочное задание к поставке](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdOrders)<br>[Перевести сборочные задания из доставки на сборку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer) |
| `complete`        | \*\*В доставке\*\*                                                  | [Передать поставку в доставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)                                                                                                                                                                                  |
| `cancel`          | \*\*Отменено продавцом\*\*                                          | [Отменить сборочное задание](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/patchV3OrdersOrderIdCancel)                                                                                                                                                                                  |
| `cancel\_carrier` | \*\*Отменено перевозчиком\*\*<br>Только для трансграничных поставок | Переводится перевозчиком                                                                                                                                                                                                                                                                                                |

`wbStatus` — статус системы Wildberries.
Возможные значения `wbStatus`:

- `waiting` — сборочное задание в работе
- `sorted` — сборочное задание отсортировано
- `sold` — заказ получен покупателем
- `canceled` — отмена сборочного задания
- `canceled\_by\_client` — покупатель отменил заказ при получении
- `declined\_by\_client` — покупатель отменил заказ. Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку
- `defect` — отмена заказа по причине брака
- `ready\_for\_pickup` — заказ прибыл на пункт выдачи заказов (ПВЗ)
- `accepted\_by\_carrier` — продавец передал заказ в службу доставки в своей стране
- `sent\_to\_carrier` — заказ отправлен на склад службы доставки в стране продавца
- `canceled\_by\_carrier` — заказ отменён перевозчиком. Только для трансграничных поставок

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, необязательно

- `orders` `integer<int64>[]` (обязательно) — Список ID сборочных заданий

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `PostV3OrdersStatusResponse200` |
| `400` | Неправильный запрос    | `Error`                         |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `Error`                         |
| `429` | Слишком много запросов | `object`                        |

**Структура `200`:**

- `orders` `object[]`
  - `id` `integer<int64>` — ID сборочного задания
  - `isCancellable` `boolean` — Доступна ли [отмена](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/patchV3OrdersOrderIdCancel) сборочного задания: - `false` — недоступна - `true` — доступна
  - `isTransferable` `boolean` — Можно ли [перевести сборочное задание](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer) из доставки на сборку: - `false` — нет - `true` — да Сборочное задание можно перенести из доставки на сборку, если выполняются все условия: - сборочное задание находится в статусе `complete` — в доставке - поставка, в которую нужно перенести сборочное задание, не [передана в доставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver) - сборочное задание ранее не переносили
  - `supplierStatus` `string` = `new` | `confirm` | `complete` | `cancel` — Статус сборочного задания, установленный продавцом
  - `wbStatus` `string` = `waiting` | `sorted` | `sold` | `canceled` | `canceled_by_client` | `declined_by_client` | `defect` | `ready_for_pickup` | `postponed_delivery` | `accepted_by_carrier` | `sent_to_carrier` — Статус сборочного задания в системе Wildberries

**Структура `400`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `403`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

**Структура `429`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_status(post_v3_orders_status_request=...)
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

const { data } = await api.postV3OrdersStatus(postV3OrdersStatusRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3OrdersStatus(context.Background()).Execute()
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
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3OrdersStatus(postV3OrdersStatusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStatus());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStatus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStatus());
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::post_v3_orders_status(&cfg, post_v3_orders_status_request).await;
    println!("{:#?}", result);
}
```

:::
