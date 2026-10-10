---
title: "Закрепить отзывы"
description: "Метод позволяет закрепить отзывы в карточке товара или в группе объединённых карточек. Чтобы получить ID отзывов, используйте метод Список закреплённых и…"
---

# Закрепить отзывы

```http
POST /api/feedbacks/v1/pins
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Закреплённые отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/postV1Pins)

Метод позволяет закрепить отзывы в карточке товара или в группе [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек.
Чтобы получить ID отзывов, используйте метод [Список закреплённых и откреплённых отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/getV1Pins).

Метод доступен по [подписке Джем](https://seller.wildberries.ru/monetization/jam) или c [тарифной опцией](https://seller.wildberries.ru/tariff-constructor) \*\*Закрепление отзыва\*\*.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Request body

`application/json` — schema `openapi.PinReviewItem[]`, required

## Responses

| Code  | Description            | Schema                  |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `PostV1PinsResponse200` |
| `400` | Неправильный запрос    | `respond.ResultErr`     |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `respond.ResultErr`     |
| `429` | Слишком много запросов | `object`                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.post_v1_pins(openapi_pin_review_item=...)
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.PostV1Pins(context.Background()).OpenapiPinReviewItem(openapiPinReviewItem).Execute()
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

System.out.println(api.postV1Pins(openapiPinReviewItem));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->postV1Pins($openapi_pin_review_item));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PostV1Pins(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PostV1Pins(openapiPinReviewItem));
```

:::
