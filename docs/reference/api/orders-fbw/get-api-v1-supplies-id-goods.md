---
title: "Товары поставки"
description: "Метод возвращает информацию о товарах в поставке."
---

# Товары поставки

```http
GET /api/v1/supplies/{ID}/goods
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/orders-fbw/get-api-v1-supplies-id-goods) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesIdGoods)

Метод возвращает информацию о товарах в поставке.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Сервисный          | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Параметры

| Имя            | Где   | Тип       | Обяз. | Описание                                                                                                                   |
| -------------- | ----- | --------- | ----- | -------------------------------------------------------------------------------------------------------------------------- |
| `limit`        | query | `integer` | нет   | Количество записей в ответе                                                                                                |
| `offset`       | query | `integer` | нет   | После какого элемента выдавать данные                                                                                      |
| `isPreorderID` | query | `boolean` | нет   | Поиск по: - `true` — ID заказа, если в `ID` передаёте ID заказа - `false` — ID поставки, если в `ID` передаёте ID поставки |
| `ID`           | path  | `integer` | да    | ID поставки или заказа                                                                                                     |

## Ответы

| Код   | Описание               | Схема                             |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `GetV1SuppliesIdGoodsResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`               |
| `401` | Не авторизован         | `object`                          |
| `402` | Требуется платёж       | `object`                          |
| `403` | Доступ запрещён        | `object`                          |
| `429` | Слишком много запросов | `object`                          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_supplies_id_goods(id=..., limit=..., offset=..., is_preorder_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1SuppliesIdGoods(iD, limit, offset, isPreorderID);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1SuppliesIdGoods(context.Background(), iD).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1SuppliesIdGoods(ID, limit, offset, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1SuppliesIdGoods($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1SuppliesIdGoods(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1SuppliesIdGoods(ID));
```

:::
