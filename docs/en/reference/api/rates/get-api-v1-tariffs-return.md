---
title: "Return Rates"
description: "Returns rates: - on transfer from Wildberries warehouse or sorting center to the seller - on transfer of returned items that were not picked up by seller"
---

# Return Rates

```http
GET /api/v1/tariffs/return
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`rates`](/en/reference/api/rates/) · **Section:** Return Cost to Seller · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/returnCostToSeller/operation/getV1TariffsReturn)

Returns [rates](https://seller.wildberries.ru/dynamic-product-categories/return-cost):

- on transfer from Wildberries warehouse or sorting center to the seller
- on transfer of returned items that were not picked up by seller

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 60 requests | 1 s      | 5 requests |
| Service          | 1 min  | 60 requests | 1 s      | 5 requests |
| Base with secret | 1 min  | 60 requests | 1 s      | 5 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `ReturnRatesResponse` |
| `400` | Bad request       | `BadRequest`          |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `429` | Too many requests | `object`              |

**Structure `200`:**

- `response` `models.ReturnRatesResponse`
  - `data` `models.WarehousesReturnRates`
    - `currency` `string` — Rate currency
    - `dtNextDeliveryDumpKgt` `string` — Start date of next rate, for delivery of large-sized items
    - `dtNextDeliveryDumpSrg` `string` — Start date of next rate, for delivery of unknown items
    - `dtNextDeliveryDumpSup` `string` — Start date of next rate, for common delivery
    - `warehouseList` `models.WarehouseReturnRates[]` — Return rates grouped by warehouses: - cost of returning defective items and returns initiated by the seller for freight delivery. - cost of returning items unidentified by the warehouse. - cost of returning defective items, returns initiated by the seller, and auto-returns by the Marketplace (to the pickup point and back). You can get the cost of returns to the pickup point and reverse logistics if the seller did not collect the items from the pickup point within 7 days.
      - `deliveryDumpKgtOfficeBase` `string` — **Return to the pick-up point, per 1 liter, ₽** Used for large-sized items, when: - the seller takes items out from Wildberries warehouse, - defective items was found on the warehouse, - buyer returns items but we can not sell them again.
      - `deliveryDumpKgtOfficeLiter` `string` — **Return cost for freight delivery, delivery to the pickup point (additional liter), ₽** Cost per each additional liter.
      - `deliveryDumpKgtReturnExpr` `string` — \*\*Return cost for freight delivery, reverse logistics for unclaimed return, ₽\*\* Freight delivery of unclaimed return back to the Wildberries warehouse. Per 1 item.
      - `deliveryDumpSrgOfficeExpr` `string` — **Return of unknown items to the pick-up point. Per one item, ₽** Applies to items that could not be accepted at the warehouse.
      - `deliveryDumpSrgReturnExpr` `string` — \*\*Return cost for items unidentified by the warehouse per unit, reverse logistics for unclaimed return, ₽\*\* Delivery of unclaimed return back to the Wildberries warehouse.
      - `deliveryDumpSupCourierBase` `string` — **Return cost, courier delivery (base price per one liter), ₽** Applies when: - the seller wants to remove items from the Wildberries warehouse - defective items are found in the warehouse - a customer returns an item, but it cannot be returned to sale - auto-return of items sold under the Marketplace model is enabled
      - `deliveryDumpSupCourierLiter` `string` — \*\*Return by courier, per each next liter, ₽\*\* Cost per each additional liter.
      - `deliveryDumpSupOfficeBase` `string` — **Common return in pick-up point, per one liter, ₽** Applies when: - the seller wants to remove items from the Wildberries warehouse - defective items are found in the warehouse - a customer returns an item, but it cannot be returned to sale - auto-return of items sold under the Marketplace model is enabled
      - `deliveryDumpSupOfficeLiter` `string` — \*\*Common return in pick-up point, per each next liter, ₽\*\* Cost per each additional liter.
      - `deliveryDumpSupReturnExpr` `string` — \*\*Return cost, reverse logistics for unclaimed return, per one item, ₽\*\* Delivery of unclaimed return back to the Wildberries warehouse. Applies when: - the seller wants to remove items from the Wildberries warehouse - defective items are found in the warehouse - a customer returns an item, but it cannot be returned to sale - auto-return of items sold under the Marketplace model is enabled
      - `warehouseName` `string` — Warehouse

**Structure `400`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

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
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<your WB JWT>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_tariffs_return(var_date=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  RatesApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new RatesApi(cfg);

const { data } = await api.getV1TariffsReturn(date);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbrates "github.com/ValeryVerkhoturov/wb-api-client-go/rates"
)

cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.RatesAPI.GetV1TariffsReturn(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.rates.ApiClient;
import io.github.valeryverkhoturov.wbapi.rates.SecretString;
import io.github.valeryverkhoturov.wbapi.rates.api.RatesApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1TariffsReturn(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsReturn($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsReturn(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsReturn(date));
```

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = rates_api::get_v1_tariffs_return(&cfg, date).await;
    println!("{:#?}", result);
}
```

:::
