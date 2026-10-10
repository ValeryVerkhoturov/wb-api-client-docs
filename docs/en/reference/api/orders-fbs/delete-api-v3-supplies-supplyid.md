---
title: "Удалить поставку"
description: "Метод удаляет поставку, если она активна и за ней не закреплено ни одно сборочное задание."
---

# Удалить поставку

```http
DELETE /api/v3/supplies/{supplyId}
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Поставки FBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-fbs/delete-api-v3-supplies-supplyid) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/deleteV3SuppliesSupplyId)

Метод удаляет [поставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId), если она активна и за ней не закреплено ни одно [сборочное задание](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Responses

| Code  | Description                               | Schema   |
| ----- | ----------------------------------------- | -------- |
| `204` | Удалено                                   | —        |
| `400` | Неправильный запрос                       | `Error`  |
| `401` | Не авторизован                            | `object` |
| `402` | Требуется платёж                          | `object` |
| `403` | Доступ запрещён                           | `Error`  |
| `404` | Не найдено                                | `Error`  |
| `409` | За поставкой закреплены сборочные задания | `Error`  |
| `429` | Слишком много запросов                    | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.delete_v3_supplies_supply_id(supply_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.deleteV3SuppliesSupplyId(supplyId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.DeleteV3SuppliesSupplyId(context.Background(), supplyId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.deleteV3SuppliesSupplyId(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->deleteV3SuppliesSupplyId($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.DeleteV3SuppliesSupplyId(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.DeleteV3SuppliesSupplyId(supplyId));
```

:::
