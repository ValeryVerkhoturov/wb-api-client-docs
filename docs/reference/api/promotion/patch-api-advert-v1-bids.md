---
title: "Изменение ставок в кампаниях"
description: "Метод меняет ставки карточек товаров по артикулам WB в кампаниях: - с единой ставкой - с ручной ставкой - с моделью оплаты cpc — за клики Для кампаний в…"
---

# Изменение ставок в кампаниях

```http
PATCH /api/advert/v1/bids
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Управление кампаниями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/patchV1Bids)

Метод меняет ставки карточек товаров по артикулам WB в кампаниях:

- с единой ставкой
- с ручной ставкой
- с моделью оплаты `cpc` — за клики
  Для кампаний в статусах `4`, `9` и `11`.

В запросе укажите место размещения в параметре `placement`:

- `combined` — в поиске и рекомендациях для кампаний с единой ставкой
- `search `или `recommendations` — в поиске или рекомендациях для кампаний с ручной ставкой

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса  | 30 мин   | 1 запрос   |

## Тело запроса

`application/json` — схема `object`, обязательно

- `bids` `object[]` (обязательно) — Ставки в кампаниях
  - `advert_id` `integer<int64>` (обязательно) — ID кампании
  - `nm_bids` `object[]` (обязательно) — Ставки
    - `nm_id` `integer<int64>` (обязательно) — Артикул WB
    - `bid_kopecks` `integer<int64>` (обязательно) — Ставка в разменных единицах — 0,01 от базовой валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
    - `placement` `string` = `search` | `recommendations` | `combined` (обязательно) — Место размещения: - `search` — в поиске (для кампаний с ручной ставкой) - `recommendations`— в рекомендациях (для кампаний с ручной ставкой) - `combined` — в поиске и рекомендациях (для кампаний с единой ставкой)

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `PatchV1BidsResponse200` |
| `400` | Неправильный запрос    | `response400`            |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `object`                 |
| `429` | Слишком много запросов | `object`                 |

**Структура `200`:**

- `bids` `object[]` — Результат отработки запроса
  - `advert_id` `integer<int64>` — ID кампании
  - `nm_bids` `object[]` — Ставки
    - `nm_id` `integer<int64>` — Артикул WB
    - `bid_kopecks` `integer<int64>` — Ставка в разменных единицах — 0,01 от базовой валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
    - `placement` `string` — Место размещения: - `search` — в поиске - `recommendations`— в рекомендациях
- `currency` `string<ISO 4217>` — Валюта [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)

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

result = api.patch_v1_bids(patch_v1_bids_request=...)
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

const { data } = await api.patchV1Bids(patchV1BidsRequest);
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

result, _, err := client.PromotionAPI.PatchV1Bids(context.Background()).PatchV1BidsRequest(patchV1BidsRequest).Execute()
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

System.out.println(api.patchV1Bids(patchV1BidsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->patchV1Bids($patch_v1_bids_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PatchV1Bids(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PatchV1Bids(patchV1BidsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::patch_v1_bids(&cfg, patch_v1_bids_request).await;
    println!("{:#?}", result);
}
```

:::
