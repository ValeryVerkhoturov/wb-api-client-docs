---
title: "Get the Feedback by ID"
description: "The method allows you to get a feedback by its ID"
---

# Get the Feedback by ID

```http
GET /api/v1/feedback
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Feedbacks · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/feedbacks/operation/getV1Feedback)

The method allows you to get a feedback by its ID

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Parameters

| Name | In    | Type     | Req. | Description |
| ---- | ----- | -------- | ---- | ----------- |
| `id` | query | `string` | yes  | Feedback ID |

## Responses

| Code  | Description                         | Schema                        |
| ----- | ----------------------------------- | ----------------------------- |
| `200` | Success                             | `GetV1FeedbackResponse200`    |
| `401` | Unauthorized                        | `object`                      |
| `402` | Payment required                    | `object`                      |
| `403` | Access denied                       | `object`                      |
| `422` | Error processing request parameters | `responseFeedbackQuestionErr` |
| `429` | Too many requests                   | `object`                      |

**Structure `200`:**

- `data` `object`
  - `id` `string` — Feedback ID
  - `text` `string` — Feedback text
  - `pros` `string` — Item pros
  - `cons` `string` — Item cons
  - `matchingSize` `string` — Compliance of the declared size with the real one. Possible values: - ` ` - for dimensionless items - `ок` - matches to the size - `smaller` - runs small - `bigger` - runs large
  - `productValuation` `integer<int64>` — Item rate
  - `createdDate` `string` — Date and time the feedback was created
  - `answer` `object` — Reply structure
    - `text` `string` — Reply text
    - `state` `string` — Status: - `none` — new - `wbRu` — displayed on the site - `reviewRequired` — response being reviewed - `rejected` — response rejected
    - `editable` `boolean` — Whether the answer can be edited: - `false` — no - `true` - yes
  - `state` `string` — Feedback state: - `none` - not processed (new) - `wbRu` - processed
  - `productDetails` `object` — Item information
    - `nmId` `integer<int64>` — WB item number
    - `imtId` `integer<int64>` — [Merged](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items#merging-and-unmerging-listings) listing ID
    - `productName` `string` — Item name
    - `supplierArticle` `string` — Seller item number
    - `supplierName` `string` — Seller's name
    - `brandName` `string` — Brand name
    - `size` `string` — Item size (`techSize' in the listing)
  - `photoLinks` `object[]` — Array of structure of images
    - `fullSize` `string` — Link of full-size images
    - `miniSize` `string` — Link of small-size images
  - `userName` `string` — Name of the feedback author
  - `orderStatus` `string` — Order status. Possible values: - `buyout` — bought out - `rejected` — rejected - `returned` — returned - `notSpecified` — status not assigned
  - `video` `object` — Video structure
    - `previewImage` `string` — Video preview image link
    - `link` `string` — Link to the playlist video file (available through hls protocol)
    - `durationSec` `integer<int64>` — Video duration
  - `wasViewed` `boolean` — If the feedback was viewed
  - `isAbleSupplierFeedbackValuation` `boolean` — Is the feedback rating available to the seller - `true`— yes - `false` — no
  - `supplierFeedbackValuation` `integer<int64>` — Feedback rating left by the seller
  - `isAbleSupplierProductValuation` `boolean` — Is the item rating available to the seller (`true` - available, `false` - not available)
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

result = api.get_v1_feedback(id=...)
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

const { data } = await api.getV1Feedback(id);
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

result, _, err := client.CommunicationsAPI.GetV1Feedback(context.Background()).Id(id).Execute()
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

System.out.println(api.getV1Feedback(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Feedback($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Feedback(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Feedback(id));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_feedback(&cfg, id).await;
    println!("{:#?}", result);
}
```

:::
