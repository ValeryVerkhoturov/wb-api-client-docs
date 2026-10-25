---
title: "List of Archived Feedbacks"
description: "The method allows you to get a list of archived feedbacks. The feedback becomes archived if: - A response to the feedback is received. - No response to the…"
---

# List of Archived Feedbacks

```http
GET /api/v1/feedbacks/archive
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Feedbacks · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/feedbacks/operation/getV1FeedbacksArchive)

The method allows you to get a list of archived feedbacks.
The feedback becomes archived if:

- A response to the feedback is received.
- No response to the feedback is received within 30 days.
- The feedback contains no text or photos.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Parameters

| Name    | In    | Type             | Req. | Description                                     |
| ------- | ----- | ---------------- | ---- | ----------------------------------------------- |
| `nmId`  | query | `integer<int64>` | no   | WB item number                                  |
| `take`  | query | `integer<int64>` | yes  | Number of feedbacks (max. 5 000)                |
| `skip`  | query | `integer<int64>` | yes  | Number of feedbacks for skip                    |
| `order` | query | `string`         | no   | Sorting of feedbacks by date (dateAsc/dateDesc) |

## Responses

| Code  | Description                         | Schema                             |
| ----- | ----------------------------------- | ---------------------------------- |
| `200` | Success                             | `GetV1FeedbacksArchiveResponse200` |
| `400` | Bad request                         | `responseFeedbackQuestionErr`      |
| `401` | Unauthorized                        | `object`                           |
| `402` | Payment required                    | `object`                           |
| `403` | Access denied                       | `responseFeedbackQuestionErr`      |
| `422` | Error processing request parameters | `responseFeedbackQuestionErr`      |
| `429` | Too many requests                   | `object`                           |

**Structure `200`:**

- `data` `object`
  - `feedbacks` `object[]` — Array of structure of feedbacks
    - `id` `string` — Feedback ID
    - `text` `string` — Feedback text
    - `pros` `string` — Item pros
    - `cons` `string` — Item cons
    - `productValuation` `integer<int64>` — Item rate
    - `createdDate` `string` — Date and time the feedback was created
    - `answer` `object` — Reply structure
      - `text` `string` — Reply text
      - `state` `string` — Status: - `none` — new - `wbRu` — displayed on the site - `reviewRequired` — response being reviewed - `rejected` — response rejected
      - `editable` `boolean` — Whether the response can be edited: - `false` — no - `true` — yes
    - `state` `string` — Feedback status: - `none` - unanswered (new) - `wbRu` - answered
    - `productDetails` `object` — Item information
      - `nmId` `integer<int64>` — WB item number
      - `imtId` `integer<int64>` — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID
      - `productName` `string` — Item name
      - `supplierArticle` `string` — Seller item number
      - `supplierName` `string` — Seller's name
      - `brandName` `string` — Item brand
      - `size` `string` — Item size (`techSize' in the listing)
    - `photoLinks` `object[]` — Array of structure of images
      - `fullSize` `string` — Link of full-size images
      - `miniSize` `string` — Link of small-size images
    - `video` `object` — Video structure
      - `previewImage` `string` — URL to the video cover image
      - `link` `string` — URL to the video playlist file (available via HLS protocol)
      - `durationSec` `integer<int64>` — Total duration of the video
    - `wasViewed` `boolean` — If the feedback was viewed
    - `userName` `string` — Name of the feedback author
    - `orderStatus` `string` — Order status. Possible values: - `buyout` — bought out - `rejected` — rejected - `returned` — returned - `notSpecified` — status not assigned
    - `matchingSize` `string` — Compliance of the declared size with the real one. Possible values: - ` ` — for dimensionless items - `ок` — matches to the size - `smaller` — runs small - `bigger` — runs large
    - `isAbleSupplierFeedbackValuation` `boolean` — Is the seller able to file a report about the feedback (`true` — available, `false` — not available)
    - `supplierFeedbackValuation` `integer<int64>` — Reason for report about the feedback
    - `isAbleSupplierProductValuation` `boolean` — Item issue
    - `supplierProductValuation` `integer<int64>` — Item rating left by the seller
    - `isAbleReturnProductOrders` `boolean` — Item return option: - `true` — available - `false` — unavailable
    - `returnProductOrdersDate` `string` — Date and time when a response with status code 200 was received for the return request.
    - `bables` `string[]` — List of customer tags
    - `lastOrderShkId` `integer<int64>` — SKU of the item
    - `lastOrderCreatedAt` `string` — Date of purchase
    - `color` `string` — Item color
    - `subjectId` `integer<int64>` — Subcategory ID
    - `subjectName` `string` — Subcategory name
    - `parentFeedbackId` `string` — ID of the original feedback (`null` if this feedback is original)
    - `childFeedbackId` `string` — ID of the updated feedback (`null` if this feedback is updated)
- `error` `boolean` — Error presence
- `errorText` `string` — Error description
- `additionalErrors` `string[]` — Additional errors

**Structure `400`:**

- `data` `object`
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `string[]` — Additional errors
- `requestId` `string`

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

- `data` `object`
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `string[]` — Additional errors
- `requestId` `string`

**Structure `422`:**

- `data` `object`
- `error` `boolean` — Error flag
- `errorText` `string` — Error description
- `additionalErrors` `string[]` — Additional errors
- `requestId` `string`

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

result = api.get_v1_feedbacks_archive(take=..., skip=..., nm_id=..., order=...)
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

const { data } = await api.getV1FeedbacksArchive(take, skip, nmId, order);
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

result, _, err := client.CommunicationsAPI.GetV1FeedbacksArchive(context.Background()).Take(take).Skip(skip).Execute()
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

System.out.println(api.getV1FeedbacksArchive(take, skip, nmId, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1FeedbacksArchive($take, $skip));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1FeedbacksArchive(take, skip).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1FeedbacksArchive(take, skip));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_feedbacks_archive(&cfg, take, skip, nm_id, order).await;
    println!("{:#?}", result);
}
```

:::
