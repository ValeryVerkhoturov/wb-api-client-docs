---
title: "Основная страница"
description: "Метод формирует набор данных для основной страницы отчёта по поисковым запросам с: - общей информацией - позициями товаров - данными по видимости и переходам в…"
---

# Основная страница

```http
POST /api/v2/search-report/report
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Поисковые запросы по вашим товарам · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport)

Метод формирует набор данных для основной страницы отчёта по поисковым запросам с:

- общей информацией
- позициями товаров
- данными по видимости и переходам в карточку
- данными для таблицы по группам
  Для получения дополнительных данных в таблице используйте отдельный запрос для:
- [пагинации по группам](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableGroups)
- [получения по товарам в группе](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableDetails)
  Дополнительный параметр выбора списка товаров в таблице:
- `positionCluster` — средняя позиция в поиске
  Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Данные отчёта обновляются 1 раз в 2 часа.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Тело запроса

`application/json` — схема `MainRequest`, обязательно

- `currentPeriod` `Period` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 365 суток от сегодня
- `pastPeriod` `pastPeriod`
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня
  - `end` `string` (обязательно) — Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня
- `nmIds` `integer<int32>[]` — Список артикулов WB для фильтрации
- `subjectIds` `integer<int32>[]` — Список ID предметов для фильтрации
- `brandNames` `string[]` — Список брендов для фильтрации
- `tagIds` `integer<int64>[]` — Список ID ярлыков для фильтрации
- `positionCluster` `PositionCluster` (обязательно)
- `orderBy` `OrderByMainAndDetails` (обязательно)
  - `field` `string` = `avgPosition` | `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` | `visibility` | `minPrice` | `maxPrice` (обязательно) — Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара - `minPrice` — по минимальной цене - `maxPrice` — по максимальной цене
  - `mode` `string` = `asc` | `desc` (обязательно) — Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию
- `includeSubstitutedSKUs` `boolean` — Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524)
- `includeSearchTexts` `boolean` — Показать данные по поисковым запросам без учёта подменного артикула
- `limit` `integer<int64>` (обязательно) — Количество групп товаров в ответе
- `offset` `integer<int64>` (обязательно) — После какого элемента выдавать данные

## Ответы

| Код   | Описание               | Схема                                 |
| ----- | ---------------------- | ------------------------------------- |
| `200` | Успешно                | `PostV2SearchReportReportResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                      |
| `401` | Не авторизован         | `object`                              |
| `402` | Требуется платёж       | `object`                              |
| `403` | Доступ запрещён        | `ErrorObject403`                      |
| `429` | Слишком много запросов | `object`                              |

**Структура `200`:**

