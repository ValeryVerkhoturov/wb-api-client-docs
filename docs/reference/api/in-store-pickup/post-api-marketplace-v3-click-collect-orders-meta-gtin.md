---
title: "Закрепить GTIN за сборочными заданиями"
description: "Метод обновляет GTIN, уникальный ID товара в Беларуси, в идентификаторах маркировки сборочных заданий. У одного сборочного задания может быть только один GTIN.…"
---

# Закрепить GTIN за сборочными заданиями

```http
POST /api/marketplace/v3/click-collect/orders/meta/gtin
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Идентификаторы маркировки Самовывоз · [Документация WB ↗](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin)

Метод обновляет GTIN, уникальный ID товара в Беларуси, в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails). У одного сборочного задания может быть только один GTIN.
Закрепить GTIN можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails) есть поле `gtin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки Самовывоз**:

| Период                                                          | Лимит       | Интервал | Всплеск      |
| --------------------------------------------------------------- | ----------- | -------- | ------------ |
| 1 мин                                                           | 20 запросов | 3 сек    | 500 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersGTINSetRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `api.MetaSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`       |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `Error`                |
| `429` | Слишком много запросов | `object`               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_gtin(api_orders_gtin_set_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaGtin(apiOrdersGTINSetRequest);
console.log(data);
```

```go [Go]
cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV3ClickCollectOrdersMetaGtin(context.Background()).ApiOrdersGTINSetRequest(apiOrdersGTINSetRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaGtin(apiOrdersGTINSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaGtin($api_orders_gtin_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИдентификаторыМаркировкиСамовывозApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaGtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaGtin(apiOrdersGTINSetRequest));
```

:::
