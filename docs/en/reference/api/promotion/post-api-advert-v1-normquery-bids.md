---
title: "Установить ставки для поисковых кластеров в валюте аккаунта продавца"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Установить ставки для поисковых кластеров в валюте аккаунта продавца

```http
POST /api/advert/v1/normquery/bids
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Поисковые кластеры · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/searchClusters/operation/postV1NormqueryBids)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод устанавливает ставки на поисковые кластеры в валюте [аккаунта продавца](https://cmp.wildberries.ru/campaigns/finances).
Можно использовать только для кампаний c ручной ставкой и моделью оплаты `cpm` — за показы.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип          | Период | Лимит     | Интервал | Всплеск   |
| ------------ | ------ | --------- | -------- | --------- |
| Персональный | 1 сек  | 2 запроса | 500 мс   | 4 запроса |
| Сервисный    | 1 сек  | 2 запроса | 500 мс   | 4 запроса |

## Request body

`application/json` — schema `V1SetNormQueryBidsRequest`, required

## Responses

| Code  | Description            | Schema                       |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `V1SetNormQueryBidsResponse` |
| `400` | Неправильный запрос    | `response400`                |
| `401` | Не авторизован         | `object`                     |
| `403` | Доступ запрещён        | `Response4XX`                |
| `429` | Слишком много запросов | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v1_normquery_bids(v1_set_norm_query_bids_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1NormqueryBids(v1SetNormQueryBidsRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1NormqueryBids(context.Background()).V1SetNormQueryBidsRequest(v1SetNormQueryBidsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1NormqueryBids(v1SetNormQueryBidsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1NormqueryBids($v1_set_norm_query_bids_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ПоисковыеКластерыApi(Настройки);

Сообщить(Клиент.PostV1NormqueryBids(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1NormqueryBids(v1SetNormQueryBidsRequest));
```

:::
