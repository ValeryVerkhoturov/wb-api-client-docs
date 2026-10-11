---
title: "Расхождения в поставке"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Расхождения в поставке

```http
GET /api/supplies/v1/discrepancies/{supplyId}
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Информация о поставках · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает информацию о выявленных расхождениях между заявленным и фактическим количеством товара в поставке.

Для поставок принятых не позднее года назад.

\*\*Типы расхождений:\*\*

Расхождение в большую сторону:

1. Избыток товара с заявленным баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "surplus"`

2. Избыток товара с несоответствующим заявленному баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "re-sorting"`
  Расхождение в меньшую сторону:

1. Не хватает товара:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "shortage"`

2. Некоторые баркоды не соответствуют заявленным:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "re-sorting"`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Parameters

| Name       | In   | Type              | Req. | Description |
| ---------- | ---- | ----------------- | ---- | ----------- |
| `supplyId` | path | `string<integer>` | yes  | ID поставки |

## Responses

| Code  | Description            | Schema                                                  |
| ----- | ---------------------- | ------------------------------------------------------- |
| `200` | Успешно                | `GetV1SuppliesSupplyIdDiscrepanciesQuantityResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`                                     |
| `401` | Не авторизован         | `object`                                                |
| `403` | Доступ запрещён        | `models.SupplyAcceptedMoreThanYearAgo`                  |
| `404` | Не найдено             | `models.ErrorModel`                                     |
| `429` | Слишком много запросов | `object`                                                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_supply_id_discrepancies_quantity(supply_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1SuppliesSupplyIdDiscrepanciesQuantity(context.Background(), supplyId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesSupplyIdDiscrepanciesQuantity($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

:::
