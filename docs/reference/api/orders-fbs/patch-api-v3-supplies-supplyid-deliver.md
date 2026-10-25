---
title: "Передать поставку в доставку"
description: "Метод закрывает поставку и переводит все сборочные задания в ней в статус complete — в доставке. После закрытия поставки добавить новые сборочные задания к ней…"
---

# Передать поставку в доставку

```http
PATCH /api/v3/supplies/{supplyId}/deliver
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)

Метод закрывает [поставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId) и переводит все [сборочные задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) в ней в [статус](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `complete` — в доставке. После закрытия поставки добавить новые сборочные задания к ней нельзя.

Если поставка не была передана в доставку, то при приёмке первого товара поставка автоматически закроется.

Передать поставку в доставку можно, только если в ней:

- есть хотя бы одно сборочное задание
- для всех сборочных заданий указана обязательная маркировка
- маркировка всех сборочных заданий прошла проверку
  Если поставка содержит сборочные задания с обязательным УИН, убедитесь, что вы заранее создали и загрузили спецификацию с договором на доставку. [ГИИС ДМДК](https://minfin.gov.ru/ru/perfomance/jewels/dmdk) требуется около 30 минут для обработки изменений в статусах УИН.
  Обязательно [указывайте параметры отгрузки](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod) для поставок от продавцов РФ на пункты отгрузки в РФ. Если способ доставки, дата или пункт отгрузки не указаны, возвращается ошибка `409`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Ответы

| Код   | Описание                 | Схема                       |
| ----- | ------------------------ | --------------------------- |
| `204` | Передано в доставку      | —                           |
| `400` | Неправильный запрос      | `Error`                     |
| `401` | Не авторизован           | `object`                    |
| `402` | Требуется платёж         | `object`                    |
| `403` | Доступ запрещён          | `Error`                     |
| `404` | Не найдено               | `Error`                     |
| `409` | Ошибка закрытия поставки | `Http409SupplyDeliverError` |
| `429` | Слишком много запросов   | `object`                    |

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

**Структура `409`:**

- `code` `string` — Код ошибки
- `message` `string` — Описание ошибки
- `data` `object` — Дополнительные данные ошибки
  - `orders` `object[]` — Сборочные задания, идентификаторы маркировки которых не прошли или ещё не завершили проверку
    - `id` `integer<int64>` — ID сборочного задания
    - `metaDetails` `object[]` — Информация об ошибках
      - `key` `string` — Идентификатор маркировки
      - `value` `string` — Значение идентификатора маркировки
      - `decision` `string` — [Статус проверки](https://dev.wildberries.ru/knowledge-base/articles/019e9273-118b-7b69-a25a-ea1d756f05d9/rabota-s-markirovkoi-po-modeli-fbs): - `imei` - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `required` — Маркировка обязательна и не закреплена за сборочным заданием - `imeiInvalidFormat` — Неверный формат маркировки - `imeiAlreadySold` — Товар с этим IMEI уже продан - `uin` - `required` — Маркировка обязательна и не закреплена за сборочным заданием - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `uinInvalidFormat` — Неверный формат маркировки - `uinBadStatus` — Некорректный статус партии - `uinBadProcess` — Некорректная стадия обработки - `uinBadStatusAndBadProcess` — Некорректный статус партии. Некорректная стадия обработки - `uinNotFound` — Не найден в [ГИИС](https://minfin.gov.ru/ru/perfomance/jewels/dmdk). При получении этой ошибки убедитесь, что УИН: - указан в загруженной спецификации с договором на доставку. Если спецификация загружена более 30 минут назад, [удалите УИН](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/deleteV3OrdersOrderIdMeta) из сборочного задания и [добавьте его](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers/operation/putV3OrdersOrderIdMetaUin) заново - зарегистрирован в ГИИС ДМДК - указан корректно и считывается с бирки без ошибок - находится в обороте - `sgtin` - `required` — Маркировка обязательна и не закреплена за сборочным заданием - `pending` — Проверка маркировки продолжается. Дождитесь изменения статуса проверки - `sgtinInvalidFormat` — Неверный формат маркировки - `sgtinNoGS` — Маркировка не содержит GS-разделитель `\u001d` - `sgtinHasInvalidSymbols` — Маркировка содержит некорректные символы или пробелы - `sgtinHasNonLatinSymbols` — Маркировка содержит символы, не относящиеся к специальным или латинице - `sgtinInvalidPattern` — Структура маркировки некорректна - `sgtinNotFound` — Маркировка не найдена в [Честном знаке](https://chestnyznak.ru) - `sgtinEmitted` — Маркировка эмитирована - `sgtinApplied` — Не пройдена процедура Ввод в оборот - `sgtinWrittenOff` — Списан - `sgtinRetired` — Выбыл - `sgtinWithdrawn` — Выбыл - `sgtinDisaggregation` — Расформирован - `sgtinDisaggregated` — Расформирован - `sgtinAppliedNotPaid` — Не оплачен - `gtin` - `required` — Маркировка обязательна и не закреплена за сборочным заданием - `expiration` - `required` — Маркировка обязательна и не закреплена за сборочным заданием - `customsDeclaration` - `required` — Маркировка обязательна и не закреплена за сборочным заданием

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

result = api.patch_v3_supplies_supply_id_deliver(supply_id=...)
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

const { data } = await api.patchV3SuppliesSupplyIdDeliver(supplyId);
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

result, _, err := client.OrdersFbsAPI.PatchV3SuppliesSupplyIdDeliver(context.Background(), supplyId).Execute()
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

System.out.println(api.patchV3SuppliesSupplyIdDeliver(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->patchV3SuppliesSupplyIdDeliver($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PatchV3SuppliesSupplyIdDeliver(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PatchV3SuppliesSupplyIdDeliver(supplyId));
```

```rust [Rust]
use wb_api_client::orders_fbs::apis::{configuration::Configuration, orders_fbs_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = orders_fbs_api::patch_v3_supplies_supply_id_deliver(&cfg, supply_id).await;
    println!("{:#?}", result);
}
```

:::
