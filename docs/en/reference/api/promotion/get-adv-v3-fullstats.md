---
title: "Campaigns Statistics"
description: "The method generates statistics for campaigns, regardless of their type."
---

# Campaigns Statistics

```http
GET /adv/v3/fullstats
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Statistics · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/statistics/operation/getV3Fullstats)

The method generates statistics for campaigns, regardless of their type.

The maximum period in a request is 31 days.

For campaigns in statuses `7`, `9` and `11`.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst     |
| ---------------- | ------ | ---------- | -------- | --------- |
| Personal         | 1 min  | 3 requests | 20 s     | 1 request |
| Service          | 1 min  | 3 requests | 20 s     | 1 request |
| Base with secret | 1 min  | 3 requests | 20 s     | 1 request |
| Base             | 1 h    | 1 request  | 1 h      | 1 request |

## Parameters

| Name        | In    | Type     | Req. | Description                     |
| ----------- | ----- | -------- | ---- | ------------------------------- |
| `ids`       | query | `string` | yes  | Campaign IDs, maximum 50 values |
| `beginDate` | query | `string` | yes  | Start date for the interval     |
| `endDate`   | query | `string` | yes  | End date for the interval       |

## Responses

| Code  | Description       | Schema                      |
| ----- | ----------------- | --------------------------- |
| `200` | Success           | `GetV3FullstatsResponse200` |
| `400` | Bad request       | `FullStatsError`            |
| `401` | Unauthorized      | `object`                    |
| `403` | Access denied     | `object`                    |
| `429` | Too many requests | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v3_fullstats(ids=..., begin_date=..., end_date=...)
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

const { data } = await api.getV3Fullstats(ids, beginDate, endDate);
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

result, _, err := client.PromotionAPI.GetV3Fullstats(context.Background()).Ids(ids).BeginDate(beginDate).EndDate(endDate).Execute()
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

System.out.println(api.getV3Fullstats(ids, beginDate, endDate));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV3Fullstats($ids, $begin_date, $end_date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV3Fullstats(ids, beginDate, endDate).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV3Fullstats(ids, beginDate, endDate));
```

:::
