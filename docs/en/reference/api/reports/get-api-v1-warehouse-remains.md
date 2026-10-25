---
title: "Create the Report"
description: "Creates a task for report generation. The parameters groupBy and filter can be set in any combination — similar to the version in the personal account."
---

# Create the Report

```http
GET /api/v1/warehouse_remains
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Warehouses Inventory Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemains)

Creates a task for report generation. The parameters `groupBy` and `filter` can be set in any combination — similar to the [version](https://seller.wildberries.ru/analytics-reports/warehouse-remains) in the personal account.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 1 request  | 1 min    | 5 requests |
| Service          | 1 min  | 1 request  | 1 min    | 5 requests |
| Base with secret | 1 min  | 1 request  | 1 min    | 5 requests |
| Base             | 1 h    | 4 requests | 15 min   | 1 request  |

## Parameters

| Name             | In    | Type             | Req. | Description                                                                                                                                                         |
| ---------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`         | query | `string`         | no   | Language of the `subjectName` and `warehouseName` response fields: - `ru` — Russian - `en` — English - `zh` — Chinese. Values of the `warehouseName` are in English |
| `groupByBrand`   | query | `boolean`        | no   | Group by brand                                                                                                                                                      |
| `groupBySubject` | query | `boolean`        | no   | Group by subcategory                                                                                                                                                |
| `groupBySa`      | query | `boolean`        | no   | Group by seller item number                                                                                                                                         |
| `groupByNm`      | query | `boolean`        | no   | Group by WB item number. If `groupByNm=true`, there will be `volume` field in the response                                                                          |
| `groupByBarcode` | query | `boolean`        | no   | Group by SKUs                                                                                                                                                       |
| `groupBySize`    | query | `boolean`        | no   | Group by size                                                                                                                                                       |
| `filterPics`     | query | `integer<int64>` | no   | Photo filter: - `-1` — without photo - `0` — do not apply filter - `1` — with photo                                                                                 |
| `filterVolume`   | query | `integer<int64>` | no   | Volume filter: - `-1` — without dimensions - `0` — do not apply filter - `3` — over three liters                                                                    |

## Responses

| Code  | Description       | Schema               |
| ----- | ----------------- | -------------------- |
| `200` | Success           | `CreateTaskResponse` |
| `400` | Bad request       | `Http4XXResponse`    |
| `401` | Unauthorized      | `object`             |
| `402` | Payment required  | `object`             |
| `403` | Access denied     | `object`             |
| `429` | Too many requests | `object`             |

**Structure `200`:**

- `data` `CreateTaskResponseData`
  - `taskId` `string` — Task ID

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
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_warehouse_remains(locale=..., group_by_brand=..., group_by_subject=..., group_by_sa=..., group_by_nm=..., group_by_barcode=..., group_by_size=..., filter_pics=..., filter_volume=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1WarehouseRemains(locale, groupByBrand, groupBySubject, groupBySa, groupByNm, groupByBarcode, groupBySize, filterPics, filterVolume);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1WarehouseRemains(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.ReportsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1WarehouseRemains(locale, groupByBrand, groupBySubject, groupBySa, groupByNm, groupByBarcode, groupBySize, filterPics, filterVolume));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1WarehouseRemains());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1WarehouseRemains().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1WarehouseRemains());
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_warehouse_remains(&cfg, locale, group_by_brand, group_by_subject, group_by_sa, group_by_nm, group_by_barcode, group_by_size, filter_pics, filter_volume).await;
    println!("{:#?}", result);
}
```

:::
