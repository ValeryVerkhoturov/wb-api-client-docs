---
title: "Возврат товара по ID отзыва"
description: "Метод запрашивает возврат товара, по которому оставлен отзыв."
---

# Возврат товара по ID отзыва

```http
POST /api/v1/feedbacks/order/return
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/postV1FeedbacksOrderReturn)

Метод запрашивает возврат товара, по которому оставлен [отзыв](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks).

Возврат доступен для отзывов с полем `"isAbleReturnProductOrders": true`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                         | Schema                                  |
| ----- | ----------------------------------- | --------------------------------------- |
| `200` | Успешно                             | `PostV1FeedbacksOrderReturnResponse200` |
| `400` | Неправильный запрос                 | `responseFeedbackQuestionErr`           |
| `401` | Не авторизован                      | `object`                                |
| `402` | Требуется платёж                    | `object`                                |
| `403` | Доступ запрещён                     | `object`                                |
| `422` | Ошибка обработки параметров запроса | `responseFeedbackQuestionErr`           |
| `429` | Слишком много запросов              | `object`                                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.post_v1_feedbacks_order_return(post_v1_feedbacks_order_return_request=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.PostV1FeedbacksOrderReturn(context.Background()).PostV1FeedbacksOrderReturnRequest(postV1FeedbacksOrderReturnRequest).Execute()
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

System.out.println(api.postV1FeedbacksOrderReturn(postV1FeedbacksOrderReturnRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->postV1FeedbacksOrderReturn($post_v1_feedbacks_order_return_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PostV1FeedbacksOrderReturn(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PostV1FeedbacksOrderReturn(postV1FeedbacksOrderReturnRequest));
```

:::
