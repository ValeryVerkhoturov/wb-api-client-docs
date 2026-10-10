---
title: "Закрепить УИН за сборочными заданиями"
description: "Метод обновляет УИН, уникальные идентификационные номера, в идентификаторах маркировки сборочных заданий. У одного сборочного задания может быть только один…"
---

# Закрепить УИН за сборочными заданиями

```http
POST /api/marketplace/v3/dbs/orders/meta/uin
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Идентификаторы маркировки DBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin)

Метод обновляет УИН, уникальные идентификационные номера, в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails).
У одного сборочного задания может быть только один УИН.
Закрепить УИН можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails) есть поле `uin`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 500 запросов | 120 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersUINSetRequest`, обязательно

## Ответы

| Код   | Описание                                     | Схема                    |
| ----- | -------------------------------------------- | ------------------------ |
| `200` | Успешно                                      | `api.StatusSetResponses` |
| `400` | Неправильный запрос                          | `api.BatchError`         |
| `401` | Не авторизован                               | `object`                 |
| `402` | Требуется платёж                             | `object`                 |
| `403` | Доступ запрещён                              | `api.BatchError`         |
| `409` | Ошибка обновления идентификаторов маркировки | `api.Error`              |
| `429` | Слишком много запросов                       | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_uin(api_orders_uin_set_request=...)
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

const { data } = await api.postV3DbsOrdersMetaUin(apiOrdersUINSetRequest);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaUin(context.Background()).ApiOrdersUINSetRequest(apiOrdersUINSetRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaUin(apiOrdersUINSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaUin($api_orders_uin_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaUin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaUin(apiOrdersUINSetRequest));
```

:::
