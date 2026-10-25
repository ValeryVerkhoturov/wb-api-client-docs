---
title: "Supplies List"
description: "The method returns a list of supplies, the last 1000 supplies by default."
---

# Supplies List

```http
POST /api/v1/supplies
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Supplies Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/postV1Supplies)

The method returns a list of supplies, the last 1000 supplies by default.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 min  | 30 requests | 2 s      | 10 requests |
| Service          | 1 min  | 30 requests | 2 s      | 10 requests |
| Base with secret | 1 min  | 30 requests | 2 s      | 10 requests |
| Base             | 1 h    | 2 requests  | 30 min   | 1 request   |

## Parameters

| Name     | In    | Type             | Req. | Description                                 |
| -------- | ----- | ---------------- | ---- | ------------------------------------------- |
| `limit`  | query | `integer<int64>` | no   | Number of objects in the response           |
| `offset` | query | `integer<int64>` | no   | From which element to start outputting data |

## Request body

`application/json` — schema `models.SuppliesFiltersRequest`, required

- `dates` `models.DateFilterRequest[]` — Filter by dates
  - `from` `string<ISO 8601>` — Period start date
  - `till` `string<ISO 8601>` — Period end date
  - `type` `string` = `factDate` | `createDate` | `supplyDate` | `updatedDate` (required) — Dates type: - `factDate` — actual dispatch date - `createDate` — supply creation date - `supplyDate` — planned dispatch date - `updatedDate` — supply update date
- `statusIDs` `models.HandySupplyStatus[]` — Filter the supply by statuses. Possible values: - `1` — Not planned - `2` — Planned - `3` — Dispatch allowed - `4` — Accepting - `5` — Accepted - `6` — Unloaded at the gate

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `PostV1SuppliesResponse200` |
| `400` | Bad request       | `models.ErrorModel`         |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `object`                    |
| `429` | Too many requests | `object`                    |

**Structure `200` — `models.Supply[]`:**

- `phone` `string` — Phone number of the user that created the supply
- `supplyID` `integer<int64>` — Supply ID. If `null`, it's an order, so use the value of the `preorderID` field
- `preorderID` `integer<int64>` — Order ID (unplanned supply). Will be `0` for all virtual supplies
- `createDate` `string` — Date and time the supply was created
- `supplyDate` `string` — Planned dispatch date
- `factDate` `string` — Actual dispatch date
- `updatedDate` `string` — Date of the supply update
- `statusID` `integer<int64>` = `1` | `2` | `3` | `4` | `5` | `6` — Supply status ID: - `1` — Not planned - `2` — Planned - `3` — Dispatch allowed - `4` — Accepting - `5` — Accepted - `6` — Unloaded at the gate
- `boxTypeID` `object` — Supply type ID: - `0` — Without boxes (virtual supply) - `1` and `2` — Boxes - `5` — Monopallets - `6` — Supersafe
- `isBoxOnPallet` `boolean` — **Pallet with Single Items** — supply type: - `true` — yes - `false` — no The field is returned only when `"boxTypeID": 2`

**Structure `400`:**

- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error ID
- `detail` `string` — Error description
- `requestId` `string` — Request ID
- `origin` `string` — Service that returned the error

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

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
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.post_v1_supplies(models_supplies_filters_request=..., limit=..., offset=...)
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

const { data } = await api.postV1Supplies(modelsSuppliesFiltersRequest, limit, offset);
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

result, _, err := client.OrdersFbwAPI.PostV1Supplies(context.Background()).ModelsSuppliesFiltersRequest(modelsSuppliesFiltersRequest).Limit(limit).Offset(offset).Execute()
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

System.out.println(api.postV1Supplies(modelsSuppliesFiltersRequest, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->postV1Supplies($models_supplies_filters_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.PostV1Supplies(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.PostV1Supplies(modelsSuppliesFiltersRequest));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::post_v1_supplies(&cfg, models_period_supplies_filters_request, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
