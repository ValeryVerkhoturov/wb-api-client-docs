---
title: "Получить список архивных сборочных заданий"
description: "Метод возвращает сборочные задания, созданные более 3 месяцев назад. Часть сборочных заданий попадает в архив позже, чем через 3 месяца после создания, так как…"
---

# Получить список архивных сборочных заданий

```http
GET /api/marketplace/v3/fbs/orders/archive
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3FbsOrdersArchive)

Метод возвращает сборочные задания, созданные более 3 месяцев назад.
Часть сборочных заданий попадает в архив позже, чем через 3 месяца после создания, так как поставка переходит в архив только после того, как все заказы в ней будут завершены.
Например, так происходит, если продавец не доставил один из заказов в поставке и заказ был отменён автоматически через несколько дней.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя     | Где   | Тип              | Обяз. | Описание                                                                                                                                                                                                                                                 |
| ------- | ----- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`  | query | `integer<int64>` | да    | Год создания заказа                                                                                                                                                                                                                                      |
| `month` | query | `integer<int64>` | да    | Месяц создания заказа                                                                                                                                                                                                                                    |
| `next`  | query | `integer<int64>` | да    | Параметр пагинации. Устанавливает значение, с которого надо получить следующий пакет данных. Для получения полного списка данных должен быть равен `0` в первом запросе. Для следующих запросов необходимо брать значения из одноимённого поля в ответе. |
| `limit` | query | `integer<int32>` | да    | Количество сборочных заданий в ответе                                                                                                                                                                                                                    |

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `v3.ArchiveOrders`    |
| `400` | Неправильный запрос    | `ArhiveOrderError400` |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `403` | Доступ запрещён        | `object`              |
| `429` | Слишком много запросов | `object`              |

**Структура `200`:**

