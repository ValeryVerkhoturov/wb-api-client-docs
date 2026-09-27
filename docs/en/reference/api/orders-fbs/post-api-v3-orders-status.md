---
title: "Получить статусы сборочных заданий"
description: "Метод возвращает статусы сборочных заданий по их ID."
---

# Получить статусы сборочных заданий

```http
POST /api/v3/orders/status
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Сборочные задания FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus)

Метод возвращает статусы [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) по их ID.

`supplierStatus` — статус сборочного задания. Триггер его изменения — действие самого продавца.
Возможные значения `supplierStatus`:

| Статус            | Описание                                                            | Как перевести сборочное задание в данный статус                                                                                                    |
| ----------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new`             | \*\*Новое сборочное задание\*\*                                     |                                                                                                                                                    |
| `confirm`         | \*\*На сборке\*\*                                                   | [Добавить сборочное задание к поставке](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdOrders)<br> | `complete` | \*\*В доставке\*\* | [Передать поставку в доставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver) |
| `cancel`          | \*\*Отменено продавцом\*\*                                          | [Отменить сборочное задание](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/patchV3OrdersOrderIdCancel)             |
| `cancel\_carrier` | \*\*Отменено перевозчиком\*\*<br>Только для трансграничных поставок | Переводится перевозчиком                                                                                                                           |

`wbStatus` — статус системы Wildberries.
Возможные значения `wbStatus`:

- `waiting` — сборочное задание в работе
- `sorted` — сборочное задание отсортировано
- `sold` — заказ получен покупателем
- `canceled` — отмена сборочного задания
- `canceled\_by\_client` — покупатель отменил заказ при получении
- `declined\_by\_client` — покупатель отменил заказ. Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку
- `defect` — отмена заказа по причине брака
- `ready\_for\_pickup` — заказ прибыл на пункт выдачи заказов (ПВЗ)
- `accepted\_by\_carrier` — продавец передал заказ в службу доставки в своей стране
- `sent\_to\_carrier` — заказ отправлен на склад службы доставки в стране продавца
- `canceled\_by\_carrier` — заказ отменён перевозчиком. Только для трансграничных поставок

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `PostV3OrdersStatusResponse200` |
| `400` | Неправильный запрос    | `Error`                         |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `Error`                         |
| `429` | Слишком много запросов | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<your WB JWT>")
api = FBSApi(ApiClient(cfg))

result = api.post_v3_orders_status(post_v3_orders_status_request=...)
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

const { data } = await api.postV3OrdersStatus(postV3OrdersStatusRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PostV3OrdersStatus(context.Background()).Execute()
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

System.out.println(api.postV3OrdersStatus(postV3OrdersStatusRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FBSApi(new Client(), $config);

print_r($api->postV3OrdersStatus());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СборочныеЗаданияFBSApi(Настройки);

Сообщить(Клиент.PostV3OrdersStatus(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FBSApi(config);

Console.WriteLine(api.PostV3OrdersStatus());
```

:::
