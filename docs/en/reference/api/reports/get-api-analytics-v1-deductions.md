---
title: "Substitutions and Incorrect Attachments"
description: "The method returns a report with substitutions and incorrect attachments retentions"
---

# Substitutions and Incorrect Attachments

```http
GET /api/analytics/v1/deductions
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Retention Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/retentionReports/operation/getV1Deductions)

The method returns a report with [substitutions and incorrect attachments](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/retentions) retentions

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 min  | 1 request  | 1 min    | 1 request |
| Service          | 1 min  | 1 request  | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request  | 1 min    | 1 request |
| Base             | 1 h    | 4 requests | 15 min   | 1 request |

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                              |
| ---------- | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string`         | no   | Report period start. By default the date and time when data for the report was first received is used    |
| `dateTo`   | query | `string`         | yes  | Report period end                                                                                        |
| `sort`     | query | `string`         | no   | Sorting: - `nmId` — by WB item number - `dtBonus` — by fine date and time - `bonusSumm` — by fine amount |
| `order`    | query | `string`         | no   | Data order: - `desc` — descending - `asc` — ascending                                                    |
| `limit`    | query | `integer<int64>` | yes  | Number of retentions in the response                                                                     |
| `offset`   | query | `integer<int64>` | no   | How many results to skip. For example, with value `10`, the response will start with the 11 element      |

## Responses

| Code  | Description       | Schema                  |
| ----- | ----------------- | ----------------------- |
| `200` | Успешно           | `object`                |
| `400` | Bad request       | `Response400Retentions` |
| `401` | Unauthorized      | `object`                |
| `402` | Payment required  | `object`                |
| `403` | Access denied     | `Response403Retentions` |
| `429` | Too many requests | `object`                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_deductions(date_to=..., limit=..., date_from=..., sort=..., order=..., offset=...)
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

const { data } = await api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset);
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

result, _, err := client.ReportsAPI.GetV1Deductions(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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

System.out.println(api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1Deductions($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1Deductions(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1Deductions(dateTo, limit));
```

:::
