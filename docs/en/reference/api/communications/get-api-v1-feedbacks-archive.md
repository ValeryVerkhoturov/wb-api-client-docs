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
client.setBearerToken(new SecretString("<your WB JWT>"));
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

:::
