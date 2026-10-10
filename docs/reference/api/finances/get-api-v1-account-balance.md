---
title: "Получить баланс продавца"
description: "Метод возвращает данные виджета баланса на главной странице портала продавцов."
---

# Получить баланс продавца

```http
GET /api/v1/account/balance
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Баланс · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/finances/get-api-v1-account-balance) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/balance/operation/getV1AccountBalance)

Метод возвращает данные виджета баланса на [главной странице](https://seller.wildberries.ru) портала продавцов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск  |
| ------------------ | ------ | -------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый            | 24 ч   | 1 запрос | 24 ч     | 1 запрос |

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1AccountBalanceResponse200` |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FinancesApi(ApiClient(cfg))

result = api.get_v1_account_balance()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FinancesApi(cfg);

const { data } = await api.getV1AccountBalance();
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.GetV1AccountBalance(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.getV1AccountBalance());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1AccountBalance());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1AccountBalance().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1AccountBalance());
```

:::
