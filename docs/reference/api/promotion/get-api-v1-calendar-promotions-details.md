---
title: "Детальная информация об акциях"
description: "Метод возвращает подробную информацию об акции по ID."
---

# Детальная информация об акциях

```http
GET /api/v1/calendar/promotions/details
```

**База:** `https://dp-calendar-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Календарь акций · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/promoCalendar/operation/getV1CalendarPromotionsDetails)

Метод возвращает подробную информацию об [акции](https://dev.wildberries.ru/openapi/promotion#tag/promoCalendar/operation/getV1CalendarPromotionsDetails) по ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов категории **Календарь акций**:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный          | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос   |

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `object` |
| `400` | Неправильный запрос    | `object` |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

**Структура `200`:**

- `data` `object` — Данные ответа
  - `promotions` `object[]` — Список акций
    - `id` `integer<int64>` — ID акции
    - `name` `string` — Название акции
    - `description` `string` — Описание акции
    - `advantages` `string[]` — Преимущества акции
    - `startDateTime` `string` — Начало акции
    - `endDateTime` `string` — Конец акции
    - `inPromoActionLeftovers` `integer<int64>` — Количество товаров с остатками, участвующих в акции
    - `inPromoActionTotal` `integer<int64>` — Общее количество товаров, участвующих в акции
    - `notInPromoActionLeftovers` `integer<int64>` — Количество товаров с остатками, не участвующих в акции
    - `notInPromoActionTotal` `integer<int64>` — Общее количество товаров, не участвующих в акции
    - `participationPercentage` `integer<int64>` — Уже участвующие в акции товары, %. Рассчитывается по товарам в акции и с остатком
    - `type` `string` = `regular` | `auto` — Тип акции: - `regular` — акция - `auto` — автоакция
    - `exceptionProductsCount` `integer<uint>` — Количество товаров, исключенных из автоакции до её старта. Только при `"type": "auto"`. В момент старта акции эти товары автоматически будут без скидки
    - `ranging` `object[]` — Ранжирование (если подключено)
      - `condition` `string` — Тип [ранжирования](https://seller.wildberries.ru/help-center/article/A-385): - `productsInPromotion` — продвижение получат товары продавца, участвующие в акции - `calculateProducts` — продвижение получат любые товара продавца, предложенные к участию в акции - `allProducts` — продвижение получат все товары продавца
      - `participationRate` `integer<uint>` — Количество товаров продавца для перехода на следующий уровень ранжирования, %
      - `boost` `integer<uint>` — Текущий уровень поднятия в поиске, %

**Структура `400`:**

- `errorText` `string` — Текст ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

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

result = api.get_v1_calendar_promotions_details(promotion_ids=...)
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

const { data } = await api.getV1CalendarPromotionsDetails(promotionIDs);
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

result, _, err := client.PromotionAPI.GetV1CalendarPromotionsDetails(context.Background()).Execute()
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

System.out.println(api.getV1CalendarPromotionsDetails(promotionIDs));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1CalendarPromotionsDetails($promotion_ids));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1CalendarPromotionsDetails(promotionIDs).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1CalendarPromotionsDetails(promotionIDs));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::get_v1_calendar_promotions_details(&cfg, promotion_ids).await;
    println!("{:#?}", result);
}
```

:::
