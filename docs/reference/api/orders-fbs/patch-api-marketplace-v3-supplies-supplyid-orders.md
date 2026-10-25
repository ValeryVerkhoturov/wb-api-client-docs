---
title: "Добавить сборочные задания к поставке"
description: "Метод добавляет до 100 сборочных заданий к поставке и переводит их в статус confirm — на сборке. Может перемещать сборочные задания: - между активными…"
---

# Добавить сборочные задания к поставке

```http
PATCH /api/marketplace/v3/supplies/{supplyId}/orders
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdOrders)

Метод добавляет до 100 [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) к поставке и переводит их в [статус](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` — на сборке.
Может перемещать сборочные задания:

- между активными поставками
- из закрытой поставки в активную, если сборочные задания требуют [повторной отгрузки](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3SuppliesOrdersReshipment)

В пустую поставку можно добавить любые сборочные задания, поступившие на один и тот же склад.
Поставка приобретает признаки первого добавленного в неё сборочного задания из [полей](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId):- `crossBorderType` — трансграничная или внутренняя поставка

- `cargoType` — габаритный тип
- `isB2b` — B2B-продажа
  После этого в поставку можно добавить сборочные задания только с такими же признаками `crossBorderType`, `cargoType`, `isB2b`, как у поставки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                                        | Схема    |
| ----- | ----------------------------------------------- | -------- |
| `204` | Сборочные задания закреплены за поставкой       | —        |
| `400` | Неправильный запрос                             | `Error`  |
| `401` | Не авторизован                                  | `object` |
| `402` | Требуется платёж                                | `object` |
| `403` | Доступ запрещён                                 | `Error`  |
| `404` | Не найдено                                      | `Error`  |
| `409` | Ошибка добавления сборочного задания к поставке | `Error`  |
| `429` | Слишком много запросов                          | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_supplies_supply_id_orders(supply_id=..., patch_v3_supplies_supply_id_orders_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.patchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PatchV3SuppliesSupplyIdOrders(context.Background(), supplyId).PatchV3SuppliesSupplyIdOrdersRequest(patchV3SuppliesSupplyIdOrdersRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.patchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3SuppliesSupplyIdOrders($supply_id, $patch_v3_supplies_supply_id_orders_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3SuppliesSupplyIdOrders(supplyId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3SuppliesSupplyIdOrders(supplyId, patchV3SuppliesSupplyIdOrdersRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::patch_v3_supplies_supply_id_orders(&cfg, supply_id, patch_v3_supplies_supply_id_orders_request).await;
    println!("{:#?}", result);
}
```

:::
