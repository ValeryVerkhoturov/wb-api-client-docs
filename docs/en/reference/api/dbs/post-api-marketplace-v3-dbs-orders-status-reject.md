---
title: "Notify that the Orders Are Declined"
description: "The method transfers assembly orders with the deliver status to the reject status — declined upon receipt."
---

# Notify that the Orders Are Declined

```http
POST /api/marketplace/v3/dbs/orders/status/reject
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusReject)

The method transfers [assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) with the `deliver` [status](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) to the `reject` status — declined upon receipt.

[Request limit](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period                                                           | Limit     | Interval | Burst       |
| ---------------------------------------------------------------- | --------- | -------- | ----------- |
| 1 s                                                              | 1 request | 1 s      | 10 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersCodeRequest`, optional

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `api.StatusSetResponses` |
| `400` | Bad request       | `api.BatchError`         |
| `401` | Unauthorized      | `object`                 |
| `402` | Payment required  | `object`                 |
| `403` | Access denied     | `api.BatchError`         |
| `429` | Too many requests | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_status_reject(api_orders_code_request=...)
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

const { data } = await api.postV3DbsOrdersStatusReject(apiOrdersCodeRequest);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersStatusReject(context.Background()).Execute()
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

System.out.println(api.postV3DbsOrdersStatusReject(apiOrdersCodeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersStatusReject());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStatusReject(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersStatusReject());
```

:::
