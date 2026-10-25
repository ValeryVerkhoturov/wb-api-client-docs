---
title: "Get the Report"
description: "Returns the report by task ID"
---

# Get the Report

```http
GET /api/v1/paid_storage/tasks/{task_id}/download
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Paid Storage · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/paidStorage/operation/getV1PaidStorageTasksTaskIdDownload)

Returns the report by task ID

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 min  | 1 request  | 1 min    | 1 request |
| Service          | 1 min  | 1 request  | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request  | 1 min    | 1 request |
| Base             | 1 h    | 2 requests | 30 min   | 1 request |

## Parameters

| Name      | In   | Type     | Req. | Description |
| --------- | ---- | -------- | ---- | ----------- |
| `task_id` | path | `string` | yes  | Task ID     |

## Responses

| Code  | Description       | Schema                                           |
| ----- | ----------------- | ------------------------------------------------ |
| `200` | Success           | `GetV1PaidStorageTasksTaskIdDownloadResponse200` |
| `204` | No data           | —                                                |
| `400` | Bad request       | `Http4XXResponse`                                |
| `401` | Unauthorized      | `object`                                         |
| `402` | Payment required  | `object`                                         |
| `403` | Access denied     | `object`                                         |
| `404` | Not found         | `Http4XXResponse`                                |
| `429` | Too many requests | `object`                                         |

**Structure `200` — `object[]`:**

- `date` `string` — Calculation or recalculation date
- `logWarehouseCoef` `number` — Logistics and storage coefficient. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `0`
- `officeId` `integer<int64>` — Warehouse ID. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `0`
- `warehouse` `string` — Warehouse name. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `Склад WB РФ`
- `warehouseCoef` `number` — Storage coefficient
- `giId` `integer<int64>` — Shipment ID
- `chrtId` `integer<int64>` — Size ID
- `size` `string` — Size (`techSize` in listing)
- `barcode` `string` — SKU
- `subject` `string` — Subcategory
- `brand` `string` — Brand
- `vendorCode` `string` — Seller item number
- `nmId` `integer<int64>` — WB item number
- `volume` `number` — Item volume
- `calcType` `string` — Calculation type
- `warehousePrice` `number` — Storage price
- `barcodesCount` `integer<int64>` — Chargeable item units in the warehouse, in the last 24 hours
- `palletPlaceCode` `integer<int64>` — Pallet place code. [At the moment](https://dev.wildberries.ru/en/release-notes?id=570), there can only be `0`
- `palletCount` `number` — Number of pallets
- `originalDate` `string` — Calculation date, in case of recalculation. If there was not a recalculation, the same as `date`
- `loyaltyDiscount` `number` — Loyalty program discount, ₽
- `tariffFixDate` `string` — Tariff fixing date
- `tariffLowerDate` `string` — Tariff reduction date

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

**Structure `404`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `requestId` `string` — Unique request ID
- `title` `string` — Error title

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

result = api.get_v1_paid_storage_tasks_task_id_download(task_id=...)
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

const { data } = await api.getV1PaidStorageTasksTaskIdDownload(taskId);
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

result, _, err := client.ReportsAPI.GetV1PaidStorageTasksTaskIdDownload(context.Background(), taskId).Execute()
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

System.out.println(api.getV1PaidStorageTasksTaskIdDownload(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1PaidStorageTasksTaskIdDownload($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1PaidStorageTasksTaskIdDownload(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1PaidStorageTasksTaskIdDownload(taskId));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_paid_storage_tasks_task_id_download(&cfg, task_id).await;
    println!("{:#?}", result);
}
```

:::
