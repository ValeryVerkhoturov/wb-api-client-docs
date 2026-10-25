---
title: "Buyers Return Applications"
description: "Returns buyers applications for item returns for the current 14 days."
---

# Buyers Return Applications

```http
GET /api/v1/claims
```

**Base URL:** `https://returns-api.wildberries.ru` · **Module:** [`communications`](/en/reference/api/communications/) · **Section:** Buyers Returns · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications#tag/buyersReturns/operation/getV1Claims)

Returns buyers applications for item returns for the current 14 days.

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Type             | Period | Limit       | Interval | Burst       |
| ---------------- | ------ | ----------- | -------- | ----------- |
| Personal         | 1 min  | 20 requests | 3 s      | 10 requests |
| Service          | 1 min  | 20 requests | 3 s      | 10 requests |
| Base with secret | 1 min  | 20 requests | 3 s      | 10 requests |
| Base             | 1 h    | 1 request   | 1 h      | 1 request   |

## Responses

| Code  | Description       | Schema   |
| ----- | ----------------- | -------- |
| `200` | Success           | `object` |
| `400` | Bad request       | `object` |
| `401` | Unauthorized      | `object` |
| `402` | Payment required  | `object` |
| `403` | Access denied     | `object` |
| `429` | Too many requests | `object` |

**Structure `200`:**

- `claims` `object[]` — Applications
  - `id` `string<UUID>` — Application ID
  - `claim_type` `integer<int64>` — Application source: * `1` — buyers portal * `3` — chat
  - `status` `integer<int64>` — Buyer return decision: * `0` — under review * `1` — refusal * `2` — approved
  - `status_ex` `integer<int64>` — Item status: * `0` — application under review * `1` — item stays with buyer (Application rejected) * `2` — buyer returns item to WB, item sent for disposal * `5` — item stays with buyer (Application approved) * `8` — item will be returned to sale after WB inspection * `10` — item returned to seller
  - `nm_id` `integer<int64>` — WB item number
  - `user_comment` `string` — Buyer comment
  - `wb_comment` `string` — Answer to the buyer in Russian
  - `dt` `string` — Date and time the application was submitted by the buyer. UTC+3
  - `imt_name` `string` — Item name
  - `order_dt` `string` — Order date and time
  - `dt_update` `string` — Date and time the application was reviewed. For the application that has not been reviewed — date and time the application was submitted. UTC+3
  - `photos` `string<WEBP>[]` — Photos from buyer application
  - `video_paths` `string<MP4>[]` — Videos from buyer application
  - `actions` `string[]` — [Seller answer](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim) options. Rejected applications can be reconsidered. If the array is empty, the application cannot be processed. \* `approve1` — approve with defect check. Money will be refunded to the buyer after the item is returned. The item will be checked at the warehouse. If a defect/packing error is confirmed, the item will be sent to the seller. If the defect/packing error is not confirmed, the item will be returned to sale. Not applicable for the **[In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup)** model. \* `approve2` — approve and return the item. Money will be refunded to the customer after the item is returned. The item will be sent to the seller. Not applicable for the **[In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup)** model. \* `autorefund1` — approve without item return. The item will remain with the customer. The money for the item will be refunded to the customer without returning the item. \* `reject1` — reject with response template: **Брак не обнаружен**Пришлось отклонить заявку — подтвердить производственный брак не получилось. Можете отнести товар на независимую экспертизу или в сервисный центр. Если брак подтвердится, создайте новую заявку с такой же причиной, ещё раз опишите проблему и добавьте фото заключения. А если остались вопросы, задайте их в чате: нажмите кнопку «Написать продавцу». \* `reject2` — reject with response template: **Добавить фото/видео**Пришлось отклонить заявку — нужно чуть больше информации. Создайте новую заявку с такой же причиной возврата, подробно опишите проблему и добавьте фото, на которых хорошо видно: сам товар целиком, брак, бирку или этикетку, упаковку со штрихкодом Wildberries, если она осталась. Желательно добавить видео — это поможет разобраться. \* `reject3` — reject with response template: **Направить в сервисный центр**Пришлось отклонить заявку — подтвердить производственный брак не получилось. Вы можете отнести товар в сервисный центр: адрес есть на сайте производителя или в гарантийном талоне. Там всё проверят и выдадут заключение. Если производственный брак подтвердится, создайте новую заявку с такой же причиной, ещё раз опишите проблему и добавьте фото заключения. \* `rejectcustom` — reject with a comment. The comment is passed in the `comment` parameter. \* `approvecc1` — approve the request for returning the item to the seller store. You can provide a comment (e.g., contact phone number or operating hours of your returns department) in the `comment` parameter. Upon completion of the return, you need to respond to the request with `"action":"confirmreturngoodcc1"` or `"action":"rejectcustom"`. Applicable only for the **[In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup)** model. \* `confirmreturngoodcc1` — confirm receipt of the item from the buyer. Applicable only for the **[In-Store Pickup](https://dev.wildberries.ru/openapi/in-store-pickup)** model.
  - `price` `number` — Actual price with all discounts applied. Charged to the buyer
  - `currency_code` `string` — Price currency code
  - `srid` `string` — Unique order ID for which a item claim was created
  - `origin_id_info` `string` — Result of [IMEI](https://seller.wildberries.ru/instructions/ru/ru/material/items-labeling-in-fbs#imei) verification for a return via a Wildberries pickup point. The value indicates whether the IMEI specified by the seller or scanned during acceptance at a Wildberries warehouse matches the IMEI from the buyer's application, which allows for more efficient [return application processing](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim). Applicable only to \*\*Apple\*\* items of the `Smartphones` subject (`"subjectId":515`) with a price of 40,000 rubles and above, taking into account the seller discount ([only](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask) `price` and `discount` parameters and fields)
  - `delivery_dt` `string` — Date and time the buyer received the order
- `total` `integer<int64>` — Number of applications matching the query parameters. Except `limit` and `offset`

**Structure `400`:**

- `title` `string` — Error ID
- `detail` `string` — Error description
- `requestId` `string` — Request ID

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `402`:**

- `title` `string` — Error title
- `detail` `string` — Error details. The error is only returned to services from the [Solutions for business Catalog](https://dev.wildberries.ru/business-solutions)

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `429`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<your WB JWT>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_claims(is_archive=..., id=..., limit=..., offset=..., nm_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1Claims(isArchive, id, limit, offset, nmId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Claims(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1Claims(isArchive, id, limit, offset, nmId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Claims($is_archive));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Claims(is_archive).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Claims(isArchive));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = communications_api::get_v1_claims(&cfg, is_archive, id, limit, offset, nm_id).await;
    println!("{:#?}", result);
}
```

:::
