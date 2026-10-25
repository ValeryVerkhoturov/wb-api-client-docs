---
title: "Получить список активных или приглашённых пользователей продавца"
description: "Метод доступен по Персональному токену"
---

# Получить список активных или приглашённых пользователей продавца

```http
GET /api/v1/users
```

**База:** `https://user-management-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Управление пользователями продавца · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information#tag/sellerUserManagement/operation/getV1Users)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену

Метод возвращает список активных или приглашённых пользователей профиля продавца.

Чтобы выбрать список, укажите значение параметра `isInviteOnly`:

- `isInviteOnly=true` — список приглашённых пользователей, которые ещё не активировали доступ
- `isInviteOnly=false` или не указан — список активных пользователей
  По каждому пользователю можно получить:
- роль пользователя
- разделы, к которым есть доступы
- статус приглашения
  Список приглашённых пользователей в ответе всегда отсортирован по дате создания: от новых до старых.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск    |
| ------ | -------- | -------- | ---------- |
| 1 сек  | 1 запрос | 1 сек    | 5 запросов |

## Параметры

| Имя            | Где   | Тип              | Обяз. | Описание                                                                                                                                                  |
| -------------- | ----- | ---------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`        | query | `integer<int64>` | нет   | Количество активных или приглашённых пользователей в ответе                                                                                               |
| `offset`       | query | `integer<int64>` | нет   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента                                                                      |
| `isInviteOnly` | query | `boolean`        | нет   | - `true` — список приглашённых пользователей, которые ещё не активировали доступ - `false` или не указан — список активных пользователей профиля продавца |

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `getUsersResponse` |
| `400` | Неправильный запрос    | `errorResponse`    |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `Response4XX`      |
| `429` | Слишком много запросов | `object`           |

**Структура `200`:**

- `total` `integer<int64>` — Общее количество активных или приглашённых пользователей
- `countInResponse` `integer<int64>` — Количество активных или приглашённых пользователей на текущей странице
- `users` `object[]` — Информация о пользователях
  - `id` `integer<int64>` — ID пользователя
  - `role` `string` = `user` | `` — Роль пользователя: * `user` — пользователь, который активировал доступ * ` ` (пустая строка) — пользователь, который не активировал доступ
  - `position` `string` — Должность пользователя
  - `phone` `string` — Номер телефона пользователя
  - `email` `string` — Email пользователя
  - `isOwner` `boolean` — Является ли пользователь владельцем профиля продавца
  - `firstName` `string` — Имя пользователя
  - `secondName` `string` — Фамилия пользователя
  - `patronymic` `string` — Отчество пользователя
  - `goodsReturn` `boolean` — Может ли пользователь одобрять возвраты товаров
  - `isInvitee` `boolean` — Приглашён ли пользователь
  - `inviteeInfo` `object` — Информация о приглашении, если пользователь приглашён
    - `phoneNumber` `string` — Номер телефона приглашённого пользователя
    - `position` `string` — Должность приглашённого пользователя
    - `inviteUuid` `string<UUID>` — ID приглашения
    - `expiredAt` `string` — Дата и время окончания срока действия приглашения
    - `isActive` `boolean` — - `true` — приглашение активно - `false` — приглашение неактивно
  - `access` `object[]` — Настройки доступа к разделам профиля продавца
    - `code` `string` = `balance` | `brands` | `changeJam` | `discountPrice` | `finance` | `showcase` | `suppliersDocuments` | `supply` | `questions` | `pinFeedbacks` | `pointsForReviews` | `feedbacks` | `oldAnalyticsReports` | `marketplace` | `brandsFlow` | `copyrightComplaints` | `pretrialClaims` | `sellersChat` | `brandzone` | `brandzoneSubscribe` — Код раздела профиля продавца, к которому пользователь получит доступ: * `balance` — Просмотр баланса и вывод средств * `brands` — Управление брендами * `changeJam` — Доступ к подключению подписки **Джем**: **А/Б тесты**, отметки на фото, автозапуски видео, сравнение карточек * `discountPrice` — Изменение цен на товары, управление скидками и акциями * `finance` — Финансовая аналитика. Статистика по балансу, финансовые отчёты, история платежей * `showcase` — Управление витриной магазина * `suppliersDocuments` — Просмотр и скачивание документов по работе с площадкой * `supply` — Создание и управление поставками FBW * `questions` — Просмотр и ответы на вопросы покупателей * `pinFeedbacks` — Возможность закреплять и откреплять отзывы * `pointsForReviews` — Баллы за отзывы * `feedbacks` — Просмотр и ответы на отзывы покупателей * `oldAnalyticsReports` — Отчёты * `marketplace` — Свой склад * `brandsFlow` — Мои бренды * `copyrightComplaints` — Обращения правообладателей * `pretrialClaims` — Досудебные претензии * `sellersChat` — Чат с покупателями * `brandzone` — Бренд-зона. Публикация изменений * `brandzoneSubscribe` — Управление подпиской бренд-зоны
    - `disabled` `boolean` — * `true` — доступ к разделу запрещён * `false` — доступ к разделу разрешён

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

result = api.get_v1_users(limit=..., offset=..., is_invite_only=...)
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

const { data } = await api.getV1Users(limit, offset, isInviteOnly);
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

result, _, err := client.GeneralAPI.GetV1Users(context.Background()).Execute()
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

System.out.println(api.getV1Users(limit, offset, isInviteOnly));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1Users());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1Users().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1Users());
```

```rust [Rust]
use wb_api_client::general::apis::{configuration::Configuration, general_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = general_api::get_v1_users(&cfg, limit, offset, is_invite_only).await;
    println!("{:#?}", result);
}
```

:::
