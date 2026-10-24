---
title: "Recommended bids for items and search clusters"
description: "The method returns recommended bids for items and search clusters of the campaign. You can use this method for campaigns with cpm — for impressions, and cpc —…"
---

# Recommended bids for items and search clusters

```http
GET /api/advert/v0/bids/recommendations
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Campaign Management · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/getV0BidsRecommendations)

The method returns recommended bids for items and search clusters of the campaign.
You can use this method for campaigns with `cpm` — for impressions, and `cpc` — for clicks payment models.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 1 min  | 5 requests  | 12 s     | 5 requests |
| Service          | 1 min  | 5 requests  | 12 s     | 5 requests |
| Base with secret | 1 min  | 5 requests  | 12 s     | 5 requests |
| Base             | 1 h    | 20 requests | 3 min    | 1 request  |

## Parameters

| Name       | In    | Type             | Req. | Description    |
| ---------- | ----- | ---------------- | ---- | -------------- |
| `nmId`     | query | `integer<int64>` | yes  | WB item number |
| `advertId` | query | `integer<int64>` | yes  | Campaign ID    |

## Responses

| Code  | Description       | Schema   |
| ----- | ----------------- | -------- |
| `200` | Success           | `object` |
| `400` | Bad request       | `string` |
| `401` | Unauthorized      | `object` |
| `403` | Access denied     | `object` |
| `429` | Too many requests | `object` |

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

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
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
