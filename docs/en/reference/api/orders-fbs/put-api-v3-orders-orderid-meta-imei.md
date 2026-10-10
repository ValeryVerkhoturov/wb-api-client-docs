---
title: "Закрепить IMEI за сборочным заданием"
description: "Метод обновляет IMEI в идентификаторах маркировки сборочного задания. У одного сборочного задания может быть только один IMEI. Если у устройства два IMEI —…"
---

# Закрепить IMEI за сборочным заданием

```http
PUT /api/v3/orders/{orderId}/meta/imei
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Идентификаторы маркировки FBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-imei) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaImei)

Метод обновляет IMEI в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta).
У одного сборочного задания может быть только один IMEI. Если у устройства два IMEI — \*\*IMEI\*\* и \*\*IMEI2\*\* или \*\*IMEI1\*\* и \*\*IMEI2\*\* — укажите только \*\*IMEI\*\* или \*\*IMEI1\*\*. \*\*IMEI2\*\* указывать не нужно.
Закрепить IMEI можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) есть поле `imei`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки FBS**:

| Период                                                          | Лимит         | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 мин                                                           | 1000 запросов | 60 мс    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                                  | Schema   |
| ----- | -------------------------------------------- | -------- |
| `204` | Обновлено                                    | —        |
| `400` | Неправильный запрос                          | `Error`  |
| `401` | Не авторизован                               | `object` |
| `402` | Требуется платёж                             | `object` |
| `403` | Доступ запрещён                              | `Error`  |
| `409` | Ошибка обновления идентификаторов маркировки | `Error`  |
| `429` | Слишком много запросов                       | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_imei(order_id=..., put_v3_orders_order_id_meta_imei_request=...)
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

const { data } = await api.putV3OrdersOrderIdMetaImei(orderId, putV3OrdersOrderIdMetaImeiRequest);
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

result, _, err := client.OrdersFbsAPI.PutV3OrdersOrderIdMetaImei(context.Background(), orderId).PutV3OrdersOrderIdMetaImeiRequest(putV3OrdersOrderIdMetaImeiRequest).Execute()
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

System.out.println(api.putV3OrdersOrderIdMetaImei(orderId, putV3OrdersOrderIdMetaImeiRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaImei($order_id, $put_v3_orders_order_id_meta_imei_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaImei(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaImei(orderId, putV3OrdersOrderIdMetaImeiRequest));
```

:::
