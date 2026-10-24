---
title: "Add Labeling codes Chestny ZNAK to the Assembly Orders (Chestny ZNAK)"
description: "The method sets labeling code Chestny ZNAK to the assembly orders label identifiers. You can add the labeling codes Chestny ZNAK only for orders in the confirm…"
---

# Add Labeling codes Chestny ZNAK to the Assembly Orders (Chestny ZNAK)

```http
POST /api/marketplace/v3/click-collect/orders/meta/sgtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Label Identifiers · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin)

The method sets labeling code [Chestny ZNAK](https://chestnyznak.ru/en) to the [assembly orders label identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails).
You can add the labeling codes Chestny ZNAK only for orders in the `confirm` status and if the field `sgtin` is returned in the response of the [Get Order Label Identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails) method.

You can get the added labeling codes in the [assembly orders label identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails).

For more information about labeling codes Chestny ZNAK please check: https://chestnyznak.ru/en/.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods for **adding In-Store Pickup label identifiers**:

| Period                                                           | Limit       | Interval | Burst        |
| ---------------------------------------------------------------- | ----------- | -------- | ------------ |
| 1 min                                                            | 20 requests | 3 s      | 500 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersSGTINsSetRequest`, required

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `api.MetaSetResponses` |
| `400` | Bad request       | `api.BatchError`       |
| `401` | Unauthorized      | `object`               |
| `402` | Payment required  | `object`               |
| `403` | Access denied     | `Error`                |
| `429` | Too many requests | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_sgtin(api_orders_sgtins_set_request=...)
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

const { data } = await api.postV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest);
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

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaSgtin(context.Background()).ApiOrdersSGTINsSetRequest(apiOrdersSGTINsSetRequest).Execute()
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

System.out.println(api.postV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaSgtin($api_orders_sgtins_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaSgtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

:::
