---
title: "Get Report"
description: "The deprecated method will be disabled on November 3."
---

# Get Report

```http
GET /api/v1/analytics/region-sale
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Sales by Regions · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale)

The deprecated method will be disabled on [November 3](https://dev.wildberries.ru/en/release-notes?id=590).

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 10 s   | 1 request | 10 s     | 5 requests |
| Service          | 10 s   | 1 request | 10 s     | 5 requests |
| Base with secret | 10 s   | 1 request | 10 s     | 5 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema            |
| ----- | ----------------- | ----------------- |
| `200` | Success           | `object`          |
| `400` | Bad request       | `Http4XXResponse` |
| `401` | Unauthorized      | `object`          |
| `402` | Payment required  | `object`          |
| `403` | Access denied     | `object`          |
| `429` | Too many requests | `object`          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_analytics_region_sale(date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsRegionSale(dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1AnalyticsRegionSale(context.Background()).Execute()
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

System.out.println(api.getV1AnalyticsRegionSale(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsRegionSale($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsRegionSale(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsRegionSale(dateFrom, dateTo));
```

:::
