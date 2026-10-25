---
title: "Get Document"
description: "Returns one document"
---

# Get Document

```http
GET /api/v1/documents/download
```

**Base URL:** `https://documents-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Documents · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsDownload)

Returns one document

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst      |
| ---------------- | ------ | --------- | -------- | ---------- |
| Personal         | 10 s   | 1 request | 10 s     | 5 requests |
| Service          | 10 s   | 1 request | 10 s     | 5 requests |
| Base with secret | 10 s   | 1 request | 10 s     | 5 requests |
| Base             | 24 h   | 1 request | 24 h     | 1 request  |

## Parameters

| Name          | In    | Type     | Req. | Description        |
| ------------- | ----- | -------- | ---- | ------------------ |
| `serviceName` | query | `string` | yes  | Unique document ID |
| `extension`   | query | `string` | yes  | Document format    |

## Responses

| Code  | Description       | Schema   |
| ----- | ----------------- | -------- |
| `200` | Success           | `GetDoc` |
| `400` | Bad request       | `object` |
| `401` | Unauthorized      | `object` |
| `402` | Payment required  | `object` |
| `403` | Access denied     | `object` |
| `429` | Too many requests | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.get_v1_documents_download(service_name=..., extension=...)
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

const { data } = await api.getV1DocumentsDownload(serviceName, extension);
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

result, _, err := client.FinancesAPI.GetV1DocumentsDownload(context.Background()).ServiceName(serviceName).Extension(extension).Execute()
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
client.setAccessToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.getV1DocumentsDownload(serviceName, extension));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1DocumentsDownload($service_name, $extension));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1DocumentsDownload(serviceName, extension).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1DocumentsDownload(serviceName, extension));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = finances_api::get_v1_documents_download(&cfg, service_name, extension).await;
    println!("{:#?}", result);
}
```

:::
