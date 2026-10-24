---
title: "Add Customs Declaration Numbers to the Orders"
description: "Sets the customs declaration numbers and numeric codes of the countries for the assembly orders label identifiers. One assembly order can have only one customs…"
---

# Add Customs Declaration Numbers to the Orders

```http
POST /api/marketplace/v3/click-collect/orders/meta/customs-declaration
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration)

Sets the customs declaration numbers and numeric codes of the countries for the assembly orders [label identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails). One assembly order can have only one customs declaration number.
Customs declaration number can only be added if all the conditions are met:

- the assembly order has the B2B sale attribute — `"isB2b": true` in the response of the method [getting new assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrdersNew)
- the assembly order is in `confirm` or `prepare` statuses
- the `customsDeclaration` field is returned in the response of the [Get order label identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails) method

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding In-Store Pickup label identifiers**:

| Period                                                           | Limit       | Interval | Burst        |
| ---------------------------------------------------------------- | ----------- | -------- | ------------ |
| 1 min                                                            | 20 requests | 3 s      | 500 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description       | Schema                              |
| ----- | ----------------- | ----------------------------------- |
| `200` | Успешно           | `api.CustomsDeclarationSetResponse` |
| `400` | Bad request       | `api.BatchError`                    |
| `401` | Unauthorized      | `object`                            |
| `403` | Access denied     | `Error`                             |
| `429` | Too many requests | `object`                            |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_customs_declaration(post_v3_click_collect_orders_meta_customs_declaration_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new InStorePickupApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaCustomsDeclaration(postV3ClickCollectOrdersMetaCustomsDeclarationRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaCustomsDeclaration(context.Background()).PostV3ClickCollectOrdersMetaCustomsDeclarationRequest(postV3ClickCollectOrdersMetaCustomsDeclarationRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaCustomsDeclaration(postV3ClickCollectOrdersMetaCustomsDeclarationRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaCustomsDeclaration($post_v3_click_collect_orders_meta_customs_declaration_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaCustomsDeclaration(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaCustomsDeclaration(postV3ClickCollectOrdersMetaCustomsDeclarationRequest));
```

:::
