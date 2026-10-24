---
title: "Listings Statistics per Period"
description: "The method generates a report on items by comparing key metrics for the current period with a similar past one."
---

# Listings Statistics per Period

```http
POST /api/analytics/v3/sales-funnel/products
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Sales Funnel · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelProducts)

The method generates a report on items by comparing key metrics for the current period with a similar past one.

The report data is updated once every 2 hours.

Most of the data appears within an hour of the event:

- orders
- click-throughs
- adds-to-Cart
  A small part of this data may appear within a few days.

Purchases, cancellations, and returns are displayed in report for the day an item was ordered. For example, if an order was placed on January 1, and the customer returned the item on January 10, data about this return will appear in the report for January 1.
You can track the final sales results using [details for the realization reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

The `brandNames`, `subjectIds`, `tagIds`, and `nmIds` parameters can be empty `[]`, in which case the response will return all of the seller listings.

If you specify multiple parameters, the response will include listings that match all of these parameters simultaneously. If no listings match the request parameters, an empty response `[]` will be returned.

You can get a report for a maximum of the last 365 days.

In the previous period's data:
\* The data in `pastPeriod` covers the same duration as in `selectedPeriod`
\* If the `pastPeriod` start date is more than a year before the current date, it will be adjusted to: `pastPeriod.start = current date - 365 days`
Pagination can be used.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 3 requests | 20 s     | 3 requests |
| Service          | 1 min  | 3 requests | 20 s     | 3 requests |
| Base with secret | 1 min  | 3 requests | 20 s     | 3 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Request body

`application/json` — schema `ItemsRequest`, required

## Responses

| Code  | Description       | Schema                                 |
| ----- | ----------------- | -------------------------------------- |
| `200` | Success           | `PostV3SalesFunnelProductsResponse200` |
| `400` | Bad request       | `ErrorObject`                          |
| `401` | Unauthorized      | `object`                               |
| `402` | Payment required  | `object`                               |
| `403` | Access denied     | `ErrorObject`                          |
| `429` | Too many requests | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v3_sales_funnel_products(items_request=...)
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

const { data } = await api.postV3SalesFunnelProducts(itemsRequest);
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

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelProducts(context.Background()).ItemsRequest(itemsRequest).Execute()
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

System.out.println(api.postV3SalesFunnelProducts(itemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelProducts($items_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelProducts(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelProducts(itemsRequest));
```

```rust [Rust]
use wb_api_client::analytics::apis::{configuration::Configuration, analytics_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = analytics_api::post_v3_sales_funnel_products(&cfg, items_request).await;
    println!("{:#?}", result);
}
```

:::
