---
title: "Установить параметры отгрузки поставок"
description: "Метод устанавливает способ доставки, дату и пункт отгрузки у поставок."
---

# Установить параметры отгрузки поставок

```http
PATCH /api/marketplace/v3/fbs/supplies/shipping-method
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-supplies-shipping-method) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod)

Метод устанавливает способ доставки, дату и пункт отгрузки у поставок.

Параметры отгрузки нужно указать до передачи поставки в доставку. Вы можете обновлять параметры отгрузки до сканирования поставки и её коробов в пункте отгрузки. Когда поставка будет отсканирована, метод начнёт возвращать ошибку `409`.

В запросе можно указать максимум 100 поставок. Результат обработки возвращается для каждой поставки отдельно.

Доступно только для продавцов из РФ.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `UpdateSuppliesShippingMethodResponse` |
| `400` | Неправильный запрос    | `Error`                                |
| `401` | Не авторизован         | `object`                               |
| `403` | Доступ запрещён        | `Error`                                |
| `409` | Конфликт               | `v3.APIError`                          |
| `429` | Слишком много запросов | `object`                               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.patch_v3_fbs_supplies_shipping_method(patch_v3_fbs_supplies_shipping_method_request=...)
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

const { data } = await api.patchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest);
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

result, _, err := client.OrdersFbsAPI.PatchV3FbsSuppliesShippingMethod(context.Background()).PatchV3FbsSuppliesShippingMethodRequest(patchV3FbsSuppliesShippingMethodRequest).Execute()
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

System.out.println(api.patchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3FbsSuppliesShippingMethod($patch_v3_fbs_supplies_shipping_method_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3FbsSuppliesShippingMethod(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3FbsSuppliesShippingMethod(patchV3FbsSuppliesShippingMethodRequest));
```

:::
