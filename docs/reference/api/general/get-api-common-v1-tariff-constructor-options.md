---
title: "Получить информацию об опциях Конструктора тарифов"
description: "Информацию об опциях Конструктора тарифов можно получить с токеном любой категории"
---

# Получить информацию об опциях Конструктора тарифов

```http
GET /api/common/v1/tariff-constructor/options
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Информация о продавце · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerInformation/operation/getV1TariffConstructorOptions)

Информацию об опциях Конструктора тарифов можно получить с токеном любой [категории](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Сервисному** токену

Метод возвращает информацию обо всех опциях и пакетах опций, которые продавец подключил в [Конструкторе тарифов](https://seller.wildberries.ru/tariff-constructor).

Опции, входящие в подключённые пакеты, возвращаются в массиве `packages`. Опции, подключённые вне пакетов, возвращаются в массиве `options`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск     |
| ------ | -------- | -------- | ----------- |
| 1 мин  | 1 запрос | 1 мин    | 10 запросов |

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                |
| -------- | ----- | -------- | ----- | ------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык полей ответа: - `ru` — русский - `en` — английский |

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `PlanBuilderOptionsInfo` |
| `400` | Неправильный запрос    | `PlanBuilderErrors`      |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `Response4XX`            |
| `404` | Не найдено             | `PlanBuilderErrors`      |
| `429` | Слишком много запросов | `object`                 |

**Структура `200`:**

- `activeOptionCount` `number<int>` — Количество активных опций, не включённых в пакеты
- `activePackageCount` `number<int>` — Количество активных пакетов опций
- `totalCommissionRate` `number<float>` — Итоговая комиссия за подключённые опции и пакеты, % от оборота
- `packages` `PlanBuilderPackage[]` — Подключённые пакеты опций
  - `id` `string<uuid>` — ID пакета
  - `slug` `string` — Код пакета
  - `name` `string` — Название пакета на языке из параметра `locale`
  - `status` `string` = `active` | `pendingActivation` | `pendingDeactivation` — Статус пакета: - `active` — активен - `pendingActivation` — подключён, начнёт работать с 00:00 следующего дня - `pendingDeactivation` — отключён, перестанет работать с 00:00 следующего дня
  - `activatedAt` `string` — Дата активации пакета
  - `expiresAt` `string` — Дата окончания минимального срока действия пакета. До этого дня пакет опций нельзя отключить
  - `commissionRate` `number<float>` — Комиссия за пакет, % от оборота
  - `periodDuration` `number<int>` — Минимальный срок действия пакета в днях
  - `options` `PlanBuilderOptionShort[]` — Опции, которые входят в пакет
    - `id` `string` — ID опции
    - `slug` `string` — Код опции
    - `name` `string` — Название опции на языке из параметра `locale`
- `options` `PlanBuilderOption[]` — Подключённые опции
  - `id` `string` — ID опции
  - `slug` `string` — Код опции
  - `name` `string` — Название опции на языке из параметра `locale`
  - `status` `string` = `active` | `pendingActivation` | `pendingDeactivation` — Статус опции: - `active` — активна - `pendingActivation` — подключена, начнёт работать с 00:00 следующего дня - `pendingDeactivation` — отключена, перестанет работать с 00:00 следующего дня
  - `activatedAt` `string` — Дата активации опции
  - `expiresAt` `string` — Дата окончания минимального срока действия опции. До этого дня опцию нельзя отключить
  - `commissionRate` `number<float>` — Стоимость подключения опции, % от оборота. Возвращается, если в ответе нет объекта `promotion`
  - `periodDuration` `number<int>` — Минимальный срок действия опции в днях
  - `promotion` `object`
    - `commissionRate` `number<float>` — Стоимость подключения опции по акции, % от оборота
    - `expiresAt` `string` — Дата окончания действия цены по акции

**Структура `400`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `errors` `string[]` — Ошибки запроса с указанием параметров и деталей ошибок

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

**Структура `404`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `errors` `string[]` — Ошибки запроса с указанием параметров и деталей ошибок

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

result = api.get_v1_tariff_constructor_options(locale=...)
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

const { data } = await api.getV1TariffConstructorOptions(locale);
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

result, _, err := client.GeneralAPI.GetV1TariffConstructorOptions(context.Background()).Execute()
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

System.out.println(api.getV1TariffConstructorOptions(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1TariffConstructorOptions());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1TariffConstructorOptions().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1TariffConstructorOptions());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::get_v1_tariff_constructor_options(&cfg, locale).await;
    println!("{:#?}", result);
}
```

:::
