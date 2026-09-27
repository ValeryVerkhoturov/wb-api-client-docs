---
title: "Закрепить УИН за сборочными заданиями"
description: "Метод обновляет УИН, уникальные идентификационные номера, в идентификаторах маркировки сборочных заданий. У одного сборочного задания может быть только один…"
---

# Закрепить УИН за сборочными заданиями

```http
POST /api/marketplace/v3/click-collect/orders/meta/uin
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** Идентификаторы маркировки Самовывоз · [WB documentation ↗](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin)

Метод обновляет УИН, уникальные идентификационные номера, в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails). У одного сборочного задания может быть только один УИН.
Закрепить УИН можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails) есть поле `uin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки Самовывоз**:

| Период                                                          | Лимит       | Интервал | Всплеск      |
| --------------------------------------------------------------- | ----------- | -------- | ------------ |
| 1 мин                                                           | 20 запросов | 3 сек    | 500 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `api.OrdersUINSetRequest`, required

## Responses

| Code  | Description            | Schema                 |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `api.MetaSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`       |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `Error`                |
| `429` | Слишком много запросов | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_uin(api_orders_uin_set_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaUin(apiOrdersUINSetRequest);
console.log(data);
```

```go [Go]
cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV3ClickCollectOrdersMetaUin(context.Background()).ApiOrdersUINSetRequest(apiOrdersUINSetRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaUin(apiOrdersUINSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaUin($api_orders_uin_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИдентификаторыМаркировкиСамовывозApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaUin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaUin(apiOrdersUINSetRequest));
```

:::
