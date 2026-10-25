---
title: "Получить информацию о подписке Джем"
description: "Информацию о подписке Джем можно получить с токеном любой категории"
---

# Получить информацию о подписке Джем

```http
GET /api/common/v1/subscriptions
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Информация о продавце · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerInformation/operation/getV1Subscriptions)

Информацию о подписке Джем можно получить с токеном любой [категории](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Сервисному** токену

Метод возвращает информацию о подписке [Джем](https://seller.wildberries.ru/monetization/jam):

- Если продавец никогда не подключал подписку Джем, возвращается пустой ответ `200`.
- Если продавец активировал и никогда не отменял подписку, возвращается:
- дата активации подписки `since`
- дата окончания текущего оплаченного периода `till`
- Если подписка закончилась или была отменена, но продавец подключил её повторно, возвращается:
- дата первой активации подписки `since`
- дата окончания текущего оплаченного периода `till`
- Если подписка неактивна, возвращается:
- дата первой активации подписки `since`
- дата окончания последнего оплаченного периода `till`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск     |
| ------ | -------- | -------- | ----------- |
| 1 мин  | 1 запрос | 1 мин    | 10 запросов |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `SubscriptionsJamInfo` |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `Response4XX`          |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `state` `string` = `active` | `inactive` — Статус подписки: - `active` — активна - `inactive` — истекла или отменена
- `activationSource` `string` = `constructor` | `jam` — Источник подключения подписки: - `constructor` — покупка через раздел **Конструктор тарифов** - `jam` — покупка через раздел **Подписка «Джем»**
- `level` `string` = `standard` | `advanced` | `premium` — Уровень подписки: - `standard` - `advanced` - `premium`
- `since` `string` — Дата и время первой активации подписки. Не меняется при продлении или повторной активации
- `till` `string` — Дата и время окончания подписки

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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.get_v1_subscriptions()
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

const { data } = await api.getV1Subscriptions();
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

result, _, err := client.GeneralAPI.GetV1Subscriptions(context.Background()).Execute()
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

System.out.println(api.getV1Subscriptions());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Subscriptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Subscriptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Subscriptions());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::get_v1_subscriptions(&cfg).await;
    println!("{:#?}", result);
}
```

:::
