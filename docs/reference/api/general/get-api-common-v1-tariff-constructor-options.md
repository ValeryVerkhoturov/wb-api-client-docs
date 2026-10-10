---
title: "Получить информацию об опциях Конструктора тарифов"
description: "Информацию об опциях Конструктора тарифов можно получить с токеном любой категории"
---

# Получить информацию об опциях Конструктора тарифов

```http
GET /api/common/v1/tariff-constructor/options
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Информация о продавце · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/general/get-api-common-v1-tariff-constructor-options) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerInformation/operation/getV1TariffConstructorOptions)

Информацию об опциях Конструктора тарифов можно получить с токеном любой [категории](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Сервисному** токену

Метод возвращает информацию обо всех опциях и пакетах опций, которые продавец подключил в [Конструкторе тарифов](https://seller.wildberries.ru/tariff-constructor).

Опции, входящие в подключённые пакеты, возвращаются в массиве `packages`. Опции, подключённые вне пакетов, возвращаются в массиве `options`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск     |
| ------ | -------- | -------- | ----------- |
| 1 мин  | 1 запрос | 1 мин    | 10 запросов |

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                |
| -------- | ----- | -------- | ----- | ------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык полей ответа: - `ru` — русский - `en` — английский |

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `PlanBuilderOptionsInfo` |
| `400` | Неправильный запрос    | `PlanBuilderErrors`      |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `Response4XX`            |
| `404` | Не найдено             | `PlanBuilderErrors`      |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_tariff_constructor_options(locale=...)
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

const { data } = await api.getV1TariffConstructorOptions(locale);
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

result, _, err := client.GeneralAPI.GetV1TariffConstructorOptions(context.Background()).Execute()
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

System.out.println(api.getV1TariffConstructorOptions(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1TariffConstructorOptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1TariffConstructorOptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1TariffConstructorOptions());
```

:::
