---
title: "Заказы и позиции по поисковым запросам товара"
description: "Метод формирует данные для таблицы: - о заказах по каждому поисковому запросу для конкретного товара - о позициях товара в результатах поиска по каждому…"
---

# Заказы и позиции по поисковым запросам товара

```http
POST /api/v2/search-report/product/orders
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Поисковые запросы по вашим товарам · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductOrders)

Метод формирует данные для таблицы:

- о заказах по каждому поисковому запросу для конкретного товара
- о позициях товара в результатах поиска по каждому запросу
  Данные указаны в рамках периода для [запрошенного товара](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts) и сгруппированы по дням. Максимальный период — 7 дней.

Данные отчёта обновляются 1 раз в 2 часа.

Можно получить отчёт максимум за последние 365 дней с момента выполнения запроса

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Тело запроса

`application/json` — схема `ItemOrdersRequest`, обязательно

- `period` `PeriodOrdersRequest` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 365 суток от сегодня
- `nmId` `integer<int64>` (обязательно) — Артикул WB
- `searchTexts` `string[]` (обязательно) — Поисковые запросы. Для тарифов [Джема](https://seller.wildberries.ru/monetization/tariffs) **Продвинутый** и **Премиальный** максимум — 100

## Ответы

| Код   | Описание               | Схема                                        |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV2SearchReportProductOrdersResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                             |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `ErrorObject403`                             |
| `429` | Слишком много запросов | `object`                                     |

**Структура `200`:**

- `data` `ItemOrdersResponse`
  - `total` `ItemOrdersMetrics[]` — Итог по товарам
    - `dt` `string` — Дата сбора статистики
    - `avgPosition` `integer<int64>` — Средняя позиция товара в результатах поиска
    - `orders` `integer<int64>` — Сколько раз товары из поиска заказали
  - `items` `ItemOrdersTextItem[]` — Элементы таблицы
    - `text` `string` — Текст поискового запроса
    - `frequency` `integer<int64>` — Количество обращений с поисковым запросом
    - `dateItems` `ItemOrdersMetrics[]` — Статистика по датам
      - `dt` `string` — Дата сбора статистики
      - `avgPosition` `integer<int64>` — Средняя позиция товара в результатах поиска
      - `orders` `integer<int64>` — Сколько раз товары из поиска заказали

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

result = api.post_v2_search_report_product_orders(item_orders_request=...)
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

const { data } = await api.postV2SearchReportProductOrders(itemOrdersRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportProductOrders(context.Background()).ItemOrdersRequest(itemOrdersRequest).Execute()
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

System.out.println(api.postV2SearchReportProductOrders(itemOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportProductOrders($item_orders_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportProductOrders(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportProductOrders(itemOrdersRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_search_report_product_orders(&cfg, item_orders_request).await;
    println!("{:#?}", result);
}
```

:::
