---
title: "Questions List"
description: "The method allows you to get a list of questions by the specified parameters with pagination and sorting. It is possible to get a maximum of 10,000 questions…"
---

# Questions List

```http
GET /api/v1/questions
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Questions · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/questions/operation/getV1Questions)

The method allows you to get a list of questions by the specified parameters with pagination and sorting.
It is possible to get a maximum of 10,000 questions per query

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Parameters

| Name         | In    | Type             | Req. | Description                                                                                                                                                         |
| ------------ | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isAnswered` | query | `boolean`        | yes  | The question is answered: - `true` — yes - `false` — no                                                                                                             |
| `nmId`       | query | `integer<int64>` | no   | WB item number                                                                                                                                                      |
| `take`       | query | `integer<int64>` | yes  | Number of requested questions (the maximum possible value for the parameter is 10,000, and the total amount of `take` and `skip` parameters must not exceed 10,000) |
| `skip`       | query | `integer<int64>` | yes  | Number of questions to skip (maximum possible value for the parameter is 10,000, and the total amount of `take` and `skip` parameters must not exceed 10,000)       |
| `order`      | query | `string`         | no   | Sorting questions by date (`dateAsc`/`dateDesc`)                                                                                                                    |
| `dateFrom`   | query | `integer<int64>` | no   | The start date of the period in Unix timestamp format                                                                                                               |
| `dateTo`     | query | `integer<int64>` | no   | The end date of the period in Unix timestamp format                                                                                                                 |

## Responses

| Code  | Description       | Schema                        |
| ----- | ----------------- | ----------------------------- |
| `200` | Success           | `GetV1QuestionsResponse200`   |
| `400` | Bad request       | `responseFeedbackQuestionErr` |
| `401` | Unauthorized      | `object`                      |
| `402` | Payment required  | `object`                      |
| `403` | Access denied     | `responseFeedbackQuestionErr` |
| `429` | Too many requests | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_questions(is_answered=..., take=..., skip=..., nm_id=..., order=..., date_from=..., date_to=...)
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

const { data } = await api.getV1Questions(isAnswered, take, skip, nmId, order, dateFrom, dateTo);
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

result, _, err := client.CommunicationsAPI.GetV1Questions(context.Background()).IsAnswered(isAnswered).Take(take).Skip(skip).Execute()
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

System.out.println(api.getV1Questions(isAnswered, take, skip, nmId, order, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Questions($is_answered, $take, $skip));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Questions(isAnswered, take, skip).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Questions(isAnswered, take, skip));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_questions(&cfg, is_answered, take, skip, nm_id, order, date_from, date_to).await;
    println!("{:#?}", result);
}
```

:::
