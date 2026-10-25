---
title: "Получить отчёт"
description: "Метод возвращает отчёт с операциями по товарам с обязательной маркировкой."
---

# Получить отчёт

```http
POST /api/v1/analytics/excise-report
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт о товарах c обязательной маркировкой · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/reportOnItemsWithMandatoryLabeling/operation/postV1AnalyticsExciseReport)

Метод возвращает отчёт с [операциями по товарам с обязательной маркировкой](https://seller.wildberries.ru/analytics-reports/excise-report).

Данный отчёт можно сохранить в [формате таблиц](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-650c-7b04-9596-ba441936f9d3).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Сервисный          | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый с секретом | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый            | 24 ч   | 2 запроса   | 12 ч     | 1 запрос    |

## Тело запроса

`application/json` — схема `ExciseReportRequest`, необязательно

- `countries` `string[]` — Код стран по стандарту ISO 3166-2. Чтобы получить данные по всем странам, оставьте параметр пустым

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `ExciseReportResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`      |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `response` `models.ExciseReportResponse`
  - `data` `object[]`
    - `name` `string` — Страна покупателя
    - `price` `number` — Цена товара, с НДС
    - `currency_name_short` `string` — Валюта
    - `excise_short` `string` — Код маркировки
    - `barcode` `string` — Баркод
    - `nm_id` `integer<int64>` — Артикул WB
    - `operation_type_id` `integer<int64>` — Тип операции, если есть: * `1` — вывод из оборота * `2` — возврат в оборот
    - `fiscal_doc_number` `integer<int64>` — Номер фискального документа (чека полного расчёта), если есть
    - `fiscal_dt` `string` — Дата фискализации (дата в чеке), если есть, `ГГГГ-ММ-ДД`
    - `fiscal_drive_number` `string` — Номер фискального накопителя, если есть
    - `rid` `integer<int64>` — `Rid`
    - `srid` `string` — `Srid`

**Структура `400`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

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
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

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
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.post_v1_analytics_excise_report(date_from=..., date_to=..., excise_report_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ReportsApi(cfg);

const { data } = await api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.PostV1AnalyticsExciseReport(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.ReportsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->postV1AnalyticsExciseReport($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.PostV1AnalyticsExciseReport(dateFrom, dateTo, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.PostV1AnalyticsExciseReport(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::post_v1_analytics_excise_report(&cfg, date_from, date_to, excise_report_request).await;
    println!("{:#?}", result);
}
```

:::
