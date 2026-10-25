---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/orders/meta
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Идентификаторы маркировки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/postV3OrdersMeta)

Метод возвращает идентификаторы маркировки [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3OrdersNew), поля `requiredMeta` и `optionalMeta`. Если поля `requiredMeta` и `optionalMeta` не содержат какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaSgtin)
- `expiration` — [срок годности товара](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaExpiration)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaCustomsDeclaration)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **получения и удаления идентификаторов маркировки FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `v3.GetMetaMultiRequest`, обязательно

- `orders` `integer<int64>[]` (обязательно)

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `v3.OrdersMetaAPI` |
| `400` | Неправильный запрос    | `v3.APIError`      |
| `401` | Не авторизован         | `object`           |
| `402` | Требуется платёж       | `object`           |
| `403` | Доступ запрещён        | `v3.APIError`      |
| `404` | Не найдено             | `v3.APIError`      |
| `429` | Слишком много запросов | `object`           |

**Структура `200`:**

- `orders` `v3.OrderMetaAPI[]`
  - `id` `integer<int64>` — ID сборочного задания
  - `metaDetails` `object[]` — Детали маркировки
    - `key` `string` — Идентификатор маркировки
    - `value` `string` — Значение идентификатора маркировки
    - `decision` `string` — [Статусы проверки идентификаторов маркировки](https://dev.wildberries.ru/knowledge-base/articles/019e9273-118b-7b69-a25a-ea1d756f05d9/rabota-s-markirovkoi-po-modeli-fbs). Статусы проверки `imei`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `imeiMaySell` — Товар допущен к продаже. Проверка пройдена - `imeiSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена Статусы проверки `imei`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `imeiInvalidFormat` — Указан неверный формат маркировки. Проверка не пройдена - `imeiAlreadySold` — Товар с этим IMEI уже продан. Проверка не пройдена Статусы проверки `uin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `uinMaySell` — Товар допущен к продаже. Проверка пройдена Статусы проверки `uin`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `uinBadStatus` — Некорректный статус партии. Проверка не пройдена - `uinBadProcess` — Некорректная стадия обработки. Проверка не пройдена - `uinBadStatusAndBadProcess` — Некорректный статус партии. Некорректная стадия обработки. Проверка не пройдена - `uinInvalidFormat` — Неверный формат маркировки. Проверка не пройдена - `uinNotFound` — Не найден в [ГИИС](https://minfin.gov.ru/ru/perfomance/jewels/dmdk). Проверка не пройдена. Статус может означать, что УИН: - не указан в загруженной спецификации с договором на доставку - не зарегистрирован в ГИИС ДМДК - указан некорректно и считывается с бирки с ошибками - не находится в обороте Статусы проверки `sgtin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `sgtinIntroduced` — Товар допущен к продаже. Проверка пройдена - `sgtinSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена Статусы проверки `sgtin`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `sgtinInvalidFormat` — Неверный формат маркировки. Проверка не пройдена - `sgtinNoGS` — Маркировка не содержит GS-разделитель `\u001d`. Проверка не пройдена - `sgtinHasInvalidSymbols` — Маркировка содержит некорректные символы или пробелы. Проверка не пройдена - `sgtinHasNonLatinSymbols` — Маркировка содержит символы, не относящиеся к специальным или латинице. Проверка не пройдена - `sgtinInvalidPattern` — Структура маркировки некорректна. Проверка не пройдена - `sgtinNotFound` — Маркировка не найдена в [Честном знаке](https://chestnyznak.ru). Проверка не пройдена - `sgtinEmitted` — Маркировка эмитирована. Проверка не пройдена - `sgtinApplied` — Не пройдена процедура Ввод в оборот. Проверка не пройдена - `sgtinWrittenOff` — Списан. Проверка не пройдена - `sgtinWithdrawn` — Выбыл. Проверка не пройдена - `sgtinRetired` — Выбыл. Проверка не пройдена - `sgtinDisaggregated` — Расформирован. Проверка не пройдена - `sgtinDisaggregation` — Расформирован. Проверка не пройдена - `sgtinAppliedNotPaid` — Не оплачен. Проверка не пройдена Статусы проверки `gtin`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `expiration`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `customsDeclaration`, с которыми поставку нельзя перевести в доставку: - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена Статусы проверки `customsDeclaration`, с которыми поставку можно перевести в доставку: - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна

**Структура `400`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

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

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

**Структура `404`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки

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
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_orders_meta(v3_get_meta_multi_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3OrdersMeta(v3GetMetaMultiRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3OrdersMeta(context.Background()).V3GetMetaMultiRequest(v3GetMetaMultiRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3OrdersMeta(v3GetMetaMultiRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3OrdersMeta($v3_get_meta_multi_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3OrdersMeta(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3OrdersMeta(v3GetMetaMultiRequest));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::post_v3_orders_meta(&cfg, v3_period_get_meta_multi_request).await;
    println!("{:#?}", result);
}
```

:::
