---
title: "Get Report"
description: "Returns a list of item returns to the seller."
---

# Get Report

```http
GET /api/analytics/v1/item-returns
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Returns and Item Movement Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1GoodsReturn)

Returns a list of [item returns to the seller](https://seller.wildberries.ru/return-transfer-reports).

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst       |
| ---------------- | ------ | ---------- | -------- | ----------- |
| Personal         | 1 min  | 1 request  | 1 min    | 10 requests |
| Service          | 1 min  | 1 request  | 1 min    | 10 requests |
| Base with secret | 1 min  | 1 request  | 1 min    | 10 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request   |

## Parameters

| Name       | In    | Type            | Req. | Description                                                                                          |
| ---------- | ----- | --------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string`        | yes  | Beginning date of the reporting period                                                               |
| `dateTo`   | query | `string`        | yes  | End date of the reporting period                                                                     |
| `status`   | query | `string`        | no   | Return status: - `archive` — archive - `active` — active                                             |
| `limit`    | query | `integer<date>` | no   | Number of returns in the response                                                                    |
| `offset`   | query | `integer<date>` | no   | How many results to skip. For example, for the value 10, the response will start with the 11 element |

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Success           | `GoodsReturn200Response` |
| `204` | No data           | —                        |
| `400` | Bad request       | `Http4XXResponse`        |
| `401` | Unauthorized      | `object`                 |
| `429` | Too many requests | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_goods_return(date_from=..., date_to=..., status=..., limit=..., offset=...)
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

const { data } = await api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset);
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

result, _, err := client.ReportsAPI.GetV1GoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1GoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1GoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1GoodsReturn(dateFrom, dateTo));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_goods_return(&cfg, date_from, date_to, status, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
