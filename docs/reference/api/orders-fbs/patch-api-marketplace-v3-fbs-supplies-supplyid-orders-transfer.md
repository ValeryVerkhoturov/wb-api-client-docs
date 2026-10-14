---
title: "Перевести сборочные задания из доставки на сборку"
description: "Метод переводит сборочные задания из статуса complete — в доставке в статус confirm — на сборке."
---

# Перевести сборочные задания из доставки на сборку

```http
PATCH /api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer)

Метод переводит сборочные задания из статуса `complete` — в доставке в статус `confirm` — на сборке.

Используйте метод, чтобы переместить сборочное задание из закрытой поставки в открытую.

Сборочное задание можно перевести из доставки на сборку, если выполнены все условия:

- сборочное задание находится в статусе `complete` — в доставке
- поставка, в которую нужно перенести сборочное задание, [не передана в доставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)
- сборочное задание ранее не переносили из доставки на сборку
  Чтобы проверить, можно ли перевести сборочное задание из доставки на сборку, используйте [статусы сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus), поле `isTransferable`.

## Параметры

| Имя        | Где  | Тип      | Обяз. | Описание                                        |
| ---------- | ---- | -------- | ----- | ----------------------------------------------- |
| `supplyId` | path | `string` | да    | ID поставки, из которой будут перемещены заказы |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание            | Схема                                 |
| ----- | ------------------- | ------------------------------------- |
| `200` | Успешно             | `v3.TransferOrdersToAssemblyResponse` |
| `400` | Неправильный запрос | `Error`                               |
| `401` | Не авторизован      | `object`                              |
| `403` | Доступ запрещён     | `Error`                               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_fbs_supplies_supply_id_orders_transfer(supply_id=..., patch_v3_fbs_supplies_supply_id_orders_transfer_request=...)
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

const { data } = await api.patchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest);
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

result, _, err := client.OrdersFbsAPI.PatchV3FbsSuppliesSupplyIdOrdersTransfer(context.Background(), supplyId).PatchV3FbsSuppliesSupplyIdOrdersTransferRequest(patchV3FbsSuppliesSupplyIdOrdersTransferRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.patchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3FbsSuppliesSupplyIdOrdersTransfer($supply_id, $patch_v3_fbs_supplies_supply_id_orders_transfer_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3FbsSuppliesSupplyIdOrdersTransfer(supplyId, patchV3FbsSuppliesSupplyIdOrdersTransferRequest));
```

:::
