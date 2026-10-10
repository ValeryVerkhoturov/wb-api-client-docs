---
title: "Получить информацию об опциях Конструктора тарифов"
description: "Информацию об опциях Конструктора тарифов можно получить с токеном любой категории"
---

# Получить информацию об опциях Конструктора тарифов

```http
GET /api/common/v1/tariff-constructor/options
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Информация о продавце · [WB documentation ↗](https://dev.wildberries.ru/openapi/api-information#tag/sellerInformation/operation/getV1TariffConstructorOptions)

Информацию об опциях Конструктора тарифов можно получить с токеном любой [категории](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Сервисному** токену

Метод возвращает информацию обо всех опциях и пакетах опций, которые продавец подключил в [Конструкторе тарифов](https://seller.wildberries.ru/tariff-constructor).

Опции, входящие в подключённые пакеты, возвращаются в массиве `packages`. Опции, подключённые вне пакетов, возвращаются в массиве `options`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск     |
| ------ | -------- | -------- | ----------- |
| 1 мин  | 1 запрос | 1 мин    | 10 запросов |

## Parameters

| Name     | In    | Type     | Req. | Description                                             |
| -------- | ----- | -------- | ---- | ------------------------------------------------------- |
| `locale` | query | `string` | no   | Язык полей ответа: - `ru` — русский - `en` — английский |

## Responses

| Code  | Description            | Schema                   |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `PlanBuilderOptionsInfo` |
| `400` | Неправильный запрос    | `PlanBuilderErrors`      |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `Response4XX`            |
| `404` | Не найдено             | `PlanBuilderErrors`      |
| `429` | Слишком много запросов | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
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
cfg.setAccessToken("<your WB JWT>");
const api = new GeneralApi(cfg);

const { data } = await api.getV1TariffConstructorOptions(locale);
console.log(data);
```

```go [Go]
cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
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
client.setBearerToken(new SecretString("<your WB JWT>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV1TariffConstructorOptions(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1TariffConstructorOptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1TariffConstructorOptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1TariffConstructorOptions());
```

:::
