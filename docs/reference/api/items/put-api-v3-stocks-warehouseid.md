---
title: "Обновить остатки товаров"
description: "Метод обновляет количество остатков товаров продавца в списке."
---

# Обновить остатки товаров

```http
PUT /api/v3/stocks/{warehouseId}
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Остатки на складах продавца · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/sellerWarehousesInventory/operation/putV3StocksWarehouseId)

Метод обновляет количество остатков товаров продавца [в списке](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/postV3StocksWarehouseId).

Названия параметров запроса не валидируются. При отправке некорректных названий вы получите успешный ответ (`204`), но остатки не обновятся.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **остатков на складах продавца** кроме метода [удаления остатков](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory/operation/deleteV3StocksWarehouseId):

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, необязательно

- `stocks` `object[]` (обязательно) — Массив ID размеров товаров и их остатков
  - `chrtId` `integer<int64>` (обязательно) — ID размера товара
  - `amount` `integer<int64>` (обязательно) — Остаток

## Ответы

| Код   | Описание               | Схема                               |
| ----- | ---------------------- | ----------------------------------- |
| `204` | Обновлено              | —                                   |
| `400` | Неправильный запрос    | `Error`                             |
| `401` | Не авторизован         | `object`                            |
| `402` | Требуется платёж       | `object`                            |
| `403` | Доступ запрещён        | `Error`                             |
| `404` | Не найдено             | `Error`                             |
| `406` | Не применимо           | `UpdateBlocked`                     |
| `409` | Конфликт               | `PutV3StocksWarehouseIdResponse409` |
| `429` | Слишком много запросов | `object`                            |

**Структура `400`:**

- `code` `string` — Код ошибки
- `message` `string` — Детали ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `403`:**

- `code` `string` — Код ошибки
- `message` `string` — Детали ошибки

**Структура `404`:**

- `code` `string` — Код ошибки
- `message` `string` — Детали ошибки

**Структура `406`:**

- `code` `string` — Код ошибки
- `message` `string` — Детали ошибки

**Структура `409` — `object[]`:**

- `data` `object[]` — Дополнительная информация об ошибке
  - `sku` `string` — Не используется
  - `chrtId` `integer<int64>` — ID размера
  - `amount` `integer<int64>` — Остаток
- `code` `string` — Код ошибки
- `message` `string` — Детали ошибки

**Структура `429`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.put_v3_stocks_warehouse_id(warehouse_id=..., put_v3_stocks_warehouse_id_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ItemsApi(cfg);

const { data } = await api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PutV3StocksWarehouseId(context.Background(), warehouseId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.putV3StocksWarehouseId(warehouseId, putV3StocksWarehouseIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->putV3StocksWarehouseId($warehouse_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PutV3StocksWarehouseId(warehouseId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PutV3StocksWarehouseId(warehouseId));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::put_v3_stocks_warehouse_id(&cfg, warehouse_id, put_v3_stocks_warehouse_id_request).await;
    println!("{:#?}", result);
}
```

:::
