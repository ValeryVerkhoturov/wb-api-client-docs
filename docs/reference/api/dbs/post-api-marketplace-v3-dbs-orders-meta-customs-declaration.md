---
title: "Закрепить номера ДТ за сборочными заданиями"
description: "Метод обновляет номера ДТ — деклараций на товары — и коды стран происхождения товаров в идентификаторах маркировки сборочных заданий. У одного сборочного…"
---

# Закрепить номера ДТ за сборочными заданиями

```http
POST /api/marketplace/v3/dbs/orders/meta/customs-declaration
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Идентификаторы маркировки DBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration)

Метод обновляет номера ДТ — деклараций на товары — и коды стран происхождения товаров в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails). У одного сборочного задания может быть только один номер ДТ.
Закрепить номер ДТ можно, только если выполняются все условия:

- сборочное задание имеет признак B2B-продажи — `"isB2b":true` в ответе метода [получения новых сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew)
- сборочное задание находится в [статусах](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo) `confirm` или `deliver`
- поле `customsDeclaration` есть в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки DBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 500 запросов | 120 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                     | Схема                    |
| ----- | ---------------------------- | ------------------------ |
| `200` | Успешно                      | `api.StatusSetResponses` |
| `400` | Неправильный запрос          | `Error`                  |
| `401` | Не авторизован               | `object`                 |
| `402` | Требуется платёж             | `object`                 |
| `403` | Доступ запрещён              | `Error`                  |
| `404` | Не найдено                   | `Error`                  |
| `409` | Ошибка добавления маркировки | `Error`                  |
| `429` | Слишком много запросов       | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_customs_declaration(post_v3_dbs_orders_meta_customs_declaration_request=...)
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

const { data } = await api.postV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaCustomsDeclaration(context.Background()).PostV3DbsOrdersMetaCustomsDeclarationRequest(postV3DbsOrdersMetaCustomsDeclarationRequest).Execute()
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

System.out.println(api.postV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaCustomsDeclaration($post_v3_dbs_orders_meta_customs_declaration_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaCustomsDeclaration(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaCustomsDeclaration(postV3DbsOrdersMetaCustomsDeclarationRequest));
```

:::
