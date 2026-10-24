---
title: "Item Labeling"
description: "Returns a report on deductions for the absence of mandatory item labeling."
---

# Item Labeling

```http
GET /api/v1/analytics/goods-labeling
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Retention Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/retentionReports/operation/getV1AnalyticsGoodsLabeling)

Returns a report on deductions for the absence of mandatory item labeling.

The report contains photos of items where the labeling is absent or cannot be read.

Data can be obtained for up to 31 days, starting from March 2024

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst       |
| ---------------- | ------ | --------- | -------- | ----------- |
| Personal         | 1 min  | 1 request | 1 min    | 10 requests |
| Service          | 1 min  | 1 request | 1 min    | 10 requests |
| Base with secret | 1 min  | 1 request | 1 min    | 10 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request   |

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

result = api.get_v1_analytics_goods_labeling(date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsGoodsLabeling(dateFrom, dateTo);
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

result, _, err := client.ReportsAPI.GetV1AnalyticsGoodsLabeling(context.Background()).Execute()
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

System.out.println(api.getV1AnalyticsGoodsLabeling(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsGoodsLabeling($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsGoodsLabeling(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsGoodsLabeling(dateFrom, dateTo));
```

:::
