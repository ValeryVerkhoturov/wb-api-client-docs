---
title: "Сообщить об отказе от заказов"
description: "Метод переводит сборочные задания из статуса prepare — готово к выдаче — в статус reject — отказ при получении."
---

# Сообщить об отказе от заказов

```http
POST /api/marketplace/v3/click-collect/orders/status/reject
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** Сборочные задания Самовывоз · [WB documentation ↗](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusReject)

Метод переводит [сборочные задания](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) из [статуса](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo) `prepare` — готово к выдаче — в статус `reject` — отказ при получении.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период                                                          | Лимит    | Интервал | Всплеск     |
| --------------------------------------------------------------- | -------- | -------- | ----------- |
| 1 сек                                                           | 1 запрос | 1 сек    | 10 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `api.OrdersRequestV2`, optional

## Responses

| Code  | Description            | Schema                   |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `api.StatusSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`         |
| `401` | Не авторизован         | `object`                 |
| `402` | Требуется платёж       | `object`                 |
| `403` | Доступ запрещён        | `api.BatchError`         |
| `429` | Слишком много запросов | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_status_reject(api_orders_request_v2=...)
print(result)
```

```go [Go]
cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersStatusReject(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersStatusReject(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersStatusReject());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersStatusReject(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersStatusReject());
```

:::
