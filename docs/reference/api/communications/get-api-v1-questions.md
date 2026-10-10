---
title: "Список вопросов"
description: "Метод возвращает список вопросов по заданным фильтрам. Вы можете: - получить данные отвеченных и неотвеченных вопросов - сортировать вопросы по дате -…"
---

# Список вопросов

```http
GET /api/v1/questions
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Вопросы · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/questions/operation/getV1Questions)

Метод возвращает список вопросов по заданным фильтрам. Вы можете:

- получить данные отвеченных и неотвеченных вопросов
- сортировать вопросы по дате
- настроить пагинацию и количество вопросов в ответе

Можно получить максимум 10 000 вопросов в одном ответе

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя          | Где   | Тип       | Обяз. | Описание                                                                                                                                                                  |
| ------------ | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isAnswered` | query | `boolean` | да    | Есть ли ответ на вопрос: - `true` — да - `false` — нет                                                                                                                    |
| `nmId`       | query | `integer` | нет   | Артикул WB                                                                                                                                                                |
| `take`       | query | `integer` | да    | Количество запрашиваемых вопросов (максимально допустимое значение для параметра - 10 000, при этом сумма значений параметров `take` и `skip` не должна превышать 10 000) |
| `skip`       | query | `integer` | да    | Количество вопросов для пропуска (максимально допустимое значение для параметра - 10 000, при этом сумма значений параметров `take` и `skip` не должна превышать 10 000)  |
| `order`      | query | `string`  | нет   | Сортировка вопросов по дате (`dateAsc`/`dateDesc`)                                                                                                                        |
| `dateFrom`   | query | `integer` | нет   | Дата начала периода в формате Unix timestamp                                                                                                                              |
| `dateTo`     | query | `integer` | нет   | Дата конца периода в формате Unix timestamp                                                                                                                               |

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `GetV1QuestionsResponse200`   |
| `400` | Неправильный запрос    | `responseFeedbackQuestionErr` |
| `401` | Не авторизован         | `object`                      |
| `402` | Требуется платёж       | `object`                      |
| `403` | Доступ запрещён        | `responseFeedbackQuestionErr` |
| `429` | Слишком много запросов | `object`                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_questions(is_answered=..., take=..., skip=..., nm_id=..., order=..., date_from=..., date_to=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Questions(context.Background()).IsAnswered(isAnswered).Take(take).Skip(skip).Execute()
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

System.out.println(api.getV1Questions(isAnswered, take, skip, nmId, order, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Questions($is_answered, $take, $skip));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Questions(isAnswered, take, skip).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Questions(isAnswered, take, skip));
```

:::
