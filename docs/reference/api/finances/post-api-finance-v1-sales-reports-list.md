---
title: "Список отчётов реализации"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список отчётов реализации

```http
POST /api/finance/v1/sales-reports/list
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Финансовые отчёты · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsList)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список отчётов релизации по формату [таблицы отчётов](https://seller.wildberries.ru/suppliers-mutual-settlements).

Данные доступны с 29 января 2024 года.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Тело запроса

`application/json` — схема `SalesReportListReq`, обязательно

- `dateFrom` `string` (обязательно) — Начальная дата отчёта. Можно передать дату или дату со временем. Время можно указывать с точностью до секунд или миллисекунд. Дата передаётся в формате [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339), время — в часовом поясе Москва `UTC+3`. Примеры: - `2025-06-20` - `2025-06-20T23:59:59` - `2025-06-20T00:00:00.12345` - `2025-06-20T00:00:00`
- `dateTo` `string` (обязательно) — Конечная дата отчёта. Дата в формате [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339). Можно передать дату или дату со временем. Время можно указывать с точностью до секунд или миллисекунд. Время передаётся в часовом поясе Москва `UTC+3`. Примеры: - `2025-06-20` - `2025-06-20T23:59:59` - `2025-06-20T00:00:00.12345` - `2025-06-20T00:00:00`
- `limit` `integer<int64>` — Количество отчётов в ответе
- `offset` `integer<int64>` — Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента
- `period` `string` = `daily` | `weekly` — Периодичность отчётов: - `weekly` — еженедельные - `daily` — ежедневные

## Ответы

| Код   | Описание               | Схема                               |
| ----- | ---------------------- | ----------------------------------- |
| `200` | Успешно                | `PostV1SalesReportsListResponse200` |
| `204` | Нет данных             | —                                   |
| `400` | Неправильный запрос    | `object`                            |
| `401` | Не авторизован         | `object`                            |
| `403` | Доступ запрещён        | `Response4XX`                       |
| `429` | Слишком много запросов | `object`                            |

**Структура `200` — `SalesReportListRes[]`:**

- `reportId` `integer<int64>` — ID отчёта
- `sellerFinanceName` `string` — Наименование продавца
- `dateFrom` `string` — Дата начала отчётного периода
- `dateTo` `string` — Дата конца отчётного периода
- `createDate` `string` — Дата формирования отчёта
- `currency` `string` — Валюта отчёта
- `reportType` `integer<int64>` = `1` | `2` — Тип отчёта: - `1` — основной - `2` — по выкупам
- `retailAmountSum` `string` — Продажа
- `forPaySum` `string` — К перечислению за товар
- `avgSalePercent` `number` — Согласованная скидка, %
- `deliveryServiceSum` `string` — Стоимость доставки
- `paidStorageSum` `string` — Стоимость хранения
- `paidAcceptanceSum` `string` — Стоимость операций при приёмке
- `deductionSum` `string` — Прочие удержания/выплаты
- `penaltySum` `string` — Общая сумма штрафов
- `additionalPaymentSum` `string` — Корректировка Вознаграждения Wildberries (ВВ)
- `cashbackAmountSum` `string` — Сумма баллов, удержанных по программе лояльности
- `cashbackDiscountSum` `string` — Компенсация скидки по программе лояльности
- `cashbackCommissionChangeSum` `string` — Стоимость участия в программе лояльности
- `paymentSchedule` `string` — Разовое изменение срока перечисления денежных средств
- `bankPaymentSum` `string` — Итого к оплате

**Структура `400`:**

- `status` `integer<int64>` (обязательно) — HTTP статус-код
- `title` `string` (обязательно) — Заголовок ошибки
- `detail` `string` (обязательно) — Детали ошибки
- `requestId` `string` (обязательно) — ID запроса
- `origin` `string` (обязательно) — ID внутреннего сервиса WB

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
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_list(sales_report_list_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FinancesApi(cfg);

const { data } = await api.postV1SalesReportsList(salesReportListReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.PostV1SalesReportsList(context.Background()).SalesReportListReq(salesReportListReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.postV1SalesReportsList(salesReportListReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsList($sales_report_list_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsList(salesReportListReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = finances_api::post_v1_sales_reports_list(&cfg, sales_report_list_req).await;
    println!("{:#?}", result);
}
```

:::
