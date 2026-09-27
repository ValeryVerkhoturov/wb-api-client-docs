---
title: "Список архивных отзывов"
description: "Метод возвращает список архивных отзывов."
---

# Список архивных отзывов

```http
GET /api/v1/feedbacks/archive
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Отзывы · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1FeedbacksArchive)

Метод возвращает список архивных [отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks).

Отзыв становится архивным, если:

- на отзыв получен ответ
- на отзыв не получен ответ в течение 30 дней
- в отзыве нет текста и фото

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя     | Где   | Тип       | Обяз. | Описание                                      |
| ------- | ----- | --------- | ----- | --------------------------------------------- |
| `nmId`  | query | `integer` | нет   | Артикул WB                                    |
| `take`  | query | `integer` | да    | Количество отзывов (max. 5 000)               |
| `skip`  | query | `integer` | да    | Количество отзывов для пропуска               |
| `order` | query | `string`  | нет   | Сортировка отзывов по дате (dateAsc/dateDesc) |

## Ответы

| Код   | Описание                            | Схема                              |
| ----- | ----------------------------------- | ---------------------------------- |
| `200` | Успешно                             | `GetV1FeedbacksArchiveResponse200` |
| `400` | Неправильный запрос                 | `responseFeedbackQuestionErr`      |
| `401` | Не авторизован                      | `object`                           |
| `402` | Требуется платёж                    | `object`                           |
| `403` | Доступ запрещён                     | `responseFeedbackQuestionErr`      |
| `422` | Ошибка обработки параметров запроса | `responseFeedbackQuestionErr`      |
| `429` | Слишком много запросов              | `object`                           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.get_v1_feedbacks_archive(take=..., skip=..., nm_id=..., order=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1FeedbacksArchive(take, skip, nmId, order);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1FeedbacksArchive(context.Background()).Take(take).Skip(skip).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1FeedbacksArchive(take, skip, nmId, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1FeedbacksArchive($take, $skip));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОтзывыApi(Настройки);

Сообщить(Клиент.GetV1FeedbacksArchive(take, skip).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1FeedbacksArchive(take, skip));
```

:::
