---
title: "Создать склад продавца"
description: "Метод создаёт склад продавца для работы с остатками товаров, кроме сверхгабаритных (СГТ), по модели FBS (Fulfillment by Seller)."
---

# Создать склад продавца

```http
POST /api/v3/warehouses
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Склады продавца · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/sellerWarehouses/operation/postV3Warehouses)

Метод создаёт склад продавца для работы с [остатками товаров](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory), кроме сверхгабаритных (СГТ), по модели [FBS](https://dev.wildberries.ru/openapi/orders-fbs) (Fulfillment by Seller).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **складов продавца**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

- `name` `string` (обязательно) — Имя склада продавца
- `officeId` `integer<int64>` (обязательно) — ID [склада WB](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses/operation/getV3Offices). Нельзя привязывать склад WB, который уже используется

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

**Структура `201`:**

- `id` `integer<int64>` — ID склада продавца

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

**Структура `409`:**

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

result = api.post_v3_warehouses(post_v3_warehouses_request=...)
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

const { data } = await api.postV3Warehouses(postV3WarehousesRequest);
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

result, _, err := client.ItemsAPI.PostV3Warehouses(context.Background()).PostV3WarehousesRequest(postV3WarehousesRequest).Execute()
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

System.out.println(api.postV3Warehouses(postV3WarehousesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV3Warehouses($post_v3_warehouses_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV3Warehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV3Warehouses(postV3WarehousesRequest));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::post_v3_warehouses(&cfg, post_v3_warehouses_request).await;
    println!("{:#?}", result);
}
```

:::
