---
title: "Детализации к отчётам об издержках на приём платежей по ID отчётов"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Детализации к отчётам об издержках на приём платежей по ID отчётов

```http
POST /api/finance/v1/acquiring/detailed/{reportId}
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Финансовые отчёты · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает детализации к [отчётам об издержках на приём платежей](https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/acquiring-reports) по ID отчётов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Параметры

| Имя        | Где  | Тип              | Обяз. | Описание  |
| ---------- | ---- | ---------------- | ----- | --------- |
| `reportId` | path | `integer<int64>` | да    | ID отчёта |

## Тело запроса

`application/json` — схема `FinancialReportsDetailedReportIdReq`, обязательно

- `limit` `integer<int64>` — Количество строк в ответе
- `rrdId` `integer<int64>` — ID строки ответа. Необходим для получения отчёта частями. Начинайте загрузку отчёта с `"rrdid":0`. В последующих запросах передавайте значение `rrdId` из последней строки предыдущего ответа. Повторяйте запрос, пока не получите ответ `204`
- `fields` `string[]` — Список полей, которые вернутся в ответе. Если параметр не указан, возвращаются все поля

## Ответы

| Код   | Описание               | Схема                                        |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV1AcquiringDetailedReportIdResponse200` |
| `204` | Нет данных             | —                                            |
| `400` | Неправильный запрос    | `object`                                     |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `Response4XX`                                |
| `404` | Не найдено             | `object`                                     |
| `429` | Слишком много запросов | `object`                                     |

**Структура `200` — `AcquiringReportsDetailedRes[]`:**

- `rrdId` `integer<int64>` — ID строки
- `reportId` `integer<int64>` — ID отчёта
- `acqDate` `string` — Дата операции
- `acquiringBank` `string` — Наименование банка-эквайера
- `tin` `string` — ИНН
- `taxRegistrationReasonCode` `string` — КПП
- `saleDate` `string` — Дата продажи
- `srid` `string` — ID заказа. В ответах методов сборочных заданий [FBS](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders), [DBW](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), [DBS](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) и [Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) `srid` равен `rid`
- `documentType` `string` — Тип документа
- `nmId` `integer<int64>` — Артикул WB
- `retailAmount` `string` — Wildberries реализовал Товар (Пр)
- `acquiringFee` `string` — Размер комиссии за эквайринг, в том числе НДС
- `acquiringFeeVat` `string` — Сумма НДС
- `invoiceNumber` `string` — Номер счёта-фактуры
- `invoiceDate` `string` — Дата счёта-фактуры
- `shkId` `integer<int64>` — Штрихкод
- `currency` `string` — Валюта отчёта

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

**Структура `404`:**

- `status` `integer<int64>` (обязательно) — HTTP статус-код
- `title` `string` (обязательно) — Заголовок ошибки
- `detail` `string` (обязательно) — Детали ошибки
- `requestId` `string` (обязательно) — ID запроса
- `origin` `string` (обязательно) — ID внутреннего сервиса WB

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

result = api.post_v1_acquiring_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
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

const { data } = await api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq);
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

result, _, err := client.FinancesAPI.PostV1AcquiringDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
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

System.out.println(api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1AcquiringDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1AcquiringDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = finances_api::post_v1_acquiring_detailed_report_id(&cfg, report_id, financial_reports_detailed_report_id_req).await;
    println!("{:#?}", result);
}
```

:::
