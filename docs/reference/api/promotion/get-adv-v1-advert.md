---
title: "Информация о медиакампании"
description: "Метод возвращает информацию о кампании WB Медиа. Вместо карточек товаров в медиакампаниях продвигаются рекламные баннеры продавца на сайте и в приложении WB."
---

# Информация о медиакампании

```http
GET /adv/v1/advert
```

**База:** `https://advert-media-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Медиа · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/media/operation/getV1Advert)

Метод возвращает информацию о кампании [WB Медиа](https://cmp.wildberries.ru/cmpf/list). Вместо карточек товаров в медиакампаниях продвигаются рекламные баннеры продавца на сайте и в приложении WB.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Сервисный          | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Базовый с секретом | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Базовый            | 1 ч    | 5 запросов  | 12 мин   | 1 запрос    |

## Параметры

| Имя  | Где   | Тип              | Обяз. | Описание         |
| ---- | ----- | ---------------- | ----- | ---------------- |
| `id` | query | `integer<int64>` | да    | ID медиакампании |

## Ответы

| Код   | Описание                 | Схема                    |
| ----- | ------------------------ | ------------------------ |
| `200` | Успешно                  | `GetV1AdvertResponse200` |
| `204` | Медиакампания не найдена | —                        |
| `400` | Неправильный запрос      | `string`                 |
| `401` | Не авторизован           | `object`                 |
| `403` | Доступ запрещён          | `object`                 |
| `429` | Слишком много запросов   | `object`                 |

**Структура `200`:**

- `advertId` `integer<int64>` — ID медиакампании
- `name` `string` — Название медиакампании
- `brand` `string` — Название бренда
- `type` `integer<int64>` — Тип медиакампании: - `1` — размещение по дням - `2` — размещение по просмотрам
- `status` `integer<int64>` — Статус медиакампании: - `1` — черновик - `2` — модерация - `3` — отклонена (с возможностью вернуть на модерацию) - `4` — готова к запуску - `5` — запланирована - `6` — на показах - `7` — завершена - `8` — отменена - `9` — приостановлена продавцом - `10` — пауза по дневному лимиту - `11` — пауза
- `createTime` `string` — Время создания медиакампании
- `extended` `object`
  - `reason` `string` — Комментарий модератора
  - `expenses` `integer<int64>` — Затраты
  - `from` `string` — Дата и время начала показа медиакампании
  - `to` `string` — Дата и время окончания показа медиакампании
  - `updated_at` `string` — Дата и время изменения кампании
  - `price` `integer<int64>` — Стоимость размещения по дням для типа `1`
  - `budget` `integer<int64>` — Остаток бюджета для типа `2`
  - `operation` `integer<int64>` — Источник списания: - `1` — баланс - `2` — счёт
  - `contract_id` `integer<int64>` — ID контракта, для продавцов на контракте
- `items` `object[]` — Информация о баннере. Наличие в ответе тех или иных полей зависит от конфигурации медиакампании.
  - `id` `integer<int64>` — ID баннера
  - `name` `string` — Бренд
  - `status` `integer<int64>` — Статус (такой же как у медиакампании)
  - `place` `integer<int64>` — Позиция на странице размещения
  - `budget` `integer<int64>` — Бюджет
  - `daily_limit` `integer<int64>` — Дневной лимит (для баннеров по показам)
  - `category_name` `string` — Название категории размещения
  - `cpm` `integer<int64>` — Ставка
  - `url` `string` — URL страницы, на которую попадает пользователь при клике по баннеру
  - `advert_type` `integer<int64>` — Тип продвижения: - `1` — баннер - `2` — всплывающее меню - `3` — почтовая рассылка - `4` — социальные сети - `5` — push-уведомления в мобильном приложении
  - `created_at` `string` — Дата создания баннера
  - `updated_at` `string` — Дата и время обновления баннера
  - `date_from` `string` — Дата начала работы баннера
  - `date_to` `string` — Дата завершения работы баннера
  - `nms` `integer<int64>[]` — Подборка артикулов WB
  - `bottomText1` `string` — Текст под плашкой баннера
  - `bottomText2` `string` — 2-я строка с текстом под плашкой баннера
  - `message` `string` — Текст push-уведомления или рассылки
  - `additionalSettings` `integer<int64>` — Дополнительные настройки. Формат почтовой рассылки: - `1` — общий - `2` — частичный - `3` — уникальный Социальная сеть: - `1` — VK - `2` — OK (Одноклассники)
  - `receiversCount` `integer<int64>` — Кол-во получателей push-уведомлений
  - `subject_id` `integer<int64>` — ID родительской категории товара
  - `subject_name` `string` — Название родительской категории товара
  - `action_name` `string` — Название акции
  - `show_hours` `object[]` — Часы показа
    - `From` `integer<int64>` — Начало показа
    - `To` `integer<int64>` — Конец показа
  - `Erid` `string` — Уникальный ID медиакампании для работы с ОРД

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

result = api.get_v1_advert(id=...)
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

const { data } = await api.getV1Advert(id);
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

result, _, err := client.PromotionAPI.GetV1Advert(context.Background()).Id(id).Execute()
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

System.out.println(api.getV1Advert(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Advert($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Advert(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Advert(id));
```

```rust [Rust]
use wb_api_client::promotion::apis::{configuration::Configuration, promotion_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = promotion_api::get_v1_advert(&cfg, id).await;
    println!("{:#?}", result);
}
```

:::
