---
title: "Top-up of the Campaign Budget"
description: "The method tops up the campaign budget. To launch the campaign after topping up the budget, use the Launch campaign method."
---

# Top-up of the Campaign Budget

```http
POST /adv/v1/budget/deposit
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Finances · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/finances/operation/postV1BudgetDeposit)

The method tops up the campaign [budget](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/postV2Budget).
To launch the campaign after topping up the budget, use the [Launch campaign](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0Start) method.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 1 request  | 1 s      | 5 requests |
| Service          | 1 s    | 1 request  | 1 s      | 5 requests |
| Base with secret | 1 s    | 1 request  | 1 s      | 5 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Parameters

| Name | In    | Type             | Req. | Description |
| ---- | ----- | ---------------- | ---- | ----------- |
| `id` | query | `integer<int64>` | yes  | Campaign ID |

## Request body

`application/json` — schema `object`, required

- `sum` `integer<int64>` — Budget top-up amount in the base units of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency
- `cashback_sum` `integer<int64>` — Top-up budget sum paid with promo bonuses. You can top up only a certain percentage of the amount, indicated in the `percent` field of the response from the method for getting [balance](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/getV1Balance). Promo bonuses are only applicable to these top-up sources: - `0` — account - `1` — balance sheet
- `cashback_percent` `integer<int64>` — The percentage of the top-up amount that can be paid with promo bonuses. You need to specify the value of the `percent` field from the response for the method for getting [balance] If you specified `cashback\_sum`, the `cashback\_percent` parameter becomes required
- `type` `integer<int64>` — Type of top-up source: - `0` — Account - `1` — Balance - `3` — Bonuses
- `return` `boolean` — Response return flag (`true` means updated campaign budget size will be returned in the response, `false` or empty means nothing will be returned).

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `ResponseWithReturn`             |
| `400` | Bad request       | `PostV1BudgetDepositResponse400` |
| `401` | Unauthorized      | `object`                         |
| `403` | Access denied     | `object`                         |
| `429` | Too many requests | `object`                         |

**Structure `200`:**

- `total` `integer<int64>` — Amount of the updated budget
- `currency` `string<ISO 4217>` — Currency of the [seller account](https://cmp.wildberries.ru/campaigns/finances) currency

**Structure `400`:**

- `error` `string`

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

result = api.post_v1_budget_deposit(id=..., post_v1_budget_deposit_request=...)
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

const { data } = await api.postV1BudgetDeposit(id, postV1BudgetDepositRequest);
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

result, _, err := client.PromotionAPI.PostV1BudgetDeposit(context.Background()).Id(id).PostV1BudgetDepositRequest(postV1BudgetDepositRequest).Execute()
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

System.out.println(api.postV1BudgetDeposit(id, postV1BudgetDepositRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1BudgetDeposit($id, $post_v1_budget_deposit_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1BudgetDeposit(id, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1BudgetDeposit(id, postV1BudgetDepositRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::post_v1_budget_deposit(&cfg, id, post_v1_budget_deposit_request).await;
    println!("{:#?}", result);
}
```

:::
