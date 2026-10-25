---
title: "Get Information about Plan Builder Options"
description: "You can get information about Plan Builder options with a token of any category."
---

# Get Information about Plan Builder Options

```http
GET /api/common/v1/tariff-constructor/options
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`general`](/en/reference/api/general/) · **Section:** Seller Information · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerInformation/operation/getV1TariffConstructorOptions)

You can get information about Plan Builder options with a token of any [category](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Token-categories).

The method returns information about all options and option packages that the seller activated in the [Plan Builder](https://seller.wildberries.ru/tariff-constructor).

Options included in activated packages are returned in the `packages` array. Options activated outside of packages are returned in the `options` array.

Method is [available](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Rules-for-using-API-access-tokens) by
**Service** token

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account:

| Period | Limit     | Interval | Burst       |
| ------ | --------- | -------- | ----------- |
| 1 min  | 1 request | 1 min    | 10 requests |

## Parameters

| Name     | In    | Type     | Req. | Description                                                        |
| -------- | ----- | -------- | ---- | ------------------------------------------------------------------ |
| `locale` | query | `string` | no   | Language of the response fields: - `ru` — Russian - `en` — English |

## Responses

| Code  | Description       | Schema                   |
| ----- | ----------------- | ------------------------ |
| `200` | Успешно           | `PlanBuilderOptionsInfo` |
| `400` | Bad request       | `PlanBuilderErrors`      |
| `401` | Unauthorized      | `object`                 |
| `403` | Access denied     | `Response4XX`            |
| `404` | Not found         | `PlanBuilderErrors`      |
| `429` | Too many requests | `object`                 |

**Structure `200`:**

- `activeOptionCount` `number<int>` — Number of active options not included in packages
- `activePackageCount` `number<int>` — Number of active option packages
- `totalCommissionRate` `number<float>` — Final fee for activated options and packages, % of turnover
- `packages` `PlanBuilderPackage[]` — Activated option packages
  - `id` `string<uuid>` — Package ID
  - `slug` `string` — Package code
  - `name` `string` — Package name in the language specified in the `locale` parameter
  - `status` `string` = `active` | `pendingActivation` | `pendingDeactivation` — Package status: - `active` — active - `pendingActivation` — activated, will start working at 00:00 the next day - `pendingDeactivation` — deactivated, will stop working at 00:00 the next day
  - `activatedAt` `string` — Package activation date
  - `expiresAt` `string` — End date of the minimum duration period for the package. The option package cannot be deactivated before this date
  - `commissionRate` `number<float>` — Fee for the package, % of turnover
  - `periodDuration` `number<int>` — Minimum duration of the package
  - `options` `PlanBuilderOptionShort[]` — Options included in the package
    - `id` `string` — Option ID
    - `slug` `string` — Option code
    - `name` `string` — Option name in the language specified in the `locale` parameter
- `options` `PlanBuilderOption[]` — Activated options
  - `id` `string` — Option ID
  - `slug` `string` — Option code
  - `name` `string` — Option name in the language specified in the `locale` parameter
  - `status` `string` = `active` | `pendingActivation` | `pendingDeactivation` — Option status: - `active` — active - `pendingActivation` — activated, will start working at 00:00 the next day - `pendingDeactivation` — deactivated, will stop working at 00:00 the next day
  - `activatedAt` `string` — Option activation date
  - `expiresAt` `string` — End date of the minimum duration period for the option. The option cannot be deactivated before this date
  - `commissionRate` `number<float>` — Cost of activating the option, % of turnover. Returned if the response does not contain the `promotion` object
  - `periodDuration` `number<int>` — Minimum duration of the option
  - `promotion` `object`
    - `commissionRate` `number<float>` — Cost of activating the option through a promo, % of turnover
    - `expiresAt` `string` — End date of the promo price

**Structure `400`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `errors` `string[]` — Request errors with specified parameters and error details

**Structure `401`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `403`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `statusText` `string` — Text of the HTTP status code
- `timestamp` `string` — Request date and time

**Structure `404`:**

- `title` `string` — Error title
- `detail` `string` — Error details
- `code` `string` — Internal error code
- `requestId` `string` — Unique request ID
- `origin` `string` — WB internal service ID
- `status` `number` — HTTP status code
- `errors` `string[]` — Request errors with specified parameters and error details

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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<your WB JWT>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_tariff_constructor_options(locale=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  GeneralApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new GeneralApi(cfg);

const { data } = await api.getV1TariffConstructorOptions(locale);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbgeneral "github.com/ValeryVerkhoturov/wb-api-client-go/general"
)

cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.GeneralAPI.GetV1TariffConstructorOptions(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.GeneralApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<your WB JWT>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV1TariffConstructorOptions(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1TariffConstructorOptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1TariffConstructorOptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1TariffConstructorOptions());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = general_api::get_v1_tariff_constructor_options(&cfg, locale).await;
    println!("{:#?}", result);
}
```

:::
