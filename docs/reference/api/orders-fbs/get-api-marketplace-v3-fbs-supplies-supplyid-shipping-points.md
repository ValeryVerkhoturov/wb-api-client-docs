---
title: "Получить список пунктов отгрузки поставки"
description: "Метод возвращает доступные пункты отгрузки для указанной поставки. Используйте данные этого метода, чтобы устанавливать параметры отгрузки поставок."
---

# Получить список пунктов отгрузки поставки

```http
GET /api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdShippingPoints)

Метод возвращает доступные пункты отгрузки для указанной поставки.
Используйте данные этого метода, чтобы устанавливать [параметры отгрузки поставок](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя          | Где   | Тип      | Обяз. | Описание                                                                                                                                                                                                                                                     |
| ------------ | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `supplyId`   | path  | `string` | да    | ID поставки                                                                                                                                                                                                                                                  |
| `city`       | query | `string` | да    | Населённый пункт отгрузки поставки, кириллица                                                                                                                                                                                                                |
| `officeType` | query | `string` | да    | Тип пункта отгрузки. Укажите значения через запятую: - `sc` — сортировочный центр - `sw` — склад - `pp` — пункт выдачи заказов (ПВЗ) - `pfc` — партнёрский фулфилмент-центр (ПФЦ) - `gpp` — пункт приёма товаров (ППТ)                                       |
| `shippingDt` | query | `string` | нет   | Планируемая дата отгрузки поставки в формате `YYYY-MM-DD`. Обязательно для заказов МГТ (`"cargoType":1`) и КГТ+ (`"cargoType":3`). Если значение передано, в ответе возвращаются только пункты отгрузки, в которые можно отгрузить поставку в указанную дату |

## Ответы

| Код   | Описание                         | Схема                          |
| ----- | -------------------------------- | ------------------------------ |
| `200` | Успешно                          | `SupplyShippingPointsResponse` |
| `400` | Неправильный запрос              | `Error`                        |
| `401` | Не авторизован                   | `object`                       |
| `403` | Доступ запрещён                  | `object`                       |
| `404` | Поставка не найдена              | `Error`                        |
| `409` | В поставке нет сборочных заданий | `Error`                        |
| `429` | Слишком много запросов           | `object`                       |

**Структура `200`:**

- `shippingPoints` `SupplyShippingPoint[]` — Список пунктов отгрузки для указанной поставки
  - `id` `integer<int64>` — ID пункта отгрузки
  - `name` `string` — Название
  - `address` `string` — Адрес
  - `city` `string` — Населённый пункт
  - `officeType` `string` — Тип пункта отгрузки: - `sc` — сортировочный центр - `sw` — склад - `pp` — пункт выдачи заказов (ПВЗ) - `pfc` — партнёрский фулфилмент-центр (ПФЦ) - `gpp` — пункт приёма товаров (ППТ)
  - `latitude` `number` — Широта
  - `longitude` `number` — Долгота
  - `fulfillment` `boolean` — Услуга **Фулфилмент в СЦ** для поставки по модели FBS: - `true` — доступна - `false` — недоступна
  - `available` `boolean` — Доступен ли пункт для отгрузки поставки: - `true` — доступен - `false` — недоступен. Возвращается для ПВЗ, если ПВЗ перегружен в планируемую дату отгрузки

**Структура `400`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

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

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

**Структура `409`:**

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_supplies_supply_id_shipping_points(supply_id=..., city=..., office_type=..., shipping_dt=...)
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

const { data } = await api.getV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType, shippingDt);
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

result, _, err := client.OrdersFbsAPI.GetV3FbsSuppliesSupplyIdShippingPoints(context.Background(), supplyId).City(city).OfficeType(officeType).Execute()
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

System.out.println(api.getV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType, shippingDt));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsSuppliesSupplyIdShippingPoints($supply_id, $city, $office_type));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsSuppliesSupplyIdShippingPoints(supplyId, city, officeType));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::get_v3_fbs_supplies_supply_id_shipping_points(&cfg, supply_id, city, office_type, shipping_dt).await;
    println!("{:#?}", result);
}
```

:::
