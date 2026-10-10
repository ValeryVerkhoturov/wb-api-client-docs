---
title: "Неотвеченные вопросы"
description: "Метод возвращает общее количество неотвеченных вопросов и количество неотвеченных вопросов за сегодня."
---

# Неотвеченные вопросы

```http
GET /api/v1/questions/count-unanswered
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Вопросы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1QuestionsCountUnanswered)

Метод возвращает общее количество неотвеченных [вопросов](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1Questions) и количество неотвеченных вопросов за сегодня.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Responses

| Code  | Description            | Schema                                     |
| ----- | ---------------------- | ------------------------------------------ |
| `200` | Успешно                | `GetV1QuestionsCountUnansweredResponse200` |
| `401` | Не авторизован         | `object`                                   |
| `402` | Требуется платёж       | `object`                                   |
| `403` | Доступ запрещён        | `responseFeedbackQuestionErr`              |
| `429` | Слишком много запросов | `object`                                   |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_questions_count_unanswered()
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1QuestionsCountUnanswered(context.Background()).Execute()
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

System.out.println(api.getV1QuestionsCountUnanswered());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1QuestionsCountUnanswered());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1QuestionsCountUnanswered().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1QuestionsCountUnanswered());
```

:::
