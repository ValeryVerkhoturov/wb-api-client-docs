---
title: "Получить список активных или приглашённых пользователей продавца"
description: "Метод доступен по Персональному токену"
---

# Получить список активных или приглашённых пользователей продавца

```http
GET /api/v1/users
```

**База:** `https://user-management-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Управление пользователями продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement/operation/getV1Users)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод возвращает список активных или приглашённых пользователей профиля продавца.

Чтобы выбрать список, укажите значение параметра `isInviteOnly`:

- `isInviteOnly=true` — список приглашённых пользователей, которые ещё не активировали доступ
- `isInviteOnly=false` или не указан — список активных пользователей
  По каждому пользователю можно получить:
- роль пользователя
- разделы, к которым есть доступы
- статус приглашения
  Список приглашённых пользователей в ответе всегда отсортирован по дате создания: от новых до старых.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск    |
| ------ | -------- | -------- | ---------- |
| 1 сек  | 1 запрос | 1 сек    | 5 запросов |

## Параметры

| Имя            | Где   | Тип              | Обяз. | Описание                                                                                                                                                  |
| -------------- | ----- | ---------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`        | query | `integer<int64>` | нет   | Количество активных или приглашённых пользователей в ответе                                                                                               |
| `offset`       | query | `integer<int64>` | нет   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента                                                                      |
| `isInviteOnly` | query | `boolean`        | нет   | - `true` — список приглашённых пользователей, которые ещё не активировали доступ - `false` или не указан — список активных пользователей профиля продавца |

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `getUsersResponse` |
| `400` | Неправильный запрос    | `errorResponse`    |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `Response4XX`      |
| `429` | Слишком много запросов | `object`           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_users(limit=..., offset=..., is_invite_only=...)
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

const { data } = await api.getV1Users(limit, offset, isInviteOnly);
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

result, _, err := client.GeneralAPI.GetV1Users(context.Background()).Execute()
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

System.out.println(api.getV1Users(limit, offset, isInviteOnly));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Users());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Users().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Users());
```

:::
