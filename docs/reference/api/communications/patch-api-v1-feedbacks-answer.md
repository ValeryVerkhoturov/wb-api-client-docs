---
title: "Отредактировать ответ на отзыв"
description: "Метод позволяет отредактировать уже отправленный ответ на отзыв покупателя."
---

# Отредактировать ответ на отзыв

```http
PATCH /api/v1/feedbacks/answer
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Отзывы · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/patchV1FeedbacksAnswer)

Метод позволяет отредактировать уже отправленный [ответ на отзыв](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/postV1FeedbacksAnswer) покупателя.

Отредактировать ответ можно только один раз в течение 60 дней c момента отправки.

ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `204` | Успешно                | —        |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.patch_v1_feedbacks_answer(patch_v1_feedbacks_answer_request=...)
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

const { data } = await api.patchV1FeedbacksAnswer(patchV1FeedbacksAnswerRequest);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PatchV1FeedbacksAnswer(context.Background()).Execute()
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

System.out.println(api.patchV1FeedbacksAnswer(patchV1FeedbacksAnswerRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->patchV1FeedbacksAnswer());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОтзывыApi(Настройки);

Сообщить(Клиент.PatchV1FeedbacksAnswer(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PatchV1FeedbacksAnswer());
```

:::
