---
title: "Box Rates"
description: "For items inventory supplied to the warehouse in boxes, the method returns the rates: - for delivery from warehouse or sorting center to the buyer - for…"
---

# Box Rates

```http
GET /api/v1/tariffs/box
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`rates`](/en/reference/api/rates/) · **Section:** Stock Rates · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/stockRates/operation/getV1TariffsBox)

For items inventory supplied to the warehouse in boxes, the method returns the [rates](https://seller.wildberries.ru/dynamic-product-categories):

- for delivery from warehouse or sorting center to the buyer
- for delivery from the buyer to the sorting center
- for storage on WB warehouse

The rates for boxes match the **Supersafe** rates

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 60 requests | 1 s      | 5 requests |
| Service          | 1 min  | 60 requests | 1 s      | 5 requests |
| Base with secret | 1 min  | 60 requests | 1 s      | 5 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema             |
| ----- | ----------------- | ------------------ |
| `200` | Success           | `RatesBoxResponse` |
| `400` | Bad request       | `BadRequest`       |
| `401` | Unauthorized      | `object`           |
| `402` | Payment required  | `object`           |
| `429` | Too many requests | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<your WB JWT>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_tariffs_box(var_date=...)
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

const { data } = await api.getV1TariffsBox(date);
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

result, _, err := client.RatesAPI.GetV1TariffsBox(context.Background()).Execute()
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

System.out.println(api.getV1TariffsBox(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsBox($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsBox(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsBox(date));
```

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = rates_api::get_v1_tariffs_box(&cfg, date).await;
    println!("{:#?}", result);
}
```

:::
