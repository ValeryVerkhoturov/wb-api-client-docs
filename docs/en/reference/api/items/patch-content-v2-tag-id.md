---
title: "Update the Label"
description: "Changes label data: name and color"
---

# Update the Label

```http
PATCH /content/v2/tag/{id}
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Labels · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/labels/operation/patchV2TagId)

Changes label data: name and color

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all **Labels** methods:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Parameters

| Name | In   | Type             | Req. | Description      |
| ---- | ---- | ---------------- | ---- | ---------------- |
| `id` | path | `integer<int64>` | yes  | Numeric label ID |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `responseContentError`        |
| `400` | Bad request       | `responseBodyContentError400` |
| `401` | Unauthorized      | `object`                      |
| `402` | Payment required  | `object`                      |
| `403` | Access denied     | `responseBodyContentError403` |
| `429` | Too many requests | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.patch_v2_tag_id(id=..., patch_v2_tag_id_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.patchV2TagId(id, patchV2TagIdRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PatchV2TagId(context.Background(), id).PatchV2TagIdRequest(patchV2TagIdRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.patchV2TagId(id, patchV2TagIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->patchV2TagId($id, $patch_v2_tag_id_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PatchV2TagId(id, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PatchV2TagId(id, patchV2TagIdRequest));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::patch_v2_tag_id(&cfg, id, patch_v2_tag_id_request).await;
    println!("{:#?}", result);
}
```

:::
