---
title: "Добавить грузоместа к поставке"
description: "Метод добавляет требуемое количество грузомест в поставку."
---

# Добавить грузоместа к поставке

```http
POST /api/v3/supplies/{supplyId}/trbx
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Поставки FBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-fbs/post-api-v3-supplies-supplyid-trbx) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3SuppliesSupplyIdTrbx)

Метод добавляет требуемое количество [грузомест](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyIdTrbx) в [поставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId).

Грузоместа необходимо добавлять только в поставки, отгружаемые на ПВЗ.

Грузоместа можно добавить только в открытую поставку. В одном грузоместе может быть несколько заказов. Например, если в поставке 10 заказов, распределите их по коробам: система позволит создать не больше 5 грузомест. Для 20 заказов — не больше 10 грузомест, для 100 — не больше 50.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                                  |
| ----- | ---------------------- | --------------------------------------- |
| `201` | Создано                | `PostV3SuppliesSupplyIdTrbxResponse201` |
| `400` | Неправильный запрос    | `Error`                                 |
| `401` | Не авторизован         | `object`                                |
| `402` | Требуется платёж       | `object`                                |
| `403` | Доступ запрещён        | `Error`                                 |
| `404` | Не найдено             | `Error`                                 |
| `429` | Слишком много запросов | `object`                                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_supplies_supply_id_trbx(supply_id=..., post_v3_supplies_supply_id_trbx_request=...)
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

const { data } = await api.postV3SuppliesSupplyIdTrbx(supplyId, postV3SuppliesSupplyIdTrbxRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3SuppliesSupplyIdTrbx(context.Background(), supplyId).Execute()
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

System.out.println(api.postV3SuppliesSupplyIdTrbx(supplyId, postV3SuppliesSupplyIdTrbxRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3SuppliesSupplyIdTrbx($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3SuppliesSupplyIdTrbx(supplyId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3SuppliesSupplyIdTrbx(supplyId));
```

:::
