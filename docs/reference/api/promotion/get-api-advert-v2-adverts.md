---
title: "Информация о кампаниях"
description: "Метод возвращает информацию о рекламных кампаниях с единой или ручной ставкой по их статусам, типам оплаты и ID."
---

# Информация о кампаниях

```http
GET /api/advert/v2/adverts
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Кампании · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaigns/operation/getV2Adverts)

Метод возвращает информацию о рекламных кампаниях с единой или ручной ставкой по их статусам, типам оплаты и ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 1 запрос   | 1 ч      | 1 запрос   |

## Параметры

| Имя            | Где   | Тип      | Обяз. | Описание                                                                                                                                                                             |
| -------------- | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ids`          | query | `string` | нет   | ID кампаний, максимум 50                                                                                                                                                             |
| `statuses`     | query | `string` | нет   | Статусы кампаний: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе |
| `payment_type` | query | `string` | нет   | Тип оплаты: - `cpm` — за показы - `cpc` — за клик                                                                                                                                    |

## Ответы

| Код   | Описание               | Схема         |
| ----- | ---------------------- | ------------- |
| `200` | Успешно                | `GetAdverts`  |
| `400` | Неправильный запрос    | `response400` |
| `401` | Не авторизован         | `object`      |
| `403` | Доступ запрещён        | `object`      |
| `429` | Слишком много запросов | `object`      |

**Структура `200`:**

- `adverts` `object[]` — Кампании
  - `bid_type` `string` — Тип ставки: - `unified` — единая ставка - `manual` — ручная ставка
  - `currency` `string<ISO 4217>` — Валюта [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
  - `id` `integer<int64>` — ID кампании
  - `nm_settings` `AdvertNMsSettings[]` — Настройки товаров
    - `bids_kopecks` `AdvertBidsKopecks`
      - `search` `integer<int64>` — Ставка в поиске
      - `recommendations` `integer<int64>` — Ставка в рекомендациях
    - `subject` `AdvertSubcategory`
      - `id` `integer<int64>` — ID предмета
      - `name` `string` — Название предмета
    - `nm_id` `integer<int64>` — Артикул WB
  - `settings` `AdvertSettings`
    - `payment_type` `string` — Тип оплаты: - `cpm` — за показы - `cpc` — за клик
    - `name` `string` — Название кампании
    - `placements` `object` — Места размещения
      - `search` `boolean` — Размещение в поиске: - `false` — отключено - `true` — включено
      - `recommendations` `boolean` — Размещение в рекомендациях: - `false` — отключено - `true` — включено
  - `restrictions` `object` — Ограничения кампании
    - `can_change_nms` `boolean` — Можно ли изменять список товаров кампании: - `true` — да - `false` — нет
  - `status` `integer<int64>` = `-1` | `4` | `7` | `8` | `9` | `11` — Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе
  - `timestamps` `Timestamps`
    - `created` `string` — Время создания кампании
    - `updated` `string` — Время последнего изменения кампании
    - `started` `string` — Время последнего запуска кампании
    - `deleted` `string` — Время удаления кампании. Если кампания не удалена, время указывается в будущем

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

result = api.get_v2_adverts(ids=..., statuses=..., payment_type=...)
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

const { data } = await api.getV2Adverts(ids, statuses, paymentType);
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

result, _, err := client.PromotionAPI.GetV2Adverts(context.Background()).Execute()
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

System.out.println(api.getV2Adverts(ids, statuses, paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV2Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV2Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV2Adverts());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::get_v2_adverts(&cfg, ids, statuses, payment_type).await;
    println!("{:#?}", result);
}
```

:::
