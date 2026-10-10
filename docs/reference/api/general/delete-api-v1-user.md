---
title: "Удалить пользователя"
description: "Метод доступен по Персональному токену"
---

# Удалить пользователя

```http
DELETE /api/v1/user
```

**База:** `https://user-management-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Управление пользователями продавца · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/general/delete-api-v1-user) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerUserManagement/operation/deleteV1User)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод удаляет пользователя из [списка сотрудников продавца](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement/operation/getV1Users). Этому пользователю будет закрыт доступ в профиль продавца.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск     |
| ------ | -------- | -------- | ----------- |
| 1 сек  | 1 запрос | 1 сек    | 10 запросов |

## Параметры

| Имя             | Где   | Тип              | Обяз. | Описание                                      |
| --------------- | ----- | ---------------- | ----- | --------------------------------------------- |
| `deletedUserID` | query | `integer<int64>` | да    | ID пользователя, которому будет закрыт доступ |

## Ответы

| Код   | Описание               | Схема           |
| ----- | ---------------------- | --------------- |
| `200` | Успешно                | —               |
| `400` | Неправильный запрос    | `errorResponse` |
| `401` | Не авторизован         | `object`        |
| `403` | Доступ запрещён        | `Response4XX`   |
| `429` | Слишком много запросов | `object`        |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.delete_v1_user(deleted_user_id=...)
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

const { data } = await api.deleteV1User(deletedUserID);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbgeneral "github.com/ValeryVerkhoturov/wb-api-client-go/general"
)

cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.GeneralAPI.DeleteV1User(context.Background()).DeletedUserID(deletedUserID).Execute()
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

System.out.println(api.deleteV1User(deletedUserID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->deleteV1User($deleted_user_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.DeleteV1User(deletedUserID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.DeleteV1User(deletedUserID));
```

:::
