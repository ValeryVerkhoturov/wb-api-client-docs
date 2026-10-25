---
title: "Получить список новых сборочных заданий"
description: "Метод возвращает список всех новых сборочных заданий, которые есть у продавца на момент запроса."
---

# Получить список новых сборочных заданий

```http
GET /api/v3/dbs/orders/new
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew)

Метод возвращает список всех новых [сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders), которые есть у продавца на момент запроса.

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Ответы

| Код   | Описание               | Схема                          |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `GetV3DbsOrdersNewResponse200` |
| `401` | Не авторизован         | `object`                       |
| `402` | Требуется платёж       | `object`                       |
| `403` | Доступ запрещён        | `Error`                        |
| `429` | Слишком много запросов | `object`                       |

**Структура `200`:**

- `orders` `OrderNewDBS[]` — Список новых сборочных заданий
  - `salePrice` `integer<int64>` — Цена в валюте продажи с учетом скидки продавца, без учета скидки WB Клуба, умноженная на 100. Предоставляется в информационных целях
  - `requiredMeta` `string[]` — Список идентификаторов маркировки, доступных для сборочного задания. [Указывать IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei) обязательно для [предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll) `Смартфоны`, `"subjectId":515`
  - `comment` `string` — Комментарий покупателя
  - `options` `object` — Опции заказа
    - `isB2b` `boolean` — Признак B2B-продажи: - `false` — не B2B-продажа - `true` — B2B-продажа
  - `address` `object` — Адрес покупателя для доставки. При доставке заказов в ПВЗ указан адрес ПВЗ
    - `fullAddress` `string` — Адрес доставки
    - `longitude` `number<float64>` — Долгота
    - `latitude` `number<float64>` — Широта
  - `orderUid` `string` — ID транзакции для группировки сборочных заданий. Сборочные задания в одной корзине покупателя будут иметь одинаковый `orderUID`
  - `groupId` `string<UUID>` — ID группы сборочных заданий. Объединяет сборочные задания, поступившие на один склад (`warehouseId`) в рамках одной транзакции покупателя (`orderUid`)
  - `article` `string` — Артикул продавца
  - `colorCode` `string` — Код цвета (только для колеруемых товаров)
  - `rid` `object` — Уникальный ID заказа. Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Лента заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Отчёт о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Детализации к отчётам реализации по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Детализации к отчётам реализации за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Детализации к отчётам об издержках на приём платежей по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Детализации к отчётам об издержках на приём платежей за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
  - `createdAt` `string` — Дата создания сборочного задания
  - `deliveryType` `string` = `dbs` | `edbs` | `dbsPickupPoint` — Тип доставки: - `dbs` — доставка силами продавца - `dbsPickupPoint` — доставка силами продавца в ПВЗ - `edbs` — экспресс-доставка силами продавца
  - `skus` `string[]` — Массив баркодов товара
  - `id` `integer<int64>` — ID сборочного задания
  - `warehouseId` `integer<int64>` — ID склада продавца, на который поступило сборочное задание
  - `nmId` `integer<int64>` — Артикул WB
  - `chrtId` `integer<int64>` — ID размера товара в системе WB
  - `price` `integer<int64>` — Цена в валюте продажи с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях
  - `finalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте продажи с учётом всех скидок, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях. Используйте значение поля `finalPrice`, только если в ответе метода получения [цен продавца и сумм к оплате](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice) вернулось `"data": null`. Во всех остальных случаях используйте значение поля `originalFinalPrice` из ответа того же метода
  - `convertedFinalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте страны продавца с учетом всех скидок, умноженная на 100. Предоставляется в информационных целях. Используйте значение поля `convertedFinalPrice`, только если в ответе метода получения [цен продавца и сумм к оплате](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice) вернулось `"data": null`. Во всех остальных случаях используйте значение поля `convertedOriginalFinalPrice` из ответа того же метода
  - `convertedPrice` `integer<int64>` — Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Предоставляется в информационных целях
  - `currencyCode` `integer<ISO 4217>` — Код валюты продажи
  - `convertedCurrencyCode` `integer<ISO 4217>` — Код валюты страны продавца
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+)
  - `isZeroOrder` `boolean` — Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену
  - `wbStickerId` `integer<int64>` — ID стикера. Отображается только для заказов в ПВЗ

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
- `data` `object` — Дополнительные данные ошибки

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
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.get_v3_dbs_orders_new()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DbsApi(cfg);

const { data } = await api.getV3DbsOrdersNew();
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.GetV3DbsOrdersNew(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
DbsApi api = new DbsApi(client);

System.out.println(api.getV3DbsOrdersNew());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->getV3DbsOrdersNew());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.GetV3DbsOrdersNew().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.GetV3DbsOrdersNew());
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = dbs_api::get_v3_dbs_orders_new(&cfg).await;
    println!("{:#?}", result);
}
```

:::
