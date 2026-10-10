---
title: "Удалить идентификаторы маркировки сборочных заданий"
description: "Метод удаляет значение указанных идентификаторов маркировки сборочных заданий."
---

# Удалить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/dbs/orders/meta/delete
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Идентификаторы маркировки DBS · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-delete) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDelete)

Метод удаляет значение указанных [идентификаторов маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails).

В одном запросе можно удалить идентификаторы маркировки только одного типа. Укажите тип идентификаторов маркировки в запросе:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration). При удалении номера ДТ также удаляется код страны происхождения товара — `originCountryCode`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **получения и удаления идентификаторов маркировки DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 150 запросов | 400 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersMetaDeleteRequest`, обязательно

## Ответы

| Код   | Описание                                   | Схема                    |
| ----- | ------------------------------------------ | ------------------------ |
| `200` | Успешно                                    | `api.StatusSetResponses` |
| `400` | Неправильный запрос                        | `api.BatchError`         |
| `401` | Не авторизован                             | `object`                 |
| `402` | Требуется платёж                           | `object`                 |
| `403` | Доступ запрещён                            | `api.BatchError`         |
| `409` | Ошибка удаления идентификаторов маркировки | `api.Error`              |
| `429` | Слишком много запросов                     | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_delete(api_orders_meta_delete_request=...)
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

const { data } = await api.postV3DbsOrdersMetaDelete(apiOrdersMetaDeleteRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaDelete(context.Background()).ApiOrdersMetaDeleteRequest(apiOrdersMetaDeleteRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaDelete(apiOrdersMetaDeleteRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaDelete($api_orders_meta_delete_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaDelete(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaDelete(apiOrdersMetaDeleteRequest));
```

:::
