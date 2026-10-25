---
title: "Статистика карточек товаров за период"
description: "Метод формирует отчёт о товарах, сравнивая ключевые показатели за текущий период с аналогичным прошлым."
---

# Статистика карточек товаров за период

```http
POST /api/analytics/v3/sales-funnel/products
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Воронка продаж · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelProducts)

Метод формирует отчёт о товарах, сравнивая ключевые показатели за текущий период с аналогичным прошлым.

Данные отчёта обновляются 1 раз в 2 часа.

В течение часа после события появляется большая часть данных:

- о заказах
- о переходах в карточку товара
- о добавлениях товаров в корзину
  Малая часть этих данных может появляться в течение нескольких дней.

Выкупы, отмены и возвраты отображаются в отчёте за тот день, когда товар был заказан. Например, если заказ был сделан 1 января, а покупатель вернул товар 10 января, данные об этом возврате появятся в отчёте за 1 января.
Окончательные итоги продаж вы можете отслеживать с помощью [детализаций к отчётам реализации](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

Параметры `brandNames`,`subjectIds`, `tagIds`, `nmIds` могут быть пустыми `[]`, тогда в ответе возвращаются все карточки продавца.

Если вы указали несколько параметров, в ответе будут карточки, в которых есть одновременно все эти параметры. Если карточки не подходят по параметрам запроса, вернётся пустой ответ `[]`.

Можно получить отчёт максимум за последние 365 дней.

В данных предыдущего периода:
\* Данные в `pastPeriod` указаны за такой же период, что и в `selectedPeriod`
\* Если дата начала `pastPeriod` раньше, чем год назад от текущей даты, она будет приведена к виду: `pastPeriod.start = текущая дата — 365 дней`
Можно использовать пагинацию.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `ItemsRequest`, обязательно

- `selectedPeriod` `object` (обязательно)
  - `start` `string` — Начало периода
  - `end` `string` — Конец периода
- `pastPeriod` `object`
  - `start` `string` — Начало периода
  - `end` `string` — Конец периода
- `nmIds` `integer<int64>[]` — Артикулы WB, по которым нужно составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах
- `brandNames` `string[]` — Список брендов для фильтрации
- `subjectIds` `integer<int64>[]` — Список ID предметов для фильтрации
- `tagIds` `integer<int64>[]` — Список ID ярлыков для фильтрации
- `skipDeletedNm` `boolean` — Скрыть удалённые товары
- `orderBy` `OrderBy`
  - `field` `string` = `openCard` | `addToCart` | `orderCount` | `orderSum` | `buyoutCount` | `buyoutSum` | `cancelCount` | `cancelSum` | `avgPrice` | `stockMpQty` | `stockWbQty` | `shareOrderPercent` | `addToWishlist` | `timeToReady` | `localizationPercent` | `wbClub.orderCount` | `wbClub.orderSum` | `wbClub.buyoutSum` | `wbClub.cancelSum` | `wbClub.buyoutCount` | `wbClub.avgPrice` | `wbClub.buyoutPercent` | `wbClub.avgOrderCountPerDay` | `wbClub.cancelCount` (обязательно) — Поле для сортировки: - `openCard` — Перешли в карточку - `addToCart` — Положили в корзину - `orderCount` — Заказали товаров, шт - `orderSum` — Заказали на сумму - `buyoutCount` — Выкупили товаров, шт - `buyoutSum` — Выкупили на сумму - `cancelCount` — Отменили и вернули товаров, шт - `cancelSum` — Отменили и вернули на сумму - `avgPrice` — Средняя цена - `stockMpQty` — Остатки на складах продавца, шт - `stockWbQty` — Остатки на складах WB, шт - `shareOrderPercent` — Доля в выручке - `addToWishlist` — Добавили в **Отложенные** - `timeToReady` — Среднее время доставки - `localizationPercent` — Локальные заказы в рамках одного региона - `wbClub.orderCount` — Заказали товаров с WB Клубом, шт - `wbClub.orderSum` — Заказали с WB Клубом на сумму - `wbClub.buyoutSum` — Выкупили товаров с WB Клубом, шт - `wbClub.buyoutCount` — Процент выкупа с WB Клубом - `wbClub.cancelSum` — Отменили и вернули товаров с WB Клубом на сумму - `wbClub.avgPrice` — Средняя цена с WB Клубом - `wbClub.buyoutPercent` — Процент выкупа с WB Клубом - `wbClub.avgOrderCountPerDay` — Среднее количество заказов в день с WB Клубом, шт - `wbClub.cancelCount` — Отменили и вернули товаров с WB Клубом, шт
  - `mode` `string` = `asc` | `desc` (обязательно) — Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию
- `limit` `integer<int64>` — Количество карточек товара в ответе
- `offset` `integer<int64>` — Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `PostV3SalesFunnelProductsResponse200` |
| `400` | Неправильный запрос    | `ErrorObject`                          |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `ErrorObject`                          |
| `429` | Слишком много запросов | `object`                               |

**Структура `200`:**

- `data` `object`
  - `products` `object[]` — Список карточек товаров
    - `product` `object`
      - `nmId` `integer<int64>` — Артикул WB
      - `title` `string<int64>` — Название карточки товара
      - `vendorCode` `string` — Артикул продавца
      - `brandName` `string` — Бренд
      - `subjectId` `integer<int64>` — ID предмета
      - `subjectName` `string` — Название предмета
      - `tags` `Tag[]` — Ярлыки
        - `id` `integer<int64>` — ID ярлыка
        - `name` `string` — Название ярлыка
      - `productRating` `number<float32>` — Оценка карточки
      - `feedbackRating` `number<float32>` — Оценка пользователей
      - `stocks` `object` — Остатки
        - `wb` `integer<int64>` — Общее количество остатков на складах WB на текущий день, шт.
        - `mp` `integer<int64>` — Общее количество остатков на складах продавца на текущий день, шт.
        - `balanceSum` `integer<int64>` — Сумма остатков на складах на текущий день, шт.
    - `statistic` `object`
      - `selected` `object`
        - `period` `object`
          - `start` `string` — Начало периода
            - …
          - `end` `string` — Конец периода
            - …
        - `openCount` `integer<int64>` — Количество переходов в карточку товара
        - `cartCount` `integer<int32>` — Положили в корзину, шт.
        - `orderCount` `integer<int64>` — Заказали товаров, шт.
        - `orderSum` `integer<int64>` — Заказали на сумму
        - `buyoutCount` `integer<int64>` — Выкупили товаров, шт.
        - `buyoutSum` `integer<int64>` — Выкупили на сумму
        - `cancelCount` `integer<int64>` — Отменили и вернули товаров, шт.
        - `cancelSum` `integer<int64>` — Отменили и вернули на сумму
        - `avgPrice` `integer<int64>` — Средняя цена
        - `avgOrdersCountPerDay` `number<float64>` — Среднее количество заказов в день, шт.
        - `shareOrderPercent` `number<float64>` — Доля в выручке
        - `addToWishlist` `integer<int64>` — Добавили в **Отложенные**
        - `timeToReady` `object`
          - `days` `integer<int64>` — Дни
            - …
          - `hours` `integer<int64>` — Часы
            - …
          - `mins` `integer<int64>` — Минуты
            - …
        - `localizationPercent` `integer<int64>` — Локальные заказы в рамках одного региона. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `100`
        - `wbClub` `object`
          - `orderCount` `integer<int64>` — Заказали товаров с WB Клубом, шт.
            - …
          - `orderSum` `integer<int64>` — Заказали с WB Клубом на сумму
            - …
          - `buyoutSum` `integer<int64>` — Выкупили с WB Клубом на сумму
            - …
          - `buyoutCount` `integer<int64>` — Выкупили товаров с WB Клубом, шт.
            - …
          - `cancelSum` `integer<int64>` — Отменили и вернули с WB Клубом на сумму
            - …
          - `cancelCount` `integer<int64>` — Отменили и вернули товаров с WB Клубом, шт.
            - …
          - `avgPrice` `integer<int64>` — Средняя цена с WB Клубом
            - …
          - `buyoutPercent` `integer<int64>` — Процент выкупа с WB Клубом
            - …
          - `avgOrderCountPerDay` `number<float64>` — Среднее количество заказов с WB Клубом в день, шт.
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Конверсия в корзину. Какой процент посетителей, открывших карточку товара, добавили товар в корзину, %
            - …
          - `cartToOrderPercent` `integer<int>` — Конверсия в заказ. Какой процент посетителей, добавивших товар в корзину, сделали заказ, %
            - …
          - `buyoutPercent` `integer<int>` — Процент выкупа. Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю, %
            - …
      - `past` `object`
        - `period` `object`
          - `start` `string` — Начало периода
            - …
          - `end` `string` — Конец периода
            - …
        - `openCount` `integer<int64>` — Количество переходов в карточку товара
        - `cartCount` `integer<int32>` — Положили в корзину, шт.
        - `orderCount` `integer<int64>` — Заказали товаров, шт.
        - `orderSum` `integer<int64>` — Заказали на сумму
        - `buyoutCount` `integer<int64>` — Выкупили товаров, шт.
        - `buyoutSum` `integer<int64>` — Выкупили на сумму
        - `cancelCount` `integer<int64>` — Отменили и вернули товаров, шт.
        - `cancelSum` `integer<int64>` — Отменили и вернули на сумму
        - `avgPrice` `integer<int64>` — Средняя цена
        - `avgOrdersCountPerDay` `number<float64>` — Среднее количество заказов в день, шт.
        - `shareOrderPercent` `number<float64>` — Доля в выручке
        - `addToWishlist` `integer<int64>` — Добавили в **Отложенные**
        - `timeToReady` `object`
          - `days` `integer<int64>` — Дни
            - …
          - `hours` `integer<int64>` — Часы
            - …
          - `mins` `integer<int64>` — Минуты
            - …
        - `localizationPercent` `integer<int64>` — Локальные заказы в рамках одного региона. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `100`
        - `wbClub` `object`
          - `orderCount` `integer<int64>` — Заказали товаров с WB Клубом, шт.
            - …
          - `orderSum` `integer<int64>` — Заказали с WB Клубом на сумму
            - …
          - `buyoutSum` `integer<int64>` — Выкупили с WB Клубом на сумму
            - …
          - `buyoutCount` `integer<int64>` — Выкупили товаров с WB Клубом, шт.
            - …
          - `cancelSum` `integer<int64>` — Отменили и вернули с WB Клубом на сумму
            - …
          - `cancelCount` `integer<int64>` — Отменили и вернули товаров с WB Клубом, шт.
            - …
          - `avgPrice` `integer<int64>` — Средняя цена с WB Клубом
            - …
          - `buyoutPercent` `integer<int64>` — Процент выкупа с WB Клубом
            - …
          - `avgOrderCountPerDay` `number<float64>` — Среднее количество заказов с WB Клубом в день, шт.
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Конверсия в корзину. Какой процент посетителей, открывших карточку товара, добавили товар в корзину, %
            - …
          - `cartToOrderPercent` `integer<int>` — Конверсия в заказ. Какой процент посетителей, добавивших товар в корзину, сделали заказ, %
            - …
          - `buyoutPercent` `integer<int>` — Процент выкупа. Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю, %
            - …
      - `comparison` `object`
        - `openCountDynamic` `integer<int>` — Динамика переходов в карточку товара
        - `cartCountDynamic` `integer<int>` — Динамика добавлений в корзину
        - `orderCountDynamic` `integer<int>` — Динамика количества заказов
        - `orderSumDynamic` `integer<int>` — Динамика суммы заказов
        - `buyoutCountDynamic` `integer<int>` — Динамика выкупов
        - `buyoutSumDynamic` `integer<int>` — Динамика суммы выкупов
        - `cancelCountDynamic` `integer<int>` — Динамика отмен и возвратов товаров
        - `cancelSumDynamic` `integer<int>` — Динамика сумм отмен и возвратов товаров
        - `avgOrdersCountPerDayDynamic` `integer<int>` — Динамика среднего количества заказов в день
        - `avgPriceDynamic` `integer<int>` — Динамика средней цены на товары. Учитываются скидки для акций
        - `shareOrderPercentDynamic` `integer<int>` — Динамика доли в выручке
        - `addToWishlistDynamic` `integer<int>` — Динамика добавлений товара в избранное
        - `timeToReadyDynamic` `object`
          - `days` `integer<int64>` — Дни
            - …
          - `hours` `integer<int64>` — Часы
            - …
          - `mins` `integer<int64>` — Минуты
            - …
        - `localizationPercentDynamic` `integer<int>` — Динамика локальных заказов в рамках одного региона. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `0`
        - `wbClubDynamic` `object`
          - `orderCount` `integer<int>` — Динамика количества заказов с WB Клубом
            - …
          - `orderSum` `integer<int>` — Динамика суммы заказов с WB Клубом
            - …
          - `buyoutSum` `integer<int>` — Динамика суммы выкупов с WB Клубом
            - …
          - `buyoutCount` `integer<int>` — Динамика выкупов с WB Клубом
            - …
          - `cancelSum` `integer<int>` — Динамика сумм отмен и возвратов товаров с WB Клубом
            - …
          - `cancelCount` `integer<int>` — Динамика отмен и возвратов товаров с WB Клубом
            - …
          - `avgPrice` `integer<int>` — Динамика средней цены на товары с WB Клубом
            - …
          - `buyoutPercent` `integer<int>` — Динамика процента выкупа с WB Клубом
            - …
          - `avgOrderCountPerDay` `number<int>` — Динамика среднего количества заказов с WB Клубом в день
            - …
        - `conversions` `object`
          - `addToCartPercent` `integer<int>` — Конверсия в корзину. Какой процент посетителей, открывших карточку товара, добавили товар в корзину, %
            - …
          - `cartToOrderPercent` `integer<int>` — Конверсия в заказ. Какой процент посетителей, добавивших товар в корзину, сделали заказ, %
            - …
          - `buyoutPercent` `integer<int>` — Процент выкупа. Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю, %
            - …
  - `currency` `Currency`

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

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

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

result = api.post_v3_sales_funnel_products(items_request=...)
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

const { data } = await api.postV3SalesFunnelProducts(itemsRequest);
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

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelProducts(context.Background()).ItemsRequest(itemsRequest).Execute()
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

System.out.println(api.postV3SalesFunnelProducts(itemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelProducts($items_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelProducts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelProducts(itemsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v3_sales_funnel_products(&cfg, items_request).await;
    println!("{:#?}", result);
}
```

:::
