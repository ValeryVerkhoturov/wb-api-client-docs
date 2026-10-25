---
title: "Создать приглашение для нового пользователя"
description: "Метод доступен по Персональному токену"
---

# Создать приглашение для нового пользователя

```http
POST /api/v1/invite
```

**База:** `https://user-management-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Управление пользователями продавца · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerUserManagement/operation/postV1Invite)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод создаёт приглашение для нового пользователя с настройкой доступов к разделам профиля продавца.
Как выдаются права доступа:

- Если `access` пустой (`[]`) или не указан — по умолчанию выдаются все доступы, кроме доступов к витрине (`showcase`) и \*\*Джем\*\* (`changeJam`)
- Если в `access` указана часть разделов профиля, то кроме тех доступов, что указаны в запросе, также выдаются все доступы по умолчанию
- Если в `access` перечислены все возможные разделы, доступы будут выданы согласно запросу, без доступов по умолчанию
- Если в `access` дважды указан один и тот же раздел (`code`):
- при разных значениях `disabled` (`true` и `false`) доступ не будет выдан
- при одинаковых значениях `"disabled": true` доступ не будет выдан
- при одинаковых значениях `"disabled": false` доступ будет выдан

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск    |
| ------ | -------- | -------- | ---------- |
| 1 сек  | 1 запрос | 1 сек    | 5 запросов |

## Тело запроса

`application/json` — схема `createInviteRequest`, обязательно

- `access` `object[]` — Настройки доступа к разделам профиля продавца
  - `code` `string` = `balance` | `brands` | `changeJam` | `discountPrice` | `finance` | `showcase` | `suppliersDocuments` | `supply` | `questions` | `pinFeedbacks` | `pointsForReviews` | `feedbacks` | `oldAnalyticsReports` | `marketplace` | `brandsFlow` | `copyrightComplaints` | `pretrialClaims` | `sellersChat` | `brandzone` | `brandzoneSubscribe` (обязательно) — Код раздела профиля продавца, к которому пользователь получит доступ: * `balance` — Просмотр баланса и вывод средств * `brands` — Управление брендами * `changeJam` — Доступ к подключению подписки **Джем**: **А/Б тесты**, отметки на фото, автозапуски видео, сравнение карточек * `discountPrice` — Изменение цен на товары, управление скидками и акциями * `finance` — Финансовая аналитика. Статистика по балансу, финансовые отчёты, история платежей * `showcase` — Управление витриной магазина * `suppliersDocuments` — Просмотр и скачивание документов по работе с площадкой * `supply` — Создание и управление поставками FBW * `questions` — Просмотр и ответы на вопросы покупателей * `pinFeedbacks` — Возможность закреплять и откреплять отзывы * `pointsForReviews` — Баллы за отзывы * `feedbacks` — Просмотр и ответы на отзывы покупателей * `oldAnalyticsReports` — Отчёты * `marketplace` — Свой склад * `brandsFlow` — Мои бренды * `copyrightComplaints` — Обращения правообладателей * `pretrialClaims` — Досудебные претензии * `sellersChat` — Чат с покупателями * `brandzone` — Бренд-зона. Публикация изменений * `brandzoneSubscribe` — Управление подпиской бренд-зоны
  - `disabled` `boolean` (обязательно) — * `true` — доступ к разделу запрещён * `false` — доступ к разделу разрешён
- `invite` `object` (обязательно)
  - `phoneNumber` `string` (обязательно) — Номер телефона пользователя для приглашения. **Поддерживаются номера телефонов из стран:**• Азербайджан • Армения • Барбадос • Беларусь • Бразилия • Гонконг • Грузия • Италия • Казахстан • Китай • Кыргызстан • Макао • ОАЭ • Россия • Сербия • Таджикистан • Турция • Узбекистан • Чехия • Швеция
  - `position` `string` — Должность пользователя

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `createInviteResponse` |
| `400` | Неправильный запрос    | `errorResponse`        |
| `401` | Не авторизован         | `object`               |
| `403` | Доступ запрещён        | `Response4XX`          |
| `429` | Слишком много запросов | `object`               |

**Структура `200`:**

- `inviteID` `string<uuid>` — ID приглашения
- `expiredAt` `string` — Дата и время окончания срока действия приглашения
- `isSuccess` `boolean` — - `true` — приглашение создано успешно - `false` — повторите запрос
- `inviteUrl` `string` — URL приглашения, по которому должен перейти пользователь

**Структура `400`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — Название внутреннего сервиса
- `status` `number` — HTTP статус-код

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
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

result = api.post_v1_invite(create_invite_request=...)
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

const { data } = await api.postV1Invite(createInviteRequest);
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

result, _, err := client.GeneralAPI.PostV1Invite(context.Background()).CreateInviteRequest(createInviteRequest).Execute()
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

System.out.println(api.postV1Invite(createInviteRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->postV1Invite($create_invite_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.PostV1Invite(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.PostV1Invite(createInviteRequest));
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::post_v1_invite(&cfg, create_invite_request).await;
    println!("{:#?}", result);
}
```

:::
