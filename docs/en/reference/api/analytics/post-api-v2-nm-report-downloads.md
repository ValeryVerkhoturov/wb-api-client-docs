---
title: "Create the Report"
description: "The method creates a task for generating a report with advanced seller analytics."
---

# Create the Report

```http
POST /api/v2/nm-report/downloads
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Seller Analytics CSV · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads)

The method creates a task for generating a report with advanced seller analytics.

You can create a CSV-version of [sales funnel](https://dev.wildberries.ru/openapi/analytics#tag/salesFunnel) or [search parameters](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems) report with grouping:
\* by WB item numbers
\* by categories, brands, and labels
In each of reports on sales funnel, you can group data by days, weeks, or months.

Also you can create a CSV-version of [search texts](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts) or [inventory](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport) report.

Each new report must have a unique ID.

Do not use the same ID for different reports — this may cause errors during generation

The set of parameters in the `params` object depends on the report type. To get a description of the parameters, select the report type from the dropdown list in the description of the `reportType` parameter.

The parameters `includeSubstitutedSKUs` and `includeSearchTexts` cannot both be set to `false`

If it was not possible to [get report](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId), you can create a [repeat generation task](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloadsRetry). You can also [get a list and check the statuses](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloads) of reports.

The report data is updated once every 2 hours.

[Inventory reports](https://seller.wildberries.ru/content-analytics/history-remains) — the `STOCK_HISTORY_REPORT_CSV` and `STOCK_HISTORY_DAILY_CSV` types — can be created without [Jam](https://seller.wildberries.ru/monetization/jam) subscription

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description       | Schema                               |
| ----- | ----------------- | ------------------------------------ |
| `200` | Success           | `NmReportCreateReportResponse`       |
| `400` | Bad request       | `PostV2NmReportDownloadsResponse400` |
| `401` | Unauthorized      | `object`                             |
| `402` | Payment required  | `object`                             |
| `403` | Access denied     | `ErrorObject`                        |
| `429` | Too many requests | `object`                             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v2_nm_report_downloads(post_v2_nm_report_downloads_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV2NmReportDownloads(postV2NmReportDownloadsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV2NmReportDownloads(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV2NmReportDownloads(postV2NmReportDownloadsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2NmReportDownloads());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2NmReportDownloads(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2NmReportDownloads());
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_nm_report_downloads(&cfg, post_v2_nm_report_downloads_request).await;
    println!("{:#?}", result);
}
```

:::
