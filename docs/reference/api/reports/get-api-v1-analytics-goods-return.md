---
title: "Получить отчёт"
description: "Метод будет отключен 26 октября."
---

# Получить отчёт

```http
GET /api/v1/analytics/goods-return
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт о возвратах и перемещении товаров · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1AnalyticsGoodsReturn)

Метод будет отключен [26 октября](https://dev.wildberries.ru/release-notes?id=577).

## Параметры

| Имя        | Где   | Тип      | Обяз. | Описание                         |
| ---------- | ----- | -------- | ----- | -------------------------------- |
| `dateFrom` | query | `string` | да    | Дата начала отчётного периода    |
| `dateTo`   | query | `string` | да    | Дата окончания отчётного периода |

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `GetV1AnalyticsGoodsReturnResponse200` |
| `400` | Неправильный запрос    | `Http4XXResponse`                      |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `object`                               |
| `429` | Слишком много запросов | `object`                               |

**Структура `200`:**

- `report` `object[]` — Отчёт
  - `barcode` `string` — Баркод
  - `brand` `string` — Бренд
  - `completedDt` `string` — Дата и время выдачи возврата продавцу
  - `dstOfficeAddress` `string` — Адрес ПВЗ выдачи возврата
  - `dstOfficeId` `integer<int64>` — ID ПВЗ выдачи возврата
  - `expiredDt` `string` — Дата и время истечения срока хранения возврата
  - `isStatusActive` `integer<int64>` = `0` | `1` — Тип статуса возврата: * `0` — архивный * `1` — активный
  - `nmId` `integer<int64>` — Артикул WB
  - `orderDt` `string` — Дата заказа на возврат
  - `orderId` `integer<int64>` — Номер сборочного задания
  - `readyToReturnDt` `string` — Дата и время готовности возврата к выдаче
  - `reason` `string` — Причина возврата
  - `returnType` `string` — Тип возврата
  - `shkId` `integer<int64>` — Штрихкод
  - `srid` `string` — Уникальный ID заказа на возврат
  - `status` `string` — Статус возврата
  - `stickerId` `string` — Стикер заказа на возврат
  - `subjectName` `string` — Предмет
  - `techSize` `string` — Размер

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

result = api.get_v1_analytics_goods_return(date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsGoodsReturn(dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1AnalyticsGoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsGoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsGoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::get_v1_analytics_goods_return(&cfg, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
