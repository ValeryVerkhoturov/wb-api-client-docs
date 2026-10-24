---
title: "Acceptance Options"
description: "The method is temporary disabled"
---

# Acceptance Options

```http
POST /api/v1/acceptance/options
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Information for Forming Supplies · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/informationForFormingSupplies/operation/postV1AcceptanceOptions)

The method is [temporary disabled](https://dev.wildberries.ru/en/release-notes?id=570)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 1 min  | 6 requests | 10 s     | 6 requests |
| Service          | 1 min  | 6 requests | 10 s     | 6 requests |
| Base with secret | 1 min  | 6 requests | 10 s     | 6 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Parameters

| Name          | In    | Type             | Req. | Description                                                                                                        |
| ------------- | ----- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `warehouseID` | query | `integer<int64>` | no   | Warehouse ID. If the parameter is not specified, data for all warehouses is returned. \*\*Maximum is one value\*\* |

## Request body

`application/json` — schema `models.Good[]`, required

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `models.OptionsResultModel` |
| `400` | Incorrect request | `models.ErrorModel`         |
| `401` | Unauthorized      | `object`                    |
| `402` | Payment required  | `object`                    |
| `403` | Access denied     | `object`                    |
| `404` | Not found         | —                           |
| `429` | Too many requests | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.post_v1_acceptance_options(models_good=..., warehouse_id=...)
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

const { data } = await api.postV1AcceptanceOptions(modelsGood, warehouseID);
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

result, _, err := client.OrdersFbwAPI.PostV1AcceptanceOptions(context.Background()).ModelsGood(modelsGood).WarehouseID(warehouseID).Execute()
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

System.out.println(api.postV1AcceptanceOptions(modelsGood, warehouseID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->postV1AcceptanceOptions($models_good));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.PostV1AcceptanceOptions(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.PostV1AcceptanceOptions(modelsGood));
```

:::
