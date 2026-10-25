---
title: "Статистика кампаний"
description: "Метод формирует статистику для кампаний независимо от типа."
---

# Статистика кампаний

```http
GET /adv/v3/fullstats
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Статистика · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/getV3Fullstats)

Метод формирует статистику для кампаний независимо от типа.

Максимальный период в запросе — 31 день.

Для кампаний в статусах `7`, `9` и `11`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос |

## Параметры

| Имя         | Где   | Тип      | Обяз. | Описание                          |
| ----------- | ----- | -------- | ----- | --------------------------------- |
| `ids`       | query | `string` | да    | ID кампаний, максимум 50 значений |
| `beginDate` | query | `string` | да    | Дата начала интервала             |
| `endDate`   | query | `string` | да    | Дата окончания интервала          |

## Ответы

| Код   | Описание               | Схема                       |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `GetV3FullstatsResponse200` |
| `400` | Неправильный запрос    | `FullStatsError`            |
| `401` | Не авторизован         | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

**Структура `200` — `FullStatsItem[]`:**

- `advertId` `integer<int64>` — ID кампании
- `atbs` `integer<int64>` — Количество добавлений товаров в корзину
- `boosterStats` `object[]` — Статистика по средней позиции товара (для кампаний с единой ставкой)
  - `avg_position` `integer<int64>` — Средняя позиция товара
  - `date` `string` — Дата, за которую предоставлены данные
  - `nm` `integer<int64>` — Артикул WB
- `canceled` `integer<int64>` — Отмены, шт.
- `clicks` `integer<int64>` — Количество кликов
- `cpc` `number<double>` — Средняя стоимость клика в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
- `cr` `number<double>` — CR (conversion rate) — отношение количества заказов к общему количеству кликов
- `ctr` `number<double>` — CTR (click-through rate) — отношение числа кликов к количеству показов в процентах
- `days` `object[]` — Статистка по дням
  - `apps` `object[]` — Блок информации о платформе
    - `appType` `integer<int64>` = `1` | `32` | `64` — Тип платформы: - `1` — сайт - `32` — Android - `64` — IOS
    - `atbs` `integer<int64>` — Количество добавлений товаров в корзину
    - `canceled` `integer<int64>` — Отмены, шт.
    - `clicks` `integer<int64>` — Количество кликов
    - `cpc` `number` — Средняя стоимость клика в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
    - `cr` `number` — CR (conversion rate) — отношение количества заказов к общему количеству кликов
    - `ctr` `number` — CTR (click-through rate) — отношение числа кликов к количеству показов в процентах
    - `nms` `object[]` — Блок статистики по артикулам WB
      - `atbs` `integer<int64>` — Количество добавлений товаров в корзину
      - `canceled` `integer<int64>` — Отмены, шт.
      - `clicks` `integer<int64>` — Количество кликов
      - `cpc` `number` — Средняя стоимость клика в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
      - `cr` `number` — CR (conversion rate) — отношение количества заказов к общему количеству кликов
      - `ctr` `number` — CTR (click-through rate) — отношение числа кликов к количеству показов в процентах
      - `name` `string` — Название товара
      - `nmId` `integer<int64>` — Артикул WB
      - `orders` `integer<int64>` — Количество заказов
      - `shks` `integer<int64>` — Количество заказанных товаров, шт.
      - `sum` `number` — Затраты в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
      - `sum_price` `number` — Заказов на сумму в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
      - `views` `integer<int64>` — Количество просмотров
    - `orders` `integer<int64>` — Количество заказов
    - `shks` `integer<int64>` — Количество заказанных товаров, шт.
    - `sum` `number` — Затраты в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
    - `sum_price` `number` — Заказов на сумму в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
    - `views` `integer<int64>` — Количество просмотров
  - `atbs` `integer<int64>` — Количество добавлений товаров в корзину
  - `canceled` `integer<int64>` — Отмены, шт.
  - `date` `string` — Дата, за которую представлены данные
  - `clicks` `integer<int64>` — Количество кликов
  - `cpc` `number` — Средняя стоимость клика в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
  - `cr` `number` — CR (conversion rate) — отношение количества заказов к общему количеству посещений кампании
  - `ctr` `number` — CTR (click-through rate) — отношение числа кликов к количеству показов в процентах
  - `orders` `integer<int64>` — Количество заказов
  - `shks` `integer<int64>` — Количество заказанных товаров, шт.
  - `sum` `number` — Затраты в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
  - `sum_price` `number` — Заказов на сумму в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
  - `views` `integer<int64>` — Количество просмотров
- `orders` `integer<int64>` — Количество заказов
- `shks` `integer<int64>` — Количество заказанных товаров, шт.
- `sum` `number<double>` — Затраты в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
- `sum_price` `number<double>` — Сумма заказов в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
- `views` `integer<int64>` — Количество просмотров
- `currency` `string<ISO 4217>` — Валюта [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)

**Структура `400`:**

- `errors` `object[]`
  - `detail` `string` — Детали ошибки
  - `field` `string` — Параметр с ошибкой
- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `request_id` `string` — ID запроса
- `status` `integer<int64>` — HTTP статус-код
- `title` `string` — Заголовок ошибки
- `type` `string` — Тип ошибки

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

result = api.get_v3_fullstats(ids=..., begin_date=..., end_date=...)
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

const { data } = await api.getV3Fullstats(ids, beginDate, endDate);
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

result, _, err := client.PromotionAPI.GetV3Fullstats(context.Background()).Ids(ids).BeginDate(beginDate).EndDate(endDate).Execute()
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

System.out.println(api.getV3Fullstats(ids, beginDate, endDate));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV3Fullstats($ids, $begin_date, $end_date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV3Fullstats(ids, beginDate, endDate).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV3Fullstats(ids, beginDate, endDate));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::get_v3_fullstats(&cfg, ids, begin_date, end_date).await;
    println!("{:#?}", result);
}
```

:::
