---
title: "Add IMEI to Assembly Orders"
description: "Sets the IMEI for the assembly orders label identifiers. The assembly order can have only one IMEI. If a device has two IMEIs — \\\\IMEI\\\\ and \\\\IMEI2\\\\ or…"
---

# Add IMEI to Assembly Orders

```http
POST /api/marketplace/v3/dbs/orders/meta/imei
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei)

Sets the IMEI for the [assembly orders label identifiers](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails).
The assembly order can have only one IMEI. If a device has two IMEIs — \*\*IMEI\*\* and \*\*IMEI2\*\* or \*\*IMEI1\*\* and \*\*IMEI2\*\* — you should only specify \*\*IMEI\*\* or \*\*IMEI1\*\*. You don't need to specify \*\*IMEI2\*\*.
You can add the IMEI only for orders in the `confirm` [status](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo), and if the field `imei` is returned in the response of the [Get Order Label Identifiers](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails) method.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding DBS label identifiers**:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 500 requests | 120 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersIMEISetRequest`, required

## Responses

| Code  | Description                    | Schema                   |
| ----- | ------------------------------ | ------------------------ |
| `200` | Success                        | `api.StatusSetResponses` |
| `400` | Bad request                    | `api.BatchError`         |
| `401` | Unauthorized                   | `object`                 |
| `402` | Payment required               | `object`                 |
| `403` | Access denied                  | `api.BatchError`         |
| `409` | Label identifiers update error | `api.Error`              |
| `429` | Too many requests              | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_imei(api_orders_imei_set_request=...)
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

const { data } = await api.postV3DbsOrdersMetaImei(apiOrdersIMEISetRequest);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaImei(context.Background()).ApiOrdersIMEISetRequest(apiOrdersIMEISetRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaImei(apiOrdersIMEISetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaImei($api_orders_imei_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaImei(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaImei(apiOrdersIMEISetRequest));
```

:::
