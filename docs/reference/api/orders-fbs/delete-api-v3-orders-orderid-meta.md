---
title: "Удалить идентификаторы маркировки сборочного задания"
description: "Метод удаляет значение идентификаторов маркировки сборочного задания для переданного ключа."
---

# Удалить идентификаторы маркировки сборочного задания

```http
DELETE /api/v3/orders/{orderId}/meta
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Идентификаторы маркировки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/deleteV3OrdersOrderIdMeta)

Метод удаляет значение [идентификаторов маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) для переданного ключа.

Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration)
  Можно передать только один ключ.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **получения и удаления идентификаторов маркировки FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Параметры

| Имя   | Где   | Тип      | Обяз. | Описание                                                                           |
| ----- | ----- | -------- | ----- | ---------------------------------------------------------------------------------- |
| `key` | query | `string` | да    | Название идентификаторов маркировки для удаления. Передаётся только одно значение. |

## Ответы

| Код   | Описание                                   | Схема    |
| ----- | ------------------------------------------ | -------- |
| `204` | Удалено                                    | —        |
| `400` | Неправильный запрос                        | `Error`  |
| `401` | Не авторизован                             | `object` |
| `402` | Требуется платёж                           | `object` |
| `403` | Доступ запрещён                            | `Error`  |
| `409` | Ошибка удаления идентификаторов маркировки | `Error`  |
| `429` | Слишком много запросов                     | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FBSApi(ApiClient(cfg))

result = api.delete_v3_orders_order_id_meta(order_id=..., key=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FBSApi(cfg);

const { data } = await api.deleteV3OrdersOrderIdMeta(orderId, key);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.DeleteV3OrdersOrderIdMeta(context.Background(), orderId).Key(key).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
FbsApi api = new FbsApi(client);

System.out.println(api.deleteV3OrdersOrderIdMeta(orderId, key));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FBSApi(new Client(), $config);

print_r($api->deleteV3OrdersOrderIdMeta($order_id, $key));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИдентификаторыМаркировкиFBSApi(Настройки);

Сообщить(Клиент.DeleteV3OrdersOrderIdMeta(orderId, key).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FBSApi(config);

Console.WriteLine(api.DeleteV3OrdersOrderIdMeta(orderId, key));
```

:::
