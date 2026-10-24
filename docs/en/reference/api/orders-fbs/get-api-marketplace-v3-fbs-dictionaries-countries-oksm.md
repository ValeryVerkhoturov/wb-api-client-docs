---
title: "Get the OKSM Country List"
description: "The method returns a list of OKSM — All-Russian Classifier of World Countries — countries with their full names and codes."
---

# Get the OKSM Country List

```http
GET /api/marketplace/v3/fbs/dictionaries/countries/oksm
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** FBS Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm)

The method returns a list of OKSM — All-Russian Classifier of World Countries — countries with their full names and codes.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **FBS assembly orders, supplies, passes and auto-return settings** methods:

| Period                                                          | Limit        | Interval | Burst       |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 min                                                           | 300 requests | 200 ms   | 20 requests |
| One request with `4XX` response codes is counted as 10 requests |

## Responses

| Code  | Description       | Schema              |
| ----- | ----------------- | ------------------- |
| `200` | Success           | `CountriesOKSMList` |
| `401` | Unauthorized      | `object`            |
| `403` | Access denied     | `object`            |
| `429` | Too many requests | `object`            |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_dictionaries_countries_oksm()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.getV3FbsDictionariesCountriesOksm();
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3FbsDictionariesCountriesOksm(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.getV3FbsDictionariesCountriesOksm());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsDictionariesCountriesOksm());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsDictionariesCountriesOksm().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsDictionariesCountriesOksm());
```

:::
