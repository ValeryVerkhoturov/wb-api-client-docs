---
title: "Передать поставку в доставку"
description: "Метод закрывает поставку и переводит все сборочные задания в ней в статус complete — в доставке. После закрытия поставки добавить новые сборочные задания к ней…"
---

# Передать поставку в доставку

```http
PATCH /api/v3/supplies/{supplyId}/deliver
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3SuppliesSupplyIdDeliver)

Метод закрывает [поставку](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId) и переводит все [сборочные задания](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) в ней в [статус](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `complete` — в доставке. После закрытия поставки добавить новые сборочные задания к ней нельзя.

Если поставка не была передана в доставку, то при приёмке первого товара поставка автоматически закроется.

Передать поставку в доставку можно, только если в ней:

- есть хотя бы одно сборочное задание
- для всех сборочных заданий указана обязательная маркировка
- маркировка всех сборочных заданий прошла проверку
  Если поставка содержит сборочные задания с обязательным УИН, убедитесь, что вы заранее создали и загрузили спецификацию с договором на доставку. [ГИИС ДМДК](https://minfin.gov.ru/ru/perfomance/jewels/dmdk) требуется около 30 минут для обработки изменений в статусах УИН.
  Обязательно [указывайте параметры отгрузки](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod) для поставок от продавцов РФ на пункты отгрузки в РФ. Если способ доставки, дата или пункт отгрузки не указаны, возвращается ошибка `409`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
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

:::
