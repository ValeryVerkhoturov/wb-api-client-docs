---
title: "Flat Campaign Statistics"
description: "The method generates campaign statistics in a flat format with detailing by placement zones and conversion types."
---

# Flat Campaign Statistics

```http
GET /api/advert/v4/fullstats
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Statistics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/getV4Fullstats)

The method generates campaign statistics in a flat format with detailing by placement zones and conversion types.

The maximum period in a request is 31 days.

For campaigns in statuses `7`, `9` and `11`.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 min  | 3 requests | 20 s     | 1 request |
| Service          | 1 min  | 3 requests | 20 s     | 1 request |
| Base with secret | 1 min  | 3 requests | 20 s     | 1 request |
| Base             | 1 h    | 1 request  | 1 h      | 1 request |

## Parameters

| Name        | In    | Type               | Req. | Description                      |
| ----------- | ----- | ------------------ | ---- | -------------------------------- |
| `advertIds` | query | `integer<int64>[]` | yes  | List of advertising campaign IDs |
| `beginDate` | query | `string`           | yes  | Start date for the interval      |
| `endDate`   | query | `string`           | yes  | End date for the interval        |

## Responses

| Code  | Description         | Schema                   |
| ----- | ------------------- | ------------------------ |
| `200` | Success             | `V4FullStatsResponse`    |
| `400` | Неправильный запрос | `StandardizedBatchError` |
| `401` | Unauthorized        | `object`                 |
| `403` | Access denied       | `object`                 |
| `429` | Too many requests   | `object`                 |

**Structure `200`:**

- `rows` `V4FullStatsRow[]`
  - `advertId` `integer<int64>` — Advertising campaign ID
  - `nmId` `integer<int64>` — WB item number
  - `date` `string` — Date the information is provided for
  - `placement` `V4FullStatsPlacement`
  - `conversionType` `V4FullStatsConversionType`
  - `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances)
  - `views` `integer<int64>` — Views. For the `"conversionType":"multicard"` and `"conversionType":"associated"`, `0` is returned if the view was on another item
  - `clicks` `integer<int64>` — Number of clicks. Only for `"conversionType":"direct"`
  - `ctr` `number<double>` — Click-through rate — the ratio of clicks to displays, %
  - `cpc` `number<double>` — Cost per click in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `sum` `number<double>` — Costs in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency. Only for `"conversionType":"direct"`
  - `atbs` `integer<int64>` — Number of item added to the cart
  - `orders` `integer<int64>` — Number of orders
  - `cr` `number<double>` — The ratio of the number of orders to the total number of clicks
  - `shks` `integer<int64>` — Number of ordered items, pcs
  - `sumPrice` `number<double>` — Orders amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `canceled` `integer<int64>` — Count of cancellations
  - `avgPos` `number<double>` — Average position in search. Returned only for `"placement":search` and `"conversionType":"direct"` combination

**Structure `400`:**

- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `request_id` `string` — Unique request ID
- `status` `integer<int64>` — HTTP Status Code
- `title` `string` — Error title

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `429`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v4_fullstats(advert_ids=..., begin_date=..., end_date=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new PromotionApi(cfg);

const { data } = await api.getV4Fullstats(advertIds, beginDate, endDate);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/v4/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV4Fullstats(context.Background()).AdvertIds(advertIds).BeginDate(beginDate).EndDate(endDate).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.getV4Fullstats(advertIds, beginDate, endDate));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV4Fullstats($advert_ids, $begin_date, $end_date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV4Fullstats(advertIds, beginDate, endDate).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV4Fullstats(advertIds, beginDate, endDate));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v4_fullstats(&cfg, advert_ids, begin_date, end_date).await;
    println!("{:#?}", result);
}
```

:::
