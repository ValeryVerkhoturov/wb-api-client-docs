---
title: "Brands"
description: "The method returns list of brands by subcategory ID."
---

# Brands

```http
GET /api/content/v1/brands
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Categories, Subcategories, and Characteristics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV1Brands)

The method returns list of brands by subcategory ID.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 1 s    | 1 request | 1 s      | 5 requests |
| Service          | 1 s    | 1 request | 1 s      | 5 requests |
| Base with secret | 1 s    | 1 request | 1 s      | 5 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request  |

## Parameters

| Name        | In    | Type             | Req. | Description                                                                             |
| ----------- | ----- | ---------------- | ---- | --------------------------------------------------------------------------------------- |
| `subjectId` | query | `integer<int64>` | yes  | Subcategory ID                                                                          |
| `next`      | query | `integer<int64>` | no   | Pagination parameter. Use the `next` value from the response to get the next data batch |

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `BrandsResponse`      |
| `400` | Bad request       | `BrandsResponseError` |
| `401` | Unauthorized      | `object`              |
| `403` | Access denied     | `object`              |
| `404` | Not found         | `BrandsResponseError` |
| `429` | Too many requests | `object`              |

**Structure `200`:**

- `brands` `object[]`
  - `id` `integer<int64>` — Brand ID
  - `logoUrl` `string` — Brand logo URL
  - `name` `string` — Brand name
- `next` `integer<int64>` — Pagination parameter. Specify this value in the request to get the next batch. If the field is missing, you received all the data
- `total` `integer<int64>` — Total number of brands of the subcategory

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `errors` `object[]`
  - `message` `string` — Error text
  - `location` `string` — Parameter where the error occurred
  - `value` `object` — Value of the parameter where the error occurred

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `404`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `errors` `object[]`
  - `message` `string` — Error text
  - `location` `string` — Parameter where the error occurred
  - `value` `object` — Value of the parameter where the error occurred

**Structure `429`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v1_brands(subject_id=..., next=...)
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

const { data } = await api.getV1Brands(subjectId, next);
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

result, _, err := client.ItemsAPI.GetV1Brands(context.Background()).SubjectId(subjectId).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.getV1Brands(subjectId, next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV1Brands($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV1Brands(subjectId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV1Brands(subjectId));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::get_v1_brands(&cfg, subject_id, next).await;
    println!("{:#?}", result);
}
```

:::
