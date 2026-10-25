---
title: "Logistics and Storage Costs Multiplier"
description: "The method returns a report with logistics and storage costs multiplier"
---

# Logistics and Storage Costs Multiplier

```http
GET /api/analytics/v1/measurement-penalties
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Retention Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/retentionReports/operation/getV1MeasurementPenalties)

The method returns a report with [logistics and storage costs multiplier](https://seller.wildberries.ru/analytics-reports/dimensions-penalties)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst     |
| ---------------- | ------ | --------- | -------- | --------- |
| Personal         | 1 min  | 1 request | 1 min    | 1 request |
| Service          | 1 min  | 1 request | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request | 1 min    | 1 request |
| Base             | 6 h    | 1 request | 6 h      | 1 request |

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                         |
| ---------- | ----- | ---------------- | ---- | --------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string`         | no   | Report period start. By default the date when data for the report was first received is used        |
| `dateTo`   | query | `string`         | yes  | Report period end                                                                                   |
| `limit`    | query | `integer<int64>` | yes  | Number of retentions in the response                                                                |
| `offset`   | query | `integer<int64>` | no   | How many results to skip. For example, with value `10`, the response will start with the 11 element |

## Responses

| Code  | Description       | Schema                  |
| ----- | ----------------- | ----------------------- |
| `200` | Success           | `MeasurementPenalties`  |
| `400` | Bad request       | `Response400Retentions` |
| `401` | Unauthorized      | `object`                |
| `402` | Payment required  | `object`                |
| `403` | Access denied     | `Response403Retentions` |
| `429` | Too many requests | `object`                |

**Structure `200`:**

- `data` `object` — Response data
  - `reports` `object[]` — Retentions
    - `nmId` `integer<int64>` — WB item number
    - `subjectName` `string` — Subcategory
    - `dimId` `integer<int64>` — Measurement ID
    - `prcOver` `number` — Difference in dimensions, %
    - `volume` `number` — Volume, l (as measured at warehouse)
    - `width` `integer<int64>` — Width, cm (as measured at warehouse)
    - `length` `integer<int64>` — Length, cm (as measured at warehouse)
    - `height` `integer<int64>` — Height, cm (as measured at warehouse)
    - `volumeSup` `number` — Volume, L (as specified in listing)
    - `widthSup` `integer<int64>` — Width, cm (as specified in listing)
    - `lengthSup` `integer<int64>` — Length, cm (as specified in listing)
    - `heightSup` `integer<int64>` — Height, cm (as specified in listing)
    - `photoUrls` `string[]` — Photos of the measurements
    - `dtBonus` `string` — Fine date
    - `isValid` `boolean` — Status of measurement - `false` — canceled - `true` — valid
    - `isValidDt` `string` — Date and time of validation or cancellation of the measurement
    - `reversalAmount` `number` — Reversal amount
    - `penaltyAmount` `number` — Fine amount
    - `dateStart` `string` — Warehouse multipier start date and time
    - `dateEnd` `string` — Warehouse multipier end date and time
  - `total` `integer<int64>` — Number of retentions in the report. Except `limit` and `offset`

**Structure `400`:**

- `title` `string` — Error title
- `status` `integer<int64>` — HTTP status code
- `detail` `string` — Error details
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID

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
- `status` `integer<int64>` — HTTP status code
- `detail` `string` — Error details
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID

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

result = api.get_v1_measurement_penalties(date_to=..., limit=..., date_from=..., offset=...)
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

const { data } = await api.getV1MeasurementPenalties(dateTo, limit, dateFrom, offset);
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

result, _, err := client.ReportsAPI.GetV1MeasurementPenalties(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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

System.out.println(api.getV1MeasurementPenalties(dateTo, limit, dateFrom, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1MeasurementPenalties($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1MeasurementPenalties(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1MeasurementPenalties(dateTo, limit));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_measurement_penalties(&cfg, date_to, limit, date_from, offset).await;
    println!("{:#?}", result);
}
```

:::
