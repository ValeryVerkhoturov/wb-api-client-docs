---
title: "Работа с вопросами"
description: "В зависимости от тела запроса, метод позволяет: - отметить вопрос как просмотренный - отклонить вопрос - ответить на вопрос или отредактировать ответ"
---

# Работа с вопросами

```http
PATCH /api/v1/questions
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Вопросы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/patchV1Questions)

В зависимости от тела запроса, метод позволяет:

- отметить [вопрос](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1Questions) как просмотренный
- отклонить вопрос
- ответить на вопрос или отредактировать ответ

Все ответы продавцов проходят предварительную модерацию перед публикацией

Отредактировать ответ на вопрос можно 1 раз в течение 60 дней после отправки ответа

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

| Code  | Description                         | Schema                        |
| ----- | ----------------------------------- | ----------------------------- |
| `200` | Успешно                             | `PatchV1QuestionsResponse200` |
| `400` | Неправильный запрос                 | `responseFeedbackQuestionErr` |
| `401` | Не авторизован                      | `object`                      |
| `402` | Требуется платёж                    | `object`                      |
| `403` | Доступ запрещён                     | `responseFeedbackQuestionErr` |
| `404` | Не найдено                          | `responseFeedbackQuestionErr` |
| `422` | Ошибка обработки параметров запроса | `responseFeedbackQuestionErr` |
| `429` | Слишком много запросов              | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.patch_v1_questions(patch_v1_questions_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new CommunicationsApi(cfg);

const { data } = await api.patchV1Questions(patchV1QuestionsRequest);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.PatchV1Questions(context.Background()).Execute()
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

System.out.println(api.patchV1Questions(patchV1QuestionsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->patchV1Questions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PatchV1Questions(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PatchV1Questions());
```

:::
