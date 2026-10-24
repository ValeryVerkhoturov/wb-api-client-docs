---
title: "Labels List"
description: "Returns seller labels list"
---

# Labels List

```http
GET /content/v2/tags
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Labels · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/labels/operation/getV2Tags)

Returns seller labels list

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all **Labels** methods:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `GetV2TagsResponse200`        |
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

result = api.get_v2_tags()
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

const { data } = await api.getV2Tags();
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

result, _, err := client.ItemsAPI.GetV2Tags(context.Background()).Execute()
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

System.out.println(api.getV2Tags());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2Tags());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2Tags().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2Tags());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v2_tags(&cfg).await;
    println!("{:#?}", result);
}
```

:::
