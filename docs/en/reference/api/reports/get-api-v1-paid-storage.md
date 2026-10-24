---
title: "Generate the Report"
description: "Create a task to generate a report. Maximum of report period — 8 days"
---

# Generate the Report

```http
GET /api/v1/paid_storage
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Paid Storage · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/paidStorage/operation/getV1PaidStorage)

Create a task to generate a report. Maximum of report period — 8 days

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 1 min  | 1 request | 1 min    | 5 requests |
| Service          | 1 min  | 1 request | 1 min    | 5 requests |
| Base with secret | 1 min  | 1 request | 1 min    | 5 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request  |

## Parameters

| Name       | In    | Type     | Req. | Description                                                                                                                                                                  |
| ---------- | ----- | -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string` | yes  | Start of the report period, RFC3339 format. Date or date and time, for example: * `2019-06-20` * `2019-06-20T23:59:59` * `2019-06-20T00:00:00.12345` * `2017-03-25T00:00:00` |
| `dateTo`   | query | `string` | yes  | End of the report period, RFC3339 format. Date or date and time, for example: * `2019-06-20` * `2019-06-20T23:59:59` * `2019-06-20T00:00:00.12345` * `2017-03-25T00:00:00`   |

## Responses

| Code  | Description       | Schema               |
| ----- | ----------------- | -------------------- |
| `200` | Success           | `CreateTaskResponse` |
| `400` | Bad request       | `Http4XXResponse`    |
| `401` | Unauthorized      | `object`             |
| `402` | Payment required  | `object`             |
| `403` | Access denied     | `object`             |
| `429` | Too many requests | `object`             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_paid_storage(date_from=..., date_to=...)
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

const { data } = await api.getV1PaidStorage(dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1PaidStorage(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1PaidStorage(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1PaidStorage($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1PaidStorage(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1PaidStorage(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_paid_storage(&cfg, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
