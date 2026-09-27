---
title: "Создать склад продавца"
description: "Метод создаёт склад продавца для работы с остатками товаров, кроме сверхгабаритных (СГТ), по модели FBS (Fulfillment by Seller)."
---

# Создать склад продавца

```http
POST /api/v3/warehouses
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Склады продавца · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/postV3Warehouses)

Метод создаёт склад продавца для работы с [остатками товаров](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory), кроме сверхгабаритных (СГТ), по модели [FBS](https://dev.wildberries.ru/openapi/orders-fbs) (Fulfillment by Seller).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **складов продавца**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание                      | Схема                         |
| ----- | ----------------------------- | ----------------------------- |
| `201` | Создано                       | `PostV3WarehousesResponse201` |
| `400` | Неправильный запрос           | `Error`                       |
| `401` | Не авторизован                | `object`                      |
| `402` | Требуется платёж              | `object`                      |
| `403` | Доступ запрещён               | `Error`                       |
| `404` | Не найдено                    | `Error`                       |
| `409` | Ошибка создания нового склада | `Error`                       |
| `429` | Слишком много запросов        | `object`                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV3Warehouses(postV3WarehousesRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV3Warehouses(context.Background()).PostV3WarehousesRequest(postV3WarehousesRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV3Warehouses(postV3WarehousesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV3Warehouses($post_v3_warehouses_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СкладыПродавцаApi(Настройки);

Сообщить(Клиент.PostV3Warehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV3Warehouses(postV3WarehousesRequest));
```

:::
