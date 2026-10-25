---
title: "Получение новостей портала продавцов"
description: "Метод позволяет получать новости портала продавцов. Для получения успешного ответа необходимо указать один из параметров from или fromID. За один запрос можно…"
---

# Получение новостей портала продавцов

```http
GET /api/communications/v2/news
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** API новостей · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/newsApi/operation/getV2News)

Метод позволяет получать новости портала продавцов.
Для получения успешного ответа необходимо указать
один из параметров `from` или `fromID`.
За один запрос можно получить не более 100 новостей.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск     |
| ------------------ | ------ | -------- | -------- | ----------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос    |

## Параметры

| Имя      | Где   | Тип              | Обяз. | Описание                                                                    |
| -------- | ----- | ---------------- | ----- | --------------------------------------------------------------------------- |
| `from`   | query | `string`         | нет   | Дата, от которой необходимо выдать новости                                  |
| `fromID` | query | `integer<int64>` | нет   | ID новости, начиная с которой — включая её — нужно получить список новостей |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `GetV2NewsResponse200` |
| `400` | Неправильный запрос    | —                      |
| `401` | Не авторизован         | `object`               |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `data` `object[]` — Новости
  - `content` `string<plaintext>` — Текст новости
  - `date` `string` — Дата и время публикации новости
  - `header` `string` — Заголовок новости
  - `id` `integer<int64>` — ID новости
  - `types` `object[]` — Теги новости
    - `id` `integer<int64>` — ID тега
    - `name` `string` — Название тега

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v2_news(var_from=..., from_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  GeneralApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new GeneralApi(cfg);

const { data } = await api.getV2News(from, fromID);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbgeneral "github.com/ValeryVerkhoturov/wb-api-client-go/general"
)

cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.GeneralAPI.GetV2News(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.GeneralApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV2News(from, fromID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV2News());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV2News().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV2News());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::get_v2_news(&cfg, from, from_id).await;
    println!("{:#?}", result);
}
```

:::
