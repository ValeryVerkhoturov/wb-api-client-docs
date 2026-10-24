---
title: "Pinned Feedback Limits"
description: "The method returns the pinned feedback limits for a rate and subscription."
---

# Pinned Feedback Limits

```http
GET /api/feedbacks/v1/pins/limits
```

**Base URL:** `https://feedbacks-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Pinned Feedbacks · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/pinnedFeedbacks/operation/getV1PinsLimits)

The method returns the pinned feedback limits for a rate and subscription.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Feedbacks and Questions** category:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 s    | 3 requests | 333 ms   | 6 requests |
| Service          | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base with secret | 1 s    | 3 requests | 333 ms   | 6 requests |
| Base             | 1 h    | 5 requests | 12 min   | 1 request  |

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `GetV1PinsLimitsResponse200` |
| `401` | Unauthorized      | `object`                     |
| `402` | Payment required  | `object`                     |
| `403` | Access denied     | `object`                     |
| `429` | Too many requests | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_pins_limits()
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

const { data } = await api.getV1PinsLimits();
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

result, _, err := client.CommunicationsAPI.GetV1PinsLimits(context.Background()).Execute()
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

System.out.println(api.getV1PinsLimits());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1PinsLimits());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1PinsLimits().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1PinsLimits());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_pins_limits(&cfg).await;
    println!("{:#?}", result);
}
```

:::
