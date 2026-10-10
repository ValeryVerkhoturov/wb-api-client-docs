---
title: "Список архивных отзывов"
description: "Метод возвращает список архивных отзывов."
---

# Список архивных отзывов

```http
GET /api/v1/feedbacks/archive
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Отзывы · [WB documentation ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1FeedbacksArchive)

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

## Parameters

| Name    | In    | Type      | Req. | Description                                   |
| ------- | ----- | --------- | ---- | --------------------------------------------- |
| `nmId`  | query | `integer` | no   | Артикул WB                                    |
| `take`  | query | `integer` | yes  | Количество отзывов (max. 5 000)               |
| `skip`  | query | `integer` | yes  | Количество отзывов для пропуска               |
| `order` | query | `string`  | no   | Сортировка отзывов по дате (dateAsc/dateDesc) |

## Responses

| Code  | Description                         | Schema                             |
| ----- | ----------------------------------- | ---------------------------------- |
| `200` | Успешно                             | `GetV1FeedbacksArchiveResponse200` |
| `400` | Неправильный запрос                 | `responseFeedbackQuestionErr`      |
| `401` | Не авторизован                      | `object`                           |
| `402` | Требуется платёж                    | `object`                           |
| `403` | Доступ запрещён                     | `responseFeedbackQuestionErr`      |
| `422` | Ошибка обработки параметров запроса | `responseFeedbackQuestionErr`      |
| `429` | Слишком много запросов              | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_feedbacks_archive(take=..., skip=..., nm_id=..., order=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1FeedbacksArchive(take, skip, nmId, order);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client/clients/go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1FeedbacksArchive(context.Background()).Take(take).Skip(skip).Execute()
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

System.out.println(api.getV1FeedbacksArchive(take, skip, nmId, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1FeedbacksArchive($take, $skip));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1FeedbacksArchive(take, skip).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1FeedbacksArchive(take, skip));
```

:::
