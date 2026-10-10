---
title: "Получить список архивных сборочных заданий"
description: "Метод возвращает сборочные задания, созданные более 3 месяцев назад. Часть сборочных заданий попадает в архив позже, чем через 3 месяца после создания, так как…"
---

# Получить список архивных сборочных заданий

```http
GET /api/marketplace/v3/fbs/orders/archive
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3FbsOrdersArchive)

Метод возвращает сборочные задания, созданные более 3 месяцев назад.
Часть сборочных заданий попадает в архив позже, чем через 3 месяца после создания, так как поставка переходит в архив только после того, как все заказы в ней будут завершены.
Например, так происходит, если продавец не доставил один из заказов в поставке и заказ был отменён автоматически через несколько дней.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя     | Где   | Тип              | Обяз. | Описание                                                                                                                                                                                                                                                 |
| ------- | ----- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`  | query | `integer`        | да    | Год создания заказа                                                                                                                                                                                                                                      |
| `month` | query | `integer`        | да    | Месяц создания заказа                                                                                                                                                                                                                                    |
| `next`  | query | `integer<int64>` | да    | Параметр пагинации. Устанавливает значение, с которого надо получить следующий пакет данных. Для получения полного списка данных должен быть равен `0` в первом запросе. Для следующих запросов необходимо брать значения из одноимённого поля в ответе. |
| `limit` | query | `integer<int32>` | да    | Количество сборочных заданий в ответе                                                                                                                                                                                                                    |

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `v3.ArchiveOrders`    |
| `400` | Неправильный запрос    | `ArhiveOrderError400` |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `403` | Доступ запрещён        | `object`              |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_orders_archive(year=..., month=..., next=..., limit=...)
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

const { data } = await api.getV3FbsOrdersArchive(year, month, next, limit);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3FbsOrdersArchive(context.Background()).Year(year).Month(month).Next(next).Limit(limit).Execute()
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

System.out.println(api.getV3FbsOrdersArchive(year, month, next, limit));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsOrdersArchive($year, $month, $next, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsOrdersArchive(year, month, next, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsOrdersArchive(year, month, next, limit));
```

:::
