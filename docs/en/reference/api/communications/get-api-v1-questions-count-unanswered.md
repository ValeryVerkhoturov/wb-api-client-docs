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
from wb_api_client.communications.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

result = api.get_v1_questions_count_unanswered()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1QuestionsCountUnanswered();
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1QuestionsCountUnanswered(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1QuestionsCountUnanswered());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1QuestionsCountUnanswered());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ВопросыApi(Настройки);

Сообщить(Клиент.GetV1QuestionsCountUnanswered().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1QuestionsCountUnanswered());
```

:::
