---
title: "Количество вопросов"
description: "Метод возвращает количество отвеченных или неотвеченных вопросов за заданный период."
---

# Количество вопросов

```http
GET /api/v1/questions/count
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Вопросы · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1QuestionsCount)

Метод возвращает количество отвеченных или неотвеченных [вопросов](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1Questions) за заданный период.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя          | Где   | Тип       | Обяз. | Описание                                               |
| ------------ | ----- | --------- | ----- | ------------------------------------------------------ |
| `dateFrom`   | query | `integer` | нет   | Дата начала периода в формате Unix timestamp           |
| `dateTo`     | query | `integer` | нет   | Дата конца периода в формате Unix timestamp            |
| `isAnswered` | query | `boolean` | нет   | Есть ли ответ на вопрос: - `true` — да - `false` — нет |

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1QuestionsCountResponse200` |
| `400` | Неправильный запрос    | `responseFeedbackQuestionErr`    |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `responseFeedbackQuestionErr`    |
| `429` | Слишком много запросов | `object`                         |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_questions_count(date_from=..., date_to=..., is_answered=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1QuestionsCount(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1QuestionsCount(dateFrom, dateTo, isAnswered));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1QuestionsCount());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1QuestionsCount().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1QuestionsCount());
```

:::