- `data` `MainResponse`
  - `commonInfo` `CommonInfo`
    - `supplierRating` `object` — Рейтинг продавца
      - `current` `number<float64>` — Текущий рейтинг продавца
      - `dynamics` `number<float64>` — Динамика по сравнению с предыдущим периодом, %
    - `advertisedProducts` `object` — Количество товаров в рекламе
      - `current` `integer<int64>` — Текущее количество товаров в рекламе
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `totalProducts` `integer<int64>` — Общее количество товаров
  - `positionInfo` `PositionInfo`
    - `average` `object` — Средняя позиция товара в результатах поиска
      - `current` `integer<int64>` — Текущая средняя позиция товара
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `median` `object` — Медианная позиция товара в результатах поиска
      - `current` `integer<int64>` — Текущая медианная позиция товара
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `chartItems` `SearchReportPositionChartItem[]` — Данные для чарта по средней и медианной позиции товара в результатах поиска
      - `dt` `string` — Дата
      - `average` `integer<int64>` — Средняя позиция товара в результатах поиска
      - `median` `integer<int64>` — Медианная позиция товара в результатах поиска
    - `clusters` `SearchReportPositionClusters`
      - `firstHundred` `object` — от 1 до 100
        - `current` `integer<int64>` — Текущее количество товаров
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `secondHundred` `object` — от 101 до 200
        - `current` `integer<int64>` — Текущее количество товаров
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `below` `object` — от 201 и ниже
        - `current` `integer<int64>` — Текущее количество товаров
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
  - `visibilityInfo` `VisibilityInfo`
    - `visibility` `object` — Видимость — процент вероятности, что пользователь увидит карточку товара. Зависит от средней позиции
      - `current` `integer<int64>` — Видимость в текущий период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `openCard` `object` — Количество переходов в карточку товара из поиска
      - `current` `integer<int64>` — Текущее количество переходов
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `byDay` `object[]` — Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по дням
      - `dt` `Date`
      - `visibility` `integer<int64>` — Видимость карточки в результатах поиска, %
      - `open` `integer<int64>` — Количество переходов в карточку
    - `byWeek` `object[]` — Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по неделям
      - `dt` `Date`
      - `visibility` `integer<int64>` — Видимость карточки в результатах поиска, %
      - `open` `integer<int64>` — Количество переходов в карточку
    - `byMonth` `object[]` — Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по месяцам
      - `dt` `Date`
      - `visibility` `integer<int64>` — Видимость карточки в результатах поиска, %
      - `open` `integer<int64>` — Количество переходов в карточку
  - `groups` `TableGroupItem[]` — Список элементов таблицы
    - `subjectName` `string` — Название предмета
    - `subjectId` `integer<int64>` — ID предмета
    - `brandName` `string` — Бренд
    - `tagName` `string` — Название ярлыка
    - `tagId` `integer<int64>` — ID ярлыка
    - `metrics` `object` — Метрики товара в таблице
      - `avgPosition` `object` — Средняя позиция товара в результатах поиска
        - `current` `integer<int64>` — Текущая средняя позиция
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `openCard` `object` — Количество переходов в карточку товара из поиска
        - `current` `integer<int64>` — Текущее количество переходов
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `addToCart` `object` — Сколько раз товар из поиска добавили в корзину
        - `current` `integer<int64>` — Текущее количество
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `openToCart` `object` — Конверсия в корзину из поиска — доля добавлений товара в корзину по отношению ко всем переходам в карточку товара из поиска
        - `current` `integer<int64>` — Текущая конверсия
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `orders` `object` — Сколько раз товары из поиска заказали
        - `current` `integer<int64>` — Текущее количество
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `cartToOrder` `object` — Конверсия в заказ из поиска — доля заказов товара по отношению ко всем добавлениям товара из поиска в корзину
        - `current` `integer<int64>` — Текущая конверсия
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `visibility` `object` — Процент видимости товара в результатах поиска
        - `current` `integer<int64>` — Текущий процент видимости
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `items` `TableItem[]` — Массив товаров группы
      - `nmId` `integer<int64>` — Артикул WB
      - `name` `string` — Название товара
      - `vendorCode` `string` — Артикул продавца
      - `subjectName` `string` — Название предмета
      - `brandName` `string` — Бренд
      - `mainPhoto` `string` — URL главного фото карточки товара
      - `isAdvertised` `boolean` — Находится ли товар в продвижении в Поисковой выдаче
      - `isSubstitutedSKU` `boolean` — Искали ли товар по подменному артикулу. Поле будет в ответе при наличии в запросе `includeSubstitutedSKUs` и/или `includeSearchTexts`
      - `isCardRated` `boolean` — Есть ли рейтинг у карточки товара
      - `rating` `number<float64>` — Рейтинг карточки товара
      - `feedbackRating` `number<float64>` — Рейтинг по отзывам
      - `price` `object` — Цена
        - `minPrice` `integer<int64>` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
        - `maxPrice` `integer<int64>` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
      - `avgPosition` `object` — Средняя позиция товара в результатах поиска
        - `current` `integer<int64>` — Текущая средняя позиция
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `openCard` `object` — Количество переходов в карточку товара из поиска
        - `current` `integer<int64>` — Текущее количество переходов
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `addToCart` `object` — Сколько раз товар из поиска добавили в корзину
        - `current` `integer<int64>` — Текущее количество
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `openToCart` `object` — Конверсия в корзину из поиска — доля добавлений товара в корзину по отношению ко всем переходам в карточку товара из поиска
        - `current` `integer<int64>` — Текущая конверсия
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `orders` `object` — Сколько раз товары из поиска заказали
        - `current` `integer<int64>` — Текущее количество
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `cartToOrder` `object` — Конверсия в заказ из поиска — доля заказов товара по отношению ко всем добавлениям товара из поиска в корзину
        - `current` `integer<int64>` — Текущая конверсия
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `visibility` `object` — Процент видимости товара в результатах поиска
        - `current` `integer<int64>` — Текущий процент видимости
        - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
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

result = api.post_v2_search_report_report(main_request=...)
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

const { data } = await api.postV2SearchReportReport(mainRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportReport(context.Background()).MainRequest(mainRequest).Execute()
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

System.out.println(api.postV2SearchReportReport(mainRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportReport($main_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportReport(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportReport(mainRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_search_report_report(&cfg, main_request).await;
    println!("{:#?}", result);
}
```

:::
