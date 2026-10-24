---
title: "Delete Items from Draft"
description: "Method is available by Personal token, Service token"
---

# Delete Items from Draft

```http
DELETE /api/supplies/v1/drafts/{draftId}/items
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supply Drafts · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftIdItems)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method removes items from the draft.

Skus are not validated. If you submit an incorrect sku in the request, you will not receive an error. However, the correct skus will be removed from the draft.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit       | Interval | Burst       |
| ------ | ----------- | -------- | ----------- |
| 1 min  | 30 requests | 2 s      | 10 requests |

## Parameters

| Name      | In   | Type     | Req. | Description |
| --------- | ---- | -------- | ---- | ----------- |
| `draftId` | path | `string` | yes  | Draft ID    |

## Request body

`application/json` — schema `models.DraftDeleteitemsRequest`, required

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `models.DraftDeleteItemsErrorResponse` |
| `400` | Bad request       | `errors.DraftError`                    |
| `401` | Unauthorized      | `object`                               |
| `403` | Access denied     | `object`                               |
| `404` | Not found         | `errors.DraftError`                    |
| `429` | Too many requests | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.delete_v1_drafts_draft_id_items(draft_id=..., models_draft_deleteitems_request=...)
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

const { data } = await api.deleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest);
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

result, _, err := client.OrdersFbwAPI.DeleteV1DraftsDraftIdItems(context.Background(), draftId).ModelsDraftDeleteitemsRequest(modelsDraftDeleteitemsRequest).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.deleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->deleteV1DraftsDraftIdItems($draft_id, $models_draft_deleteitems_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.DeleteV1DraftsDraftIdItems(draftId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.DeleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::delete_v1_drafts_draft_id_items(&cfg, draft_id, models_period_draft_deleteitems_request).await;
    println!("{:#?}", result);
}
```

:::
