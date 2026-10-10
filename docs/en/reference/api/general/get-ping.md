---
title: "Проверка подключения"
description: "Метод проверяет: 1. Успешно ли запрос доходит до WB API 2. Валидность токена авторизации и URL запроса 3. Совпадают ли категория токена и сервис"
---

# Проверка подключения

```http
GET /ping
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Проверка подключения к WB API · [WB documentation ↗](https://dev.wildberries.ru/openapi/api-information#tag/connectionCheck/operation/getPing)

Метод проверяет:

1. Успешно ли запрос доходит до WB API
2. Валидность токена авторизации и URL запроса
3. Совпадают ли категория токена и сервис

Метод не предназначен для проверки доступности сервисов WB

У каждого сервиса есть свой вариант метода в зависимости от домена:

| Категория                                       | URL запроса                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Контент                                         | `https://content-api.wildberries.ru/ping`<br>`https://content-api-sandbox.wildberries.ru/ping`                   |
| Аналитика                                       | `https://seller-analytics-api.wildberries.ru/ping`                                                               |
| Цены и скидки                                   | `https://discounts-prices-api.wildberries.ru/ping`<br>`https://discounts-prices-api-sandbox.wildberries.ru/ping` |
| Маркетплейс                                     | `https://marketplace-api.wildberries.ru/ping`                                                                    |
| Статистика                                      | `https://statistics-api.wildberries.ru/ping`<br>`https://statistics-api-sandbox.wildberries.ru/ping`             |
| Продвижение                                     | `https://advert-api.wildberries.ru/ping`<br>`https://advert-api-sandbox.wildberries.ru/ping`                     |
| Вопросы и отзывы                                | `https://feedbacks-api.wildberries.ru/ping`<br>`https://feedbacks-api-sandbox.wildberries.ru/ping`               |
| Чат с покупателями                              | `https://buyer-chat-api.wildberries.ru/ping`                                                                     |
| Поставки                                        | `https://supplies-api.wildberries.ru/ping`                                                                       |
| Возвраты покупателями                           | `https://returns-api.wildberries.ru/ping`                                                                        |
| Документы                                       | `https://documents-api.wildberries.ru/ping`                                                                      |
| Финансы                                         | `https://finance-api.wildberries.ru/ping`                                                                        |
| Тарифы, Новости, Получить информацию о продавце | `https://common-api.wildberries.ru/ping`                                                                         |
| Управление пользователями продавца              | `https://user-management-api.wildberries.ru/ping`                                                                |

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит     | Интервал | Всплеск     |
| ------ | --------- | -------- | ----------- |
| 30 сек | 3 запроса | 10 сек   | 99 запросов |

Лимит действует отдельно для каждого варианта метода в зависимости от домена

## Responses

| Code  | Description            | Schema               |
| ----- | ---------------------- | -------------------- |
| `200` | Успешно                | `GetPingResponse200` |
| `401` | Не авторизован         | `object`             |
| `403` | Доступ запрещён        | `object`             |
| `429` | Слишком много запросов | `object`             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
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
cfg.setAccessToken("<your WB JWT>");
const api = new GeneralApi(cfg);

const { data } = await api.getPing();
console.log(data);
```

```go [Go]
cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
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
client.setBearerToken(new SecretString("<your WB JWT>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getPing());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getPing());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetPing().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetPing());
```

:::
