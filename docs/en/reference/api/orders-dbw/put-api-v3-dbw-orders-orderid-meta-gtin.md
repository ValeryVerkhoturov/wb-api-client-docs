---
title: "Закрепить GTIN за сборочным заданием"
description: "Метод обновляет GTIN, уникальный ID товара в Беларуси, в идентификаторах маркировки сборочного задания. У одного сборочного задания может быть только один…"
---

# Закрепить GTIN за сборочным заданием

```http
PUT /api/v3/dbw/orders/{orderId}/meta/gtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** Идентификаторы маркировки DBW · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-gtin) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaGtin)

Метод обновляет GTIN, уникальный ID товара в Беларуси, в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails). У одного сборочного задания может быть только один GTIN.
Закрепить GTIN можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/postV3DbwOrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails) есть поле `gtin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBW**:

| Период                                                         | Лимит         | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 мин                                                          | 1000 запросов | 60 мс    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

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
| `404` | Не найдено                                   | `Error`  |
| `409` | Ошибка добавления идентификаторов маркировки | `Error`  |
| `429` | Слишком много запросов                       | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.put_v3_dbw_orders_order_id_meta_gtin(order_id=..., put_v3_dbw_orders_order_id_meta_gtin_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersDbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-dbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersDbwApi(cfg);

const { data } = await api.putV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersdbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_dbw"
)

cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PutV3DbwOrdersOrderIdMetaGtin(context.Background(), orderId).PutV3DbwOrdersOrderIdMetaGtinRequest(putV3DbwOrdersOrderIdMetaGtinRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_dbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_dbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_dbw.api.OrdersDbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersDbwApi api = new OrdersDbwApi(client);

System.out.println(api.putV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->putV3DbwOrdersOrderIdMetaGtin($order_id, $put_v3_dbw_orders_order_id_meta_gtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PutV3DbwOrdersOrderIdMetaGtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PutV3DbwOrdersOrderIdMetaGtin(orderId, putV3DbwOrdersOrderIdMetaGtinRequest));
```

:::
