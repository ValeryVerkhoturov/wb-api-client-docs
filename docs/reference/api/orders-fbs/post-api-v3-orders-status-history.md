---
title: "История статусов для сборочных заданий трансграничных поставок"
description: "Метод возвращает историю статусов для сборочных заданий трансграничных поставок. В песочнице этот метод всегда возвращает ответ 200."
---

# История статусов для сборочных заданий трансграничных поставок

```http
POST /api/v3/orders/status/history
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatusHistory)

Метод возвращает историю [статусов](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) для [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) трансграничных поставок.
В песочнице этот метод всегда возвращает ответ `200`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, необязательно

- `orders` `integer<int64>[]` — ID сборочных заданий

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `PostV3OrdersStatusHistoryResponse200` |
| `400` | Неправильный запрос    | —                                      |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `Error`                                |
| `404` | Не найдено             | `Error`                                |
| `429` | Слишком много запросов | `object`                               |

**Структура `200`:**

- `orders` `object[]` — Список сборочных заданий
  - `deliveryDate` `string` — Планируемая дата доставки, [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339)
  - `statuses` `object[]` — Статусы
    - `date` `string` — Дата присвоения статуса
    - `code` `string` — Статус-код сборочного задания/заказа: - `dispatched_to_delivery_service` — Продавец передал заказ в службу доставки в своей стране - `on_way_to_delivery_service` — Заказ едет на склад службы доставки в стране продавца - `accepted_by_carrier` — Товар принят перевозчиком - `assembling` — Отправлен на сборку - `assembled` — Собран на складе - `sorted` — Отсортирован - `replaced_at_warehouse` — Замена на складе - `prepared_for_shipment` — Подготовлен к отгрузке - `in_search` — На поиске - `arrived_at_dct` — Поступил в распределительный центр-транзит - `arrived_at_sct` — Поступил в сортировочный центр-транзит - `arrived_at_dc` — Поступил в распределительный центр - `arrived_at_sc` — Поступил в сортировочный центр - `prepared_for_shipment_at_sc` — Подготовлен к отгрузке в сортировочном центре - `shipped_at_sc` — Отгружено сортировочным центром - `shipped_at_dct` — Отгружен распределительным центром — транзит - `shipped_at_dc` — Отгружен распределительным центром - `delivered_at_sc` — Доставлен в сортировочный/распределительный центр (СЦ/РЦ) - `on_way_to_sc` — В пути в сортировочный центр - `on_way_to_dc` — В пути в распределительный центр - `on_way_to_pp` — В пути на пункт выдачи - `arrived_at_pp` — Прибыл на пункт выдачи - `accepted_at_pp` — Приёмка в пункте выдачи - `ready_for_pick_up` — Готов к выдаче - `arrived_at_pp` — Поступил на пункт выдачи заказов (ПВЗ) - `received_by_client` — Получен клиентом - `delivered_at_parcel_locker` — Доставлен в постамат - `canceled_by_client` — Покупатель отменил заказ при получении - `cancel_after_expiration` — Отмена по сроку хранения - `at_courier` — Передан курьеру - `moved_to_return_box` — Перемещен в возвратную коробку - `accepted_for_return` — Принят к возврату на ПВЗ - `created` — Оформлен - `canceled_by_seller` — Отменен продавцом - `dispatched_by_seller` — Отгружено по данным продавца - `delivered` — Заказ выдан - `on_way` — В пути - `arrived_at_wb_wh` — Поступил на склад WB - `dispatched_from_wh` — Отправлен со склада - `customs_clearance` — Таможенное оформление - `customs_clearance_completed` — Выпущен таможней - `departed_from_origin_country` — Отправлен из страны продавца - `arrived_in_destination_country` — Прибытие в страну назначения - `on_way_to_wb_sc` — Отправлен до сортировочного центра (СЦ) WB - `accepted_at_wb_sc` — Принят СЦ WB - `canceled` — Отмена - `failed_to_reach_client` — Не дозвонились до клиента
  - `orderID` `integer<int64>` — ID сборочного задания

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

**Структура `404`:**

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

result = api.post_v3_orders_status_history(post_v3_orders_status_history_request=...)
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

const { data } = await api.postV3OrdersStatusHistory(postV3OrdersStatusHistoryRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3OrdersStatusHistory(context.Background()).Execute()
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

System.out.println(api.postV3OrdersStatusHistory(postV3OrdersStatusHistoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStatusHistory());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStatusHistory(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStatusHistory());
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::post_v3_orders_status_history(&cfg, post_v3_orders_status_history_request).await;
    println!("{:#?}", result);
}
```

:::
