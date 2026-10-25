---
title: "Получить отчёт"
description: "Метод формирует набор данных о заказах и продажах."
---

# Получить отчёт

```http
POST /api/analytics/v1/order-feed
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Лента заказов · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed)

Метод формирует набор данных о заказах и продажах.

Данные отчёта обновляются в режиме реального времени.

> 1 заказ = 1 сборочное задание = 1 единица товара
> Параметры `brandNames`,`subjectIds`, `tagIds`, `nmIds` могут быть пустыми `[]`, тогда в ответе возвращаются все заказы продавца.
> Если вы указали несколько параметров, в ответе будут заказы, в которых есть одновременно все эти параметры. Если заказы не подходят по параметрам запроса, вернётся пустой массив `[]`.

Можно получить отчёт максимум за последние 31 день.

Заказы отдаются по времени текущего статуса, от самого нового к самому раннему.

Можно использовать пагинацию.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск  |
| ------------------ | ------ | -------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый            | 3 ч    | 1 запрос | 3 ч      | 1 запрос |

## Тело запроса

`application/json` — схема `OrderFeedRequest`, необязательно

- `selectedPeriod` `object` (обязательно) — Запрашиваемый период. По дате текущего статуса заказа
  - `start` `string` (обязательно) — Дата и время начала периода. Не ранее 31 суток от текущей даты и не позднее `end`
  - `end` `string` — Дата и время конца периода. Не ранее 31 суток от текущей даты
- `nmIds` `integer<int64>[]` — Список артикулов WB для фильтрации
- `subjectIds` `integer<int64>[]` — Список ID предметов для фильтрации
- `brandNames` `string[]` — Список брендов для фильтрации
- `tagIds` `integer<int64>[]` — Список ID ярлыков для фильтрации
- `pagination` `object` — Пагинация
  - `snapshotTime` `string` — Метка снимка данных, в рамках которого выполняется пагинация. Данные отчёта обновляются асинхронно. Чтобы не пропускать и не дублировать заказы, запросы одной выборки должны быть с одним и тем же `snapshotTime`. В первом запросе выборки (`"offset":0`) параметр не указывается, в каждом последующем запросе (`offset`>`0`) указывайте значение поля `snapshotTime` из ответа на **первый** запрос. При изменении значений периода и фильтров начинайте выборку заново с `"offset":0` и без `snapshotTime`
  - `offset` `integer<int32>` — Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента
  - `limit` `integer<int32>` — Количество заказов в ответе

## Ответы

| Код   | Описание               | Схема                        |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `PostV1OrderFeedResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`             |
| `401` | Не авторизован         | `object`                     |
| `403` | Доступ запрещён        | `ErrorObject403`             |
| `429` | Слишком много запросов | `object`                     |

**Структура `200`:**

- `data` `OrderFeedResponse`
  - `snapshotTime` `string` — Метка снимка данных, в рамках которого выполняется пагинация
  - `currency` `Currency`
  - `orders` `Order[]` — Заказы
    - `nmId` `integer<int64>` — Артикул WB
    - `chrtId` `integer<int64>` — ID размера
    - `srid` `string` — ID заказа
    - `createdAt` `string` — Дата и время оформления заказа
    - `updatedAt` `string` — Дата и время текущего статуса. При `"status":"created"` возвращается значение поля `createdAt`
    - `status` `string` = `created` | `buyout` | `cancel` | `return` | `returnDefective` — [Статус заказа](https://seller.wildberries.ru/instructions/ru/ru/material/order-feed-report#a92fa9b0-86ab-4990-b905-33f6c38b385c): - `created` — оформлен - `buyout` — продан - `cancel` — отменён - `return` — возвращён - `returnDefective` — возвращён по причине брака
    - `cancelType` `string` = `app` | `receipt` | `expire` | `other` — [Тип отмены](https://seller.wildberries.ru/instructions/ru/ru/material/order-feed-report#a92fa9b0-86ab-4990-b905-33f6c38b385c) (при `"status":"cancel"`): - `app` — отказ до получения - `receipt` — отказ при получении - `expire` — истёк срок получения - `other` — иное
    - `warehouseName` `string` — Название склада. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) для складов WB может быть только `Склад WB`
    - `warehouseRegion` `string` — Федеральный округ склада. Если склад не в России, возвращается страна. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) для складов WB может быть только `""`
    - `isMp` `boolean` — Тип склада: - `true` — склад продавца - `false` — склад WB
    - `destinationCity` `string` — Населённый пункт доставки
    - `destinationDistrict` `string` — Федеральный округ доставки. Если доставка не по России, возвращается страна
    - `sellerPrice` `number<float64>` — Цена продавца со скидкой продавца (без учёта скидки WB Клуба и оптовой скидки для B2B-продаж)
    - `isB2b` `boolean` — Тип продажи: - `true` — B2B - `false` — B2C

**Структура `400`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `403`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB

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
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v1_order_feed(order_feed_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV1OrderFeed(orderFeedRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV1OrderFeed(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV1OrderFeed(orderFeedRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV1OrderFeed());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV1OrderFeed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV1OrderFeed());
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v1_order_feed(&cfg, order_feed_request).await;
    println!("{:#?}", result);
}
```

:::
