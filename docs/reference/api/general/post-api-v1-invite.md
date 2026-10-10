---
title: "Создать приглашение для нового пользователя"
description: "Метод доступен по Персональному токену"
---

# Создать приглашение для нового пользователя

```http
POST /api/v1/invite
```

**База:** `https://user-management-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Управление пользователями продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement/operation/postV1Invite)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод создаёт приглашение для нового пользователя с настройкой доступов к разделам профиля продавца.
Как выдаются права доступа:

- Если `access` пустой (`[]`) или не указан — по умолчанию выдаются все доступы, кроме доступов к витрине (`showcase`) и \*\*Джем\*\* (`changeJam`)
- Если в `access` указана часть разделов профиля, то кроме тех доступов, что указаны в запросе, также выдаются все доступы по умолчанию
- Если в `access` перечислены все возможные разделы, доступы будут выданы согласно запросу, без доступов по умолчанию
- Если в `access` дважды указан один и тот же раздел (`code`):
- при разных значениях `disabled` (`true` и `false`) доступ не будет выдан
- при одинаковых значениях `"disabled": true` доступ не будет выдан
- при одинаковых значениях `"disabled": false` доступ будет выдан

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск    |
| ------ | -------- | -------- | ---------- |
| 1 сек  | 1 запрос | 1 сек    | 5 запросов |

## Тело запроса

`application/json` — схема `createInviteRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `createInviteResponse` |
| `400` | Неправильный запрос    | `errorResponse`        |
| `401` | Не авторизован         | `object`               |
| `403` | Доступ запрещён        | `Response4XX`          |
| `429` | Слишком много запросов | `object`               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.post_v1_invite(create_invite_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  GeneralApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new GeneralApi(cfg);

const { data } = await api.postV1Invite(createInviteRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbgeneral "github.com/ValeryVerkhoturov/wb-api-client/clients/go/general"
)

cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.GeneralAPI.PostV1Invite(context.Background()).CreateInviteRequest(createInviteRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.GeneralApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.postV1Invite(createInviteRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->postV1Invite($create_invite_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.PostV1Invite(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.PostV1Invite(createInviteRequest));
```

:::
