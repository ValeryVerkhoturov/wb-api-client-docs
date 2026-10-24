---
title: "Set Wholesale Discounts for B2B"
description: "Method is available by Personal token, Service token"
---

# Set Wholesale Discounts for B2B

```http
POST /api/discounts-prices/v1/upload/task/b2b/wholesale
```

**Base URL:** `https://discounts-prices-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Prices and Discounts · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/pricesAndDiscounts/operation/postV1UploadTaskB2bWholesale)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method sets wholesale discounts for B2B.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Prices and Discounts** category:

| Type     | Period | Limit       | Interval | Burst      |
| -------- | ------ | ----------- | -------- | ---------- |
| Personal | 6 s    | 10 requests | 600 ms   | 5 requests |
| Service  | 6 s    | 10 requests | 600 ms   | 5 requests |

## Responses

| Code  | Description           | Schema            |
| ----- | --------------------- | ----------------- |
| `200` | Success               | `object`          |
| `208` | Upload already exists | `object`          |
| `400` | Bad request           | `ResponseErrorV3` |
| `401` | Unauthorized          | `object`          |
| `403` | Access denied         | `ResponseErrorV3` |
| `429` | Too many requests     | `object`          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v1_upload_task_b2b_wholesale(post_v1_upload_task_b2b_wholesale_request=...)
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

const { data } = await api.postV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest);
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

result, _, err := client.ItemsAPI.PostV1UploadTaskB2bWholesale(context.Background()).Execute()
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

System.out.println(api.postV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV1UploadTaskB2bWholesale($post_v1_upload_task_b2b_wholesale_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV1UploadTaskB2bWholesale(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest));
```

:::
