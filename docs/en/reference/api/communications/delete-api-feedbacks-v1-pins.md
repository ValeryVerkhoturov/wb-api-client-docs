---
title: "Открепить отзывы"
description: "Метод позволяет открепить отзывы в карточке товара или в группе объединённых карточек. Чтобы получить pinId — ID операций закрепления, используйте метод Список…"
---

# Открепить отзывы

```http
DELETE /api/feedbacks/v1/pins
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Закреплённые отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/deleteFeedbacksV1Pins)

Метод позволяет открепить отзывы в карточке товара или в группе [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек.
Чтобы получить `pinId` — ID операций закрепления, используйте метод [Список закреплённых и откреплённых отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/getFeedbacksV1Pins).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Request body

`application/json` — schema `integer[]`, required

## Responses

| Code  | Description            | Schema                             |
| ----- | ---------------------- | ---------------------------------- |
| `200` | Успешно                | `DeleteFeedbacksV1PinsResponse200` |
| `400` | Неправильный запрос    | `respond.ResultErr`                |
| `401` | Не авторизован         | `object`                           |
| `402` | Требуется платёж       | `object`                           |
| `403` | Доступ запрещён        | `object`                           |
| `429` | Слишком много запросов | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.deleteFeedbacksV1Pins(requestBody);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.DeleteFeedbacksV1Pins(context.Background()).RequestBody(requestBody).Execute()
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

System.out.println(api.deleteFeedbacksV1Pins(requestBody));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->deleteFeedbacksV1Pins($request_body));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ЗакреплённыеОтзывыApi(Настройки);

Сообщить(Клиент.DeleteFeedbacksV1Pins(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.DeleteFeedbacksV1Pins(requestBody));
```

:::
