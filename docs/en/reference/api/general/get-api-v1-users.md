---
title: "Get a List of Seller Active or Invited Users"
description: "Method is available by Personal token"
---

# Get a List of Seller Active or Invited Users

```http
GET /api/v1/users
```

**Base URL:** `https://user-management-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Seller User Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerUserManagement/operation/getV1Users)

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Personal** token

The method returns a list of seller account active or invited users.

Specify the value of the `isInviteOnly` parameter to select the list:

- `isInviteOnly=true` — invited users list who have not yet activated access
- `isInviteOnly=false` or is not provided — active users list
  For each user, you can get:
- user's role
- accessible sections
- invitation status
  The list of invited users in the response is always sorted by creation date: from newest to oldest.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst      |
| ------ | --------- | -------- | ---------- |
| 1 s    | 1 request | 1 s      | 5 requests |

## Parameters

| Name           | In    | Type             | Req. | Description                                                                                                                                       |
| -------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`        | query | `integer<int64>` | no   | The number of active or invited users in the response                                                                                             |
| `offset`       | query | `integer<int64>` | no   | How many results to skip. For example, for the value 10, the response will start with the 11 element                                              |
| `isInviteOnly` | query | `boolean`        | no   | - `true` — the list of invited users who have not yet activated access - `false` or not provided — the list of active users of the seller account |

## Responses

| Code  | Description       | Schema             |
| ----- | ----------------- | ------------------ |
| `200` | Success           | `getUsersResponse` |
| `400` | Bad request       | `errorResponse`    |
| `401` | Unauthorized      | `object`           |
| `403` | Access denied     | `Response4XX`      |
| `429` | Too many requests | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_users(limit=..., offset=..., is_invite_only=...)
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

const { data } = await api.getV1Users(limit, offset, isInviteOnly);
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

result, _, err := client.GeneralAPI.GetV1Users(context.Background()).Execute()
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

System.out.println(api.getV1Users(limit, offset, isInviteOnly));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Users());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Users().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Users());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = general_api::get_v1_users(&cfg, limit, offset, is_invite_only).await;
    println!("{:#?}", result);
}
```

:::
