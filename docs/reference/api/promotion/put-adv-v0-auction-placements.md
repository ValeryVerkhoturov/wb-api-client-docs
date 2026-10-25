---
title: "Изменение мест размещения в кампаниях с ручной ставкой"
description: "Метод меняет места размещения в кампаниях с ручной ставкой и моделью оплаты за показы — cpm."
---

# Изменение мест размещения в кампаниях с ручной ставкой

```http
PUT /adv/v0/auction/placements
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Управление кампаниями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/putV0AuctionPlacements)

Метод меняет места размещения в кампаниях с ручной ставкой и моделью оплаты за показы — `cpm`.

Для кампаний в статусах `4`, `9` и `11`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Сервисный          | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Базовый с секретом | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос |

## Тело запроса

`application/json` — схема `object`, обязательно

- `placements` `object[]` (обязательно) — Места размещения в кампаниях
  - `advert_id` `integer<int64>` (обязательно) — ID кампании
  - `placements` `object` (обязательно) — Места размещения
    - `search` `boolean` (обязательно) — Размещение в поиске: - `false` — отключено - `true` — включено
    - `recommendations` `boolean` (обязательно) — Размещение в рекомендациях: - `false` — отключено - `true` — включено

## Ответы

| Код   | Описание               | Схема         |
| ----- | ---------------------- | ------------- |
| `204` | Успешно                | —             |
| `400` | Неправильный запрос    | `response400` |
| `401` | Не авторизован         | `object`      |
| `403` | Доступ запрещён        | `object`      |
| `429` | Слишком много запросов | `object`      |

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

result = api.put_v0_auction_placements(put_v0_auction_placements_request=...)
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

const { data } = await api.putV0AuctionPlacements(putV0AuctionPlacementsRequest);
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

result, _, err := client.PromotionAPI.PutV0AuctionPlacements(context.Background()).PutV0AuctionPlacementsRequest(putV0AuctionPlacementsRequest).Execute()
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

System.out.println(api.putV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0AuctionPlacements($put_v0_auction_placements_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0AuctionPlacements(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::put_v0_auction_placements(&cfg, put_v0_auction_placements_request).await;
    println!("{:#?}", result);
}
```

:::
