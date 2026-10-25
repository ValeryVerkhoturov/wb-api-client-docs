---
title: "Заявки покупателей на возврат"
description: "Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете отвечать на эти заявки."
---

# Заявки покупателей на возврат

```http
GET /api/v1/claims
```

**База:** `https://returns-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Возвраты покупателями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims)

Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете [отвечать на эти заявки](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Сервисный          | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `object` |
| `400` | Неправильный запрос    | `object` |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

**Структура `200`:**

- `claims` `object[]` — Заявки
  - `id` `string<UUID>` — ID заявки
  - `claim_type` `integer<int64>` — Источник заявки: * `1` — портал покупателей * `3` — чат
  - `status` `integer<int64>` — Решение по возврату покупателю: * `0` — на рассмотрении * `1` — отказ * `2` — одобрено
  - `status_ex` `integer<int64>` — Статус товара: * `0` — заявка на рассмотрении * `1` — товар остается у покупателя (Заявка отклонена) * `2` — покупатель сдает товар на WB, товар отправляется в утиль * `5` — товар остается у покупателя (Заявка одобрена) * `8` — товар будет возвращён в реализацию после проверки WB * `10` — товар возвращается продавцу
  - `nm_id` `integer<int64>` — Артикул WB
  - `user_comment` `string` — Комментарий покупателя
  - `wb_comment` `string` — Ответ покупателю
  - `dt` `string` — Дата и время оформления заявки покупателем. UTC+3
  - `imt_name` `string` — Название товара
  - `order_dt` `string` — Дата и время заказа
  - `dt_update` `string` — Дата и время рассмотрения заявки. Для нерассмотренной заявки — дата и время оформления. UTC+3
  - `photos` `string<WEBP>[]` — Фотографии из заявки покупателя
  - `video_paths` `string<MP4>[]` — Видео из заявки покупателя
  - `actions` `string[]` — Варианты [ответа продавца на заявку](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim). Отклонённые заявки можно пересмотреть. Если массив пуст, с заявкой работать нельзя. \* `approve1` — одобрить с проверкой брака. Деньги вернутся покупателю после возврата товара. Товар будет проверен на складе. При подтверждении брака/ошибки вложения товар будет отправлен продавцу. Если брак/ошибка вложения не подтвердятся, товар будет возвращён в продажу. Неприменимо при модели **[Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup)**. \* `approve2` — одобрить и забрать товар. Деньги вернутся покупателю после возврата товара. Товар будет отправлен продавцу. Неприменимо при модели **[Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup)**. \* `autorefund1` — одобрить без возврата товара. Товар останется у покупателя. Деньги за него будут возвращены покупателю без возврата товара. \* `reject1` — отклонить с шаблоном ответа: **Брак не обнаружен**Пришлось отклонить заявку — подтвердить производственный брак не получилось. Можете отнести товар на независимую экспертизу или в сервисный центр. Если брак подтвердится, создайте новую заявку с такой же причиной, ещё раз опишите проблему и добавьте фото заключения. А если остались вопросы, задайте их в чате: нажмите кнопку «Написать продавцу». \* `reject2` — отклонить с шаблоном ответа: **Добавить фото/видео**Пришлось отклонить заявку — нужно чуть больше информации. Создайте новую заявку с такой же причиной возврата, подробно опишите проблему и добавьте фото, на которых хорошо видно: сам товар целиком, брак, бирку или этикетку, упаковку со штрихкодом Wildberries, если она осталась. Желательно добавить видео — это поможет разобраться. \* `reject3` — отклонить с шаблоном ответа: **Направить в сервисный центр**Пришлось отклонить заявку — подтвердить производственный брак не получилось. Вы можете отнести товар в сервисный центр: адрес есть на сайте производителя или в гарантийном талоне. Там всё проверят и выдадут заключение. Если производственный брак подтвердится, создайте новую заявку с такой же причиной, ещё раз опишите проблему и добавьте фото заключения. \* `rejectcustom` — отклонить с комментарием. Комментарий передаётся в параметре `comment`. \* `approvecc1` — одобрить заявку с возвратом товара в магазин продавца. Можно передать комментарий (например, телефон для связи или время работы своего отдела возвратов) в параметре `comment`. По итогу возврата необходимо ответить на заявку с `"action":"confirmreturngoodcc1"` или `"action":"rejectcustom"`. Применимо только при модели **[Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup)**. \* `confirmreturngoodcc1` — подтвердить приёмку товара от покупателя. Применимо только при модели **[Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup)**.
  - `price` `number` — Фактическая цена с учетом всех скидок. Взимается с покупателя
  - `currency_code` `string` — Код валюты цены
  - `srid` `string` — Уникальный ID заказа, по товару которого создана заявка
  - `origin_id_info` `string` — Результат сверки [IMEI](https://seller.wildberries.ru/instructions/ru/ru/material/items-labeling-in-fbs#imei) для возврата через ПВЗ Wildberries. Значение показывает, совпадает ли IMEI, который был указан продавцом или отсканирован при приёмке на складе Wildberries, с IMEI из заявки покупателя, что позволяет эффективнее [обрабатывать заявки](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim). Применимо только для товаров \*\*Apple\*\* предмета `Смартфоны` (`"subjectId":515`) с ценой от 40000 рублей, учитывая скидку продавца ([только](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask) параметры и поля `price` и `discount`)
  - `delivery_dt` `string` — Дата и время получения заказа покупателем
- `total` `integer<int64>` — Количество заявок, соответствующих параметрам запроса. Без учёта `limit` и `offset`

**Структура `400`:**

- `title` `string` — ID ошибки
- `detail` `string` — Описание ошибки
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
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_claims(is_archive=..., id=..., limit=..., offset=..., nm_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1Claims(isArchive, id, limit, offset, nmId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Claims(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1Claims(isArchive, id, limit, offset, nmId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Claims($is_archive));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Claims(is_archive).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Claims(isArchive));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::get_v1_claims(&cfg, is_archive, id, limit, offset, nm_id).await;
    println!("{:#?}", result);
}
```

:::