- `next` `integer<int64>` — Параметр пагинации. Содержит значение, которое необходимо указать в запросе для получения следующего пакета данных
- `orders` `v3.ArchiveOrder[]` — Архивные сборочные задания
  - `cargoType` `string` — Тип товара: - `mgt` — малогабаритный товар (МГТ) - `sgt` — сверхгабаритный товар (СГТ) - `kgtPlus` — крупногабаритный товар (КГТ+)
  - `colorCode` `string` — Код цвета для колеруемых товаров
  - `createdAt` `string` — Дата создания заказа
  - `crossBorder` `object` — Информация о трансграничной поставке
    - `parcel` `string` — ID посылки
  - `crossBorderType` `string` — Тип сборочного задания: - `local` — внутренняя поставка - `crossBorder` — трансграничная поставка
  - `id` `integer<int64>` — ID сборочного задания
  - `isZeroOrder` `boolean` — Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком
  - `metaDetails` `object[]` — Детали маркировки
    - `key` `string` — Идентификатор маркировки
    - `value` `string` — Значение идентификатора маркировки
    - `decision` `string` — [Статусы проверки идентификаторов маркировки](https://dev.wildberries.ru/knowledge-base/articles/019e9273-118b-7b69-a25a-ea1d756f05d9/rabota-s-markirovkoi-po-modeli-fbs). Статусы проверки `imei`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `imeiMaySell` — Товар допущен к продаже. Проверка пройдена - `imeiSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена Статусы проверки `imei`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `imeiInvalidFormat` — Указан неверный формат маркировки. Проверка не пройдена - `imeiAlreadySold` — Товар с этим IMEI уже продан. Проверка не пройдена Статусы проверки `uin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `uinMaySell` — Товар допущен к продаже. Проверка пройдена Статусы проверки `uin`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `uinBadStatus` — Некорректный статус партии. Проверка не пройдена - `uinBadProcess` — Некорректная стадия обработки. Проверка не пройдена - `uinBadStatusAndBadProcess` — Некорректный статус партии. Некорректная стадия обработки. Проверка не пройдена - `uinInvalidFormat` — Неверный формат маркировки. Проверка не пройдена - `uinNotFound` — Не найден в [ГИИС](https://minfin.gov.ru/ru/perfomance/jewels/dmdk). Проверка не пройдена. Статус может означать, что УИН: - не указан в загруженной спецификации с договором на доставку - не зарегистрирован в ГИИС ДМДК - указан некорректно и считывается с бирки с ошибками - не находится в обороте Статусы проверки `sgtin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `sgtinIntroduced` — Товар допущен к продаже. Проверка пройдена - `sgtinSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена Статусы проверки `sgtin`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `sgtinInvalidFormat` — Неверный формат маркировки. Проверка не пройдена - `sgtinNoGS` — Маркировка не содержит GS-разделитель `\u001d`. Проверка не пройдена - `sgtinHasInvalidSymbols` — Маркировка содержит некорректные символы или пробелы. Проверка не пройдена - `sgtinHasNonLatinSymbols` — Маркировка содержит символы, не относящиеся к специальным или латинице. Проверка не пройдена - `sgtinInvalidPattern` — Структура маркировки некорректна. Проверка не пройдена - `sgtinNotFound` — Маркировка не найдена в [Честном знаке](https://chestnyznak.ru). Проверка не пройдена - `sgtinEmitted` — Маркировка эмитирована. Проверка не пройдена - `sgtinApplied` — Не пройдена процедура Ввод в оборот. Проверка не пройдена - `sgtinWrittenOff` — Списан. Проверка не пройдена - `sgtinWithdrawn` — Выбыл. Проверка не пройдена - `sgtinRetired` — Выбыл. Проверка не пройдена - `sgtinDisaggregated` — Расформирован. Проверка не пройдена - `sgtinDisaggregation` — Расформирован. Проверка не пройдена - `sgtinAppliedNotPaid` — Не оплачен. Проверка не пройдена Статусы проверки `gtin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `expiration`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `customsDeclaration`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `customsDeclaration`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна
  - `options` `object` — Опции заказа
    - `isB2B` `boolean` — Признак B2B-продажи: - `false` — не B2B-продажа - `true` — B2B-продажа
  - `orderUid` `string` — ID транзакции для группировки сборочных заданий. Сборочные задания в одной корзине покупателя будут иметь одинаковый `orderUid`
  - `priceInfo` `object` — Информация о цене заказа
    - `convertedCurrencyCode` `integer<int64>` — Код валюты страны продавца
    - `convertedPrice` `integer<int64>` — Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100
    - `currencyCode` `integer<int64>` — Код валюты продажи
    - `price` `integer<int64>` — Цена в валюте продажи с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100
  - `product` `object` — Информация о товаре
    - `article` `string` — Артикул продавца
    - `chrtId` `integer<int64>` — ID размера товара в системе WB
    - `nmId` `integer<int64>` — Артикул WB
    - `skus` `string[]` — Список баркодов
  - `rid` `string` — Уникальный ID заказа. Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Лента заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Отчёт о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Детализации к отчётам реализации по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Детализации к отчётам реализации за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Детализации к отчётам об издержках на приём платежей по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Детализации к отчётам об издержках на приём платежей за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `scanPrice` `integer<int64>` — Цена приёмки заказа в копейках
  - `status` `object` — Последние статусы сборочного задания
    - `supplierStatus` `string` — Статус сборочного задания, установленный продавцом
    - `wbStatus` `string` — Статус сборочного задания в системе Wildberries
  - `stickerId` `integer<int64>` — ID стикера
  - `supplyId` `string` — ID поставки
  - `warehouseId` `integer<int64>` — ID склада продавца, с которого был отгружен товар

**Структура `400`:**

- `code` `string` — Код ошибки
- `detail` `string` — Детали ошибки
- `errors` `object[]` — Информация об ошибке
  - `location` `string` — Параметр, где произошла ошибка
  - `message` `string` — Текст ошибки
  - `value` `object` — Значение параметра, где произошла ошибка
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `status` `integer<int64>` — HTTP статус-код ответа
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

- один из вариантов: `ArhiveOrderError400`, `Response4XX`

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_orders_archive(year=..., month=..., next=..., limit=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.getV3FbsOrdersArchive(year, month, next, limit);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3FbsOrdersArchive(context.Background()).Year(year).Month(month).Next(next).Limit(limit).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.getV3FbsOrdersArchive(year, month, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsOrdersArchive($year, $month, $next, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsOrdersArchive(year, month, next, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsOrdersArchive(year, month, next, limit));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::get_v3_fbs_orders_archive(&cfg, year, month, next, limit).await;
    println!("{:#?}", result);
}
```

:::
