---
title: "Список закреплённых и откреплённых отзывов"
description: "Метод предоставляет список закреплённых и откреплённых отзывов."
---

# Список закреплённых и откреплённых отзывов

```http
GET /api/feedbacks/v1/pins
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Закреплённые отзывы · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/pinnedFeedbacks/operation/getV1Pins)

Метод предоставляет список закреплённых и откреплённых отзывов.

Откреплёнными считаются только отзывы, которые были откреплены автоматически по причинам, указанным в ответе в поле `unpinnedCause`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя          | Где   | Тип              | Обяз. | Описание                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----- | ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `state`      | query | `string`         | нет   | Закреплён ли отзыв: - `pinned` — да - `unpinned` — нет                                                                                                                                                                                                                                                                                           |
| `pinOn`      | query | `string`         | нет   | Место закрепления отзыва: - `nm` — карточка товара - `imt` — группа [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров                                                                                      |
| `imtId`      | query | `integer<int64>` | нет   | ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров. Един для всех артикулов WB группы объединённых карточек. У каждой карточки товара есть `imtId`, даже если она не объединена с другими карточками |
| `nmId`       | query | `integer<int64>` | нет   | Артикул WB                                                                                                                                                                                                                                                                                                                                       |
| `feedbackId` | query | `integer<int64>` | нет   | ID отзыва                                                                                                                                                                                                                                                                                                                                        |
| `dateFrom`   | query | `string`         | нет   | Дата закрепления первого отзыва в списке                                                                                                                                                                                                                                                                                                         |
| `dateTo`     | query | `string`         | нет   | Дата закрепления последнего отзыва в списке                                                                                                                                                                                                                                                                                                      |
| `next`       | query | `integer<int64>` | нет   | ID последней операции закрепления (пагинатор)                                                                                                                                                                                                                                                                                                    |
| `limit`      | query | `integer<int64>` | нет   | Количество отзывов на одной странице (пагинация)                                                                                                                                                                                                                                                                                                 |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `GetV1PinsResponse200` |
| `400` | Неправильный запрос    | `respond.ResultErr`    |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `data` `openapi.PinnedReviewItemResult[]`
  - `changeStateAt` `string` — Дата и время закрепления или открепления
  - `imtId` `integer<int64>` — ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров
  - `nmId` `integer<int64>` — Артикул WB
  - `pinId` `integer<int64>` — ID операции закрепления отзыва
  - `pinMethod` `string` — Метод закрепления: - `subscription` — подписка Джем - `tariff` — тарифная опция
  - `pinOn` `string` — Место закрепления отзыва: - `nm` — карточка товара - `imt` — группа [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров
  - `feedbackId` `string` — ID отзыва
  - `state` `string` — Закреплён ли отзыв: - `pinned` — да - `unpinned` — нет
  - `unpinnedCause` `string` = `sysTariffUnpinned` | `sysLimitReached` | `sysNoratingUnpinned` | `sysAdditionalSlot` — Причина открепления отзыва: - `sysTariffUnpinned` — закончилась подписка или тарифная опция - `sysLimitReached` — закончился общий лимит по подписке - `sysNoratingUnpinned` — отзыв исключён из рейтинга. Например, удалён или забанен - `sysAdditionalSlot` — к карточке или к группе [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек прикреплено максимальное количество отзывов
- `next` `integer<int64>` — Параметр пагинации. Укажите это значение в запросе, чтобы получить следующий пакет данных. Если поле отсутствует, вы получили все данные

**Структура `400`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — ID запроса
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
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_pins(state=..., pin_on=..., imt_id=..., nm_id=..., feedback_id=..., date_from=..., date_to=..., next=..., limit=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1Pins(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo, next, limit);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Pins(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1Pins(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Pins());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Pins().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Pins());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::get_v1_pins(&cfg, state, pin_on, imt_id, nm_id, feedback_id, date_from, date_to, next, limit).await;
    println!("{:#?}", result);
}
```

:::
