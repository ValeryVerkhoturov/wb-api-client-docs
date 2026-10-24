---
title: "Update Item Auto-Return Settings"
description: "The method sets item auto-return settings for small-sized items — \"cargoType\":1."
---

# Update Item Auto-Return Settings

```http
PATCH /api/marketplace/v3/fbs/settings/autoreturns/items
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Auto-return Settings · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/autoreturnSettings/operation/patchV3FbsSettingsAutoreturnsItems)

The method sets item auto-return settings for small-sized items — `"cargoType":1`.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                                          |
| ----- | ----------------- | ----------------------------------------------- |
| `200` | Success           | `PatchV3FbsSettingsAutoreturnsItemsResponse200` |
| `400` | Bad request       | `ApiErrorV3`                                    |
| `401` | Unauthorized      | `object`                                        |
| `403` | Access denied     | `Response4XX`                                   |
| `429` | Too many requests | `object`                                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_fbs_settings_autoreturns_items(patch_v3_fbs_settings_autoreturns_items_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.patchV3FbsSettingsAutoreturnsItems(patchV3FbsSettingsAutoreturnsItemsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PatchV3FbsSettingsAutoreturnsItems(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.patchV3FbsSettingsAutoreturnsItems(patchV3FbsSettingsAutoreturnsItemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3FbsSettingsAutoreturnsItems());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3FbsSettingsAutoreturnsItems(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3FbsSettingsAutoreturnsItems());
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbs_api::patch_v3_fbs_settings_autoreturns_items(&cfg, patch_v3_fbs_settings_autoreturns_items_request).await;
    println!("{:#?}", result);
}
```

:::
