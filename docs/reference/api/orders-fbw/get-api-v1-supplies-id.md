---
title: "Детали поставки"
description: "Метод возвращает детали поставки по ID."
---

# Детали поставки

```http
GET /api/v1/supplies/{ID}
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesId)

Метод возвращает детали поставки по ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Сервисный          | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Параметры

| Имя            | Где   | Тип              | Обяз. | Описание                                                                                                                   |
| -------------- | ----- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------- |
| `ID`           | path  | `integer<int64>` | да    | ID поставки или заказа                                                                                                     |
| `isPreorderID` | query | `boolean`        | нет   | Поиск по: - `true` — ID заказа, если в `ID` передаёте ID заказа - `false` — ID поставки, если в `ID` передаёте ID поставки |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `models.SupplyDetails` |
| `400` | Неправильный запрос    | `models.ErrorModel`    |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `404` | Не найдено             | `models.ErrorModel`    |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `phone` `string` — Телефон пользователя, создавшего поставку
- `statusID` `integer<int64>` = `1` | `2` | `3` | `4` | `5` | `6` — ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах
- `virtualTypeID` `integer<int64>` — ID типа виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `0` — Перенос остатков - `1` — Обезличка - `4` — QR-поставка - `5` — Допринято - `6` — Скан-приёмка
- `boxTypeID` `integer<int64>` — ID типа поставки: - `0` — Без коробов (виртуальная поставка) - `1` и `2` — Короба - `5` — Монопаллеты - `6` — Суперсейф
- `createDate` `string` — Дата и время создания поставки
- `supplyDate` `string` — Плановая дата отгрузки поставки
- `factDate` `string` — Дата фактической отгрузки поставки
- `updatedDate` `string` — Дата изменения поставки
- `warehouseID` `integer<int64>` — ID склада, на который планируется поставка
- `warehouseName` `string` — Название склада, на который планируется поставка
- `actualWarehouseID` `integer<int64>` — ID склада, на который поставка была привезена
- `actualWarehouseName` `string` — Название склада, на который поставка привезена
- `transitWarehouseID` `integer<int64>` — ID транзитного склада
- `transitWarehouseName` `string` — Название транзитного склада
- `acceptanceCost` `number` — Предварительная стоимость приёмки, ₽
- `paidAcceptanceCoefficient` `number` — Коэффициент приёмки
- `rejectReason` `string` — Причина, по которой поставка не может быть принята
- `supplierAssignName` `string` — Краткое название продавца
- `storageCoef` `string` — Коэффициент хранения
- `deliveryCoef` `string` — Коэффициент логистики
- `quantity` `integer<int64>` — Добавлено в поставку/заказ, шт
- `readyForSaleQuantity` `integer<int64>` — Поступило в продажу, шт
- `acceptedQuantity` `integer<int64>` — Принято, шт
- `unloadingQuantity` `integer<int64>` — Количество товара, находящегося на раскладке, шт
- `depersonalizedQuantity` `integer<int64>` — Количество обезличенного товара, шт
- `discrepancies` `integer<int64>` — Расхождения между заявленным и фактическим количеством товара в поставке. Только при `"statusID":5`
- `isBoxOnPallet` `boolean` — Тип поставки — **Поштучная палета**: - `true` — да - `false` — нет Поле возвращается только при `"boxTypeID": 2`

**Структура `400`:**

- `status` `integer<int64>` — HTTP статус-код
- `title` `string` — ID ошибки
- `detail` `string` — Описание ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — Сервис, вернувший ошибку

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

- `status` `integer<int64>` — HTTP статус-код
- `title` `string` — ID ошибки
- `detail` `string` — Описание ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — Сервис, вернувший ошибку

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
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_id(id=..., is_preorder_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1SuppliesId(iD, isPreorderID);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1SuppliesId(context.Background(), iD).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesId(ID, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesId(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesId(ID));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbw_api::get_v1_supplies_id(&cfg, id, is_preorder_id).await;
    println!("{:#?}", result);
}
```

:::
