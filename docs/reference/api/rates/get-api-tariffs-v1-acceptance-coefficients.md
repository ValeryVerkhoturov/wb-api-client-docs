---
title: "Тарифы на поставку"
description: "Метод временно отключён"
---

# Тарифы на поставку

```http
GET /api/tariffs/v1/acceptance/coefficients
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Тарифы на поставку · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/supplyRates/operation/getV1AcceptanceCoefficients)

Метод [временно отключён](https://dev.wildberries.ru/release-notes?id=570)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Сервисный          | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Базовый с секретом | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Базовый            | 1 ч    | 1 запрос   | 1 ч      | 1 запрос   |

## Параметры

| Имя            | Где   | Тип      | Обяз. | Описание                                                     |
| -------------- | ----- | -------- | ----- | ------------------------------------------------------------ |
| `warehouseIDs` | query | `string` | нет   | ID складов. По умолчанию возвращаются данные по всем складам |

## Ответы

| Код   | Описание               | Схема                                    |
| ----- | ---------------------- | ---------------------------------------- |
| `200` | Успешно                | `GetV1AcceptanceCoefficientsResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`                      |
| `401` | Не авторизован         | `object`                                 |
| `402` | Требуется платёж       | `object`                                 |
| `403` | Доступ запрещён        | —                                        |
| `404` | Не найдено             | —                                        |
| `429` | Слишком много запросов | `object`                                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_acceptance_coefficients(warehouse_ids=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  RatesApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new RatesApi(cfg);

const { data } = await api.getV1AcceptanceCoefficients(warehouseIDs);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbrates "github.com/ValeryVerkhoturov/wb-api-client-go/rates"
)

cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.RatesAPI.GetV1AcceptanceCoefficients(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.rates.ApiClient;
import io.github.valeryverkhoturov.wbapi.rates.SecretString;
import io.github.valeryverkhoturov.wbapi.rates.api.RatesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1AcceptanceCoefficients(warehouseIDs));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1AcceptanceCoefficients());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1AcceptanceCoefficients().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1AcceptanceCoefficients());
```

:::
