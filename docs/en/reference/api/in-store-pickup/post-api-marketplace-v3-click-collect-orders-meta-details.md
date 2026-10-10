---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/click-collect/orders/meta/details
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`in-store-pickup`](/en/reference/api/in-store-pickup/) · **Section:** Идентификаторы маркировки Самовывоз · [WB documentation ↗](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails)

Метод возвращает идентификаторы маркировки [сборочных заданий ](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrdersNew), поле `requiredMeta`. Если поле `requiredMeta` не содержит какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin)
- `sgtin` — [код маркировки](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration)
- `originCountryCode` — [числовой код страны происхождения товара](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) из [Общероссийского классификатора стран мира](https://esnsi.gosuslugi.ru/classifiers/16269)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **получения и удаления идентификаторов маркировки Самовывоз**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 150 запросов | 400 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `api.OrdersRequestV2`, required

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `api.OrdersMetaDetailsResponse` |
| `400` | Неправильный запрос    | `api.BatchError`                |
| `401` | Не авторизован         | `object`                        |
| `403` | Доступ запрещён        | `api.BatchError`                |
| `429` | Слишком много запросов | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<your WB JWT>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_details(api_orders_request_v2=...)
print(result)
```

```go [Go]
cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
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

System.out.println(api.postV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

:::
