---
title: "Acceptance Options"
description: "The method is temporary disabled"
---

# Acceptance Options

```http
POST /api/v1/acceptance/options
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Information for Forming Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/informationForFormingSupplies/operation/postV1AcceptanceOptions)

The method is [temporary disabled](https://dev.wildberries.ru/en/release-notes?id=570)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 6 requests | 10 s     | 6 requests |
| Service          | 1 min  | 6 requests | 10 s     | 6 requests |
| Base with secret | 1 min  | 6 requests | 10 s     | 6 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Parameters

| Name          | In    | Type             | Req. | Description                                                                                                        |
| ------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `warehouseID` | query | `integer<int64>` | no   | Warehouse ID. If the parameter is not specified, data for all warehouses is returned. \*\*Maximum is one value\*\* |

## Request body

`application/json` — schema `models.Good[]`, required

- `quantity` `integer<int64>` — Total quantity of items planned for supply. \*\*Maximum 999999\*\*
- `barcode` `string` — Barcode from the listing

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `models.OptionsResultModel` |
| `400` | Incorrect request | `models.ErrorModel`         |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `object`                    |
| `404` | Not found         | —                           |
| `429` | Too many requests | `object`                    |

**Structure `200`:**

- `result` `object[]`
  - `barcode` `string` — Listing barcode
  - `error` `object` — Error data. If an error is present
    - `title` `string` — Error ID
    - `detail` `string` — Error description
  - `isError` `boolean` — Presence of an error: - `true` — there is an error - Field is absent — there is no error
  - `warehouses` `object[]` — Warehouses list. Will be `null` if an error is present
    - `warehouseID` `integer<int64>` — Warehouse ID. With it, you can get [information about the warehouse](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies/operation/getV1Warehouses)
    - `canBox` `boolean` — **Box** package type: - `true` — available - `false` — not available
    - `canMonopallet` `boolean` — **Monopallet** package type: - `true` — available - `false` — not available
    - `canSupersafe` `boolean` — **Super safe** package type: - `true` — available - `false` — not available
    - `isBoxOnPallet` `boolean` — **Pallet with Single Items** supply type: - `true` — available - `false` — not available
- `requestId` `string` — Request ID if an error is present

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

result = api.post_v1_acceptance_options(models_good=..., warehouse_id=...)
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

const { data } = await api.postV1AcceptanceOptions(modelsGood, warehouseID);
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

result, _, err := client.OrdersFbwAPI.PostV1AcceptanceOptions(context.Background()).ModelsGood(modelsGood).WarehouseID(warehouseID).Execute()
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

System.out.println(api.postV1AcceptanceOptions(modelsGood, warehouseID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->postV1AcceptanceOptions($models_good));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.PostV1AcceptanceOptions(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.PostV1AcceptanceOptions(modelsGood));
```

```rust [Rust]
use wb_api_client::orders_fbw::apis::{configuration::Configuration, orders_fbw_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = orders_fbw_api::post_v1_acceptance_options(&cfg, models_period_good, warehouse_id).await;
    println!("{:#?}", result);
}
```

:::
