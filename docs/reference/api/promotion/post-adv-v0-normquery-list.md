---
title: "Списки активных и неактивных поисковых кластеров"
description: "Метод возвращает списки активных и неактивных поисковых кластеров, по которым было не меньше 100 показов."
---

# Списки активных и неактивных поисковых кластеров

```http
POST /adv/v0/normquery/list
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Поисковые кластеры · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/searchClusters/operation/postV0NormqueryList)

Метод возвращает списки активных и неактивных поисковых кластеров, по которым было не меньше 100 показов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск     |
| ------------------ | ------ | ---------- | -------- | ----------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос    |

## Тело запроса

`application/json` — схема `V0GetNormQueryListRequest`, обязательно

- `items` `V0GetNormQueryListRequestItem[]` (обязательно)
  - `advertId` `integer<int64>` (обязательно) — ID кампании
  - `nmId` `integer<int64>` (обязательно) — Артикул WB

## Ответы

| Код   | Описание               | Схема                        |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `V0GetNormQueryListResponse` |
| `400` | Неправильный запрос    | `response400`                |
| `401` | Не авторизован         | `object`                     |
| `403` | Доступ запрещён        | `object`                     |
| `429` | Слишком много запросов | `object`                     |

**Структура `200`:**

- `items` `V0GetNormQueryListResponseItem[]`
  - `advertId` `integer<int64>` — ID кампании
  - `nmId` `integer<int64>` — Артикул WB
  - `normQueries` `V0GetNormQueryListResponseItemNormQueries`
    - `active` `string[]` — Активные поисковые кластеры
    - `excluded` `string[]` — Неактивные поисковые кластеры
    - `archived` `string[]` — Архивные поисковые кластеры

**Структура `400`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `request_id` `string` — Уникальный ID запроса
- `status` `integer<int64>` — HTTP статус-код
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
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v0_normquery_list(v0_get_norm_query_list_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.postV0NormqueryList(v0GetNormQueryListRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV0NormqueryList(context.Background()).V0GetNormQueryListRequest(v0GetNormQueryListRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.postV0NormqueryList(v0GetNormQueryListRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV0NormqueryList($v0_get_norm_query_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV0NormqueryList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV0NormqueryList(v0GetNormQueryListRequest));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::post_v0_normquery_list(&cfg, v0_get_norm_query_list_request).await;
    println!("{:#?}", result);
}
```

:::
