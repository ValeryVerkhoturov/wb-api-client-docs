---
title: "Получить стикеры сборочных заданий"
description: "Метод возвращает список стикеров для сборочных заданий в статусах confirm — на сборке и complete — в доставке."
---

# Получить стикеры сборочных заданий

```http
POST /api/v3/orders/stickers
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Сборочные задания FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStickers)

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

## Parameters

| Name     | In    | Type      | Req. | Description    |
| -------- | ----- | --------- | ---- | -------------- |
| `type`   | query | `string`  | yes  | Тип стикера    |
| `width`  | query | `integer` | yes  | Ширина стикера |
| `height` | query | `integer` | yes  | Высота стикера |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                            |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `PostV3OrdersStickersResponse200` |
| `400` | Неправильный запрос    | `Error`                           |
| `401` | Не авторизован         | `object`                          |
| `402` | Требуется платёж       | `object`                          |
| `403` | Доступ запрещён        | `Error`                           |
| `409` | Конфликт               | `Error`                           |
| `429` | Слишком много запросов | `object`                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<your WB JWT>")
api = FBSApi(ApiClient(cfg))

result = api.post_v3_orders_stickers(type=..., width=..., height=..., post_v3_orders_stickers_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FBSApi(cfg);

const { data } = await api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PostV3OrdersStickers(context.Background()).Width(width).Height(height).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.FbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FbsApi api = new FbsApi(client);

System.out.println(api.postV3OrdersStickers(type, width, height, postV3OrdersStickersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FBSApi(new Client(), $config);

print_r($api->postV3OrdersStickers($type, $width, $height));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СборочныеЗаданияFBSApi(Настройки);

Сообщить(Клиент.PostV3OrdersStickers(type, width, height, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FBSApi(config);

Console.WriteLine(api.PostV3OrdersStickers(type, width, height));
```

:::
