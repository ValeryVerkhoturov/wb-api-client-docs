---
title: "WB Warehouses Inventory"
description: "Method is available by Personal token, Service token, Base token with secret"
---

# WB Warehouses Inventory

```http
POST /api/analytics/v1/stocks-report/wb-warehouses
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Stocks Report · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/stocksReport/operation/postV1StocksReportWbWarehouses)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token,
**Base** token **with secret**

The method returns current WB warehouses inventory.

The data is updated once every 30 minutes.

1 response row means data on 1 item size in 1 WB warehouse.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit      | Interval | Burst     |
| ------ | ---------- | -------- | --------- |
| 1 min  | 3 requests | 20 s     | 1 request |

## Request body

`application/json` — schema `InventoryRequest`, required

## Responses

| Code  | Description       | Schema                                      |
| ----- | ----------------- | ------------------------------------------- |
| `200` | Success           | `PostV1StocksReportWbWarehousesResponse200` |
| `204` | No data           | —                                           |
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

result = api.post_v1_stocks_report_wb_warehouses(inventory_request=...)
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

const { data } = await api.postV1StocksReportWbWarehouses(inventoryRequest);
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

result, _, err := client.AnalyticsAPI.PostV1StocksReportWbWarehouses(context.Background()).InventoryRequest(inventoryRequest).Execute()
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

System.out.println(api.postV1StocksReportWbWarehouses(inventoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV1StocksReportWbWarehouses($inventory_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV1StocksReportWbWarehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV1StocksReportWbWarehouses(inventoryRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v1_stocks_report_wb_warehouses(&cfg, inventory_request).await;
    println!("{:#?}", result);
}
```

:::
