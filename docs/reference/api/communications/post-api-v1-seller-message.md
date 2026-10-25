---
title: "Отправить сообщение"
description: "Метод отправляет сообщения в чат с покупателем."
---

# Отправить сообщение

```http
POST /api/v1/seller/message
```

**База:** `https://buyer-chat-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Чат с покупателями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/buyersChat/operation/postV1SellerMessage)

Метод отправляет сообщения в [чат с покупателем](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerChats).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Сервисный          | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый с секретом | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Тело запроса

`multipart/form-data` — схема `object`, обязательно

- `replySign` `string` (обязательно) — Подпись чата. Можно получить из [информации по чату](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerChats) или [данных события](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerEvents), если в событии есть поле `"isNewChat": true`.
- `message` `string` — Текст сообщения. Максимум 1000 символов.
- `file` `string<binary>[]` — Файлы, формат JPEG, PDF или PNG, максимальный размер — 5 Мб каждый. Максимальный суммарный размер файлов — 30 Мб.

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `MessageResponse`                |
| `400` | Неправильный запрос    | `PostV1SellerMessageResponse400` |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

**Структура `200`:**

- `errors` `string[]` — Ошибки загрузки файлов, если есть
- `result` `object`
  - `addTime` `integer<int64>` — Дата и время создания чата
  - `chatID` `string` — ID чата
  - `sign` `string` — Подпись чата

**Структура `400`:**

- `status` `number` — HTTP статус-код
- `title` `string` — Заголовок ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `detail` `string` — Детали ошибки
- `requestId` `string` — Уникальный ID запроса
- `error` `string` — Текст ошибки

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

result = api.post_v1_seller_message(reply_sign=..., message=..., file=...)
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

const { data } = await api.postV1SellerMessage(replySign, message, file);
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

result, _, err := client.CommunicationsAPI.PostV1SellerMessage(context.Background()).ReplySign(replySign).Message(message).File(file).Execute()
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

System.out.println(api.postV1SellerMessage(replySign, message, _file));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->postV1SellerMessage($reply_sign));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PostV1SellerMessage(replySign).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PostV1SellerMessage(replySign));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::post_v1_seller_message(&cfg, reply_sign, message, file).await;
    println!("{:#?}", result);
}
```

:::
