---
title: "Receiving the History of Account Top-ups"
description: "The method allows you to get a history of top-ups."
---

# Receiving the History of Account Top-ups

```http
GET /adv/v1/payments
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Finances · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/finances/operation/getV1Payments)

The method allows you to get a history of top-ups.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 1 s    | 1 request | 1 s      | 5 requests |
| Service          | 1 s    | 1 request | 1 s      | 5 requests |
| Base with secret | 1 s    | 1 request | 1 s      | 5 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request  |

## Parameters

| Name   | In    | Type     | Req. | Description                                                 |
| ------ | ----- | -------- | ---- | ----------------------------------------------------------- |
| `from` | query | `string` | no   | Beginning of the interval                                   |
| `to`   | query | `string` | no   | End of interval. (Minimum interval is 1 day, maximum is 31) |

## Responses

| Code  | Description                   | Schema                     |
| ----- | ----------------------------- | -------------------------- |
| `200` | Success                       | `GetV1PaymentsResponse200` |
| `204` | Transaction history not found | —                          |
| `400` | Bad request                   | `string`                   |
| `401` | Unauthorized                  | `object`                   |
| `403` | Access denied                 | `object`                   |
| `429` | Too many requests             | `object`                   |

**Structure `200` — `object[]`:**

- `id` `integer<int64>` — Payment ID
- `date` `string<time-date>` — Payment date
- `sum` `integer<int64>` — Payment amount
- `type` `integer<int64>` — Type of charge-off source: - `0` — Account - `1` — Balance - `3` — Card
- `statusId` `integer<int64>` — Status: - `0` — error - `1` — processed
- `cardStatus` `string` — Transaction status (when paying by card): - `success` — success - `fail` — not success - `pending` — waiting for response - `unknown` — unknown
- `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency

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

result = api.get_v1_payments(var_from=..., to=...)
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

const { data } = await api.getV1Payments(from, to);
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

result, _, err := client.PromotionAPI.GetV1Payments(context.Background()).Execute()
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

System.out.println(api.getV1Payments(from, to));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Payments());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Payments().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Payments());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_payments(&cfg, from, to).await;
    println!("{:#?}", result);
}
```

:::
