---
title: "Расхождения в поставке"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Расхождения в поставке

```http
GET /api/supplies/v1/discrepancies/{supplyId}
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает информацию о выявленных расхождениях между заявленным и фактическим количеством товара в поставке.

Для поставок принятых не позднее года назад.

\*\*Типы расхождений:\*\*

Расхождение в большую сторону:

1. Избыток товара с заявленным баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "surplus"`

2. Избыток товара с несоответствующим заявленному баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "re-sorting"`
  Расхождение в меньшую сторону:

1. Не хватает товара:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "shortage"`

2. Некоторые баркоды не соответствуют заявленным:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "re-sorting"`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Параметры

| Имя        | Где  | Тип               | Обяз. | Описание    |
| ---------- | ---- | ----------------- | ----- | ----------- |
| `supplyId` | path | `string<integer>` | да    | ID поставки |

## Ответы

| Код   | Описание               | Схема                                                   |
| ----- | ---------------------- | ------------------------------------------------------- |
| `200` | Успешно                | `GetV1SuppliesSupplyIdDiscrepanciesQuantityResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`                                     |
| `401` | Не авторизован         | `object`                                                |
| `403` | Доступ запрещён        | `models.SupplyAcceptedMoreThanYearAgo`                  |
| `404` | Не найдено             | `models.ErrorModel`                                     |
| `429` | Слишком много запросов | `object`                                                |

**Структура `200` — `models.ItemDiscrepancyResponse[]`:**

- `packageCode` `string` — ID упаковки
- `videoUrl` `string` — Видео фиксации расхождений в процессе приёмки
- `videoStartsAt` `string` — Дата и время видеофиксации расхождений в процессе приемки
- `videoUnavailable` `boolean` — Доступность видео: - `false` — видео доступно - `true` — видео недоступно
- `items` `models.DiscrepancyResponseItem[]` — Товары поставки
  - `declaredSku` `string` — Баркод, заявленный при формировании поставки
  - `discrepancyType` `string` = `surplus` | `shortage` | `re-sorting` — Тип расхождения в целом по коробу: - `surplus` — товара в коробе больше заявленного - `shortage` — товара в коробе меньше заявленного - `re-sorting` — баркод принятого товара не соответствует заявленному при формировании поставки
  - `declaredAmount` `integer<int64>` — Количество товара, заявленное при формировании поставки
  - `actualAmount` `integer<int64>` — Фактическое количество товара
  - `discrepancyQuantity` `integer<int64>` — Разница между заявленным и фактическим количеством товара
  - `actualSku` `string` — Фактический баркод
  - `skuScans` `models.ItemScans[]` — Результаты сканирования товаров
    - `scanId` `integer<int64>` — ID сканирования
    - `declaredSku` `string` — Баркод, заявленный при формировании поставки
    - `scanTime` `string` — Дата и время сканирования
    - `discrepancyLabel` `string` = `surplus` | `shortage` | `re-sorting` — Тип расхождения товара: - `surplus` — товара больше, чем заявлено - `shortage` — товара меньше, чем заявлено - `re-sorting` — баркод принятого товара не соответствует заявленному при формировании поставки
    - `actualSku` `string` — Фактический баркод

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

**Структура `403`:**

- `status` `integer<int64>` — HTTP-статус код
- `title` `string` — Краткое описание ошибки
- `detail` `string` — Подробное описание ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — Сервис, в котором произошла ошибка

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

result = api.get_v1_supplies_supply_id_discrepancies_quantity(supply_id=...)
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

const { data } = await api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId);
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

result, _, err := client.OrdersFbwAPI.GetV1SuppliesSupplyIdDiscrepanciesQuantity(context.Background(), supplyId).Execute()
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

System.out.println(api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesSupplyIdDiscrepanciesQuantity($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbw_api::get_v1_supplies_supply_id_discrepancies_quantity(&cfg, supply_id).await;
    println!("{:#?}", result);
}
```

:::
