---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/dbs/orders/meta/details
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Идентификаторы маркировки DBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaDetails)

Метод возвращает идентификаторы маркировки [сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/getV3DbsOrdersNew), поле `requiredMeta`. Если поле `requiredMeta` не содержит какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin)
- `sgtin` — [код маркировки Честного знака](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration)
- `originCountryCode` — [числовой код страны происхождения товара](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) из [Общероссийского классификатора стран мира](https://esnsi.gosuslugi.ru/classifiers/16269)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **получения и удаления идентификаторов маркировки DBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `api.OrdersRequestV2`, обязательно

- `ordersIds` `integer<int64>[]` (обязательно) — Список ID сборочных заданий

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `api.OrdersMetaDetailsResponse` |
| `400` | Неправильный запрос    | `api.BatchError`                |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `api.BatchError`                |
| `429` | Слишком много запросов | `object`                        |

**Структура `200`:**

- `requestId` `string` — Уникальный ID запроса
- `orders` `object[]` — Идентификаторы маркировки сборочных заданий и статусы их валидации
  - `orderId` `integer<int64>` — ID сборочного задания
  - `isError` `boolean` — Есть ли ошибки
  - `errors` `object[]` — Информация об ошибке
    - `code` `integer<int64>` — Код ошибки
    - `detail` `string` — Дополнительная информация об ошибке
  - `metaDetails` `object[]` — Идентификаторы маркировки и статусы их валидации
    - `key` `string` — Идентификатор маркировки: - `imei` — [IMEI](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaImei) - `uin` — [УИН](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaUin) - `gtin` — [GTIN](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaGtin) - `sgtin` — [код маркировки](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaSgtin) - `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) - `originCountryCode` — [числовой код страны происхождения](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers/operation/postV3DbsOrdersMetaCustomsDeclaration) из [Общероссийского классификатора стран мира](https://esnsi.gosuslugi.ru/classifiers/16269) post)
    - `value` `string` — Значение идентификатора маркировки
    - `decision` `string` — Статус проверки: - `imei` - `pending` — Маркировка на проверке - `optional` — Маркировка не обязательна - `filled` — Валидация пройдена - `deadlineExceeded` — Валидация пройдена - `imeiMaySell` — Товар допущен к продаже. Валидация пройдена - `imeiSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Валидация пройдена - `required` — Обязательная маркировка не заполнена. Валидация не пройдена - `imeiInvalidFormat` — Неверный формат маркировки. Валидация не пройдена - `imeiAlreadySold` — Товар с этим IMEI уже продан. Валидация не пройдена - `uin` - `optional` — Маркировка не обязательна - `filled` — Валидация пройдена - `sgtin` - `pending` — Маркировка на проверке - `optional` — Маркировка не обязательна - `filled` — Валидация пройдена - `deadlineExceeded` — Валидация пройдена - `sgtinIntroduced` — Товар допущен к продаже. Валидация пройдена - `sgtinSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Валидация пройдена - `required` — Обязательная маркировка не заполнена. Валидация не пройдена - `sgtinInvalidFormat` — Неверный формат маркировки. Валидация не пройдена - `sgtinNotFound` — Маркировка не найдена в [Честном Знаке](https://chestnyznak.ru). Валидация не пройдена - `sgtinEmitted` — Маркировка эмитирована. Валидация не пройдена - `sgtinApplied` — Не пройдена процедура Ввод в оборот. Валидация не пройдена - `sgtinWrittenOff` — Списан. Валидация не пройдена - `sgtinRetired` — Выбыл. Валидация не пройдена - `sgtinWithdrawn` — Выбыл. Валидация не пройдена - `sgtinDisaggregation` — Расформирован. Валидация не пройдена - `sgtinDisaggregated` — Расформирован. Валидация не пройдена - `sgtinAppliedNotPaid` — Не оплачен. Валидация не пройдена - `gtin` - `optional` — Маркировка не обязательна - `filled` — Валидация пройдена - `customsDeclaration` - `optional` — Маркировка не обязательна - `filled` — Валидация пройдена

**Структура `400`:**

- `detail` `object` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
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

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `403`:**

- `detail` `object` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

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
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_meta_details(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersMetaDetails(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersMetaDetails(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::dbs::apis::{configuration::Configuration, dbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = dbs_api::post_v3_dbs_orders_meta_details(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
