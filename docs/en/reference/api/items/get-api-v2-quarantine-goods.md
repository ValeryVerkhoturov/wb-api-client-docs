---
title: "Get Items in Quarantine"
description: "Returns information about items in quarantine."
---

# Get Items in Quarantine

```http
GET /api/v2/quarantine/goods
```

**Base URL:** `https://discounts-prices-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Prices and Discounts · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/pricesAndDiscounts/operation/getV2QuarantineGoods)

Returns information about items in quarantine.

If the new item price with discount is lower than the [threshold value](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine#2ef3641a-5165-41db-9ac7-e4374c9fc3f1), the item will go into [price quarantine](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) and the price will not change. You will get the error in the [upload details](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryGoodsTask).

You can change price or discount via API or release item from quarantine in [personal account](https://seller.wildberries.ru/discount-and-prices/quarantine).

For items with [size-based pricing](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize), quarantine does not apply.

In the [sandbox](https://dev.wildberries.ru/en/sandbox) items are automatically deleted from quarantine after 3 days.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Prices and Discounts** category:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 6 s    | 10 requests | 600 ms   | 5 requests |
| Service          | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base with secret | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 4 requests  | 15 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Responses

| Code  | Description       | Schema          |
| ----- | ----------------- | --------------- |
| `200` | Success           | `object`        |
| `400` | Bad request       | `ResponseError` |
| `401` | Unauthorized      | `object`        |
| `402` | Payment required  | `object`        |
| `403` | Access denied     | `ResponseError` |
| `422` | Unexpected result | `ResponseError` |
| `429` | Too many requests | `object`        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_quarantine_goods(limit=..., offset=...)
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

const { data } = await api.getV2QuarantineGoods(limit, offset);
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

result, _, err := client.ItemsAPI.GetV2QuarantineGoods(context.Background()).Execute()
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

System.out.println(api.getV2QuarantineGoods(limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2QuarantineGoods($limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2QuarantineGoods(limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2QuarantineGoods(limit));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v2_quarantine_goods(&cfg, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
