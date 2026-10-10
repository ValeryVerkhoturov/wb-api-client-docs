---
title: "Ответить на отзыв"
description: "Метод позволяет ответить на отзыв покупателя."
---

# Ответить на отзыв

```http
POST /api/v1/feedbacks/answer
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/postV1FeedbacksAnswer)

Метод позволяет ответить на [отзыв](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks) покупателя.

ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                |
| ----- | ---------------------- | --------------------- |
| `204` | Успешно                | —                     |
| `400` | Неправильный запрос    | `standardizedFQError` |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `403` | Доступ запрещён        | `object`              |
| `429` | Слишком много запросов | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.post_v1_feedbacks_answer(post_v1_feedbacks_answer_request=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.PostV1FeedbacksAnswer(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.postV1FeedbacksAnswer(postV1FeedbacksAnswerRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->postV1FeedbacksAnswer());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PostV1FeedbacksAnswer(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PostV1FeedbacksAnswer());
```

:::
