---
title: "Количество отзывов"
description: "Метод возвращает количество обработанных или необработанных отзывов за заданный период. Отзыв считается обработанным, если выполняется одно из условий: - на…"
---

# Количество отзывов

```http
GET /api/v1/feedbacks/count
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1FeedbacksCount)

Метод возвращает количество обработанных или необработанных [отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks) за заданный период.
Отзыв считается обработанным, если выполняется одно из условий:

- на отзыв получен ответ
- отзыв содержит только оценку (без текста и фото)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Parameters

| Name         | In    | Type      | Req. | Description                                                       |
| ------------ | ----- | --------- | ---- | ----------------------------------------------------------------- |
| `dateFrom`   | query | `integer` | no   | Дата начала периода в формате Unix timestamp                      |
| `dateTo`     | query | `integer` | no   | Дата конца периода в формате Unix timestamp                       |
| `isAnswered` | query | `boolean` | yes  | Вернуть только обработанные отзывы: - `true` — да - `false` — нет |

## Responses

| Code  | Description            | Schema                           |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1FeedbacksCountResponse200` |
| `400` | Неправильный запрос    | `responseFeedbackQuestionErr`    |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `responseFeedbackQuestionErr`    |
| `429` | Слишком много запросов | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_feedbacks_count(is_answered=..., date_from=..., date_to=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1FeedbacksCount(context.Background()).IsAnswered(isAnswered).Execute()
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

System.out.println(api.getV1FeedbacksCount(isAnswered, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1FeedbacksCount($is_answered));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1FeedbacksCount(isAnswered).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1FeedbacksCount(isAnswered));
```

:::
