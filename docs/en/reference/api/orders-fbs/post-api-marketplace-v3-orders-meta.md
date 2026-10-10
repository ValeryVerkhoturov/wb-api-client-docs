---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/orders/meta
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Идентификаторы маркировки FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta)

Метод возвращает идентификаторы маркировки [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3OrdersNew), поля `requiredMeta` и `optionalMeta`. Если поля `requiredMeta` и `optionalMeta` не содержат какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)
- `expiration` — [срок годности товара](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaExpiration)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **получения и удаления идентификаторов маркировки FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `v3.GetMetaMultiRequest`, required

## Responses

| Code  | Description            | Schema             |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `v3.OrdersMetaAPI` |
| `400` | Неправильный запрос    | `v3.APIError`      |
| `401` | Не авторизован         | `object`           |
| `402` | Требуется платёж       | `object`           |
| `403` | Доступ запрещён        | `v3.APIError`      |
| `404` | Не найдено             | `v3.APIError`      |
| `429` | Слишком много запросов | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_meta(v3_get_meta_multi_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3OrdersMeta(v3GetMetaMultiRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3OrdersMeta(context.Background()).V3GetMetaMultiRequest(v3GetMetaMultiRequest).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3OrdersMeta(v3GetMetaMultiRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersMeta($v3_get_meta_multi_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersMeta(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersMeta(v3GetMetaMultiRequest));
```

:::
