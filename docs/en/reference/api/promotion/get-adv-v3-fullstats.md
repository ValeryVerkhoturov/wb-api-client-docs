---
title: "Campaigns Statistics"
description: "The method generates statistics for campaigns, regardless of their type."
---

# Campaigns Statistics

```http
GET /adv/v3/fullstats
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Statistics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/getV3Fullstats)

The method generates statistics for campaigns, regardless of their type.

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

| Name        | In    | Type     | Req. | Description                     |
| ----------- | ----- | -------- | ---- | ------------------------------- |
| `ids`       | query | `string` | yes  | Campaign IDs, maximum 50 values |
| `beginDate` | query | `string` | yes  | Start date for the interval     |
| `endDate`   | query | `string` | yes  | End date for the interval       |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV3FullstatsResponse200` |
| `400` | Bad request       | `FullStatsError`            |
| `401` | Unauthorized      | `object`                    |
| `403` | Access denied     | `object`                    |
| `429` | Too many requests | `object`                    |

**Structure `200` — `FullStatsItem[]`:**

- `advertId` `integer<int64>` — Campaign ID
- `atbs` `integer<int64>` — Number of items added to the cart
- `boosterStats` `object[]` — Statistics on the average position (for campaigns with standard bid)
  - `avg_position` `integer<int64>` — Average position of the item
  - `date` `string` — Date for which information is to be provided
  - `nm` `integer<int64>` — WB item number
- `canceled` `integer<int64>` — Cancellations, pcs
- `clicks` `integer<int64>` — Number of clicks
- `cpc` `number<double>` — Average cost per click in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
- `cr` `number<double>` — CR (conversion rate) — the ratio of the number of orders to the total number of clicks
- `ctr` `number<double>` — CTR (click-through rate) — the ratio of clicks to impressions, expressed as a percentage
- `days` `object[]` — Statistics by days
  - `apps` `object[]` — Information block about the platform
    - `appType` `integer<int64>` = `1` | `32` | `64` — Platform type - `1` — website - `32` — Android - `64` — IOS
    - `atbs` `integer<int64>` — Number of items added to the cart
    - `canceled` `integer<int64>` — Cancellations, pcs
    - `clicks` `integer<int64>` — Number of clicks
    - `cpc` `number` — Average cost per click in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `cr` `number` — CR (conversion rate) is the ratio of the number of orders to the total number of clicks
    - `ctr` `number` — CTR (click-through rate) is the ratio of clicks to impressions, expressed as a percentage
    - `nms` `object[]` — Statistics block for WB item numbers
      - `atbs` `integer<int64>` — Number of items added to the cart
      - `canceled` `integer<int64>` — Cancellations, pcs
      - `clicks` `integer<int64>` — Number of clicks
      - `cpc` `number` — Average cost per click in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
      - `cr` `number` — CR (conversion rate) is the ratio of the number of orders to the total number of clicks
      - `ctr` `number` — CTR (click-through rate) is the ratio of clicks to impressions, expressed as a percentage
      - `name` `string` — Item name
      - `nmId` `integer<int64>` — WB item number
      - `orders` `integer<int64>` — Number of orders
      - `shks` `integer<int64>` — Number of ordered items, pcs
      - `sum` `number` — Costs in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
      - `sum_price` `number` — Orders amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
      - `views` `integer<int64>` — Number of views
    - `orders` `integer<int64>` — Number of orders
    - `shks` `integer<int64>` — Number of ordered items, pcs
    - `sum` `number` — Costs in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `sum_price` `number` — Orders amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
    - `views` `integer<int64>` — Number of views
  - `atbs` `integer<int64>` — Number of items added to the cart
  - `canceled` `integer<int64>` — Cancellations, pcs
  - `date` `string` — Date for which the data is presented
  - `clicks` `integer<int64>` — Number of clicks
  - `cpc` `number` — Average cost per click in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency.
  - `cr` `number` — CR (conversion rate) is the ratio of the number of orders to the total number of visits to the campaign
  - `ctr` `number` — CTR (click-through rate) is the ratio of clicks to impressions, expressed as a percentage
  - `orders` `integer<int64>` — Number of orders
  - `shks` `integer<int64>` — Number of ordered items, pcs
  - `sum` `number` — Costs in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `sum_price` `number` — Orders amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
  - `views` `integer<int64>` — Number of views
- `orders` `integer<int64>` — Number of orders
- `shks` `integer<int64>` — Number of ordered items, pcs
- `sum` `number<double>` — Costs in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
- `sum_price` `number<double>` — Orders amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
- `views` `integer<int64>` — Number of views
- `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency

**Structure `400`:**

- `errors` `object[]`
  - `detail` `string` — Error details
  - `field` `string` — Parameter with error
- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `request_id` `string` — Request ID
- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error title
- `type` `string` — Error type

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

result = api.get_v3_fullstats(ids=..., begin_date=..., end_date=...)
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

const { data } = await api.getV3Fullstats(ids, beginDate, endDate);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV3Fullstats(context.Background()).Ids(ids).BeginDate(beginDate).EndDate(endDate).Execute()
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

System.out.println(api.getV3Fullstats(ids, beginDate, endDate));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV3Fullstats($ids, $begin_date, $end_date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV3Fullstats(ids, beginDate, endDate).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV3Fullstats(ids, beginDate, endDate));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v3_fullstats(&cfg, ids, begin_date, end_date).await;
    println!("{:#?}", result);
}
```

:::
