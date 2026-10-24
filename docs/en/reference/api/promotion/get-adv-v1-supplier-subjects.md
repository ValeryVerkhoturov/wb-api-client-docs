---
title: "Subcategories for Campaigns"
description: "Returns subcategories listings from which are available for all campaigns"
---

# Subcategories for Campaigns

```http
GET /adv/v1/supplier/subjects
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Creating Campaigns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/creatingCampaigns/operation/getV1SupplierSubjects)

Returns subcategories listings from which are available for all campaigns

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit      | Interval | Burst      |
| ---------------- | ------ | ---------- | -------- | ---------- |
| Personal         | 12 s   | 1 request  | 12 s     | 5 requests |
| Service          | 12 s   | 1 request  | 12 s     | 5 requests |
| Base with secret | 12 s   | 1 request  | 12 s     | 5 requests |
| Base             | 1 h    | 2 requests | 30 min   | 1 request  |

## Parameters

| Name           | In    | Type     | Req. | Description                                                     |
| -------------- | ----- | -------- | ---- | --------------------------------------------------------------- |
| `payment_type` | query | `string` | no   | Payment type: - `cpm` — cost per mille - `cpc` — cost per click |

## Responses

| Code  | Description       | Schema                             |
| ----- | ----------------- | ---------------------------------- |
| `200` | Success           | `GetV1SupplierSubjectsResponse200` |
| `401` | Unauthorized      | `object`                           |
| `403` | Access denied     | `object`                           |
| `404` | Not found         | —                                  |
| `429` | Too many requests | `object`                           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_supplier_subjects(payment_type=...)
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

const { data } = await api.getV1SupplierSubjects(paymentType);
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

result, _, err := client.PromotionAPI.GetV1SupplierSubjects(context.Background()).Execute()
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

System.out.println(api.getV1SupplierSubjects(paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1SupplierSubjects());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1SupplierSubjects().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1SupplierSubjects());
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = promotion_api::get_v1_supplier_subjects(&cfg, payment_type).await;
    println!("{:#?}", result);
}
```

:::
