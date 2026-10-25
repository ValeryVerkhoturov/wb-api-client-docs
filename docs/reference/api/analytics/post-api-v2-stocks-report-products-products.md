---
title: "Данные по товарам"
description: "Метод формирует набор данных об остатках по товарам."
---

# Данные по товарам

```http
POST /api/v2/stocks-report/products/products
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** История остатков · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV2StocksReportProductsProducts)

Метод формирует набор данных об остатках по товарам.

Можно получить данные как по отдельным товарам, так и в рамках всего отчёта — если в запросе отсутствуют фильтры: `nmIDs`, `subjectID`, `brandName`, `tagID`.

Данные отчёта обновляются 1 раз в 2 часа.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `TableItemRequest`, обязательно

- `nmIDs` `integer<int64>[]` — Список артикулов WB для фильтрации
- `subjectID` `integer<int32>` — ID предмета
- `brandName` `string` — Бренд
- `tagID` `integer<int64>` — ID ярлыка
- `currentPeriod` `PeriodInv` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 3 месяцев от текущей даты
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 3 месяцев от текущей даты
- `stockType` `StockType` (обязательно)
- `skipDeletedNm` `boolean` (обязательно) — Скрыть удалённые товары
- `orderBy` `TableOrderBy` (обязательно)
  - `field` `TableGroupField` (обязательно)
  - `mode` `OrderByMode` (обязательно)
- `availabilityFilters` `string[]` (обязательно) — Доступность товара: - `deficient` — Дефицит - `actual` — Актуальный - `balanced` — Баланс - `nonActual` — Неактуальный - `nonLiquid` — Неликвид - `invalidData` — Не рассчитано
- `limit` `integer<int64>` — Количество товаров в ответе
- `offset` `integer<int64>` (обязательно) — После какого элемента выдавать данные

## Ответы

| Код   | Описание               | Схема                                           |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `PostV2StocksReportProductsProductsResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                                |
| `401` | Не авторизован         | `object`                                        |
| `402` | Требуется платёж       | `object`                                        |
| `403` | Доступ запрещён        | `ErrorObject403`                                |
| `429` | Слишком много запросов | `object`                                        |

**Структура `200`:**

- `data` `TableItemResponse`
  - `items` `TableItemSt[]` — Множество данных по товарам
    - `nmID` `integer<int64>` — Артикул WB
    - `isDeleted` `boolean` — Является ли товар удалённым
    - `subjectName` `string` — Название предмета
    - `name` `string` — Название товара
    - `vendorCode` `string` — Артикул продавца
    - `brandName` `string` — Бренд
    - `mainPhoto` `string` — Ссылка на главное фото
    - `hasSizes` `boolean` — Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"`
    - `metrics` `object` — Метрики товара
      - `ordersCount` `integer<int64>` — Заказы, шт.
      - `ordersSum` `integer<int64>` — Заказы, сумма
      - `avgOrders` `number<float64>` — Среднее количество заказов в день
      - `avgOrdersByMonth` `FloatGraphByPeriodItem[]` — Среднее количество заказов по месяцам
        - `start` `string` — Начало месяца
        - `end` `string` — Конец месяца
        - `value` `number<float64>` — Среднее количество заказов
      - `buyoutCount` `integer<int64>` — Выкупы, шт.
      - `buyoutSum` `integer<int64>` — Выкупы, сумма
      - `buyoutPercent` `integer<int64>` — Процент выкупа
      - `stockCount` `integer<int64>` — Остатки на текущий день, шт.
      - `stockSum` `integer<int64>` — Стоимость остатков на текущий день
      - `saleRate` `object` — Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность
        - `days` `integer<int32>` — Количество дней
        - `hours` `integer<int32>` — Количество часов
      - `avgStockTurnover` `object` — Оборачиваемость средних остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность
        - `days` `integer<int32>` — Количество дней
        - `hours` `integer<int32>` — Количество часов
      - `toClientCount` `integer<int64>` — В пути к клиенту, шт.
      - `fromClientCount` `integer<int64>` — В пути от клиента, шт.
      - `officeMissingTime` `object` — Время отсутствия товара на складе. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность 4. `"hours":-4` — отсутствие в течение всего периода
        - `days` `integer<int32>` — Количество дней
        - `hours` `integer<int32>` — Количество часов
      - `lostOrdersCount` `number<float64>` — Упущенные заказы, шт. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение
      - `lostOrdersSum` `number<float64>` — Упущенные заказы, сумма. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение
      - `lostBuyoutsCount` `number<float64>` — Упущенные выкупы, шт. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение
      - `lostBuyoutsSum` `number<float64>` — Упущенные выкупы, сумма. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение
      - `currentPrice` `object` — Текущая цена
        - `minPrice` `integer<int64>` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
        - `maxPrice` `integer<int64>` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
      - `availability` `string` = `deficient` | `actual` | `balanced` | `nonActual` | `nonLiquid` | `invalidData` — Доступность товара: - `deficient` — Дефицит - `actual` — Актуальный - `balanced` — Баланс - `nonActual` — Неактуальный - `nonLiquid` — Неликвид - `invalidData` — Не рассчитано
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

result = api.post_v2_stocks_report_products_products(table_item_request=...)
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

const { data } = await api.postV2StocksReportProductsProducts(tableItemRequest);
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

result, _, err := client.AnalyticsAPI.PostV2StocksReportProductsProducts(context.Background()).TableItemRequest(tableItemRequest).Execute()
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

System.out.println(api.postV2StocksReportProductsProducts(tableItemRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2StocksReportProductsProducts($table_item_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2StocksReportProductsProducts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2StocksReportProductsProducts(tableItemRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_stocks_report_products_products(&cfg, table_item_request).await;
    println!("{:#?}", result);
}
```

:::
