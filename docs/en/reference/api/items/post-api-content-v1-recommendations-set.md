---
title: "Установить рекомендации для товаров"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Установить рекомендации для товаров

```http
POST /api/content/v1/recommendations/set
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Рекомендации · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsSet)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод обновляет, добавляет или удаляет [рекомендации](https://seller.wildberries.ru/recommendations-v3) для товаров.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Request body

`application/json` — schema `SetRecomReq`, required

## Responses

| Code  | Description            | Schema                |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `SetRecomRes`         |
| `208` | Уже отправлено         | `response208SetRecom` |
| `400` | Неправильный запрос    | `response400SetRecom` |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `Response4XX`         |
| `429` | Слишком много запросов | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

result = api.post_v1_recommendations_set(set_recom_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1RecommendationsSet(setRecomReq);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1RecommendationsSet(context.Background()).SetRecomReq(setRecomReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1RecommendationsSet(setRecomReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1RecommendationsSet($set_recom_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый РекомендацииApi(Настройки);

Сообщить(Клиент.PostV1RecommendationsSet(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1RecommendationsSet(setRecomReq));
```

:::
