---
title: "Получить цены продавца и суммы к оплате"
description: "Метод возвращает: - цены продавца без учёта скидок - суммы к оплате покупателем с учетом всех скидок и кэшбека"
---

# Получить цены продавца и суммы к оплате

```http
POST /api/marketplace/v3/dbs/orders/final-price
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice)

Метод возвращает:

- цены продавца без учёта скидок
- суммы к оплате покупателем с учетом всех скидок и кэшбека

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **получения и удаления идентификаторов маркировки DBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 150 запросов | 400 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `OrdersRequestAPI`, необязательно

- `orders` `integer<int64>[]` — Список ID сборочных заданий

## Ответы

| Код   | Описание               | Схема                          |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `api.OrdersFinalPriceResponse` |
| `400` | Неправильный запрос    | `api.BatchError`               |
| `401` | Не авторизован         | `object`                       |
| `403` | Доступ запрещён        | `api.BatchError`               |
| `429` | Слишком много запросов | `object`                       |

**Структура `200`:**

- `requestId` `string` — Уникальный ID запроса
- `results` `api.OrderFinalPriceResult[]`
  - `orderId` `integer<int64>` — ID сборочного задания
  - `data` `object` — Данные сборочного задания. Если `"data":{}`, данные формируются. Повторите запрос позднее. Максимальное время формирования данных около 1 минуты. Если `data` отсутствует, данных по сборочному заданию не предусмотрено. Используйте данные из ответов методов: - [Получить список новых сборочных заданий](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew) - [Получить информацию о завершенных сборочных заданиях](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrders)
    - `originalPrice` `integer<int64>` — Цена продавца в валюте продажи без учёта скидок, умноженная на 100. Предоставляется в информационных целях
    - `convertedOriginalPrice` `integer<int64>` — Цена продавца в валюте страны продавца без учёта скидок, умноженная на 100. Предоставляется в информационных целях
    - `originalFinalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте продажи с учетом всех скидок и кэшбека, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях
    - `convertedOriginalFinalPrice` `integer<int64>` — Сумма к оплате покупателем в валюте страны продавца с учетом всех скидок и кэшбека, умноженная на 100. Предоставляется в информационных целях
    - `currencyCode` `integer<ISO 4217>` — Код валюты продажи
    - `convertedCurrencyCode` `integer<ISO 4217>` — Код валюты страны продавца
  - `errors` `api.BatchErrorFinalPriceResponse[]` — Детали ошибки
    - `code` `integer<int64>` — Код ошибки: - `404` — `NotFound` - `400` — `StatusMismatch` - `422` — `PriceNotCalculated`
    - `detail` `string` — - `NotFound` — сборочное задание не найдено (`404`) - `StatusMismatch` — операция невозможна для этого статуса сборочного задания (`400`) - `PriceNotCalculated` — операция невозможна для сборочных заданий, созданных ранее 23.07.2026 (`422`)
  - `isError` `boolean` — Есть ли ошибки

**Структура `400`:**

- `detail` `object` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
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

**Структура `403`:**

- `detail` `object` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

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

result = api.post_v3_dbs_orders_final_price(orders_request_api=...)
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

const { data } = await api.postV3DbsOrdersFinalPrice(ordersRequestAPI);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersFinalPrice(context.Background()).Execute()
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

System.out.println(api.postV3DbsOrdersFinalPrice(ordersRequestAPI));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersFinalPrice());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersFinalPrice(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersFinalPrice());
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = dbs_api::post_v3_dbs_orders_final_price(&cfg, orders_request_api).await;
    println!("{:#?}", result);
}
```

:::
