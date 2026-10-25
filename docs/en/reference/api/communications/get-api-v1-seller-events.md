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
