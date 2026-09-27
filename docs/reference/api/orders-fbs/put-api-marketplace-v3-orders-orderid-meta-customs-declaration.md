---
title: "Закрепить номер ДТ за сборочным заданием"
description: "Метод обновляет номер ДТ — декларации на товары — в идентификаторах маркировки сборочного задания. У одного сборочного задания может быть только один номер ДТ.…"
---

# Закрепить номер ДТ за сборочным заданием

```http
PUT /api/marketplace/v3/orders/{orderId}/meta/customs-declaration
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Идентификаторы маркировки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration)

Метод обновляет номер ДТ — декларации на товары — в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta). У одного сборочного задания может быть только один номер ДТ.
Закрепить номер ДТ можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta) есть поле `customsDeclaration`.

Продавцам из Армении необходимо обязательно указывать номер декларации на товары (ДТ), произведённые вне ЕАЭС, если заказ из Армении доставляется в РФ.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **закрепления идентификаторов маркировки FBS**:

| Период                                                          | Лимит         | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------- | -------- | ----------- |
| 1 мин                                                           | 1000 запросов | 60 мс    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                    | Схема    |
| ----- | --------------------------- | -------- |
| `204` | Обновлено                   | —        |
| `400` | Неправильный запрос         | `Error`  |
| `401` | Не авторизован              | `object` |
| `402` | Требуется платёж            | `object` |
| `403` | Доступ запрещён             | `Error`  |
| `404` | Не найдено                  | `Error`  |
| `409` | Ошибка обновления номера ДТ | `Error`  |
| `429` | Слишком много запросов      | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FBSApi(ApiClient(cfg))

result = api.put_v3_orders_order_id_meta_customs_declaration(order_id=..., put_v3_orders_order_id_meta_customs_declaration_request=...)
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

const { data } = await api.putV3OrdersOrderIdMetaCustomsDeclaration(orderId, putV3OrdersOrderIdMetaCustomsDeclarationRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PutV3OrdersOrderIdMetaCustomsDeclaration(context.Background(), orderId).PutV3OrdersOrderIdMetaCustomsDeclarationRequest(putV3OrdersOrderIdMetaCustomsDeclarationRequest).Execute()
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

System.out.println(api.putV3OrdersOrderIdMetaCustomsDeclaration(orderId, putV3OrdersOrderIdMetaCustomsDeclarationRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FBSApi(new Client(), $config);

print_r($api->putV3OrdersOrderIdMetaCustomsDeclaration($order_id, $put_v3_orders_order_id_meta_customs_declaration_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИдентификаторыМаркировкиFBSApi(Настройки);

Сообщить(Клиент.PutV3OrdersOrderIdMetaCustomsDeclaration(orderId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FBSApi(config);

Console.WriteLine(api.PutV3OrdersOrderIdMetaCustomsDeclaration(orderId, putV3OrdersOrderIdMetaCustomsDeclarationRequest));
```

:::
