---
title: "Gender"
description: "Provides values of gender characteristic."
---

# Gender

```http
GET /content/v2/directory/kinds
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Categories, Subcategories, and Characteristics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryKinds)

Provides values of gender characteristic.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for **Characteristics** methods:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                                                                                            |
| -------- | ----- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | no   | Language for response of the `subjectName` and `name` fields: - `ru` — Russian - `en` — English - `zh` — Chinese Not used in the sandbox. The sandbox data is returned only in Russian |

## Responses

| Code  | Description       | Schema                           |
| ----- | ----------------- | -------------------------------- |
| `200` | Success           | `GetV2DirectoryKindsResponse200` |
| `400` | Bad request       | `responseBodyContentError400`    |
| `401` | Unauthorized      | `object`                         |
| `403` | Access denied     | `responseBodyContentError403`    |
| `429` | Too many requests | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_directory_kinds(locale=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.getV2DirectoryKinds(locale);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.GetV2DirectoryKinds(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.getV2DirectoryKinds(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2DirectoryKinds());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2DirectoryKinds().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2DirectoryKinds());
```

:::
