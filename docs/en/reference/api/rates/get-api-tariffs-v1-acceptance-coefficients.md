---
title: "Supply Rates"
description: "The method is temporary disabled"
---

# Supply Rates

```http
GET /api/tariffs/v1/acceptance/coefficients
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`rates`](/en/reference/api/rates/) · **Section:** Supply Rates · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/supplyRates/operation/getV1AcceptanceCoefficients)

The method is [temporary disabled](https://dev.wildberries.ru/en/release-notes?id=570)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 6 requests | 10 s     | 6 requests |
| Service          | 1 min  | 6 requests | 10 s     | 6 requests |
| Base with secret | 1 min  | 6 requests | 10 s     | 6 requests |
| Base             | 1 h    | 1 request  | 1 h      | 1 request  |

## Parameters

| Name           | In    | Type     | Req. | Description                                                    |
| -------------- | ----- | -------- | ---- | -------------------------------------------------------------- |
| `warehouseIDs` | query | `string` | no   | Warehouse IDs. By default, data for all warehouses is returned |

## Responses

| Code  | Description       | Schema                                   |
| ----- | ----------------- | ---------------------------------------- |
| `200` | Success           | `GetV1AcceptanceCoefficientsResponse200` |
| `400` | Incorrect request | `models.ErrorModel`                      |
| `401` | Unauthorized      | `object`                                 |
| `402` | Payment required  | `object`                                 |
| `403` | Access denied     | —                                        |
| `404` | Not found         | —                                        |
| `429` | Too many requests | `object`                                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<your WB JWT>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_acceptance_coefficients(warehouse_ids=...)
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

const { data } = await api.getV1AcceptanceCoefficients(warehouseIDs);
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

result, _, err := client.RatesAPI.GetV1AcceptanceCoefficients(context.Background()).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1AcceptanceCoefficients(warehouseIDs));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1AcceptanceCoefficients());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1AcceptanceCoefficients().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1AcceptanceCoefficients());
```

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = rates_api::get_v1_acceptance_coefficients(&cfg, warehouse_ids).await;
    println!("{:#?}", result);
}
```

:::
