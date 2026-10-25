---
title: "Получить дату и время доставки"
description: "Метод возвращает информацию о выбранных покупателем дате и времени доставки сборочных заданий."
---

# Получить дату и время доставки

```http
POST /api/v3/dbw/orders/delivery-date
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-dbw`](/reference/api/orders-dbw/) · **Раздел:** Сборочные задания DBW · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersDeliveryDate)

Метод возвращает информацию о выбранных покупателем дате и времени доставки сборочных заданий.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `DeliveryDatesRequest`, обязательно

- `orders` `integer<int64>[]` — Список ID сборочных заданий

## Ответы

| Код   | Описание               | Схема                   |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `DeliveryDatesInfoResp` |
| `400` | Неправильный запрос    | `Error`                 |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Error`                 |
| `429` | Слишком много запросов | `object`                |

**Структура `200`:**

- `orders` `object[]`
  - `dTimeFrom` `string` — Актуальное время доставки "с"
  - `dTimeTo` `string` — Актуальное время доставки "по"
  - `dTimeFromOld` `string` — Прежнее время доставки "с". Доступно первые сутки после изменения
  - `dTimeToOld` `string` — Прежнее время доставки "по". Доступно первые сутки после изменения
  - `dDateOld` `string` — Прежняя дата доставки. Доступна первые сутки после изменения
  - `dDate` `string` — Актуальная дата доставки
  - `id` `integer<int64>` — ID сборочного задания

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
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_delivery_date(delivery_dates_request=...)
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

const { data } = await api.postV3DbwOrdersDeliveryDate(deliveryDatesRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersdbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_dbw"
)

cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersDeliveryDate(context.Background()).DeliveryDatesRequest(deliveryDatesRequest).Execute()
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
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.postV3DbwOrdersDeliveryDate(deliveryDatesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersDeliveryDate($delivery_dates_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersDeliveryDate(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersDeliveryDate(deliveryDatesRequest));
```

```rust [Rust]
use wb_api_client::orders_dbw::apis::{configuration::Configuration, orders_dbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_dbw_api::post_v3_dbw_orders_delivery_date(&cfg, delivery_dates_request).await;
    println!("{:#?}", result);
}
```

:::
