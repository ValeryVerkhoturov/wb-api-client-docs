---
title: "Заявки покупателей на возврат"
description: "Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете отвечать на эти заявки."
---

# Заявки покупателей на возврат

```http
GET /api/v1/claims
```

**База:** `https://returns-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Возвраты покупателями · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/communications/get-api-v1-claims) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims)

Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете [отвечать на эти заявки](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Сервисный          | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `object` |
| `400` | Неправильный запрос    | `object` |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_claims(is_archive=..., id=..., limit=..., offset=..., nm_id=...)
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

const { data } = await api.getV1Claims(isArchive, id, limit, offset, nmId);
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

result, _, err := client.CommunicationsAPI.GetV1Claims(context.Background()).Execute()
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

System.out.println(api.getV1Claims(isArchive, id, limit, offset, nmId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Claims($is_archive));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Claims(is_archive).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Claims(isArchive));
```

:::
