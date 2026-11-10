---
title: "Информация о кампаниях"
description: "Метод возвращает информацию о кампаниях с единой или ручной ставкой по их статусам, типам оплаты или списку ID. Чтобы получить все кампании: 1. Сделайте первый…"
---

# Информация о кампаниях

```http
GET /api/advert/v3/adverts
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Кампании · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaigns/operation/getV3Adverts)

Метод возвращает информацию о кампаниях с единой или ручной ставкой по их статусам, типам оплаты или списку ID.
Чтобы получить все кампании:

1. Сделайте первый запрос без параметра `next`.
2. Повторяйте запрос со значением параметра `next` из ответа на предыдущий запрос, пока `next` не вернётся пустым `""`. Это будет означать, что вы получили все кампании.
   Чтобы получить конкретные кампании, передайте их ID в параметре `advertIds`.
   Не передавайте `advertIds` в одном запросе с другими параметрами.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит | Интервал | Всплеск |
| ------ | ----- | -------- | ------- |
|        |       |          |         |

## Параметры

| Имя           | Где   | Тип              | Обяз. | Описание                                                                                                             |
| ------------- | ----- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------- |
| `advertIds`   | query | `string`         | нет   | ID кампаний                                                                                                          |
| `statuses`    | query | `string`         | нет   | Статусы кампаний: - `4` — готова к запуску - `7` — кампания завершена - `9` — идут показы - `11` — кампания на паузе |
| `next`        | query | `string`         | нет   | Параметр пагинации                                                                                                   |
| `limit`       | query | `integer<int64>` | нет   | Количество кампаний в ответе                                                                                         |
| `paymentType` | query | `string`         | нет   | Тип оплаты: - `cpm` — за показы - `cpc` — за клик                                                                    |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `V3GetAdvertsResponse` |
| `400` | Неправильный запрос    | `response400`          |
| `401` | Не авторизован         | `object`               |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `adverts` `V3GetAdverts[]` — Кампании
  - `advertId` `integer<int64>` — ID кампании
  - `status` `integer<int64>` = `4` | `7` | `9` | `11` — Статус кампании: - `4` — готова к запуску - `7` — завершена - `9` — активна - `11` — на паузе
  - `timestamps` `Timestamps`
    - `created` `string` — Время создания кампании
    - `updated` `string` — Время последнего изменения кампании
    - `started` `string` — Время последнего запуска кампании
    - `ended` `string` — Время завершения кампании
  - `settings` `V3AdvertSettings`
    - `paymentType` `string` — Тип оплаты: - `cpm` — за показы - `cpc` — за клик
    - `name` `string` — Название кампании
    - `placements` `object`
  - `nms` `V3AdvertNMsSettings[]` — Настройки товаров
    - `nmId` `integer<int64>` — Артикул WB
    - `subject` `V3AdvertSubject`
      - `id` `integer<int64>` — ID предмета
      - `name` `string` — Название предмета
    - `bids` `V3AdvertBidsKopecks[]` — Ставки
      - `type` `V3Placements`
      - `value` `integer<int64>` — Ставка
  - `currency` `string<ISO 4217>` — Код валюты
  - `restrictions` `object` — Ограничения кампании
    - `canChangeNms` `boolean` — Можно ли изменять список товаров кампании: - `true` — да - `false` — нет
- `next` `string` — Параметр пагинации. Укажите это значение в запросе, чтобы получить следующий пакет кампаний. Если поле пустое `""`, вы получили все кампании

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

result = api.get_v3_adverts(advert_ids=..., statuses=..., next=..., limit=..., payment_type=...)
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

const { data } = await api.getV3Adverts(advertIds, statuses, next, limit, paymentType);
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

result, _, err := client.PromotionAPI.GetV3Adverts(context.Background()).Execute()
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

System.out.println(api.getV3Adverts(advertIds, statuses, next, limit, paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV3Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV3Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV3Adverts());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::get_v3_adverts(&cfg, advert_ids, statuses, next, limit, payment_type).await;
    println!("{:#?}", result);
}
```

:::
