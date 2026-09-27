---
title: "Обновить список контактов"
description: "Метод обновляет список контактов склада продавца."
---

# Обновить список контактов

```http
PUT /api/v3/dbw/warehouses/{warehouseId}/contacts
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Склады продавца · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/putV3DbwWarehousesWarehouseIdContacts)

Метод обновляет список контактов [склада продавца](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/getV3Warehouses).

Список контактов перезаписывается при обновлении. Поэтому в запросе нужно передать **все** параметры списка контактов, в том числе те, которые вы не собираетесь обновлять.

Только для складов с типом доставки `3` — Деливери WB (DBW).

К складу можно добавить максимум 5 контактов. Чтобы удалить контакты, отправьте пустой массив `contacts`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для следующих методов DBW:

- получение и обновление списка контактов
- получение и удаление идентификаторов маркировки
- методы сборочных заданий

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `StoreContactRequestBody`, required

## Responses

| Code  | Description            | Schema   |
| ----- | ---------------------- | -------- |
| `204` | Обновлено              | —        |
| `400` | Неправильный запрос    | `Error`  |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `Error`  |
| `429` | Слишком много запросов | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.putV3DbwWarehousesWarehouseIdContacts(warehouseId, storeContactRequestBody);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PutV3DbwWarehousesWarehouseIdContacts(context.Background(), warehouseId).StoreContactRequestBody(storeContactRequestBody).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.putV3DbwWarehousesWarehouseIdContacts(warehouseId, storeContactRequestBody));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->putV3DbwWarehousesWarehouseIdContacts($warehouse_id, $store_contact_request_body));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СкладыПродавцаApi(Настройки);

Сообщить(Клиент.PutV3DbwWarehousesWarehouseIdContacts(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PutV3DbwWarehousesWarehouseIdContacts(warehouseId, storeContactRequestBody));
```

:::
