---
title: "Заказы"
description: "Метод возвращает информацию о заказах. Данные обновляются раз в 30 минут."
---

# Заказы

```http
GET /api/v1/supplier/orders
```

**База:** `https://statistics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Основные отчёты · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/mainReports/operation/getV1SupplierOrders)

Метод возвращает информацию о заказах.
Данные обновляются раз в 30 минут.

1 строка = 1 заказ = 1 сборочное задание = 1 единица товара.
Для определения заказа рекомендуем использовать поле `srid`.

Информация о заказе хранится 90 дней с момента оформления.

В ответах могут отсутствовать заказы, по которым не подтверждена оплата. Например, заказы с отложенными платежами или оплатой в рассрочку. При этом, если по таким заказам есть продажи, вы можете получить их с помощью [детализаций к отчётам реализации](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).
Чтобы получить все оформленные заказы, используйте [Ленту заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed).

Данные этого отчёта являются предварительными и служат для оперативного мониторинга

Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все заказы, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.
Если в ответе отдаётся пустой массив `[]`, все заказы уже выгружены.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск     |
| ------------------ | ------ | -------- | -------- | ----------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый            | 3 ч    | 1 запрос | 3 ч      | 1 запрос    |

## Параметры

| Имя        | Где   | Тип      | Обяз. | Описание                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string` | да    | Дата и время последнего изменения по заказу. Дата в формате RFC3339. Можно передать дату или дату со временем. Время можно указывать с точностью до [секунд](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) или миллисекунд. Время передаётся в часовом поясе Москва (UTC+3). Примеры: - `2019-06-20` - `2019-06-20T23:59:59` - `2019-06-20T00:00:00.12345` - `2017-03-25T00:00:00` |

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1SupplierOrdersResponse200` |
| `400` | Неправильный запрос    | `object`                         |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

**Структура `200` — `OrdersItem[]`:**

- `date` `string` — Дата и время заказа. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=1. Если часовой пояс не указан, то берётся Московское время (UTC+3).
- `lastChangeDate` `string` — Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=0 или не указан. Если часовой пояс не указан, то берётся Московское время (UTC+3).
- `warehouseName` `string` — Склад отгрузки
- `warehouseType` `string` = `Склад WB` | `Склад продавца` — Тип склада хранения товаров
- `countryName` `string` — Страна
- `oblastOkrugName` `string` — Округ
- `regionName` `string` — Регион
- `supplierArticle` `string` — Артикул продавца
- `nmId` `integer<int64>` — Артикул WB
- `barcode` `string` — Баркод
- `category` `string` — Категория
- `subject` `string` — Предмет
- `brand` `string` — Бренд
- `techSize` `string` — Размер товара
- `incomeID` `integer<int64>` — Номер поставки
- `isSupply` `boolean` — Договор поставки
- `isRealization` `boolean` — Договор реализации
- `totalPrice` `number` — Цена без скидок
- `discountPercent` `integer<int64>` — Скидка продавца, %
- `spp` `number` — Скидка WB, %
- `finishedPrice` `number` — Цена с учетом всех скидок, кроме суммы по WB Кошельку
- `priceWithDisc` `number` — Цена со скидкой продавца, в том числе со скидкой WB Клуба
- `isCancel` `boolean` — Отмена заказа: - `true` — заказ отменен
- `cancelDate` `string` — Дата и время отмены заказа. Если заказ не был отменен, то "0001-01-01T00:00:00".Если часовой пояс не указан, то берётся Московское время UTC+3.
- `sticker` `string` — ID стикера
- `gNumber` `string` — ID корзины покупателя. Заказы одной транзакции будут иметь одинаковый `gNumber`
- `srid` `string` — Уникальный ID заказа. Примечание для использующих API Маркетплейс: `srid` равен `rid` в ответах методов сборочных заданий.

**Структура `400`:**

- один из вариантов: `responseErrorStatistics`, `responseErrorStatistics2`

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

result = api.get_v1_supplier_orders(date_from=..., flag=...)
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

const { data } = await api.getV1SupplierOrders(dateFrom, flag);
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

result, _, err := client.ReportsAPI.GetV1SupplierOrders(context.Background()).DateFrom(dateFrom).Execute()
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

System.out.println(api.getV1SupplierOrders(dateFrom, flag));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1SupplierOrders($date_from));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1SupplierOrders(dateFrom).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1SupplierOrders(dateFrom));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = reports_api::get_v1_supplier_orders(&cfg, date_from, flag).await;
    println!("{:#?}", result);
}
```

:::
