---
title: "Подмены и неверные вложения"
description: "Метод возвращает отчёт об удержаниях за подмены и неверные вложения"
---

# Подмены и неверные вложения

```http
GET /api/analytics/v1/deductions
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёты об удержаниях · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/retentionReports/operation/getV1Deductions)

Метод возвращает отчёт об удержаниях за [подмены и неверные вложения](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/retentions)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 1 ч    | 4 запроса | 15 мин   | 1 запрос |

## Параметры

| Имя        | Где   | Тип              | Обяз. | Описание                                                                                                           |
| ---------- | ----- | ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------ |
| `dateFrom` | query | `string`         | нет   | Начало отчётного периода. По умолчанию используются дата и время, когда были впервые получены данные для отчёта    |
| `dateTo`   | query | `string`         | да    | Конец отчётного периода                                                                                            |
| `sort`     | query | `string`         | нет   | Сортировка: - `nmId` — по артикулу WB - `dtBonus` — по дате и времени удержания - `bonusSumm` — по сумме удержания |
| `order`    | query | `string`         | нет   | Порядок выдачи: - `desc` — по убыванию - `asc` — по возрастанию                                                    |
| `limit`    | query | `integer<int64>` | да    | Количество удержаний в ответе                                                                                      |
| `offset`   | query | `integer<int64>` | нет   | Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента                             |

## Ответы

| Код   | Описание               | Схема                   |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `object`                |
| `400` | Неправильный запрос    | `Response400Retentions` |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Response403Retentions` |
| `429` | Слишком много запросов | `object`                |

**Структура `200`:**

- `data` `object` (обязательно) — Данные ответа
  - `reports` `object[]` (обязательно) — Удержания
    - `dtBonus` `string` — Дата и время удержания
    - `nmId` `integer<int64>` — Артикул WB
    - `oldShkId` `integer<int64>` — Старый штрихкод
    - `oldColor` `string` — Старый цвет
    - `oldSize` `string` — Старый размер
    - `oldSku` `string` — Старый баркод
    - `oldVendorCode` `string` — Старый артикул продавца
    - `newShkId` `integer<int64>` — Новый штрихкод
    - `newColor` `string` — Новый цвет
    - `newSize` `string` — Новый размер
    - `newSku` `string` — Новый баркод
    - `newVendorCode` `string` — Новый артикул продавца
    - `bonusSumm` `number` — Сумма удержания
    - `bonusType` `string` — Причина удержания
    - `photoUrls` `string[]` — Фото замеров
  - `total` `integer<int64>` (обязательно) — Количество удержаний в отчёте. Без учёта `limit` и `offset`

**Структура `400`:**

- `title` `string` — Заголовок ошибки
- `status` `integer<int64>` — HTTP статус-код
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
- `status` `integer<int64>` — HTTP статус-код
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
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_deductions(date_to=..., limit=..., date_from=..., sort=..., order=..., offset=...)
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

const { data } = await api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset);
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

result, _, err := client.ReportsAPI.GetV1Deductions(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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

System.out.println(api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1Deductions($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1Deductions(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1Deductions(dateTo, limit));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::get_v1_deductions(&cfg, date_to, limit, date_from, sort, order, offset).await;
    println!("{:#?}", result);
}
```

:::
