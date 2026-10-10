---
title: "Получить статусы сборочных заданий"
description: "Метод возвращает статусы сборочных заданий по их ID."
---

# Получить статусы сборочных заданий

```http
POST /api/marketplace/v3/dbs/orders/status/info
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo)

Метод возвращает статусы [сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) по их ID.

`supplierStatus` — статус сборочного задания. Триггер его изменения — действие самого продавца.
Возможные значения `supplierStatus`:

| Статус    | Описание                        | Как перевести сборочное задание в данный статус                                                                                                  |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `new`     | \*\*Новое сборочное задание\*\* |                                                                                                                                                  |
| `confirm` | \*\*На сборке\*\*               | [Перевести сборочное задание на сборку](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusConfirm)<br> | `deliver` | \*\*В доставке\*\* | [Перевести сборочное задание в доставку](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusDeliver)<br> | `receive` | \*\*Получено покупателем\*\* | [Сообщить, что заказ принят покупателем](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusReceive)<br> | `reject` | \*\*Отказ покупателя при получении\*\* | [Сообщить, что покупатель отказался от заказа](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusReject)<br> | `cancel` | \*\*Отменено продавцом\*\* | [Отменить сборочное задание](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusCancel)<br> | `cancel\_missed\_call` | \*\*Отмена по причине недозвона\*\* | Статус меняется автоматически |

`wbStatus` — статус системы Wildberries.
Возможные значения `wbStatus`:

- `waiting` — сборочное задание в работе
- `sold` — заказ получен покупателем
- `canceled` — отмена сборочного задания
- `canceled\_by\_client` — покупатель отменил заказ при получении
- `declined\_by\_client` — покупатель отменил заказ в первый чаc

Отмена доступна покупателю в первый час с момента заказа, если заказ не переведен на сборку

- `defect` — отмена заказа по причине брака
- `ready\_for\_pickup` — заказ прибыл на ПВЗ
- `canceled\_by\_missed\_call` — отмена по причине недозвона

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersRequestV2`, обязательно

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `api.OrderStatusesV2` |
| `400` | Неправильный запрос    | `api.BatchError`      |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `403` | Доступ запрещён        | `api.BatchError`      |
| `404` | Не найдено             | `api.BatchError`      |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_status_info(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersStatusInfo(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersStatusInfo(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersStatusInfo(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersStatusInfo($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStatusInfo(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersStatusInfo(apiOrdersRequestV2));
```

:::
