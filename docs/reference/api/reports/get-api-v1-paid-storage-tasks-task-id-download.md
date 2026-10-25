---
title: "Получить отчёт"
description: "Метод возвращает отчёт о платном хранении по ID задания на генерацию."
---

# Получить отчёт

```http
GET /api/v1/paid_storage/tasks/{task_id}/download
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Платное хранение · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/paidStorage/operation/getV1PaidStorageTasksTaskIdDownload)

Метод возвращает отчёт о [платном хранении](https://seller.wildberries.ru/analytics-reports/paid-storage/storage) по ID [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/paidStorage/operation/getV1PaidStorage).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос |

## Параметры

| Имя       | Где  | Тип      | Обяз. | Описание                |
| --------- | ---- | -------- | ----- | ----------------------- |
| `task_id` | path | `string` | да    | ID задания на генерацию |

## Ответы

| Код   | Описание               | Схема                                            |
| ----- | ---------------------- | ------------------------------------------------ |
| `200` | Успешно                | `GetV1PaidStorageTasksTaskIdDownloadResponse200` |
| `204` | Нет данных             | —                                                |
| `400` | Неправильный запрос    | `Http4XXResponse`                                |
| `401` | Не авторизован         | `object`                                         |
| `402` | Требуется платёж       | `object`                                         |
| `403` | Доступ запрещён        | `object`                                         |
| `404` | Не найдено             | `Http4XXResponse`                                |
| `429` | Слишком много запросов | `object`                                         |

**Структура `200` — `object[]`:**

- `date` `string` — Дата, за которую был расчёт или перерасчёт
- `logWarehouseCoef` `number` — Коэффициент логистики и хранения. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `0`
- `officeId` `integer<int64>` — ID склада. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `0`
- `warehouse` `string` — Название склада. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `Склад WB РФ`
- `warehouseCoef` `number` — Коэффициент хранения
- `giId` `integer<int64>` — ID поставки
- `chrtId` `integer<int64>` — ID размера для этого артикула WB
- `size` `string` — Размер (`techSize` в карточке товара)
- `barcode` `string` — Баркод
- `subject` `string` — Предмет
- `brand` `string` — Бренд
- `vendorCode` `string` — Артикул продавца
- `nmId` `integer<int64>` — Артикул WB
- `volume` `number` — Объём товара
- `calcType` `string` — Способ расчёта
- `warehousePrice` `number` — Сумма хранения
- `barcodesCount` `integer<int64>` — Количество единиц товара (штук), подлежащих тарифицированию за расчётные сутки
- `palletPlaceCode` `integer<int64>` — Код паллетоместа. [На данный момент](https://dev.wildberries.ru/release-notes?id=570) может быть только `0`
- `palletCount` `number` — Количество паллет
- `originalDate` `string` — Если был перерасчёт, это дата первоначального расчёта. Если перерасчёта не было, совпадает с `date`
- `loyaltyDiscount` `number` — Скидка программы лояльности, ₽
- `tariffFixDate` `string` — Дата фиксации тарифа
- `tariffLowerDate` `string` — Дата понижения тарифа

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

**Структура `404`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

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

result = api.get_v1_paid_storage_tasks_task_id_download(task_id=...)
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

const { data } = await api.getV1PaidStorageTasksTaskIdDownload(taskId);
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

result, _, err := client.ReportsAPI.GetV1PaidStorageTasksTaskIdDownload(context.Background(), taskId).Execute()
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

System.out.println(api.getV1PaidStorageTasksTaskIdDownload(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1PaidStorageTasksTaskIdDownload($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1PaidStorageTasksTaskIdDownload(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1PaidStorageTasksTaskIdDownload(taskId));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::get_v1_paid_storage_tasks_task_id_download(&cfg, task_id).await;
    println!("{:#?}", result);
}
```

:::
