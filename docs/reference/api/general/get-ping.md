---
title: "Проверка подключения"
description: "Метод проверяет: 1. Успешно ли запрос доходит до WB API 2. Валидность токена авторизации и URL запроса 3. Совпадают ли категория токена и сервис"
---

# Проверка подключения

```http
GET /ping
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Проверка подключения к WB API · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/connectionCheck/operation/getPing)

Метод проверяет:

1. Успешно ли запрос доходит до WB API
2. Валидность токена авторизации и URL запроса
3. Совпадают ли категория токена и сервис

Метод не предназначен для проверки доступности сервисов WB

У каждого сервиса есть свой вариант метода в зависимости от домена.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит     | Интервал | Всплеск     |
| ------ | --------- | -------- | ----------- |
| 30 сек | 3 запроса | 10 сек   | 99 запросов |

Лимит действует отдельно для каждого варианта метода в зависимости от домена

## Ответы

| Код   | Описание               | Схема                |
| ----- | ---------------------- | -------------------- |
| `200` | Успешно                | `GetPingResponse200` |
| `401` | Не авторизован         | `object`             |
| `403` | Доступ запрещён        | `object`             |
| `429` | Слишком много запросов | `object`             |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.get_ping()
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

const { data } = await api.getPing();
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

result, _, err := client.GeneralAPI.GetPing(context.Background()).Execute()
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

System.out.println(api.getPing());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getPing());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetPing().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetPing());
```

:::
