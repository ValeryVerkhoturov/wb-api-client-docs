---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/dbw/orders/meta/details
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-dbw`](/en/reference/api/orders-dbw/) · **Section:** Идентификаторы маркировки DBW · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaDetails)

Метод возвращает идентификаторы маркировки [сборочных заданий](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders/operation/getV3DbwOrdersNew), поле `requiredMeta`. Если поле `requiredMeta` не содержит какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/putV3DbwOrdersOrderIdMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers/operation/postV3DbwOrdersMetaSgtin)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `api.OrdersMetaDetailsResponse` |
| `400` | Неправильный запрос    | `api.BatchError`                |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `api.BatchError`                |
| `429` | Слишком много запросов | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_dbw import Configuration, ApiClient
from wb_api_client.orders_dbw.api import OrdersDbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersDbwApi(ApiClient(cfg))

result = api.post_v3_dbw_orders_meta_details(api_orders_request_v2=...)
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

const { data } = await api.postV3DbwOrdersMetaDetails(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
cfg := wbordersdbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersdbw.NewAPIClient(cfg)

result, _, err := client.OrdersDbwAPI.PostV3DbwOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
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

System.out.println(api.postV3DbwOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersDbw\Api\OrdersDbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersDbwApi(new Client(), $config);

print_r($api->postV3DbwOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersDbwApi(Настройки);

Сообщить(Клиент.PostV3DbwOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersDbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersDbwApi(config);

Console.WriteLine(api.PostV3DbwOrdersMetaDetails(apiOrdersRequestV2));
```

:::
