---
title: "Отменить сборочные задания"
description: "Метод переводит сборочные задания из статусов new и confirm в статус cancel — отменено продавцом. Отменить сборочные задания в статусе deliver невозможно."
---

# Отменить сборочные задания

```http
POST /api/marketplace/v3/dbs/orders/status/cancel
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusCancel)

Метод переводит [сборочные задания](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) из [статусов](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) `new` и `confirm` в статус `cancel` — отменено продавцом.
Отменить сборочные задания в статусе `deliver` невозможно.

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период                                                          | Лимит    | Интервал | Всплеск     |
| --------------------------------------------------------------- | -------- | -------- | ----------- |
| 1 сек                                                           | 1 запрос | 1 сек    | 10 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersRequestV2`, обязательно

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `api.StatusSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`         |
| `401` | Не авторизован         | `object`                 |
| `402` | Требуется платёж       | `object`                 |
| `403` | Доступ запрещён        | `api.BatchError`         |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DBSApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DBSApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_status_cancel(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DBSApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DBSApi(cfg);

const { data } = await api.postV3DbsOrdersStatusCancel(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DBSAPI.PostV3DbsOrdersStatusCancel(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
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

System.out.println(api.postV3DbsOrdersStatusCancel(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DBSApi(new Client(), $config);

print_r($api->postV3DbsOrdersStatusCancel($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СборочныеЗаданияDBSApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStatusCancel(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DBSApi(config);

Console.WriteLine(api.PostV3DbsOrdersStatusCancel(apiOrdersRequestV2));
```

:::
