---
title: "Получить идентификаторы маркировки сборочных заданий"
description: "Метод возвращает идентификаторы маркировки сборочных заданий и статусы их проверки."
---

# Получить идентификаторы маркировки сборочных заданий

```http
POST /api/marketplace/v3/click-collect/orders/meta/details
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Идентификаторы маркировки Самовывоз · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaDetails)

Метод возвращает идентификаторы маркировки [сборочных заданий ](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) и статусы их проверки.

Перечень идентификаторов маркировки, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrdersNew), поле `requiredMeta`. Если поле `requiredMeta` не содержит какой-либо идентификатор маркировки, значит, у сборочного задания не может быть этого идентификатора — и добавить его нельзя.
Возможные идентификаторы маркировки:

- `imei` — [IMEI](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaImei)
- `uin` — [УИН](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin)
- `gtin` — [GTIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin)
- `sgtin` — [код маркировки](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin)
- `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration)
- `originCountryCode` — [числовой код страны происхождения товара](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) из [Общероссийского классификатора стран мира](https://esnsi.gosuslugi.ru/classifiers/16269)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов **получения и удаления идентификаторов маркировки Самовывоз**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 150 запросов | 400 мс   | 20 запросов |
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
    - `key` `string` — Идентификатор маркировки: - `imei` — [IMEI](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaImei) - `uin` — [УИН](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaUin) - `gtin` — [GTIN](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaGtin) - `sgtin` — [код маркировки](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaSgtin) - `customsDeclaration` — [номер ДТ](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) - `originCountryCode` — [числовой код страны происхождения товара](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers/operation/postV3ClickCollectOrdersMetaCustomsDeclaration) из [Общероссийского классификатора стран мира](https://esnsi.gosuslugi.ru/classifiers/16269)
    - `value` `string` — Значение идентификатора маркировки
    - `decision` `string` — Статусы проверки идентификатора маркировки. - `imei` - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна. Проверка пройдена - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `imeiMaySell` — Товар допущен к продаже. Проверка пройдена - `imeiSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `imeiInvalidFormat` — Указан неверный формат маркировки. Проверка не пройдена - `imeiAlreadySold` — Товар с этим IMEI уже продан. Проверка не пройдена - `uin` - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна. Проверка пройдена - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `sgtin` - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна. Проверка пройдена - `deadlineExceeded` — Проверка маркировки не завершена и будет продолжена. Проверка может завершиться и успешно, и неуспешно - `sgtinIntroduced` — Товар допущен к продаже. Проверка пройдена - `sgtinSoldB2B` — Товар продан покупателю B2B, допущен к продаже повторно. Проверка пройдена - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `sgtinInvalidFormat` — Указан неверный формат маркировки. Проверка не пройдена - `sgtinNotFound` — Маркировка не найдена в [Честном знаке](https://chestnyznak.ru). Проверка не пройдена - `sgtinEmitted` — Маркировка эмитирована. Проверка не пройдена - `sgtinApplied` — Не пройдена процедура Ввод в оборот. Проверка не пройдена - `sgtinWrittenOff` — Списан. Проверка не пройдена - `sgtinRetired` — Выбыл. Проверка не пройдена - `sgtinWithdrawn` — Выбыл. Проверка не пройдена - `sgtinDisaggregated` — Расформирован. Проверка не пройдена - `sgtinDisaggregation` — Расформирован. Проверка не пройдена - `sgtinAppliedNotPaid` — Не оплачен. Проверка не пройдена - `gtin` - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна. Проверка пройдена - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена - `customsDeclaration` - `filled` — Маркировка закреплена за сборочным заданием, проверка не требуется - `optional` — Маркировка не закреплена за сборочным заданием и не обязательна. Проверка пройдена - `required` — Маркировка обязательна и не закреплена за сборочным заданием. Проверка не пройдена

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
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_meta_details(api_orders_request_v2=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new InStorePickupApi(cfg);

const { data } = await api.postV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersMetaDetails(context.Background()).ApiOrdersRequestV2(apiOrdersRequestV2).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersMetaDetails($api_orders_request_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersMetaDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersMetaDetails(apiOrdersRequestV2));
```

```rust [Rust]
use wb_api_client::in_store_pickup::apis::{configuration::Configuration, in_store_pickup_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = in_store_pickup_api::post_v3_click_collect_orders_meta_details(&cfg, api_period_orders_request_v2).await;
    println!("{:#?}", result);
}
```

:::
