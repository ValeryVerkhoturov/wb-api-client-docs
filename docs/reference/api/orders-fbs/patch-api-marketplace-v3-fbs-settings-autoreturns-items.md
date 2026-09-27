---
title: "Обновить настройки автовозврата товаров"
description: "Метод доступен по Персональному токену"
---

# Обновить настройки автовозврата товаров

```http
PATCH /api/marketplace/v3/fbs/settings/autoreturns/items
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Настройки автовозврата · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/autoreturnSettings/operation/patchMarketplaceV3FbsSettingsAutoreturnsItems)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод устанавливает настройки автовозврата малогабаритных товаров — `"cargoType":1`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема                                                      |
| ----- | ---------------------- | ---------------------------------------------------------- |
| `200` | Успешно                | `PatchMarketplaceV3FbsSettingsAutoreturnsItemsResponse200` |
| `400` | Неправильный запрос    | `ApiErrorV3`                                               |
| `401` | Не авторизован         | `object`                                                   |
| `403` | Доступ запрещён        | `Response4XX`                                              |
| `429` | Слишком много запросов | `object`                                                   |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.patch_marketplace_v3_fbs_settings_autoreturns_items(patch_marketplace_v3_fbs_settings_autoreturns_items_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.patchMarketplaceV3FbsSettingsAutoreturnsItems(patchMarketplaceV3FbsSettingsAutoreturnsItemsRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PatchMarketplaceV3FbsSettingsAutoreturnsItems(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.patchMarketplaceV3FbsSettingsAutoreturnsItems(patchMarketplaceV3FbsSettingsAutoreturnsItemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->patchMarketplaceV3FbsSettingsAutoreturnsItems());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый НастройкиАвтовозвратаApi(Настройки);

Сообщить(Клиент.PatchMarketplaceV3FbsSettingsAutoreturnsItems(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PatchMarketplaceV3FbsSettingsAutoreturnsItems());
```

:::
