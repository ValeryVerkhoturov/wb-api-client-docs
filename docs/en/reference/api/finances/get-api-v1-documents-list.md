---
title: "Documents List"
description: "Returns seller documents list"
---

# Documents List

```http
GET /api/v1/documents/list
```

**Base URL:** `https://documents-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Documents · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsList)

Returns seller documents list

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 10 s   | 1 request | 10 s     | 5 requests |
| Service          | 10 s   | 1 request | 10 s     | 5 requests |
| Base with secret | 10 s   | 1 request | 10 s     | 5 requests |
| Base             | 24 h   | 1 request | 24 h     | 1 request  |

## Parameters

| Name          | In    | Type             | Req. | Description                                                                                                                                                |
| ------------- | ----- | ---------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `beginTime`   | query | `string`         | no   | Period start. Only with `endTime`                                                                                                                          |
| `endTime`     | query | `string`         | no   | Period end. Only with `beginTime`                                                                                                                          |
| `sort`        | query | `string`         | no   | Sorting: - `date` — by the document creation date - `category` — by category (only when `locale=ru`) Only with `order`                                     |
| `order`       | query | `string`         | no   | Data order: - `desc` — descending - `asc` — ascending Only with `sort`                                                                                     |
| `category`    | query | `string`         | no   | [Document category](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsCategories) ID from the `name` field |
| `serviceName` | query | `string`         | no   | Unique document ID                                                                                                                                         |
| `limit`       | query | `integer<int64>` | no   | The maximum number of response rows                                                                                                                        |
| `offset`      | query | `integer<int64>` | no   | From which row to start outputting data                                                                                                                    |

## Responses

| Code  | Description       | Schema    |
| ----- | ----------------- | --------- |
| `200` | Success           | `GetList` |
| `400` | Bad request       | `object`  |
| `401` | Unauthorized      | `object`  |
| `402` | Payment required  | `object`  |
| `403` | Access denied     | `object`  |
| `429` | Too many requests | `object`  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.get_v1_documents_list(locale=..., begin_time=..., end_time=..., sort=..., order=..., category=..., service_name=..., limit=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FinancesApi(cfg);

const { data } = await api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.GetV1DocumentsList(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1DocumentsList());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1DocumentsList().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1DocumentsList());
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = finances_api::get_v1_documents_list(&cfg, locale, begin_time, end_time, sort, order, category, service_name, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
