---
title: "Get the Report"
description: "The method provides a report with advanced seller analytics by generation task ID."
---

# Get the Report

```http
GET /api/v2/nm-report/downloads/file/{downloadId}
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Seller Analytics CSV · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId)

The method provides a report with advanced seller analytics by [generation task](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads) ID.

You can get a report that was generated within the last 48 hours.
The report will be downloaded inside a ZIP archive in CSV format.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Parameters

| Name         | In   | Type           | Req. | Description |
| ------------ | ---- | -------------- | ---- | ----------- |
| `downloadId` | path | `string<uuid>` | yes  | Report ID   |

## Responses

| Code  | Description       | Schema                                            |
| ----- | ----------------- | ------------------------------------------------- |
| `200` | Success           | `string`                                          |
| `400` | Bad request       | `GetV2NmReportDownloadsFileDownloadIdResponse400` |
| `401` | Unauthorized      | `object`                                          |
| `402` | Payment required  | `object`                                          |
| `403` | Access denied     | `ErrorObject`                                     |
| `429` | Too many requests | `object`                                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.get_v2_nm_report_downloads_file_download_id(download_id=...)
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

const { data } = await api.getV2NmReportDownloadsFileDownloadId(downloadId);
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

result, _, err := client.AnalyticsAPI.GetV2NmReportDownloadsFileDownloadId(context.Background(), downloadId).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.getV2NmReportDownloadsFileDownloadId(downloadId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->getV2NmReportDownloadsFileDownloadId($download_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.GetV2NmReportDownloadsFileDownloadId(downloadId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.GetV2NmReportDownloadsFileDownloadId(downloadId));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::get_v2_nm_report_downloads_file_download_id(&cfg, download_id).await;
    println!("{:#?}", result);
}
```

:::
