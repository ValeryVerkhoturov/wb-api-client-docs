---
title: "Статистика по поисковым кластерам с детализацией по дням"
description: "Метод формирует статистику по поисковым кластерам за указанный период с детализацией по дням. Можно использовать для кампаний с моделями оплаты cpm — за показы…"
---

# Статистика по поисковым кластерам с детализацией по дням

```http
POST /adv/v1/normquery/stats
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Статистика · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/postV1NormqueryStats)

Метод формирует статистику по поисковым кластерам за указанный период с детализацией по дням.
Можно использовать для кампаний с моделями оплаты `cpm` — за показы и `cpc` — за клики.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Сервисный          | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый с секретом | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Тело запроса

`application/json` — схема `V1GetNormQueryStatsRequest`, обязательно

- `from` `string` (обязательно) — Дата начала периода
- `to` `string` (обязательно) — Дата окончания периода периода
- `items` `object[]` (обязательно)
  - `advertId` `integer<int64>` (обязательно) — ID кампании
  - `nmId` `integer<int64>` (обязательно) — Артикул WB

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `V1GetNormQueryStatsResponse` |
| `400` | Неправильный запрос    | `response400`                 |
| `401` | Не авторизован         | `object`                      |
| `403` | Доступ запрещён        | `object`                      |
| `429` | Слишком много запросов | `object`                      |

**Структура `200`:**

- `items` `V1GetNormQueryStatsResponseItem[]`
  - `advertId` `integer<int64>` — ID кампании
  - `nmId` `integer<int64>` — Артикул WB
  - `dailyStats` `V1GetNormQueryStatsResponseItemDailyStat[]` — Статистика с детализацией по дням
    - `date` `string` — Дата
    - `stat` `V1GetNormQueryStatsResponseItemStat`
      - `normQuery` `string` — Поисковый кластер
      - `views` `integer<int64>` — Количество просмотров. Для кампаний с типом оплаты `cpc` — за клики — значение будет `null`
      - `clicks` `integer<int64>` — Количество кликов
      - `atbs` `integer<int64>` — Количество добавлений товаров в корзину
      - `orders` `integer<int64>` — Количество заказов
      - `ctr` `number<float>` — CTR (click-through rate) — отношение числа кликов к количеству показов в процентах. Для кампаний с типом оплаты `cpc` — за клики — значение будет `null`
      - `cpc` `number<float>` — Средняя стоимость клика в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances)
      - `cpm` `number<float>` — Средняя стоимость за тысячу показов в базовых единицах валюты [профиля продавца](https://cmp.wildberries.ru/campaigns/finances). Для кампаний с типом оплаты `cpc` — за клики — значение будет `null`
      - `avgPos` `number<float>` — Средняя позиция товара на страницах поисковой выдачи
      - `shks` `integer<int64>` — Количество заказанных товаров, шт.
      - `spend` `number<double>` — Затраты на продвижение товаров в конкретном поисковом кластере кампании

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

result = api.post_v1_normquery_stats(v1_get_norm_query_stats_request=...)
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

const { data } = await api.postV1NormqueryStats(v1GetNormQueryStatsRequest);
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

result, _, err := client.PromotionAPI.PostV1NormqueryStats(context.Background()).V1GetNormQueryStatsRequest(v1GetNormQueryStatsRequest).Execute()
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

System.out.println(api.postV1NormqueryStats(v1GetNormQueryStatsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1NormqueryStats($v1_get_norm_query_stats_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1NormqueryStats(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1NormqueryStats(v1GetNormQueryStatsRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::post_v1_normquery_stats(&cfg, v1_get_norm_query_stats_request).await;
    println!("{:#?}", result);
}
```

:::
