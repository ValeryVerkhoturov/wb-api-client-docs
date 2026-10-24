---
title: "Getting Seller Portal News"
description: "The method allows getting news from the seller portal."
---

# Getting Seller Portal News

```http
GET /api/communications/v2/news
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** News API · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/newsApi/operation/getV2News)

The method allows getting news from the seller portal.

To receive a successful response, one of the parameters `from` or `fromID` must be specified.

You can get up to 100 news items per request.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit     | Interval | Burst       |
| ---------------- | ------ | --------- | -------- | ----------- |
| Personal         | 1 min  | 1 request | 1 min    | 10 requests |
| Service          | 1 min  | 1 request | 1 min    | 10 requests |
| Base with secret | 1 min  | 1 request | 1 min    | 10 requests |
| Base             | 1 h    | 1 request | 1 h      | 1 request   |

## Parameters

| Name     | In    | Type             | Req. | Description                                                                        |
| -------- | ----- | ---------------- | ---- | ---------------------------------------------------------------------------------- |
| `from`   | query | `string`         | no   | Date from which to get news                                                        |
| `fromID` | query | `integer<int64>` | no   | The news ID, starting from which — including it — you need to get the list of news |

## Responses

| Code  | Description       | Schema                 |
| ----- | ----------------- | ---------------------- |
| `200` | Success           | `GetV2NewsResponse200` |
| `400` | Bad request       | —                      |
| `401` | Unauthorized      | `object`               |
| `429` | Too many requests | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v2_news(var_from=..., from_id=...)
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

const { data } = await api.getV2News(from, fromID);
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

result, _, err := client.GeneralAPI.GetV2News(context.Background()).Execute()
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

System.out.println(api.getV2News(from, fromID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV2News());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV2News().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV2News());
```

:::
