---
title: "Drafts List"
description: "Method is available by Personal token, Service token"
---

# Drafts List

```http
GET /api/supplies/v1/drafts
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supply Drafts · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/supplyDrafts/operation/getV1Drafts)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns a list of supply drafts

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit       | Interval | Burst       |
| ------ | ----------- | -------- | ----------- |
| 1 min  | 30 requests | 2 s      | 10 requests |

## Parameters

| Name     | In    | Type             | Req. | Description                                                                                          |
| -------- | ----- | ---------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| `limit`  | query | `integer<int64>` | no   | Number of drafts in the response                                                                     |
| `offset` | query | `integer<int64>` | no   | How many results to skip. For example, for the value 10, the response will start with the 11 element |
| `sort`   | query | `string`         | no   | Sorting: - `createdDt` — by the draft creation date - `updatedDt` — by the draft update date         |
| `order`  | query | `string`         | no   | Data order: - `desc` — descending - `asc` — ascending                                                |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `models.ListDraftsResponse` |
| `400` | Bad request       | `errors.DraftError`         |
| `401` | Unauthorized      | `object`                    |
| `403` | Access denied     | `object`                    |
| `429` | Too many requests | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_drafts(limit=..., offset=..., sort=..., order=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1Drafts(limit, offset, sort, order);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1Drafts(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1Drafts(limit, offset, sort, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1Drafts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1Drafts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1Drafts());
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::get_v1_drafts(&cfg, limit, offset, sort, order).await;
    println!("{:#?}", result);
}
```

:::
