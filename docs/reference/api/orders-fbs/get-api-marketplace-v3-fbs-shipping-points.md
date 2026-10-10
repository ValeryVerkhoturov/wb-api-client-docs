---
title: "Получить список пунктов отгрузки поставок"
description: "Метод возвращает доступные пункты отгрузки поставок с фильтрами: - по населённым пунктам России - по типам товаров, которые принимает пункт отгрузки…"
---

# Получить список пунктов отгрузки поставок

```http
GET /api/marketplace/v3/fbs/shipping-points
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints)

Метод возвращает доступные пункты отгрузки поставок с фильтрами:

- по населённым пунктам России
- по типам товаров, которые принимает пункт отгрузки
  Используйте данные из этого метода, чтобы устанавливать [параметры отгрузки поставок](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod).

Доступно только для продавцов из РФ.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя         | Где   | Тип       | Обяз. | Описание                                                                                                                                                   |
| ----------- | ----- | --------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `city`      | query | `string`  | да    | Населённый пункт отгрузки поставки, кириллица                                                                                                              |
| `cargoType` | query | `integer` | да    | Тип товара, который принимает пункт отгрузки: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) |

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `ShippingPointsResponse` |
| `400` | Неправильный запрос    | `Error`                  |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `object`                 |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_shipping_points(city=..., cargo_type=...)
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

const { data } = await api.getV3FbsShippingPoints(city, cargoType);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3FbsShippingPoints(context.Background()).City(city).CargoType(cargoType).Execute()
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

System.out.println(api.getV3FbsShippingPoints(city, cargoType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsShippingPoints($city, $cargo_type));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsShippingPoints(city, cargoType).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsShippingPoints(city, cargoType));
```

:::
