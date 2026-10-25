---
title: "Остатки на складах продавца"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Остатки на складах продавца

```http
POST /api/analytics/v1/stocks-report/seller-warehouses
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** История остатков · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV1StocksReportSellerWarehouses)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает текущие остатки товаров на складах продавца.

Данные обновляются 1 раз в 30 минут.

1 строка ответа — данные об 1 размере товара на 1 складе продавца.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит     | Интервал | Всплеск  |
| ------ | --------- | -------- | -------- |
| 1 мин  | 3 запроса | 20 сек   | 1 запрос |

## Тело запроса

`application/json` — схема `InventoryRequest`, обязательно

- `nmIds` `integer<int64>[]` — Артикулы WB
- `chrtIds` `integer<int64>[]` — ID размеров. Используется только для указанных в массиве `nmIds` артикулов
- `limit` `integer<int64>` — Количество строк в ответе
- `offset` `integer<int64>` — Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента

## Ответы

| Код   | Описание               | Схема                                           |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `PostV1StocksReportSellerWarehousesResponse200` |
| `204` | Нет данных             | —                                               |
| `400` | Неправильный запрос    | `ErrorObject400`                                |
| `401` | Не авторизован         | `object`                                        |
| `403` | Доступ запрещён        | `ErrorObject403`                                |
| `429` | Слишком много запросов | `object`                                        |

**Структура `200`:**

- `data` `InventorySellerResponse`
  - `items` `object[]` — Остатки товаров на складах продавца по размерам
    - `nmId` `integer<int64>` — Артикул WB
    - `chrtId` `integer<int64>` — ID размера
    - `warehouseId` `integer<int64>` — ID склада
    - `warehouseName` `string` — Название склада
    - `regionName` `string` — Регион отгрузки
    - `quantity` `integer<int64>` — Количество товара на складе, доступное клиентам для добавления в корзину

**Структура `400`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB

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
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB

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
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v1_stocks_report_seller_warehouses(inventory_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV1StocksReportSellerWarehouses(inventoryRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV1StocksReportSellerWarehouses(context.Background()).InventoryRequest(inventoryRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV1StocksReportSellerWarehouses(inventoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV1StocksReportSellerWarehouses($inventory_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV1StocksReportSellerWarehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV1StocksReportSellerWarehouses(inventoryRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = analytics_api::post_v1_stocks_report_seller_warehouses(&cfg, inventory_request).await;
    println!("{:#?}", result);
}
```

:::
