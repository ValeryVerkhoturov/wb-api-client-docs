---
title: "Получить стикеры сборочных заданий"
description: "Метод возвращает список стикеров для сборочных заданий в статусах confirm — на сборке и complete — в доставке."
---

# Получить стикеры сборочных заданий

```http
POST /api/v3/orders/stickers
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/orders-fbs/post-api-v3-orders-stickers) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStickers)

Метод возвращает список стикеров для [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders) в [статусах](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` — на сборке и `complete` — в доставке.

Если за сборочным заданием не закреплён обязательный [номер декларации на товары (ДТ)](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration), получить стикеры для этого сборочного задания невозможно.

За один запрос можно получить максимум 100 стикеров.
Можно получить стикер в форматах:

- SVG
- ZPLV (вертикальный)
- ZPLH (горизонтальный)
- PNG
  Доступны размеры:
- 580x400 px при `width=58&height=40` в запросе
- 400x300 px при `width=40&height=30` в запросе

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Параметры

| Имя      | Где   | Тип       | Обяз. | Описание       |
| -------- | ----- | --------- | ----- | -------------- |
| `type`   | query | `string`  | да    | Тип стикера    |
| `width`  | query | `integer` | да    | Ширина стикера |
| `height` | query | `integer` | да    | Высота стикера |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема                             |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `PostV3OrdersStickersResponse200` |
| `400` | Неправильный запрос    | `Error`                           |
| `401` | Не авторизован         | `object`                          |
| `402` | Требуется платёж       | `object`                          |
| `403` | Доступ запрещён        | `Error`                           |
| `409` | Конфликт               | `Error`                           |
| `429` | Слишком много запросов | `object`                          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_stickers(type=..., width=..., height=..., post_v3_orders_stickers_request=...)
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

const { data } = await api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest);
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

result, _, err := client.OrdersFbsAPI.PostV3OrdersStickers(context.Background()).Width(width).Height(height).Execute()
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

System.out.println(api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersStickers($type, $width, $height));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersStickers(type, width, height, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersStickers(type, width, height));
```

:::
