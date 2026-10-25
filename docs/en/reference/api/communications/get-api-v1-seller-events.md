---
title: "Chat Events"
description: "Returns an event list for all chats. To retrieve all events: 1. Make the first request without a next parameter. 2. Repeat the request with the next parameter…"
---

# Chat Events

```http
GET /api/v1/seller/events
```

**Base URL:** `https://buyer-chat-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Buyers Chat · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/buyersChat/operation/getV1SellerEvents)

Returns an event list for all chats.
To retrieve all events:

1. Make the first request without a `next` parameter.
2. Repeat the request with the `next` parameter value from the previous response until `totalEvents` becomes `0`. This will indicate that you have received all events.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 10 s   | 10 requests | 1 s      | 10 requests |
| Service          | 10 s   | 10 requests | 1 s      | 10 requests |
| Base with secret | 10 s   | 10 requests | 1 s      | 10 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request   |

## Parameters

| Name   | In    | Type             | Req. | Description                                                                                                          |
| ------ | ----- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| `next` | query | `integer<int64>` | no   | Paginator. Retrieve the next data packet starting from this moment. Format: Unix timestamp \*\*with milliseconds\*\* |

## Responses

| Code  | Description       | Schema                         |
| ----- | ----------------- | ------------------------------ |
| `200` | Success           | `EventsResponse`               |
| `400` | Bad request       | `GetV1SellerEventsResponse400` |
| `401` | Unauthorized      | `object`                       |
| `402` | Payment required  | `object`                       |
| `403` | Access denied     | `object`                       |
| `429` | Too many requests | `object`                       |

**Structure `200`:**

- `result` `EventsResult`
  - `next` `integer<int64>` — Paginator. Retrieve the next data set starting from this moment
  - `newestEventTime` `string` — Newest response event time
  - `oldestEventTime` `string` — Oldest response event time
  - `totalEvents` `integer<int64>` — Number of events
  - `events` `Event[]`
    - `chatID` `string` — Chat ID
    - `eventID` `string` — Event ID
    - `eventType` `EventType`
    - `isNewChat` `boolean` — New chat indicator: - `false` — chat is not new - `true` — chat is new
    - `message` `object` — Message data
      - `attachments` `EventAttachments`
        - `goodCard` `Listing`
          - `nmID` `integer<int64>` — WB item number
            - …
          - `price` `integer<int64>` — Actual price with all discounts applied. Charged to the buyer
            - …
          - `priceCurrency` `string` — Currency
            - …
          - `rid` `string` — Unique order ID. Note: `rid` corresponds to `srid` in the responses of the methods: - [Buyers Return Applications](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Order Feed](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Orders](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Sales](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Returns and Item Movement Report](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Details for the Sales Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Details for the Sales Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Details for the Acquiring Expenses Reports by Report ID](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Details for the Acquiring Expenses Reports by Period](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
            - …
          - `size` `string` — The item size, corresponds to `wbSize` in the [listing](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList)
            - …
        - `files` `File[]` — Files
          - `contentType` `string` — File type
            - …
          - `date` `string` — Date of the file upload
            - …
          - `downloadID` `string` — File ID. [Download the file](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerDownloadId)
            - …
          - `name` `string` — File name
            - …
          - `url` `string` — URL for accessing the file
            - …
          - `size` `integer<int64>` — File size in bytes
            - …
        - `images` `Image[]` — Images
          - `date` `string` — Date of the image upload
            - …
          - `downloadID` `string` — File ID. [Download the file](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerDownloadId)
            - …
          - `url` `string` — URL for accessing the image
            - …
      - `text` `string` — Message text
    - `source` `string` — Message sending source: - `seller-portal` — sellers portal - `seller-public-api` — Buyers chat API - `rusite` — buyers portal - `global` — `global.wildberries.ru` portal - `ios` — mobile operating system by **Apple** - `android` — **Android** mobile operating system by **Google**
    - `addTimestamp` `integer<int64>` — Time of event occurrence on the server. Unix timestamp format
    - `addTime` `string` — Time of event occurrence on the server in UTC
    - `replySign` `string` — Chat signature. Available only if `"isNewChat": true`. Required when [sending a message](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/postV1SellerMessage)
    - `sender` `Sender`
    - `clientName` `string` — Buyer's name
- `errors` `string[]` — Errors, if any

**Structure `400`:**

- `status` `number` — HTTP status code
- `title` `string` — Error title
- `origin` `string` — WB internal service ID
- `detail` `string` — Error details
- `requestId` `string` — Unique request ID
- `error` `string` — Error text

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

result = api.get_v1_seller_events(next=...)
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

const { data } = await api.getV1SellerEvents(next);
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

result, _, err := client.CommunicationsAPI.GetV1SellerEvents(context.Background()).Execute()
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

System.out.println(api.getV1SellerEvents(next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1SellerEvents());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1SellerEvents().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1SellerEvents());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_seller_events(&cfg, next).await;
    println!("{:#?}", result);
}
```

:::
