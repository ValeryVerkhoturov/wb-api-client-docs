---
title: "Закрепить коды маркировки Честного знака за сборочными заданиями"
description: "Метод обновляет код маркировки Честного знака в идентификаторах маркировки сборочных заданий. Закрепить код маркировки можно только за сборочным заданием в…"
---

# Закрепить коды маркировки Честного знака за сборочными заданиями

```http
POST /api/marketplace/v3/click-collect/orders/meta/sgtin
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Идентификаторы маркировки Самовывоз · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin)

Метод обновляет код маркировки [Честного знака](https://честныйзнак.рф/) в [идентификаторах маркировки сборочных заданий](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails).
Закрепить код маркировки можно только за сборочным заданием в [статусе](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersStatusInfo) `confirm` и если в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails) есть поле `sgtin`.

Получить загруженные маркировки можно в [идентификаторах маркировки сборочного задания](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **закрепления идентификаторов маркировки Самовывоз**:

| Период                                                          | Лимит       | Интервал | Всплеск      |
| --------------------------------------------------------------- | ----------- | -------- | ------------ |
| 1 мин                                                           | 20 запросов | 3 сек    | 500 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.OrdersSGTINsSetRequest`, обязательно

- `orders` `api.SGTINs[]` (обязательно)
  - `orderId` `integer<int64>` (обязательно) — ID сборочного задания
  - `sgtins` `string[]` (обязательно) — Массив кодов маркировки. Допускается от 16 до 135 символов для кода одной маркировки

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `api.MetaSetResponses` |
| `400` | Неправильный запрос    | `api.BatchError`       |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `Error`                |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `requestId` `object` — Уникальный ID запроса
- `results` `api.MetaSetResponse[]`
  - `orderId` `integer<int64>` — ID сборочного задания
  - `isError` `boolean` — Есть ли ошибки
  - `errors` `api.MetaErrorResponse[]` — Детали ошибки
    - `code` `integer<int64>` — Код ошибки
    - `detail` `string` — - `NotFound` — сборочное задание не найдено - `IncorrectRequestBody` — неправильный запрос - `IncorrectRequest` — передан некорректный параметр

**Структура `400`:**

- `detail` `object` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

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
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные, обогащающие ошибку

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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_sgtin(api_orders_sgtins_set_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new InStorePickupApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaSgtin(context.Background()).ApiOrdersSGTINsSetRequest(apiOrdersSGTINsSetRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaSgtin($api_orders_sgtins_set_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaSgtin(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaSgtin(apiOrdersSGTINsSetRequest));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = in_store_pickup_api::post_v3_click_collect_orders_meta_sgtin(&cfg, api_period_orders_sgtins_set_request).await;
    println!("{:#?}", result);
}
```

:::
