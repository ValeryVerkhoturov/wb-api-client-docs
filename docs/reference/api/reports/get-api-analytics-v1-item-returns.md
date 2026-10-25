---
title: "Получить отчёт"
description: "Метод возвращает отчёт о возвратах товаров продавцу."
---

# Получить отчёт

```http
GET /api/analytics/v1/item-returns
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт о возвратах и перемещении товаров · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1GoodsReturn)

Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/return-transfer-reports).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск     |
| ------------------ | ------ | --------- | -------- | ----------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 10 запросов |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 10 запросов |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос    |

## Параметры

| Имя        | Где   | Тип             | Обяз. | Описание                                                                             |
| ---------- | ----- | --------------- | ----- | ------------------------------------------------------------------------------------ |
| `dateFrom` | query | `string`        | да    | Дата начала отчётного периода                                                        |
| `dateTo`   | query | `string`        | да    | Дата окончания отчётного периода                                                     |
| `status`   | query | `string`        | нет   | Статус возврата: - `archive` — архивный - `active` — активный                        |
| `limit`    | query | `integer<date>` | нет   | Количество возвратов в ответе                                                        |
| `offset`   | query | `integer<date>` | нет   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента |

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `GoodsReturn200Response` |
| `204` | Нет данных             | —                        |
| `400` | Неправильный запрос    | `Http4XXResponse`        |
| `401` | Не авторизован         | `object`                 |
| `429` | Слишком много запросов | `object`                 |

**Структура `200`:**

- `count` `integer<int64>` — Общее количество возвратов за запрашиваемый период
- `report` `object[]` — Отчёт
  - `sku` `string` — Баркод
  - `brand` `string` — Бренд
  - `completedDt` `string` — Дата и время выдачи возврата продавцу
  - `dstOfficeAddress` `string` — Адрес ПВЗ для выдачи возврата продавцу
  - `kiz` `string` — Код маркировки [Честного знака](https://честныйзнак.рф/)
  - `dstOfficeId` `integer<int64>` — ID ПВЗ для выдачи возврата продавцу
  - `expiredDt` `string` — Дата и время истечения срока хранения возврата
  - `nmId` `integer<int64>` — Артикул WB
  - `orderDt` `string` — Дата заказа на возврат
  - `orderId` `integer<int64>` — ID сборочного задания
  - `readyToReturnDt` `string` — Дата и время готовности возврата к выдаче
  - `returnReason` `string` — Причина возврата. Поле возвращается только при `"returnType":"Возврат неопознанного товара"`
  - `returnType` `string` — Тип возврата
  - `shkId` `integer<int64>` — Штрихкод
  - `srid` `string` — ID заказа на возврат
  - `returnStatus` `string` — Статус возврата
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

result = api.get_v1_goods_return(date_from=..., date_to=..., status=..., limit=..., offset=...)
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

const { data } = await api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset);
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

result, _, err := client.ReportsAPI.GetV1GoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1GoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1GoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1GoodsReturn(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::get_v1_goods_return(&cfg, date_from, date_to, status, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
