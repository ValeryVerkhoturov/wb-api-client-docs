---
title: "Данные по складам"
description: "Метод формирует набор данных об остатках по складам."
---

# Данные по складам

```http
POST /api/v2/stocks-report/offices
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** История остатков · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV2StocksReportOffices)

Метод формирует набор данных об остатках по складам.

Данные по складам продавца приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Свой склад"` и `"offices":[]`.

Данные отчёта обновляются 1 раз в 2 часа.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `TableShippingOfficeRequest`, обязательно

- `nmIDs` `integer<int64>[]` — Список артикулов WB для фильтрации
- `subjectIDs` `integer<int32>[]` — Список ID предметов для фильтрации
- `brandNames` `string[]` — Список брендов для фильтрации
- `tagIDs` `integer<int64>[]` — Список ID ярлыков для фильтрации
- `currentPeriod` `PeriodInv` (обязательно)
  - `start` `string` (обязательно) — Дата начала периода. Не позднее `end`. Не ранее 3 месяцев от текущей даты
  - `end` `string` (обязательно) — Дата окончания периода. Не ранее 3 месяцев от текущей даты
- `stockType` `StockType` (обязательно)
- `skipDeletedNm` `boolean` (обязательно) — Скрыть удалённые товары

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `PostV2StocksReportOfficesResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                       |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `ErrorObject403`                       |
| `429` | Слишком много запросов | `object`                               |

**Структура `200`:**

- `data` `TableShippingOfficeResponse`
  - `regions` `TableShippingOfficeItem[]` — Множество данных по регионам отгрузки
    - `regionName` `string` — Регион отгрузки. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) для складов WB может быть только `Склад WB`
    - `metrics` `object` — Метрики по региону
      - `stockCount` `integer<int64>` — Остатки на текущий день, шт.
      - `stockSum` `integer<int64>` — Остатки на текущий день, сумма
      - `saleRate` `object` — Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность
        - `days` `integer<int32>` — Количество дней
        - `hours` `integer<int32>` — Количество часов
      - `toClientCount` `integer<int64>` — В пути к клиенту, шт.
      - `fromClientCount` `integer<int64>` — В пути от клиента, шт.
    - `offices` `object[]` — Данные по складам. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `[]`
      - `officeID` `integer<int64>` — ID склада
      - `officeName` `string` — Название склада
      - `metrics` `object` — Метрики по складу
        - `stockCount` `integer<int64>` — Остатки на текущий день, шт.
        - `stockSum` `integer<int64>` — Остатки на текущий день, сумма
        - `saleRate` `object` — Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность
          - `days` `integer<int32>` — Количество дней
            - …
          - `hours` `integer<int32>` — Количество часов
            - …
        - `toClientCount` `integer<int64>` — В пути к клиенту, шт.
        - `fromClientCount` `integer<int64>` — В пути от клиента, шт.
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

result = api.post_v2_stocks_report_offices(table_shipping_office_request=...)
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

const { data } = await api.postV2StocksReportOffices(tableShippingOfficeRequest);
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

result, _, err := client.AnalyticsAPI.PostV2StocksReportOffices(context.Background()).TableShippingOfficeRequest(tableShippingOfficeRequest).Execute()
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

System.out.println(api.postV2StocksReportOffices(tableShippingOfficeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2StocksReportOffices($table_shipping_office_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2StocksReportOffices(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2StocksReportOffices(tableShippingOfficeRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v2_stocks_report_offices(&cfg, table_shipping_office_request).await;
    println!("{:#?}", result);
}
```

:::
