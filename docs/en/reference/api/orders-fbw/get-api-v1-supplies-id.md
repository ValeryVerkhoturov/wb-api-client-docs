---
title: "Детали поставки"
description: "Метод возвращает детали поставки по ID."
---

# Детали поставки

```http
GET /api/v1/supplies/{ID}
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Информация о поставках · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-fbw/get-api-v1-supplies-id) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesId)

Метод возвращает детали поставки по ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Сервисный          | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Parameters

| Name           | In    | Type      | Req. | Description                                                                                                                |
| -------------- | ----- | --------- | ---- | -------------------------------------------------------------------------------------------------------------------------- |
| `ID`           | path  | `integer` | yes  | ID поставки или заказа                                                                                                     |
| `isPreorderID` | query | `boolean` | no   | Поиск по: - `true` — ID заказа, если в `ID` передаёте ID заказа - `false` — ID поставки, если в `ID` передаёте ID поставки |

## Responses

| Code  | Description            | Schema                 |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `models.SupplyDetails` |
| `400` | Неправильный запрос    | `models.ErrorModel`    |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `404` | Не найдено             | `models.ErrorModel`    |
| `429` | Слишком много запросов | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_id(id=..., is_preorder_id=...)
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

const { data } = await api.getV1SuppliesId(iD, isPreorderID);
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

result, _, err := client.OrdersFbwAPI.GetV1SuppliesId(context.Background(), iD).Execute()
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

System.out.println(api.getV1SuppliesId(ID, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesId(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesId(ID));
```

:::
