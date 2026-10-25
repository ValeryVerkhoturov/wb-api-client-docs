---
title: "Настройка дневных лимитов кампаний"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Настройка дневных лимитов кампаний

```http
PUT /api/advert/v0/daily-limits
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Управление кампаниями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/putV0DailyLimits)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод включает, выключает и обновляет дневной лимит кампаний.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип          | Период | Лимит      | Интервал | Всплеск    |
| ------------ | ------ | ---------- | -------- | ---------- |
| Персональный | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный    | 1 мин  | 5 запросов | 12 сек   | 5 запросов |

## Тело запроса

`application/json` — схема `V0PutDailyLimitsRequest`, обязательно

- `advertIds` `integer<int64>[]` (обязательно) — ID кампаний
- `enabled` `boolean` (обязательно) — Включить лимит: - `true` — да - `false` — нет
- `dailyLimit` `integer<int64>` — Сумма дневного лимита. Параметр обязателен при `"enabled": true`. Минимально допустимая сумма указана в поле `minDailyLimit` метода [GET /api/advert/v1/config](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV1Config)
- `carryOverEnabled` `boolean` — Переносить неиспользованный остаток лимита на следующий день: - `true` — да - `false` — нет Параметр обязателен при `"enabled": true`

## Ответы

| Код   | Описание               | Схема                      |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `V0PutDailyLimitsResponse` |
| `400` | Неправильный запрос    | `response400`              |
| `401` | Не авторизован         | `object`                   |
| `403` | Доступ запрещён        | `object`                   |
| `429` | Слишком много запросов | `object`                   |

**Структура `200`:**

- `adverts` `V0PutDailyLimitsAdvertResult[]`
  - `advertId` `integer<int64>` — ID кампании
  - `belowMinLimit` `boolean` — Установленный размер дневного лимита ниже рекомендуемого минимума относительно текущих ставок `requiredLimit`: - `true` — да - `false` — нет
  - `requiredLimit` `integer<int64>` — Рекомендуемый минимальный размер дневного лимита при текущих ставках кампании. Указывается в разменных единицах — 0,01 от базовой валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances). С меньшим лимитом бюджет может расходоваться неравномерно и в кампании возникнут ошибки

**Структура `400`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `request_id` `string` — Уникальный ID запроса
- `status` `integer<int64>` — HTTP статус-код
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
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.put_v0_daily_limits(v0_put_daily_limits_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.putV0DailyLimits(v0PutDailyLimitsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PutV0DailyLimits(context.Background()).V0PutDailyLimitsRequest(v0PutDailyLimitsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.putV0DailyLimits(v0PutDailyLimitsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0DailyLimits($v0_put_daily_limits_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0DailyLimits(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0DailyLimits(v0PutDailyLimitsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::put_v0_daily_limits(&cfg, v0_put_daily_limits_request).await;
    println!("{:#?}", result);
}
```

:::
