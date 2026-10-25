---
title: "Update User's Access Permissions"
description: "Method is available by Personal token"
---

# Update User's Access Permissions

```http
PUT /api/v1/users/access
```

**Base URL:** `https://user-management-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Seller User Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerUserManagement/operation/putV1UsersAccess)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token

The method changes the access rights for one or more users.

Only the data passed in the request parameters will be updated. The other fields will remain unchanged.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst      |
| ------ | --------- | -------- | ---------- |
| 1 s    | 1 request | 1 s      | 5 requests |

## Request body

`application/json` — schema `updateUserAccessRequest`, required

- `usersAccesses` `UserAccess[]` (required) — Access settings for user
  - `userId` `integer<int64>` — User ID
  - `access` `object[]` — Access settings for seller account sections
    - `code` `string` = `balance` | `brands` | `changeJam` | `discountPrice` | `finance` | `showcase` | `suppliersDocuments` | `supply` | `questions` | `pinFeedbacks` | `pointsForReviews` | `feedbacks` | `oldAnalyticsReports` | `marketplace` | `brandsFlow` | `copyrightComplaints` | `pretrialClaims` | `sellersChat` | `brandzone` | `brandzoneSubscribe` (required) — The code for the seller account section the user will get access to: * `balance` — View balance and withdraw funds * `brands` — Brands management * `changeJam` — Access to **Jam** subscription: **A/B tests**, photo tags, video autostarts, listing comparisons * `discountPrice` — Change item prices, manage discounts and promos * `finance` — Financial analytics. Balance statistics, financial reports, payment history * `showcase` — Showcase management * `suppliersDocuments` — View and download documents related to platform operations * `supply` — Create and manage FBW supplies * `questions` — View and respond to customer questions * `pinFeedbacks` — Ability to pin and unpin reviews * `pointsForReviews` — Points for reviews * `feedbacks` — View and respond to customer reviews * `oldAnalyticsReports` — Reports * `marketplace` — Seller Warehouse * `brandsFlow` — My brands * `copyrightComplaints` — Copyright Claims * `pretrialClaims` — Out-of-Court Claims * `sellersChat` — Chat with Users * `brandzone` — Edit Brand Zone * `brandzoneSubscribe` — Manage Brand Zone Subscription
    - `disabled` `boolean` (required) — * `true` — access to the section is disabled * `false` — access to the section is enabled

## Responses

| Code  | Description       | Schema          |
| ----- | ----------------- | --------------- |
| `200` | Success           | —               |
| `400` | Bad request       | `errorResponse` |
| `401` | Unauthorized      | `object`        |
| `403` | Access denied     | `Response4XX`   |
| `429` | Too many requests | `object`        |

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `requestId` `string` — Request ID
- `origin` `string` — Internal service name
- `status` `number` — HTTP status code

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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.put_v1_users_access(update_user_access_request=...)
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

const { data } = await api.putV1UsersAccess(updateUserAccessRequest);
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

result, _, err := client.GeneralAPI.PutV1UsersAccess(context.Background()).UpdateUserAccessRequest(updateUserAccessRequest).Execute()
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

System.out.println(api.putV1UsersAccess(updateUserAccessRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->putV1UsersAccess($update_user_access_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.PutV1UsersAccess(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.PutV1UsersAccess(updateUserAccessRequest));
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = general_api::put_v1_users_access(&cfg, update_user_access_request).await;
    println!("{:#?}", result);
}
```

:::
