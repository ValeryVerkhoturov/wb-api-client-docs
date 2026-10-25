---
title: "Статистика карточек товаров по дням"
description: "Метод возвращает статистику карточек товаров по дням или неделям. Можно получить данные максимум за последнюю неделю."
---

# Статистика карточек товаров по дням

```http
POST /api/analytics/v3/sales-funnel/products/history
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Воронка продаж · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelProductsHistory)

Метод возвращает статистику карточек товаров по дням или неделям.
Можно получить данные максимум за последнюю неделю.

Данные отчёта обновляются 1 раз в 2 часа.

В течение часа после события появляется большая часть данных:

- о заказах
- о переходах в карточку товара
- о добавлениях товаров в корзину
  Малая часть этих данных может появляться в течение нескольких дней.

Выкупы, отмены и возвраты отображаются в отчёте за тот день, когда товар был заказан. Например, если заказ был сделан 1 января, а покупатель вернул товар 10 января, данные об этом возврате появятся в отчёте за 1 января.
Окончательные итоги продаж вы можете отслеживать с помощью [детализаций к отчётам реализации](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

Чтобы получать отчёты за период до года, используйте методы [Аналитика продавца CSV](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv) — тип `DETAIL_HISTORY_REPORT`. Отчёты этого типа доступны только с подпиской [Джем](https://seller.wildberries.ru/monetization/jam)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `ItemHistoryRequest`, обязательно

- `selectedPeriod` `object` (обязательно)
  - `start` `string` — Начало периода
  - `end` `string` — Конец периода
- `nmIds` `integer<int64>[]` (обязательно) — Артикулы WB, по которым нужно составить отчёт
- `skipDeletedNm` `boolean` — Скрыть удалённые товары
- `aggregationLevel` `Level`

## Ответы

| Код   | Описание               | Схема                                         |
| ----- | ---------------------- | --------------------------------------------- |
| `200` | Успешно                | `PostV3SalesFunnelProductsHistoryResponse200` |
| `400` | Неправильный запрос    | `ErrorObject`                                 |
| `401` | Не авторизован         | `object`                                      |
| `402` | Требуется платёж       | `object`                                      |
| `403` | Доступ запрещён        | `ErrorObject`                                 |
| `429` | Слишком много запросов | `object`                                      |

**Структура `200` — `object[]`:**

- `product` `object`
  - `nmId` `integer<int64>` — Артикул WB
  - `title` `string<int64>` — Название карточки товара
  - `vendorCode` `string` — Артикул продавца
  - `brandName` `string` — Бренд
  - `subjectId` `integer<int64>` — ID предмета
  - `subjectName` `string` — Название предмета
- `history` `History[]` — Статистика за период
  - `date` `string` — Дата сбора статистики
  - `openCount` `integer<int64>` — Количество переходов в карточку товара
  - `cartCount` `integer<int64>` — Положили в корзину, шт.
  - `orderCount` `integer<int64>` — Заказали товаров, шт.
  - `orderSum` `integer<int64>` — Заказали на сумму
  - `buyoutCount` `integer<int64>` — Выкупили товаров, шт.
  - `buyoutSum` `integer<int64>` — Выкупили на сумму
  - `buyoutPercent` `integer<int64>` — Процент выкупа
  - `addToCartConversion` `integer<int64>` — Конверсия в корзину. Какой процент посетителей, открывших карточку товара, добавили товар в корзину, %
  - `cartToOrderConversion` `integer<int64>` — Конверсия в заказ. Какой процент посетителей, добавивших товар в корзину, сделали заказ
  - `addToWishlistCount` `integer<int64>` — Количество добавлений товара в **Отложенные**
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

result = api.post_v3_sales_funnel_products_history(item_history_request=...)
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

const { data } = await api.postV3SalesFunnelProductsHistory(itemHistoryRequest);
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

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelProductsHistory(context.Background()).ItemHistoryRequest(itemHistoryRequest).Execute()
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

System.out.println(api.postV3SalesFunnelProductsHistory(itemHistoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelProductsHistory($item_history_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelProductsHistory(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelProductsHistory(itemHistoryRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v3_sales_funnel_products_history(&cfg, item_history_request).await;
    println!("{:#?}", result);
}
```

:::
