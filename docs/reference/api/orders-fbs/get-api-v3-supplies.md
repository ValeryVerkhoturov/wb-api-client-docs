---
title: "Получить список поставок"
description: "Метод возвращает список поставок."
---

# Получить список поставок

```http
GET /api/v3/supplies
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3Supplies)

Метод возвращает список [поставок](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Ответы

| Код   | Описание               | Схема                      |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `GetV3SuppliesResponse200` |
| `400` | Неправильный запрос    | `Error`                    |
| `401` | Не авторизован         | `object`                   |
| `402` | Требуется платёж       | `object`                   |
| `403` | Доступ запрещён        | `Error`                    |
| `429` | Слишком много запросов | `object`                   |

**Структура `200`:**

- `next` `Next`
- `supplies` `Supply[]` — Список поставок
  - `id` `string` — ID поставки
  - `isB2b` `boolean` — Признак B2B-продажи: - `true` — B2B-продажа - `false` — не B2B-продажа - `null` — признак отсутствует, сборочные задания не добавлены к поставке
  - `isPickupPointShipmentAllowed` `boolean` — Можно ли отгрузить заказ на ПВЗ: - `false` — нет - `true` — да
  - `done` `boolean` — Флаг закрытия поставки: - `true` — закрыта - `false` — открыта
  - `createdAt` `string` — Дата создания поставки (RFC3339)
  - `closedAt` `string` — Дата закрытия поставки (RFC3339)
  - `scanDt` `string` — Дата сканирования поставки (RFC3339). Если `"scanDt":null`, поставка не сканировалась
  - `name` `string` — Наименование поставки
  - `cargoType` `integer<int64>` = `1` | `2` | `3` — Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+)
  - `crossBorderType` `integer<int32>` = `0` | `1` — Тип поставки: - `0` — внутренняя поставка - `1` — трансграничная поставка - `null` — значение отсутствует
  - `destinationOfficeId` `integer<int64>` — ID склада хранения сборочных заданий в поставке. Если `null`, склад не указан
  - `recommendedWhId` `integer<int64>` — ID рекомендуемого склада для приёмки поставки для Москвы и МО. Рекомендуется ближайший к покупателям склад, который определяется автоматически при передаче поставки в доставку с учётом параметров всех сборочных заданий в поставке. Если `0`, рекомендуемый склад не определён
  - `shippingDt` `string` — Планируемая дата отгрузки поставки, формат `YYYY-MM-DD`
  - `shippingPointId` `integer<int64>` — ID пункта отгрузки. Можно получить в методе получения [пунктов отгрузки поставок](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints)
  - `shippingType` `string` = `selfShipping` | `transportCompany` — Способ доставки до пункта отгрузки: - `selfShipping` — доставка силами продавца - `transportCompany` — доставка через транспортную компанию
  - `waybillUuid` `string` — ID ЭТрН — электронной транспортной накладной
  - `spotAvailable` `boolean` — Доступен ли СПОТ для этой поставки: - `true` — да. Используйте метод [получения данных СПОТ](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList) - `false` — нет

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_supplies(limit=..., next=...)
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

const { data } = await api.getV3Supplies(limit, next);
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

result, _, err := client.OrdersFbsAPI.GetV3Supplies(context.Background()).Execute()
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

System.out.println(api.getV3Supplies(limit, next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3Supplies($limit, $next));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3Supplies(limit, next).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3Supplies(limit, next));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::get_v3_supplies(&cfg, limit, next).await;
    println!("{:#?}", result);
}
```

:::
