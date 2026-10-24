---
title: "Promos List"
description: "Returns a promos list with dates and times of occurrence"
---

# Promos List

```http
GET /api/v1/calendar/promotions
```

**Base URL:** `https://dp-calendar-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Promo Calendar · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/promoCalendar/operation/getV1CalendarPromotions)

Returns a promos list with dates and times of occurrence

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all methods in the **Promo Calendar** category:

| Type             | Period | Limit       | Interval | Burst      |
| ---------------- | ------ | ----------- | -------- | ---------- |
| Personal         | 6 s    | 10 requests | 600 ms   | 5 requests |
| Service          | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base with secret | 6 s    | 10 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request  |

## Responses

| Code  | Description       | Schema   |
| ----- | ----------------- | -------- |
| `200` | Success           | `object` |
| `400` | Bad request       | `object` |
| `401` | Unauthorized      | `object` |
| `402` | Payment required  | `object` |
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

result = api.get_v1_calendar_promotions(start_date_time=..., end_date_time=..., all_promo=..., limit=..., offset=...)
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

const { data } = await api.getV1CalendarPromotions(startDateTime, endDateTime, allPromo, limit, offset);
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

result, _, err := client.PromotionAPI.GetV1CalendarPromotions(context.Background()).Execute()
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

System.out.println(api.getV1CalendarPromotions(startDateTime, endDateTime, allPromo, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1CalendarPromotions($start_date_time, $end_date_time, $all_promo));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1CalendarPromotions(startDateTime, endDateTime, allPromo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1CalendarPromotions(startDateTime, endDateTime, allPromo));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_calendar_promotions(&cfg, start_date_time, end_date_time, all_promo, limit, offset).await;
    println!("{:#?}", result);
}
```

:::
