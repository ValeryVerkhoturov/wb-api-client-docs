---
title: "Add Custom Declaration to the Orders"
description: "Sets the customs declaration numbers and numeric codes of the countries of origin for assembly order label identifiers. One assembly order can have only one…"
---

# Add Custom Declaration to the Orders

```http
POST /api/marketplace/v3/dbs/orders/meta/customs-declaration
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** DBS Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration)

Sets the customs declaration numbers and numeric codes of the countries of origin for [assembly order label identifiers](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails). One assembly order can have only one customs declaration number.
Customs declaration number can only be added if all the conditions are met:

- the assembly order has the B2B sale attribute — `"isB2b": true` in the response of the method [getting new assembly orders](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew)
- the assembly order is in `confirm` or `deliver` [statuses](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo)
- the `customsDeclaration` field is returned in the response of the [Get order label identifiers](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails) method

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding DBS label identifiers**:

| Period                                                           | Limit        | Interval | Burst       |
| ---------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                            | 500 requests | 120 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                    | Schema                   |
| ----- | ------------------------------ | ------------------------ |
| `200` | Success                        | `api.StatusSetResponses` |
| `400` | Bad request                    | `Error`                  |
| `401` | Unauthorized                   | `object`                 |
| `402` | Payment required               | `object`                 |
| `403` | Access denied                  | `Error`                  |
| `404` | The resource is not found      | `Error`                  |
| `409` | Label identifiers update error | `Error`                  |
| `429` | Too many requests              | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_customs_declaration(post_v3_dbs_orders_meta_customs_declaration_request=...)
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

const { data } = await api.postV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest);
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

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaCustomsDeclaration(context.Background()).PostV3DbsOrdersMetaCustomsDeclarationRequest(postV3DbsOrdersMetaCustomsDeclarationRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaCustomsDeclaration($post_v3_dbs_orders_meta_customs_declaration_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaCustomsDeclaration(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest));
```

:::
