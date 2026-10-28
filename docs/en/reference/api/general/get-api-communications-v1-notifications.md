---
title: "Get Seller Portal Notifications"
description: "Method is available by Personal token, Service token"
---

# Get Seller Portal Notifications

```http
GET /api/communications/v1/notifications
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Communications API · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/newsApi/operation/getV1Notifications)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token,
**Service** token

The method returns a list of notifications from the seller [account](https://seller.wildberries.ru) in Russian. The notifications in the response are ordered from newest to oldest.
Available only for sellers from the Russian Federation.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type     | Period | Limit     | Interval | Burst       |
| -------- | ------ | --------- | -------- | ----------- |
| Personal | 1 min  | 1 request | 1 min    | 10 requests |
| Service  | 1 min  | 1 request | 1 min    | 10 requests |

## Parameters

| Name       | In    | Type             | Req. | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `from`     | query | `string`         | no   | Filter by date and time: the response returns only notifications received before the specified date and time. Specify the values no later than the current ones. To receive the newest notifications, do not pass this parameter in the request. Use the parameter for pagination: 1. Send the first request without the 'from`parameter. 2. In the following requests, pass the`date`value of the last notification in the response in the`from` parameter. |
| `timezone` | query | `string`         | no   | Time zone in [IANA](https://nodatime.org/TimeZones) format                                                                                                                                                                                                                                                                                                                                                                                                   |
| `limit`    | query | `integer<int64>` | no   | Number of notifications in the response                                                                                                                                                                                                                                                                                                                                                                                                                      |

## Responses

| Code  | Description       | Schema                          |
| ----- | ----------------- | ------------------------------- |
| `200` | Success           | `GetV1NotificationsResponse200` |
| `400` | Bad request       | `SellerNotificationsError`      |
| `401` | Unauthorized      | `object`                        |
| `403` | Access denied     | `object`                        |
| `429` | Too many requests | `object`                        |

**Structure `200`:**

- `data` `SellerNotificationsResponse[]` — Notifications list
  - `date` `string` — Date and time the notification was sent
  - `id` `string<uuid>` — Notification ID
  - `linkData` `object` — Notification button data
    - `linkHref` `string` — Notification button URL
    - `linkText` `string` — Notification button text
  - `text` `string` — Notification text
  - `title` `string` — Notification title

**Structure `400`:**

- `status` `integer<int64>` — HTTP status code
- `title` `string` — Error title
- `detail` `string` — Error details
- `origin` `string` — WB internal service ID
- `errors` `object[]` — Errors list
  - `location` `string` — Request parameter that caused the error
  - `message` `string` — Error description
- `code` `string` — Internal error code
- `requestId` `string` — Request ID

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

- one of: `SellerNotificationsError`, `Response4XX`

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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_notifications(var_from=..., timezone=..., limit=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  GeneralApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new GeneralApi(cfg);

const { data } = await api.getV1Notifications(from, timezone, limit);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbgeneral "github.com/ValeryVerkhoturov/wb-api-client-go/general"
)

cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.GeneralAPI.GetV1Notifications(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.GeneralApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV1Notifications(from, timezone, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Notifications());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Notifications().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Notifications());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = general_api::get_v1_notifications(&cfg, from, timezone, limit).await;
    println!("{:#?}", result);
}
```

:::
