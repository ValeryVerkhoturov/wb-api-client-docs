---
title: "Pagination by Items Within a Group"
description: "Pagination by items within a group. It is possible regardless of the presence of filters. Filters for pagination by items within a group or without filters: -…"
---

# Pagination by Items Within a Group

```http
POST /api/v2/search-report/table/details
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Search Queries for Your Items · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableDetails)

Pagination by items within a group. It is possible regardless of the presence of filters.
Filters for pagination by items within a group or without filters:

- tuple `subjectId`, `brandName`, `tagId` — filter for the group
- `nmIds` — filter by listings
  Additional parameters for selecting the list of items in the table:
- `positionCluster` — average position in search
  The parameters `includeSubstitutedSKUs` and `includeSearchTexts` cannot both be set to `false`.

The report data is updated once every 2 hours.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Request body

`application/json` — schema `TableDetailsRequest`, required

## Responses

| Code  | Description       | Schema                                      |
| ----- | ----------------- | ------------------------------------------- |
| `200` | Success           | `PostV2SearchReportTableDetailsResponse200` |
| `400` | Bad request       | `ErrorObject400`                            |
| `401` | Unauthorized      | `object`                                    |
| `402` | Payment required  | `object`                                    |
| `403` | Access denied     | `ErrorObject403`                            |
| `429` | Too many requests | `object`                                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v2_search_report_table_details(table_details_request=...)
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

const { data } = await api.postV2SearchReportTableDetails(tableDetailsRequest);
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

result, _, err := client.AnalyticsAPI.PostV2SearchReportTableDetails(context.Background()).TableDetailsRequest(tableDetailsRequest).Execute()
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

System.out.println(api.postV2SearchReportTableDetails(tableDetailsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportTableDetails($table_details_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportTableDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportTableDetails(tableDetailsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v2_search_report_table_details(&cfg, table_details_request).await;
    println!("{:#?}", result);
}
```

:::
