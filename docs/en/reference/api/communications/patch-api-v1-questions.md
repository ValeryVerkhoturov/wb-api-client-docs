---
title: "Working with Questions"
description: "Depending on the request body, you can: - View question. - Reject question. - Answer question or edit the answer"
---

# Working with Questions

```http
PATCH /api/v1/questions
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Questions · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/questions/operation/patchV1Questions)

Depending on the request body, you can:

- View question.
- Reject question.
- Answer question or edit the answer

All seller responses undergo preliminary moderation before publication

It is possible to edit a response to a question within 2 months (60 days), after the response has been submitted and only once

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Request body

`application/json` — schema `object`, optional

- one of: `object`, `object`

## Responses

| Code  | Description                         | Schema                        |
| ----- | ----------------------------------- | ----------------------------- |
| `200` | Success                             | `PatchV1QuestionsResponse200` |
| `400` | Bad request                         | `responseFeedbackQuestionErr` |
| `401` | Unauthorized                        | `object`                      |
| `402` | Payment required                    | `object`                      |
| `403` | Access denied                       | `responseFeedbackQuestionErr` |
| `404` | Not found                           | `responseFeedbackQuestionErr` |
| `422` | Error processing request parameters | `responseFeedbackQuestionErr` |
| `429` | Too many requests                   | `object`                      |

**Structure `200`:**

- `data` `object`
- `error` `boolean` — Error flag
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

**Structure `404`:**

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

result = api.patch_v1_questions(patch_v1_questions_request=...)
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

const { data } = await api.patchV1Questions(patchV1QuestionsRequest);
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

result, _, err := client.CommunicationsAPI.PatchV1Questions(context.Background()).Execute()
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

System.out.println(api.patchV1Questions(patchV1QuestionsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->patchV1Questions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.PatchV1Questions(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.PatchV1Questions());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::patch_v1_questions(&cfg, patch_v1_questions_request).await;
    println!("{:#?}", result);
}
```

:::
