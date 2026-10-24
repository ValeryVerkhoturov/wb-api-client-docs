---
title: "Orders"
description: "The method returns order information. The data updated every 30 minutes."
---

# Orders

```http
GET /api/v1/supplier/orders
```

**Base URL:** `https://statistics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Main Reports · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/mainReports/operation/getV1SupplierOrders)

The method returns order information.
The data updated every 30 minutes.

1 line means 1 order and means 1 item.
The `srid` field should be used to identify the order.

Data storage is guaranteed for no more than 90 days from the date of order.

The responses do not include orders for which payment was not confirmed. For example, it could be orders with delayed payments or installment payments. However, if there are sales for such orders, you can get it using [details for the sales reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).
To receive all completed orders, use [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed).

The data in this report is preliminary and is used for operational monitoring

For a single response to a request with `flag=0` or without `flag`, a conditional limit of 80,000 rows is set. Therefore, more than one request may be necessary to retrieve all orders. In the second and subsequent requests, use the full value of the `lastChangeDate` field of the last row from the response of the previous request in the `dateFrom` parameter.
If the response returns an empty array `[]`, all orders have already been retrieved.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst       |
| ---------------- | ------ | --------- | -------- | ----------- |
| Personal         | 1 min  | 1 request | 1 min    | 10 requests |
| Service          | 1 min  | 1 request | 1 min    | 10 requests |
| Base with secret | 1 min  | 1 request | 1 min    | 10 requests |
| Base             | 3 h    | 1 request | 3 h      | 1 request   |

## Parameters

| Name       | In    | Type     | Req. | Description                                                                                                                                                                                                                                                                                                   |
| ---------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string` | yes  | Date and time of last change on the order. Date format: RFC3339. You may send date or date with time. Time could be specified in seconds or milliseconds. The time stands in Moscow time zone (UTC+3). Examples: - `2019-06-20` - `2019-06-20T23:59:59` - `2019-06-20T00:00:00.12345` - `2017-03-25T00:00:00` |

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `GetV1SupplierOrdersResponse200` |
| `400` | Bad request       | `object`                         |
| `401` | Unauthorized      | `object`                         |
| `402` | Payment required  | `object`                         |
| `403` | Access denied     | `object`                         |
| `429` | Too many requests | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_supplier_orders(date_from=..., flag=...)
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

const { data } = await api.getV1SupplierOrders(dateFrom, flag);
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

result, _, err := client.ReportsAPI.GetV1SupplierOrders(context.Background()).DateFrom(dateFrom).Execute()
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

System.out.println(api.getV1SupplierOrders(dateFrom, flag));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1SupplierOrders($date_from));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1SupplierOrders(dateFrom).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1SupplierOrders(dateFrom));
```

```rust [Rust]
use wb_api_client::reports::apis::{configuration::Configuration, reports_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = reports_api::get_v1_supplier_orders(&cfg, date_from, flag).await;
    println!("{:#?}", result);
}
```

:::
