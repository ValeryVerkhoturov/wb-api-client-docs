---
title: "Получить настройки автовозврата продавца"
description: "Метод доступен по Персональному токену, Сервисному токену, Базовому токену с секретом"
---

# Получить настройки автовозврата продавца

```http
GET /api/marketplace/v3/fbs/settings/autoreturns
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Настройки автовозврата · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/autoreturnSettings/operation/getV3FbsSettingsAutoreturns)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену,
**Базовому** токену **с секретом**

Метод возвращает информацию о настройках автовозврата, установленных продавцом.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Responses

| Code  | Description                      | Schema                                   |
| ----- | -------------------------------- | ---------------------------------------- |
| `200` | Успешно                          | `GetV3FbsSettingsAutoreturnsResponse200` |
| `401` | Не авторизован                   | `object`                                 |
| `403` | Доступ запрещён                  | `Response4XX`                            |
| `406` | Неприменимо для данного аккаунта | `ApiErrorV3`                             |
| `429` | Слишком много запросов           | `object`                                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.get_v3_fbs_settings_autoreturns()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV3FbsSettingsAutoreturns();
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV3FbsSettingsAutoreturns(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV3FbsSettingsAutoreturns());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV3FbsSettingsAutoreturns());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый НастройкиАвтовозвратаApi(Настройки);

Сообщить(Клиент.GetV3FbsSettingsAutoreturns().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV3FbsSettingsAutoreturns());
```

:::
