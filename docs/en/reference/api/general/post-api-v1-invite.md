---
title: "Создать приглашение для нового пользователя"
description: "Метод доступен по Персональному токену"
---

# Создать приглашение для нового пользователя

```http
POST /api/v1/invite
```

**Base URL:** `https://user-management-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Управление пользователями продавца · [WB documentation ↗](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement/operation/postV1Invite)

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

## Request body

`application/json` — schema `createInviteRequest`, required

## Responses

| Code  | Description            | Schema                 |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `createInviteResponse` |
| `400` | Неправильный запрос    | `errorResponse`        |
| `401` | Не авторизован         | `object`               |
| `403` | Доступ запрещён        | `Response4XX`          |
| `429` | Слишком много запросов | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v1_invite(create_invite_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1Invite(createInviteRequest);
console.log(data);
```

```go [Go]
cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1Invite(context.Background()).CreateInviteRequest(createInviteRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1Invite(createInviteRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1Invite($create_invite_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый УправлениеПользователямиПродавцаApi(Настройки);

Сообщить(Клиент.PostV1Invite(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1Invite(createInviteRequest));
```

:::
