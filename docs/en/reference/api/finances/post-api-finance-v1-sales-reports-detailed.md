---
title: "Details for the Sales Reports by Period"
description: "The method returns details for the sales reports by specified period."
---

# Details for the Sales Reports by Period

```http
POST /api/finance/v1/sales-reports/detailed
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Financial Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)

The method returns details for the [sales reports](https://seller.wildberries.ru/suppliers-mutual-settlements) by specified period.

The data is available since January 29, 2024.

You can save the report in [Google Sheets](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-650c-7b04-9596-ba441936f9d3)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 min  | 1 request  | 1 min    | 1 request |
| Service          | 1 min  | 1 request  | 1 min    | 1 request |
| Base with secret | 1 min  | 1 request  | 1 min    | 1 request |
| Base             | 24 h   | 2 requests | 12 h     | 1 request |

## Request body

`application/json` — schema `SalesReportsDetailedReq`, required

## Responses

| Code  | Description       | Schema                                  |
| ----- | ----------------- | --------------------------------------- |
| `200` | Success           | `PostV1SalesReportsDetailedResponse200` |
| `204` | No data           | —                                       |
| `400` | Bad request       | `object`                                |
| `401` | Unauthorized      | `object`                                |
| `402` | Payment required  | `object`                                |
| `403` | Access denied     | `object`                                |
| `429` | Too many requests | `object`                                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_detailed(sales_reports_detailed_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FinancesApi(cfg);

const { data } = await api.postV1SalesReportsDetailed(salesReportsDetailedReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.PostV1SalesReportsDetailed(context.Background()).SalesReportsDetailedReq(salesReportsDetailedReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.postV1SalesReportsDetailed(salesReportsDetailedReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsDetailed($sales_reports_detailed_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsDetailed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsDetailed(salesReportsDetailedReq));
```

:::
