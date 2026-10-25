---
title: "Поисковые запросы по товару"
description: "Метод формирует топ поисковых запросов по товару. Параметры выбора поисковых запросов: - limit — количество запросов, максимум 30. Для тарифов Джема…"
---

# Поисковые запросы по товару

```http
POST /api/v2/search-report/product/search-texts
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Поисковые запросы по вашим товарам · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts)

Метод формирует топ поисковых запросов по товару.
Параметры выбора поисковых запросов:

- `limit` — количество запросов, максимум 30. Для тарифов [Джема](https://seller.wildberries.ru/monetization/tariffs) \*\*Продвинутый\*\* и \*\*Премиальный\*\* максимум — 100.
- `topOrderBy` — способ выбора топа запросов
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

`application/json` — схема `ItemSearchTextsRequest`, обязательно

- `currentPeriod` `Period` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 365 суток от сегодня
- `pastPeriod` `pastPeriod`
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня
  - `end` `string` (обязательно) — Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня
- `nmIds` `integer<int64>[]` (обязательно) — Список артикулов WB
- `topOrderBy` `string` = `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` (обязательно) — Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ
- `includeSubstitutedSKUs` `boolean` — Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524)
- `includeSearchTexts` `boolean` — Показать данные по поисковым запросам без учёта подменного артикула
- `orderBy` `OrderByGrTe` (обязательно)
  - `field` `string` = `avgPosition` | `openCard` | `addToCart` | `openToCart` | `orders` | `cartToOrder` | `visibility` (обязательно) — Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара
  - `mode` `string` = `asc` | `desc` (обязательно) — Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию
- `limit` `TextLimit` (обязательно)
  - один из вариантов: `StandardTariff`, `AdvancedTariff`

## Ответы

| Код   | Описание               | Схема                                             |
| ----- | ---------------------- | ------------------------------------------------- |
| `200` | Успешно                | `PostV2SearchReportProductSearchTextsResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                                  |
| `401` | Не авторизован         | `object`                                          |
| `402` | Требуется платёж       | `object`                                          |
| `403` | Доступ запрещён        | `ErrorObject403`                                  |
| `429` | Слишком много запросов | `object`                                          |

**Структура `200`:**

- `data` `ItemSearchTextsResponse`
  - `items` `TableSearchTextItem[]` — Элементы таблицы
    - `text` `string` — Текст поискового запроса
    - `nmId` `integer<int64>` — Артикул WB
    - `subjectName` `string` — Название предмета
    - `brandName` `string` — Бренд
    - `vendorCode` `string` — Артикул продавца
    - `name` `string` — Название товара
    - `isCardRated` `boolean` — Есть ли рейтинг у карточки товара
    - `rating` `number<float64>` — Рейтинг карточки товара
    - `feedbackRating` `number<float64>` — Рейтинг по отзывам
    - `price` `object` — Цена
      - `minPrice` `integer<int64>` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
      - `maxPrice` `integer<int64>` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
    - `frequency` `object` — Количество обращений с поисковым запросом
      - `current` `integer<int64>` — Текущее количество
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `weekFrequency` `integer<int64>` — Количество обращений с поисковым запросом за неделю
    - `medianPosition` `object` — Медианная позиция. Учитываются только те позиции, из которых пользователи добавляли товар в корзину или переходили в его карточку. Серединное значение позиции в поисковой выдаче, которое исключает сильные отклонения данных от среднего значения
      - `current` `integer<int64>` — Текущая медианная позиция
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `avgPosition` `object` — Средняя позиция товара в результатах поиска
      - `current` `integer<int64>` — Текущая средняя позиция
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `openCard` `object` — Количество переходов в карточку товара из поиска
      - `current` `integer<int64>` — Текущее количество переходов
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `integer<int64>` — Процент, на который показатель количества открытий карточки товара выше, чем у карточек других продавцов по поисковому запросу
    - `addToCart` `object` — Сколько раз товар из поиска добавили в корзину
      - `current` `integer<int64>` — Текущее количество
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `integer<int64>` — Процент, на который показатель добавлений в корзину выше, чем у карточек других продавцов по поисковому запросу
    - `openToCart` `object` — Конверсия в корзину из поиска — доля добавлений товара в корзину по отношению ко всем переходам в карточку товара из поиска
      - `current` `integer<int64>` — Текущая конверсия
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `integer<int64>` — Процент, на который показатель конверсии в корзину выше, чем у карточек других продавцов по поисковому запросу
    - `orders` `object` — Сколько раз товары из поиска заказали
      - `current` `integer<int64>` — Текущее количество
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `integer<int64>` — Процент, на который показатель заказов выше, чем у карточек других продавцов по поисковому запросу
    - `cartToOrder` `object` — Конверсия в заказ из поиска — доля заказов товара по отношению ко всем добавлениям товара из поиска в корзину
      - `current` `integer<int64>` — Текущая конверсия
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `integer<int64>` — Процент, на который показатель конверсии в заказ выше, чем у карточек других продавцов по поисковому запросу
    - `visibility` `object` — Процент видимости товара в результатах поиска
      - `current` `integer<int64>` — Текущий процент
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

result = api.post_v2_search_report_product_search_texts(item_search_texts_request=...)
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

const { data } = await api.postV2SearchReportProductSearchTexts(itemSearchTextsRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportProductSearchTexts(context.Background()).ItemSearchTextsRequest(itemSearchTextsRequest).Execute()
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

System.out.println(api.postV2SearchReportProductSearchTexts(itemSearchTextsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportProductSearchTexts($item_search_texts_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportProductSearchTexts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportProductSearchTexts(itemSearchTextsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_search_report_product_search_texts(&cfg, item_search_texts_request).await;
    println!("{:#?}", result);
}
```

:::
