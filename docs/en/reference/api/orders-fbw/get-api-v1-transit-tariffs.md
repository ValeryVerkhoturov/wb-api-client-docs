---
title: "Транзитные направления"
description: "Метод временно отключён"
---

# Транзитные направления

```http
GET /api/v1/transit-tariffs
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Информация для формирования поставок · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies/operation/getV1TransitTariffs)

Метод [временно отключён](https://dev.wildberries.ru/release-notes?id=570)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск     |
| ------------------ | ------ | ---------- | -------- | ----------- |
| Персональный       | 1 мин  | 6 запросов | 10 сек   | 10 запросов |
| Сервисный          | 1 мин  | 6 запросов | 10 сек   | 10 запросов |
| Базовый с секретом | 1 мин  | 6 запросов | 10 сек   | 10 запросов |
| Базовый            | 12 ч   | 1 запрос   | 12 ч     | 1 запрос    |

## Responses

| Code  | Description            | Schema                           |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1TransitTariffsResponse200` |
| `401` | Не авторизован         | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.get_v1_transit_tariffs()
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

const { data } = await api.getV1TransitTariffs();
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1TransitTariffs(context.Background()).Execute()
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

System.out.println(api.getV1TransitTariffs());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1TransitTariffs());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИнформацияДляФормированияПоставокApi(Настройки);

Сообщить(Клиент.GetV1TransitTariffs().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1TransitTariffs());
```

:::
