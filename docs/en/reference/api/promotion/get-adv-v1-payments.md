---
title: "Получение истории пополнений счёта"
description: "Метод возвращает историю пополнений счёта \\\\WB Продвижение\\\\ за заданный период."
---

# Получение истории пополнений счёта

```http
GET /adv/v1/payments
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Финансы · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/getV1Payments)

Метод возвращает историю пополнений счёта \*\*WB Продвижение\*\* за заданный период.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Сервисный          | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый с секретом | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Parameters

| Name   | In    | Type     | Req. | Description                                                     |
| ------ | ----- | -------- | ---- | --------------------------------------------------------------- |
| `from` | query | `string` | no   | Начало интервала                                                |
| `to`   | query | `string` | no   | Конец интервала. (Минимальный интервал 1 день, максимальный 31) |

## Responses

| Code  | Description                         | Schema                     |
| ----- | ----------------------------------- | -------------------------- |
| `200` | Успешно                             | `GetV1PaymentsResponse200` |
| `204` | История пополнений счета не найдена | —                          |
| `400` | Неправильный запрос                 | `string`                   |
| `401` | Не авторизован                      | `object`                   |
| `403` | Доступ запрещён                     | `object`                   |
| `429` | Слишком много запросов              | `object`                   |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

result = api.get_v1_payments(var_from=..., to=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1Payments(from, to);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1Payments(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1Payments(from, to));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1Payments());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ФинансыApi(Настройки);

Сообщить(Клиент.GetV1Payments().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1Payments());
```

:::
