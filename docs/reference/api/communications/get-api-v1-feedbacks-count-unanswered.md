---
title: "Необработанные отзывы"
description: "Метод возвращает: - количество необработанных отзывов за сегодня и за всё время"
---

# Необработанные отзывы

```http
GET /api/v1/feedbacks/count-unanswered
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Отзывы · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/feedbacks/operation/getV1FeedbacksCountUnanswered)

Метод возвращает:

- количество необработанных [отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks) за сегодня и за всё время

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Ответы

| Код   | Описание               | Схема                                      |
| ----- | ---------------------- | ------------------------------------------ |
| `200` | Успешно                | `GetV1FeedbacksCountUnansweredResponse200` |
| `401` | Не авторизован         | `object`                                   |
| `402` | Требуется платёж       | `object`                                   |
| `403` | Доступ запрещён        | `responseFeedbackQuestionErr`              |
| `429` | Слишком много запросов | `object`                                   |

**Структура `200`:**

- `data` `object`
  - `countUnanswered` `integer<int64>` — Количество необработанных отзывов
  - `countUnansweredToday` `integer<int64>` — Количество необработанных отзывов за сегодня
- `error` `boolean` — Есть ли ошибка
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string[]` — Дополнительные ошибки

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

- `data` `object`
- `error` `boolean` — Есть ли ошибка
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string[]` — Дополнительные ошибки
- `requestId` `string`

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

result = api.get_v1_feedbacks_count_unanswered()
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

const { data } = await api.getV1FeedbacksCountUnanswered();
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

result, _, err := client.CommunicationsAPI.GetV1FeedbacksCountUnanswered(context.Background()).Execute()
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

System.out.println(api.getV1FeedbacksCountUnanswered());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1FeedbacksCountUnanswered());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1FeedbacksCountUnanswered().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1FeedbacksCountUnanswered());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::get_v1_feedbacks_count_unanswered(&cfg).await;
    println!("{:#?}", result);
}
```

:::
