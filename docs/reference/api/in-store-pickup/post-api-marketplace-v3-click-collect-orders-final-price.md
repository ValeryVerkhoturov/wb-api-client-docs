---
title: "Получить цены продавца и суммы к оплате"
description: "Метод возвращает: - цены продавца без учёта скидок - суммы к оплате покупателем с учетом всех скидок и кэшбека"
---

# Получить цены продавца и суммы к оплате

```http
POST /api/marketplace/v3/click-collect/orders/final-price
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Сборочные задания Самовывоз · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice)

Метод возвращает:

- цены продавца без учёта скидок
- суммы к оплате покупателем с учетом всех скидок и кэшбека

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **получения и удаления идентификаторов маркировки Самовывоз**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 150 запросов | 400 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersRequest`, необязательно

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
- `results` `api.OrderFinalPriceResult[]` — Данные ответа
  - `orderId` `integer<int64>` — ID сборочного задания
  - `data` `object` — Данные сборочного задания. Если `"data":{}`, данные формируются. Повторите запрос позднее. Максимальное время формирования данных около 1 минуты. Если `data` отсутствует, данных по сборочному заданию не предусмотрено. Используйте данные из ответов методов: - [Получить список новых сборочных заданий](https://dev.wildberries.ru/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrdersNew) - [Получить информацию о завершенных сборочных заданиях](https://dev.wildberries.ru/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrders)
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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_final_price(api_orders_request=...)
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

const { data } = await api.postV3ClickCollectOrdersFinalPrice(apiOrdersRequest);
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

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersFinalPrice(context.Background()).Execute()
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

System.out.println(api.postV3ClickCollectOrdersFinalPrice(apiOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersFinalPrice());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersFinalPrice(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersFinalPrice());
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = in_store_pickup_api::post_v3_click_collect_orders_final_price(&cfg, api_period_orders_request).await;
    println!("{:#?}", result);
}
```

:::
