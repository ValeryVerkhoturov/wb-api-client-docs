---
title: "List of Pinned and Unpinned Feedbacks"
description: "The method allows to get the list of pinned and unpinned feedbacks. Only automatically unpinned feedback cause of the reasons specified in the response in the…"
---

# List of Pinned and Unpinned Feedbacks

```http
GET /api/feedbacks/v1/pins
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Pinned Feedbacks · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/pinnedFeedbacks/operation/getV1Pins)

The method allows to get the list of pinned and unpinned feedbacks.
Only automatically unpinned feedback cause of the reasons specified in the response in the `unpinnedCause` field are considered unpinned.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Parameters

| Name         | In    | Type             | Req. | Description                                                                                                                                                                                                                                                                                             |
| ------------ | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`      | query | `string`         | no   | If the feedback is pinned: - `pinned` — yes - `unpinned` — no                                                                                                                                                                                                                                           |
| `pinOn`      | query | `string`         | no   | Feedback pinning placement: - `nm` — listing - `imt` — group of [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings                                                                         |
| `imtId`      | query | `integer<int64>` | no   | [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID. The same for all WB item number of group of merged listings. Every listing has `imtId`, even if is not merged with any other listing |
| `nmId`       | query | `integer<int64>` | no   | WB item number                                                                                                                                                                                                                                                                                          |
| `feedbackId` | query | `integer<int64>` | no   | Feedback ID                                                                                                                                                                                                                                                                                             |
| `dateFrom`   | query | `string`         | no   | The date the first feedback in the list was pinned                                                                                                                                                                                                                                                      |
| `dateTo`     | query | `string`         | no   | The date the last feedback in the list was pinned                                                                                                                                                                                                                                                       |
| `next`       | query | `integer<int64>` | no   | The last pinning operation ID (paginator)                                                                                                                                                                                                                                                               |
| `limit`      | query | `integer<int64>` | no   | Feedback number per page (pagination)                                                                                                                                                                                                                                                                   |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `GetV1PinsResponse200` |
| `400` | Bad request       | `respond.ResultErr`    |
| `401` | Unauthorized      | `object`               |
| `402` | Payment required  | `object`               |
| `403` | Access denied     | `object`               |
| `429` | Too many requests | `object`               |

**Structure `200`:**

- `data` `openapi.PinnedReviewItemResult[]`
  - `changeStateAt` `string` — Date and time of pinning or unpinning
  - `imtId` `integer<int64>` — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID
  - `nmId` `integer<int64>` — WB item number
  - `pinId` `integer<int64>` — Pinning feedback operation ID
  - `pinMethod` `string` — Pinning methods: - `subscription` — Jam subscription - `tariff` — rate option
  - `pinOn` `string` — Feedback pinning placement: - `nm` — listing - `imt` — group of [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings
  - `feedbackId` `string` — Feedback ID
  - `state` `string` — If the feedback is pinned: - `pinned` — yes - `unpinned` — no
  - `unpinnedCause` `string` = `sysTariffUnpinned` | `sysLimitReached` | `sysNoratingUnpinned` | `sysAdditionalSlot` — Reason for unpinning the feedback: - `sysTariffUnpinned` — subscription or rate option is expired - `sysLimitReached` — total subscription limit is reached - `sysNoratingUnpinned` — feedback is excluded from the rating. For example, it was deleted or banned - `sysAdditionalSlot` — the maximum number of feedback is attached to group of [merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listings or to the listing
- `next` `integer<int64>` — Pagination parameter. Specify this value in the request to get the next batch. If the field is missing, you received all the data

**Structure `400`:**

- `detail` `string` — Error detail
- `origin` `string` — WB internal service ID
- `requestId` `string` — Request ID
- `status` `integer<int64>` — HTTP status code
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
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_pins(state=..., pin_on=..., imt_id=..., nm_id=..., feedback_id=..., date_from=..., date_to=..., next=..., limit=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1Pins(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo, next, limit);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Pins(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1Pins(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Pins());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Pins().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Pins());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_pins(&cfg, state, pin_on, imt_id, nm_id, feedback_id, date_from, date_to, next, limit).await;
    println!("{:#?}", result);
}
```

:::
