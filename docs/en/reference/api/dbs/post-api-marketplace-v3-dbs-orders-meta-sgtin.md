---
title: "Закрепить коды маркировки Честного знака за сборочными заданиями"
description: "Метод обновляет код маркировки Честного знака в идентификаторах маркировки сборочных заданий. Закрепить код маркировки можно только за сборочным заданием в…"
---

# Закрепить коды маркировки Честного знака за сборочными заданиями

```http
POST /api/marketplace/v3/dbs/orders/meta/sgtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** Идентификаторы маркировки DBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin)

Метод обновляет код маркировки [Честного знака](https://честныйзнак.рф/) в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails).
Закрепить код маркировки можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails) есть поле `sgtin`.

Получить загруженные маркировки можно в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBS**:

| Тип                                                             | Период | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------ | ------------ | -------- | ----------- |
| Персональный                                                    | 1 мин  | 500 запросов | 120 мс   | 20 запросов |
| Сервисный                                                       | 1 мин  | 500 запросов | 120 мс   | 20 запросов |
| Базовый с секретом                                              | 1 мин  | 500 запросов | 120 мс   | 20 запросов |
| Базовый                                                         | 1 ч    | 10 запросов  | 6 мин    | 1 запрос    |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `api.OrdersSGTINsSetRequest`, required

## Responses

| Code  | Description            | Schema                   |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `api.StatusSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`         |
| `401` | Не авторизован         | `object`                 |
| `402` | Требуется платёж       | `object`                 |
| `403` | Доступ запрещён        | `api.BatchError`         |
| `429` | Слишком много запросов | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_sgtin(api_orders_sgtins_set_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersMetaSgtin(apiOrdersSGTINsSetRequest);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaSgtin(context.Background()).ApiOrdersSGTINsSetRequest(apiOrdersSGTINsSetRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaSgtin($api_orders_sgtins_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaSgtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

:::
