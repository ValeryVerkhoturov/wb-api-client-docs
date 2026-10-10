---
title: "Список чатов"
description: "Метод возвращает список всех чатов продавца. По этим данным можно получить события чатов или отправить сообщение покупателю."
---

# Список чатов

```http
GET /api/v1/seller/chats
```

**Base URL:** `https://buyer-chat-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Чат с покупателями · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerChats)

Метод возвращает список всех чатов продавца. По этим данным можно получить [события чатов](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerEvents) или [отправить сообщение покупателю](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/postV1SellerMessage).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Сервисный          | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый с секретом | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Responses

| Code  | Description            | Schema          |
| ----- | ---------------------- | --------------- |
| `200` | Успешно                | `ChatsResponse` |
| `401` | Не авторизован         | `object`        |
| `402` | Требуется платёж       | `object`        |
| `403` | Доступ запрещён        | `object`        |
| `429` | Слишком много запросов | `object`        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_seller_chats()
print(result)
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1SellerChats(context.Background()).Execute()
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

System.out.println(api.getV1SellerChats());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1SellerChats());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1SellerChats().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1SellerChats());
```

:::
