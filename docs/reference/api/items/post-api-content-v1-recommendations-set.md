---
title: "Установить рекомендации для товаров"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Установить рекомендации для товаров

```http
POST /api/content/v1/recommendations/set
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Рекомендации · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/recommendations/operation/postV1RecommendationsSet)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод обновляет, добавляет или удаляет [рекомендации](https://seller.wildberries.ru/recommendations-v3) для товаров.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Тело запроса

`application/json` — схема `SetRecomReq`, обязательно

- `recList` `object[]` (обязательно) — Список рекомендаций для товаров
  - `nmId` `integer<int64>` — Артикул WB
  - `recommendations` `object[]` — Рекомендуемые товары. Укажите `recomNm` товаров, чтобы добавить их в рекомендации к указанному `nmId`. При отправке пустого массива `[]` все текущие рекомендации для указанного `nmId` будут удалены.
    - `recomNm` `integer<int64>` — Артикул WB рекомендуемого товара
    - `sort` `integer<int64>` — Позиция товара в списке рекомендаций. Допустимые значения: - `1`–`20` — фиксированная позиция: - при создании или замене (`replace: true`) задаёт порядок отображения - при добавлении (`replace: false`) вставляет товар на указанную позицию, существующие сдвигаются - `0` — автоматическая сортировка товаров: - при создании или замене (`replace: true`) — в порядке расположения товаров в массиве `recommendations` - при добавлении (`replace: false`) — в конец списка существующих рекомендаций, сохраняя порядок из массива `recommendations`
- `replace` `boolean` — Действие в запросе: - `false` — добавить новые рекомендации к существующим - `true` — заменить существующие рекомендации новыми

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `SetRecomRes`         |
| `208` | Уже отправлено         | `response208SetRecom` |
| `400` | Неправильный запрос    | `response400SetRecom` |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `Response4XX`         |
| `429` | Слишком много запросов | `object`              |

**Структура `200`:**

- `isError` `boolean` — Есть ли ошибки: - `false` — ошибок нет. Запрос полностью успешен - `true` — ошибки есть
- `errors` `object[]` — Ошибки. При `"isError":true`
  - `mainNm` `string` — Значение параметра `nmId`
  - `recomNm` `string` — Значение параметра `recomNm`
  - `message` `string` — Сообщение об ошибке

**Структура `208`:**

- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `title` `string` — Заголовок ответа
- `detail` `string` — Детали ответа

**Структура `400`:**

- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `403`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

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

result = api.post_v1_recommendations_set(set_recom_req=...)
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

const { data } = await api.postV1RecommendationsSet(setRecomReq);
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

result, _, err := client.ItemsAPI.PostV1RecommendationsSet(context.Background()).SetRecomReq(setRecomReq).Execute()
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

System.out.println(api.postV1RecommendationsSet(setRecomReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV1RecommendationsSet($set_recom_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV1RecommendationsSet(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV1RecommendationsSet(setRecomReq));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::post_v1_recommendations_set(&cfg, set_recom_req).await;
    println!("{:#?}", result);
}
```

:::
