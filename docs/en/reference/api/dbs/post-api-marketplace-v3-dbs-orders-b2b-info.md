---
title: "Информация о покупателе B2B"
description: "Метод возвращает данные B2B-покупателей по ID сборочных заданий: - ИНН - КПП - Наименование организации"
---

# Информация о покупателе B2B

```http
POST /api/marketplace/v3/dbs/orders/b2b/info
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`dbs`](/en/reference/api/dbs/) · **Section:** Сборочные задания DBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-b2b-info) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersB2bInfo)

Метод возвращает данные B2B-покупателей по ID сборочных заданий:

- ИНН
- КПП
- Наименование организации

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий DBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

## Responses

| Code  | Description            | Schema                       |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `api.B2bClientInfoResponses` |
| `400` | Неправильный запрос    | `api.BatchError`             |
| `401` | Не авторизован         | `object`                     |
| `402` | Требуется платёж       | `object`                     |
| `403` | Доступ запрещён        | `api.BatchError`             |
| `429` | Слишком много запросов | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_b2b_info(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersB2bInfo(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersB2bInfo(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersB2bInfo(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersB2bInfo($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersB2bInfo(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersB2bInfo(apiOrdersRequestV2));
```

:::
