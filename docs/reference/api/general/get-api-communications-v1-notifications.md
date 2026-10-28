---
title: "Получить уведомления портала продавцов"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Получить уведомления портала продавцов

```http
GET /api/communications/v1/notifications
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** API коммуникаций · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/newsApi/operation/getV1Notifications)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список уведомлений из [профиля](https://seller.wildberries.ru) продавца на русском языке. Порядок уведомлений в ответе — от новых к старым.
Доступно только для продавцов из РФ.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип          | Период | Лимит    | Интервал | Всплеск     |
| ------------ | ------ | -------- | -------- | ----------- |
| Персональный | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Сервисный    | 1 мин  | 1 запрос | 1 мин    | 10 запросов |

## Параметры

| Имя        | Где   | Тип              | Обяз. | Описание                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ----- | ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`     | query | `string`         | нет   | Фильтр по дате и времени: в ответе возвращаются только уведомления, полученные до указанной даты и времени. Указывайте значения не позднее текущих. Чтобы получить самые новые уведомления, не передавайте в запросе этот параметр. Используйте параметр для пагинации: 1. Отправьте первый запрос запрос без параметра `from`. 2. В следующих запросах передайте в параметре `from` значение `date` последнего уведомления в ответе. |
| `timezone` | query | `string`         | нет   | Временная зона в формате [IANA](https://nodatime.org/TimeZones)                                                                                                                                                                                                                                                                                                                                                                       |
| `limit`    | query | `integer<int64>` | нет   | Количество уведомлений в ответе                                                                                                                                                                                                                                                                                                                                                                                                       |

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `GetV1NotificationsResponse200` |
| `400` | Неправильный запрос    | `SellerNotificationsError`      |
| `401` | Не авторизован         | `object`                        |
| `403` | Доступ запрещён        | `object`                        |
| `429` | Слишком много запросов | `object`                        |

**Структура `200`:**

- `data` `SellerNotificationsResponse[]` — Список уведомлений
  - `date` `string` — Дата и время отправки уведомления
  - `id` `string<uuid>` — ID уведомления
  - `linkData` `object` — Данные кнопки в уведомлении
    - `linkHref` `string` — URL кнопки в уведомлении
    - `linkText` `string` — Текст кнопки в уведомлении
  - `text` `string` — Текст уведомления
  - `title` `string` — Заголовок уведомления

**Структура `400`:**

- `status` `integer<int64>` — HTTP статус-код
- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `errors` `object[]` — Список ошибок
  - `location` `string` — Параметр запроса, вызвавший ошибку
  - `message` `string` — Описание ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — ID запроса

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

- один из вариантов: `SellerNotificationsError`, `Response4XX`

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

result = api.get_v1_notifications(var_from=..., timezone=..., limit=...)
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

const { data } = await api.getV1Notifications(from, timezone, limit);
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

result, _, err := client.GeneralAPI.GetV1Notifications(context.Background()).Execute()
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

System.out.println(api.getV1Notifications(from, timezone, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Notifications());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Notifications().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Notifications());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::get_v1_notifications(&cfg, from, timezone, limit).await;
    println!("{:#?}", result);
}
```

:::
