---
title: "Закрепить GTIN за сборочным заданием"
description: "Метод обновляет GTIN, уникальный ID товара в Беларуси, в идентификаторах маркировки сборочного задания. У одного сборочного задания может быть только один…"
---

# Закрепить GTIN за сборочным заданием

```http
PUT /api/v3/orders/{orderId}/meta/gtin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Идентификаторы маркировки FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)

Метод обновляет GTIN, уникальный ID товара в Беларуси, в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta).
У одного сборочного задания может быть только один GTIN.
Закрепить GTIN можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) есть поле `gtin`.

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
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<your WB JWT>")
api = FBSApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_gtin(order_id=..., put_v3_orders_order_id_meta_gtin_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FBSApi(cfg);

const { data } = await api.putV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PutV3OrdersOrderIdMetaGtin(context.Background(), orderId).PutV3OrdersOrderIdMetaGtinRequest(putV3OrdersOrderIdMetaGtinRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.FbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FbsApi api = new FbsApi(client);

System.out.println(api.putV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FBSApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaGtin($order_id, $put_v3_orders_order_id_meta_gtin_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИдентификаторыМаркировкиFBSApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaGtin(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FBSApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaGtin(orderId, putV3OrdersOrderIdMetaGtinRequest));
```

:::
