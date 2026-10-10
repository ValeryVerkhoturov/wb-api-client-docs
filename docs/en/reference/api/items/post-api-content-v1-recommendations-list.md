---
title: "Список рекомендаций в карточках товаров"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список рекомендаций в карточках товаров

```http
POST /api/content/v1/recommendations/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Рекомендации · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/items/post-api-content-v1-recommendations-list) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/recommendations/operation/postV1RecommendationsList)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список [рекомендаций](https://seller.wildberries.ru/recommendations-v3) в карточках товаров.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Request body

`application/json` — schema `GetRecomReq`, optional

## Responses

| Code  | Description            | Schema                |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `GetRecomRes`         |
| `400` | Неправильный запрос    | `response400GetRecom` |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `Response4XX`         |
| `429` | Слишком много запросов | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v1_recommendations_list(get_recom_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.postV1RecommendationsList(getRecomReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV1RecommendationsList(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV1RecommendationsList(getRecomReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV1RecommendationsList());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV1RecommendationsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV1RecommendationsList());
```

:::
