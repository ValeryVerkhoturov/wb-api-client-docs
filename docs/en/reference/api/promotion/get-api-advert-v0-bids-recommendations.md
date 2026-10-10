---
title: "Рекомендуемые ставки для карточек товаров и поисковых кластеров"
description: "Метод возвращает рекомендуемые ставки для карточек товаров и поисковых кластеров кампании. Можно использовать для кампаний с типами оплаты cpm — за показы и…"
---

# Рекомендуемые ставки для карточек товаров и поисковых кластеров

```http
GET /api/advert/v0/bids/recommendations
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0BidsRecommendations)

Метод возвращает рекомендуемые ставки для карточек товаров и поисковых кластеров кампании.
Можно использовать для кампаний с типами оплаты `cpm` — за показы и `cpc` — за клики.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 1 мин  | 5 запросов  | 12 сек   | 5 запросов |
| Сервисный          | 1 мин  | 5 запросов  | 12 сек   | 5 запросов |
| Базовый с секретом | 1 мин  | 5 запросов  | 12 сек   | 5 запросов |
| Базовый            | 1 ч    | 20 запросов | 3 мин    | 1 запрос   |

## Parameters

| Name       | In    | Type             | Req. | Description |
| ---------- | ----- | ---------------- | ---- | ----------- |
| `nmId`     | query | `integer<int64>` | yes  | Артикул WB  |
| `advertId` | query | `integer<int64>` | yes  | ID кампании |

## Responses

| Code  | Description            | Schema   |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `object` |
| `400` | Неправильный запрос    | `string` |
| `401` | Не авторизован         | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v0_bids_recommendations(nm_id=..., advert_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new PromotionApi(cfg);

const { data } = await api.getV0BidsRecommendations(nmId, advertId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client/clients/go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV0BidsRecommendations(context.Background()).NmId(nmId).AdvertId(advertId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.getV0BidsRecommendations(nmId, advertId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV0BidsRecommendations($nm_id, $advert_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV0BidsRecommendations(nmId, advertId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV0BidsRecommendations(nmId, advertId));
```

:::
