---
title: "Товары поставки"
description: "Метод возвращает информацию о товарах в поставке."
---

# Товары поставки

```http
GET /api/v1/supplies/{ID}/goods
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesIdGoods)

Метод возвращает информацию о товарах в поставке.

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
| `limit`        | query | `integer<int64>` | нет   | Количество записей в ответе                                                                                                |
| `offset`       | query | `integer<int64>` | нет   | После какого элемента выдавать данные                                                                                      |
| `isPreorderID` | query | `boolean`        | нет   | Поиск по: - `true` — ID заказа, если в `ID` передаёте ID заказа - `false` — ID поставки, если в `ID` передаёте ID поставки |
| `ID`           | path  | `integer<int64>` | да    | ID поставки или заказа                                                                                                     |

## Ответы

| Код   | Описание               | Схема                             |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `GetV1SuppliesIdGoodsResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`               |
| `401` | Не авторизован         | `object`                          |
| `402` | Требуется платёж       | `object`                          |
| `403` | Доступ запрещён        | `object`                          |
| `429` | Слишком много запросов | `object`                          |

**Структура `200` — `models.GoodInSupply[]`:**

- `barcode` `string` — Баркод товара
- `vendorCode` `string` — Артикул продавца
- `nmID` `integer<int64>` — Артикул WB
- `needKiz` `boolean` — Нужен ли [код маркировки Честного знака](https://честныйзнак.рф/) для этого товара: - `false` — не нужен - `true` — нужен
- `tnved` `string` — Код ТНВЭД. Если `"needKiz":true`, а `"tnved":null`, нужно заполнить характеристику товара \*\*ТН ВЭД\*\* в [личном кабинете](https://seller.wildberries.ru/new-goods) или по [API](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- `techSize` `string` — Размер товара, указанный продавцом
- `color` `string` — Цвет товара
- `supplierBoxAmount` `integer<int64>` — Указано в упаковке, шт
- `quantity` `integer<int64>` — Указано в поставке/заказе, шт
- `readyForSaleQuantity` `integer<int64>` — Поступило в продажу, шт
- `acceptedQuantity` `integer<int64>` — Принято, шт
- `unloadingQuantity` `integer<int64>` — Количество товара на раскладке, шт

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

result = api.get_v1_supplies_id_goods(id=..., limit=..., offset=..., is_preorder_id=...)
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

const { data } = await api.getV1SuppliesIdGoods(iD, limit, offset, isPreorderID);
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

result, _, err := client.OrdersFbwAPI.GetV1SuppliesIdGoods(context.Background(), iD).Execute()
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

System.out.println(api.getV1SuppliesIdGoods(ID, limit, offset, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesIdGoods($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesIdGoods(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesIdGoods(ID));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbw_api::get_v1_supplies_id_goods(&cfg, id, limit, offset, is_preorder_id).await;
    println!("{:#?}", result);
}
```

:::
