---
title: "Details for the Acquiring Expenses Reports by Period"
description: "Method is available by Personal token, Service token"
---

# Details for the Acquiring Expenses Reports by Period

```http
POST /api/finance/v1/acquiring/detailed
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Financial Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns details for the [acquiring expenses reports](https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/acquiring-reports) by specified period.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst     |
| ------ | --------- | -------- | --------- |
| 1 min  | 1 request | 1 min    | 1 request |

## Request body

`application/json` — schema `AcquiringReportsDetailedReq`, required

## Responses

| Code  | Description       | Schema                               |
| ----- | ----------------- | ------------------------------------ |
| `200` | Success           | `PostV1AcquiringDetailedResponse200` |
| `204` | No data           | —                                    |
| `400` | Bad request       | `object`                             |
| `401` | Unauthorized      | `object`                             |
| `402` | Payment required  | `object`                             |
| `403` | Access denied     | `Response4XX`                        |
| `429` | Too many requests | `object`                             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_acquiring_detailed(acquiring_reports_detailed_req=...)
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

const { data } = await api.postV1AcquiringDetailed(acquiringReportsDetailedReq);
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

result, _, err := client.FinancesAPI.PostV1AcquiringDetailed(context.Background()).AcquiringReportsDetailedReq(acquiringReportsDetailedReq).Execute()
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

System.out.println(api.postV1AcquiringDetailed(acquiringReportsDetailedReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1AcquiringDetailed($acquiring_reports_detailed_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1AcquiringDetailed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1AcquiringDetailed(acquiringReportsDetailedReq));
```

:::
