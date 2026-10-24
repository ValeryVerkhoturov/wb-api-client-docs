---
title: "Get Jam Subscription Information"
description: "You can get Jam subscription information with a token of any category."
---

# Get Jam Subscription Information

```http
GET /api/common/v1/subscriptions
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Seller Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerInformation/operation/getV1Subscriptions)

You can get Jam subscription information with a token of any [category](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Token-categories).

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Service** token

The method returns [Jam](https://seller.wildberries.ru/monetization/jam) subscription information:

- If seller has never activated the Jam subscription, an empty `200` response is returned.
- If seller activated the subscription and never canceled it, the following is returned:
- subscription activation date `since`
- end date of the current paid period `till`
- If the subscription expired or was canceled but seller reactivated it, the following is returned:
- date of the first subscription activation `since`
- end date of the current paid period `till`
- If the subscription is inactive, the following is returned:
- date of the first subscription activation `since`
- end date of the last paid period `till`

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst       |
| ------ | --------- | -------- | ----------- |
| 1 min  | 1 request | 1 min    | 10 requests |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Успешно           | `SubscriptionsJamInfo` |
| `401` | Unauthorized      | `object`               |
| `402` | Payment required  | `object`               |
| `403` | Access denied     | `Response4XX`          |
| `429` | Too many requests | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_subscriptions()
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

const { data } = await api.getV1Subscriptions();
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

result, _, err := client.GeneralAPI.GetV1Subscriptions(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV1Subscriptions());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Subscriptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Subscriptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Subscriptions());
```

:::
