---
title: "Открепить отзывы"
description: "Метод позволяет открепить отзывы в карточке товара или в группе объединённых карточек. Чтобы получить pinId — ID операций закрепления, используйте метод Список…"
---

# Открепить отзывы

```http
DELETE /api/feedbacks/v1/pins
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Закреплённые отзывы · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/communications/delete-api-feedbacks-v1-pins) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/pinnedFeedbacks/operation/deleteV1Pins)

Метод позволяет открепить отзывы в карточке товара или в группе [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек.
Чтобы получить `pinId` — ID операций закрепления, используйте метод [Список закреплённых и откреплённых отзывов](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/getV1Pins).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Тело запроса

`application/json` — схема `integer[]`, обязательно

## Ответы

| Код   | Описание               | Схема                     |
| ----- | ---------------------- | ------------------------- |
| `200` | Успешно                | `DeleteV1PinsResponse200` |
| `400` | Неправильный запрос    | `respond.ResultErr`       |
| `401` | Не авторизован         | `object`                  |
| `402` | Требуется платёж       | `object`                  |
| `403` | Доступ запрещён        | `object`                  |
| `429` | Слишком много запросов | `object`                  |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.delete_v1_pins(request_body=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CommunicationsApi(cfg);

const { data } = await api.deleteV1Pins(requestBody);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.DeleteV1Pins(context.Background()).RequestBody(requestBody).Execute()
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

System.out.println(api.deleteV1Pins(requestBody));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->deleteV1Pins($request_body));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.DeleteV1Pins(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.DeleteV1Pins(requestBody));
```

:::
