---
title: "Notify that the Orders Are Declined"
description: "The method transfers assembly orders from the prepare — ready for pickup — status to the reject — refusal upon receipt — status."
---

# Notify that the Orders Are Declined

```http
POST /api/marketplace/v3/click-collect/orders/status/reject
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** In-Store Pickup Assembly Orders · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusReject)

The method transfers [assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) from the `prepare` — ready for pickup — [status](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo) to the `reject` — refusal upon receipt — status.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period                                                           | Limit     | Interval | Burst       |
| ---------------------------------------------------------------- | --------- | -------- | ----------- |
| 1 s                                                              | 1 request | 1 s      | 10 requests |
| One request with `4XX` response codes is counted as 10 requests. |

---

In [Sandbox](https://dev.wildberries.ru/en/sandbox) — maximum of 1 request per second for all **Marketplace** methods in total.

## Request body

`application/json` — schema `api.OrdersRequestV2`, optional

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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_status_reject(api_orders_request_v2=...)
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

const { data } = await api.postV3ClickCollectOrdersStatusReject(apiOrdersRequestV2);
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

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersStatusReject(context.Background()).Execute()
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

System.out.println(api.postV3ClickCollectOrdersStatusReject(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersStatusReject());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersStatusReject(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersStatusReject());
```

:::
