---
title: "Закрепить GTIN за сборочными заданиями"
description: "Метод обновляет GTIN, уникальный ID товара в Беларуси, в идентификаторах маркировки сборочных заданий. У одного сборочного задания может быть только один GTIN.…"
---

# Закрепить GTIN за сборочными заданиями

```http
POST /api/marketplace/v3/dbs/orders/meta/gtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** Идентификаторы маркировки DBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-gtin) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin)

Метод обновляет GTIN, уникальный ID товара в Беларуси, в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails). У одного сборочного задания может быть только один GTIN.
Закрепить GTIN можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails) есть поле `gtin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 500 запросов | 120 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `api.OrdersGTINSetRequest`, required

## Responses

| Code  | Description                                  | Schema                   |
| ----- | -------------------------------------------- | ------------------------ |
| `200` | Успешно                                      | `api.StatusSetResponses` |
| `400` | Неправильный запрос                          | `api.BatchError`         |
| `401` | Не авторизован                               | `object`                 |
| `402` | Требуется платёж                             | `object`                 |
| `403` | Доступ запрещён                              | `api.BatchError`         |
| `409` | Ошибка обновления идентификаторов маркировки | `api.Error`              |
| `429` | Слишком много запросов                       | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_gtin(api_orders_gtin_set_request=...)
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

const { data } = await api.postV3DbsOrdersMetaGtin(apiOrdersGTINSetRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaGtin(context.Background()).ApiOrdersGTINSetRequest(apiOrdersGTINSetRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaGtin(apiOrdersGTINSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaGtin($api_orders_gtin_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaGtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaGtin(apiOrdersGTINSetRequest));
```

:::
