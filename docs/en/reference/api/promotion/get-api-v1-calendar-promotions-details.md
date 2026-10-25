---
title: "Promos Details"
description: "Returns detailed information about the selected promos"
---

# Promos Details

```http
GET /api/v1/calendar/promotions/details
```

**Base URL:** `https://dp-calendar-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Promo Calendar · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/promoCalendar/operation/getV1CalendarPromotionsDetails)

Returns detailed information about the selected promos

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Promo Calendar** category:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 6 s    | 10 requests | 600 ms   | 5 requests |
| Service          | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base with secret | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema   |
| ----- | ----------------- | -------- |
| `200` | Success           | `object` |
| `400` | Bad request       | `object` |
| `401` | Unauthorized      | `object` |
| `402` | Payment required  | `object` |
| `403` | Access denied     | `object` |
| `429` | Too many requests | `object` |

**Structure `200`:**

- `data` `object` — Response data
  - `promotions` `object[]` — Promos list
    - `id` `integer<int64>` — Promo ID
    - `name` `string` — Promo name
    - `description` `string` — Promo description
    - `advantages` `string[]` — Promo advantages
    - `startDateTime` `string` — Promo start
    - `endDateTime` `string` — Promo end
    - `inPromoActionLeftovers` `integer<int64>` — Number of items with remaining stock participating in the promo
    - `inPromoActionTotal` `integer<int64>` — Total number of items participating in the promo
    - `notInPromoActionLeftovers` `integer<int64>` — Number of items with remaining stock that are not participating in the promo
    - `notInPromoActionTotal` `integer<int64>` — Total number of items that are not participating in the promo
    - `participationPercentage` `integer<int64>` — Items already participating in the promo, %. Calculation based on the items participating in the promo and with the remaining stock
    - `type` `string` = `regular` | `auto` — Promo type: - `regular` — promo - `auto` — auto promo
    - `exceptionProductsCount` `integer<uint>` — Number of items excluded from the auto promo before it starts. Only for `"type": "auto"`. At the start of the promo, these items will automatically be without a discount
    - `ranging` `object[]` — Ranking (if enabled)
      - `condition` `string` — Type of [ranking](https://seller.wildberries.ru/help-center/article/A-385): - `productsInPromotion` — only the seller items participating in the promo will be boosted - `calculateProducts` — any of the seller items proposed for participation in the promo will be boosted - `allProducts` — all of the seller items will be boosted
      - `participationRate` `integer<uint>` — Percentage of seller items needed to advance to the next ranking level, %
      - `boost` `integer<uint>` — Current search boost level, %

**Structure `400`:**

- `errorText` `string` — Error text

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

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

result = api.get_v1_calendar_promotions_details(promotion_ids=...)
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

const { data } = await api.getV1CalendarPromotionsDetails(promotionIDs);
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

result, _, err := client.PromotionAPI.GetV1CalendarPromotionsDetails(context.Background()).Execute()
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

System.out.println(api.getV1CalendarPromotionsDetails(promotionIDs));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1CalendarPromotionsDetails($promotion_ids));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1CalendarPromotionsDetails(promotionIDs).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1CalendarPromotionsDetails(promotionIDs));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_calendar_promotions_details(&cfg, promotion_ids).await;
    println!("{:#?}", result);
}
```

:::
