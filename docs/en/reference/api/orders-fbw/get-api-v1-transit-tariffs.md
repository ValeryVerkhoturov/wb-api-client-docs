---
title: "Transit Directions"
description: "The method is temporary disabled"
---

# Transit Directions

```http
GET /api/v1/transit-tariffs
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Information for Forming Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/informationForFormingSupplies/operation/getV1TransitTariffs)

The method is [temporary disabled](https://dev.wildberries.ru/en/release-notes?id=570)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst       |
| ---------------- | ------ | ---------- | -------- | ----------- |
| Personal         | 1 min  | 6 requests | 10 s     | 10 requests |
| Service          | 1 min  | 6 requests | 10 s     | 10 requests |
| Base with secret | 1 min  | 6 requests | 10 s     | 10 requests |
| Base             | 12 h   | 1 request  | 12 h     | 1 request   |

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `GetV1TransitTariffsResponse200` |
| `401` | Unauthorized      | `object`                         |
| `403` | Access denied     | `object`                         |
| `429` | Too many requests | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_transit_tariffs()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1TransitTariffs();
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1TransitTariffs(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1TransitTariffs());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1TransitTariffs());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1TransitTariffs().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1TransitTariffs());
```

:::
