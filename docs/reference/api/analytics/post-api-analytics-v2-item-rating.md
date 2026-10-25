---
title: "Получить отчёт"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Получить отчёт

```http
POST /api/analytics/v2/item-rating
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Оценка товара · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/itemRating/operation/postV2ItemRating)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод формирует набор данных об оценках товаров.

Данные отчёта обновляются 1 раз в час.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит     | Интервал | Всплеск   |
| ------ | --------- | -------- | --------- |
| 1 мин  | 3 запроса | 20 сек   | 3 запроса |

## Тело запроса

`application/json` — схема `ItemRatingRequest`, обязательно

- `currentPeriod` `PeriodItemRating` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не ранее 364 суток от вчерашнего дня и не позднее `end`
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 364 суток от вчерашнего дня
- `pastPeriod` `PastPeriodItemRating`
  - `start` `string` (обязательно) — Дата начала периода. Не ранее 364 суток от вчерашнего дня и не позднее `end`
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 364 суток от вчерашнего дня и не позднее даты перед началом `currentPeriod`.
- `nmIds` `integer<int32>[]` — Список артикулов WB для фильтрации
- `subjectIds` `integer<int32>[]` — Список ID предметов для фильтрации
- `brandNames` `string[]` — Список брендов для фильтрации
- `tagIds` `integer<int64>[]` — Список ID ярлыков для фильтрации
- `isNotIncludeNmsWithoutSales` `boolean` — Не возвращать товары без продаж: - `true` — да, возвращаются только товары с продажами за период, указанный в объекте `currentPeriod` - `false` — нет, возвращаются все товары, если не указаны другие параметры
- `onlyShadowedNms` `boolean` — Возвращаются ли в ответе только скрытые товары: - `true` — да, возвращаются только скрытые из каталога товары - `false` — нет, возвращаются все товары, если не указаны другие параметры
- `orderBy` `OrderByItemRating` (обязательно)
  - `field` `string` = `feedbackRating` | `feedbackCount` | `fiveStar` | `fourStar` | `threeStar` | `twoStar` | `oneStar` | `disqualified` (обязательно) — Поле для сортировки: - `feedbackRating` — Рейтинг товара по отзывам - `feedbackCount` — Все отзывы за период - `fiveStar` — Отзывы 5 звёзд - `fourStar` — Отзывы 4 звезды - `threeStar` — Отзывы 3 звезды - `twoStar` — Отзывы 2 звезды - `oneStar` — Отзывы 1 звезда - `disqualified` — Отзывы, исключённые из рейтинга
  - `mode` `string` = `asc` | `desc` (обязательно) — Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию
- `limit` `integer<int64>` — Количество товаров в ответе
- `offset` `integer<int64>` (обязательно) — Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `PostV2ItemRatingResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`              |
| `401` | Не авторизован         | `object`                      |
| `403` | Доступ запрещён        | `ErrorObject403`              |
| `429` | Слишком много запросов | `object`                      |

**Структура `200`:**

- `data` `ItemRatingResponse`
  - `sellerRating` `TableItemFloat`
    - `current` `number<float64>` — Текущий рейтинг
    - `dynamics` `number<float64>` — Динамика по сравнению с предыдущим периодом, %
  - `feedbackIncrease` `FeedbacksIncreaseItem`
    - `current` `integer<int64>` — Прирост оценок за период
    - `total` `integer<int64>` — Всего оценок
    - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `fiveStar` `object` — Отзывы 5 звёзд
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `total` `integer<int64>` — Всего оценок
    - `fourStar` `object` — Отзывы 4 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `total` `integer<int64>` — Всего оценок
    - `threeStar` `object` — Отзывы 3 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `total` `integer<int64>` — Всего оценок
    - `twoStar` `object` — Отзывы 2 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `total` `integer<int64>` — Всего оценок
    - `oneStar` `object` — Отзывы 1 звезда
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
      - `total` `integer<int64>` — Всего оценок
  - `items` `DistributionTableItem[]` — Данные по товарам
    - `nmId` `integer<int64>` — Артикул WB
    - `title` `string` — Название товара
    - `vendorCode` `string` — Артикул продавца
    - `subjectId` `integer<int64>` — ID предмета
    - `subjectName` `string` — Название предмета
    - `brandName` `string` — Бренд
    - `tagName` `string` — Название ярлыка
    - `tagId` `integer<int64>` — ID ярлыка
    - `pinnedFeedback` `boolean` — Отзыв закреплён
    - `rating` `number<float64>` — Рейтинг карточки товара
    - `feedbackRating` `object` — Рейтинг товара по отзывам
      - `current` `number<float64>` — Текущий рейтинг
      - `dynamics` `number<float64>` — Динамика по сравнению с предыдущим периодом, %
      - `percentile` `number<float64>` — Сколько процентов товаров этого предмета у других продавцов имеют рейтинг ниже, чем у этого товара
    - `feedbackCount` `object` — Все отзывы за период
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `fiveStar` `object` — Отзывы 5 звёзд
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `fourStar` `object` — Отзывы 4 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `threeStar` `object` — Отзывы 3 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `twoStar` `object` — Отзывы 2 звезды
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `oneStar` `object` — Отзывы 1 звезда
      - `current` `integer<int64>` — Прирост оценок за период
      - `dynamics` `integer<int64>` — Динамика по сравнению с предыдущим периодом, %
    - `disqualified` `integer<int64>` — Отзывы, исключённые из рейтинга
    - `isShadowed` `boolean` — Является ли товар скрытым из каталога: - `true` — товар скрыт из каталога - `false` — товар не скрыт из каталога

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

result = api.post_v2_item_rating(item_rating_request=...)
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

const { data } = await api.postV2ItemRating(itemRatingRequest);
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

result, _, err := client.AnalyticsAPI.PostV2ItemRating(context.Background()).ItemRatingRequest(itemRatingRequest).Execute()
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

System.out.println(api.postV2ItemRating(itemRatingRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2ItemRating($item_rating_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2ItemRating(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2ItemRating(itemRatingRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_item_rating(&cfg, item_rating_request).await;
    println!("{:#?}", result);
}
```

:::
