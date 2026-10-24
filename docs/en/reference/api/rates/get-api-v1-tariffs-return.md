---
title: "Return Rates"
description: "Returns rates: - on transfer from Wildberries warehouse or sorting center to the seller - on transfer of returned items that were not picked up by seller"
---

# Return Rates

```http
GET /api/v1/tariffs/return
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`rates`](/en/reference/api/rates/) · **Section:** Return Cost to Seller · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/returnCostToSeller/operation/getV1TariffsReturn)

Returns [rates](https://seller.wildberries.ru/dynamic-product-categories/return-cost):

- on transfer from Wildberries warehouse or sorting center to the seller
- on transfer of returned items that were not picked up by seller

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 60 requests | 1 s      | 5 requests |
| Service          | 1 min  | 60 requests | 1 s      | 5 requests |
| Base with secret | 1 min  | 60 requests | 1 s      | 5 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema                |
| ----- | ----------------- | --------------------- |
| `200` | Success           | `ReturnRatesResponse` |
| `400` | Bad request       | `BadRequest`          |
| `401` | Unauthorized      | `object`              |
| `402` | Payment required  | `object`              |
| `429` | Too many requests | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<your WB JWT>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_tariffs_return(var_date=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  RatesApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new RatesApi(cfg);

const { data } = await api.getV1TariffsReturn(date);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbrates "github.com/ValeryVerkhoturov/wb-api-client-go/rates"
)

cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.RatesAPI.GetV1TariffsReturn(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.rates.ApiClient;
import io.github.valeryverkhoturov.wbapi.rates.SecretString;
import io.github.valeryverkhoturov.wbapi.rates.api.RatesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1TariffsReturn(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsReturn($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsReturn(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsReturn(date));
```

:::
