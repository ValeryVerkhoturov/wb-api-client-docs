---
title: "Получить информацию о завершённых сборочных заданиях"
description: "Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа."
---

# Получить информацию о завершённых сборочных заданиях

```http
GET /api/v3/click-collect/orders
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Сборочные задания Самовывоз · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrders)

Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа.

Можно получить данные за заданный период, максимум 30 календарных дней одним запросом.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий Самовывоз**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Параметры

| Имя        | Где   | Тип              | Обяз. | Описание                                                                                                                                                            |
| ---------- | ----- | ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`    | query | `integer<int64>` | да    | Количество элементов в ответе                                                                                                                                       |
| `next`     | query | `integer<int64>` | да    | Параметр пагинации. Чтобы получить полный список данных, укажите `0` в первом запросе. Чтобы получить следующий пакет данных, используйте значение `next` из ответа |
| `dateFrom` | query | `integer<int64>` | да    | Дата начала периода в формате Unix timestamp                                                                                                                        |
| `dateTo`   | query | `integer<int64>` | да    | Дата конца периода в формате Unix timestamp                                                                                                                         |

## Ответы

| Код   | Описание               | Схема        |
| ----- | ---------------------- | ------------ |
| `200` | Успешно                | `api.Orders` |
| `400` | Неправильный запрос    | `Error`      |
| `401` | Не авторизован         | `object`     |
| `402` | Требуется платёж       | `object`     |
| `403` | Доступ запрещён        | `Error`      |
| `429` | Слишком много запросов | `object`     |

**Структура `200`:**

- `next` `integer<int64>` — Параметр пагинации. Содержит значение, которое необходимо указать в запросе для получения следующего пакета данных
- `orders` `api.Order[]` — Список сборочных заданий
  - `article` `string` — Артикул продавца
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+)
  - `chrtId` `integer<int64>` — ID размера товара в системе WB
  - `createdAt` `string` — Дата и время создания сборочного задания
  - `price` `integer<int64>` — Цена в валюте продажи с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях
  - `finalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте продажи с учётом всех скидок, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях. Используйте значение поля `finalPrice`, только если в ответе метода [POST /api/marketplace/v3/click-collect/orders/final-price](https://dev.wildberries.ru/openapi/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice) вернулось `"data": null`. Во всех остальных случаях используйте значение поля `originalFinalPrice` из ответа указанного метода
  - `convertedPrice` `integer<int64>` — Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях
  - `convertedFinalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте страны продавца с учетом всех скидок, умноженная на 100. Предоставляется в информационных целях. Используйте значение поля `convertedFinalPrice`, только если в ответе метода [POST /api/marketplace/v3/click-collect/orders/final-price](https://dev.wildberries.ru/openapi/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice) вернулось `"data": null`. Во всех остальных случаях используйте значение поля `convertedOriginalFinalPrice` из ответа того же метода
  - `currencyCode` `integer<ISO 4217>` — Код валюты продажи
  - `convertedCurrencyCode` `integer<ISO 4217>` — Код валюты страны продавца
  - `id` `integer<int64>` — ID сборочного задания
  - `isZeroOrder` `boolean` — Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену
  - `nmId` `integer<int64>` — Артикул WB
  - `orderCode` `string` — Уникальный ID заказа покупателя
  - `payMode` `string` — Режим оплаты: - `prepaid` — предоплатный - `postpaid` — постоплатный - `unknown` — неизвестный
  - `rid` `string` — Уникальный ID заказа. Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Лента заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Детализации к отчётам реализации по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Детализации к отчётам реализации за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Детализации к отчётам об издержках на приём платежей по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Детализации к отчётам об издержках на приём платежей за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `skus` `string[]` — Массив баркодов товара
  - `warehouseAddress` `string` — Адрес магазина (склада продавца), на который поступило сборочное задание
  - `warehouseId` `integer<int64>` — ID склада продавца, на который поступило сборочное задание
  - `tireService` `boolean` — Указал ли покупатель, что ему требуется услуга шиномонтажа: - `false` — нет, услуга шиномонтажа не требуется - `true` — да, услуга шиномонтажа требуется
  - `options` `object` — Опции заказа
    - `isB2b` `boolean` — Признак B2B-продажи: - `false` — не B2B-продажа - `true` — B2B-продажа

**Структура `400`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные, обогащающие ошибку

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

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные, обогащающие ошибку

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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.get_v3_click_collect_orders(limit=..., next=..., date_from=..., date_to=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new InStorePickupApi(cfg);

const { data } = await api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.GetV3ClickCollectOrders(context.Background()).Limit(limit).Next(next).DateFrom(dateFrom).DateTo(dateTo).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->getV3ClickCollectOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = in_store_pickup_api::get_v3_click_collect_orders(&cfg, limit, next, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
