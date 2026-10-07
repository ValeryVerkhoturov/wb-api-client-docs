---
title: "Опции приёмки"
description: "Метод временно отключён"
---

# Опции приёмки

```http
POST /api/v1/acceptance/options
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Информация для формирования поставок · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies/operation/postV1AcceptanceOptions)

Метод [временно отключён](https://dev.wildberries.ru/release-notes?id=570)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Сервисный          | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Базовый с секретом | 1 мин  | 6 запросов | 10 сек   | 6 запросов |
| Базовый            | 1 ч    | 2 запроса  | 30 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов.

## Parameters

| Name          | In    | Type      | Req. | Description                                                                                             |
| ------------- | ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------- |
| `warehouseID` | query | `integer` | no   | ID склада. Если параметр не указан, возвращаются данные по всем складам. \*\*Максимум одно значение\*\* |

## Request body

`application/json` — schema `models.Good[]`, required

## Responses

| Code  | Description            | Schema                      |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `models.OptionsResultModel` |
| `400` | Некорректный запрос    | `models.ErrorModel`         |
| `401` | Не авторизован         | `object`                    |
| `402` | Требуется платёж       | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `404` | Не найдено             | —                           |
| `429` | Слишком много запросов | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v1_acceptance_options(models_good=..., warehouse_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1AcceptanceOptions(modelsGood, warehouseID);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1AcceptanceOptions(context.Background()).ModelsGood(modelsGood).WarehouseID(warehouseID).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1AcceptanceOptions(modelsGood, warehouseID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1AcceptanceOptions($models_good));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИнформацияДляФормированияПоставокApi(Настройки);

Сообщить(Клиент.PostV1AcceptanceOptions(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1AcceptanceOptions(modelsGood));
```

:::
