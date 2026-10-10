---
title: "Получить отчёт"
description: "Метод возвращает отчёт о возвратах товаров продавцу."
---

# Получить отчёт

```http
GET /api/analytics/v1/item-returns
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт о возвратах и перемещении товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1GoodsReturn)

Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/return-transfer-reports).

## Параметры

| Имя        | Где   | Тип             | Обяз. | Описание                                                                             |
| ---------- | ----- | --------------- | ----- | ------------------------------------------------------------------------------------ |
| `dateFrom` | query | `string`        | да    | Дата начала отчётного периода                                                        |
| `dateTo`   | query | `string`        | да    | Дата окончания отчётного периода                                                     |
| `status`   | query | `string`        | нет   | Статус возврата: - `archive` — архивный - `active` — активный                        |
| `limit`    | query | `integer<date>` | нет   | Количество возвратов в ответе                                                        |
| `offset`   | query | `integer<date>` | нет   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента |

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `GoodsReturn200Response` |
| `204` | Нет данных             | —                        |
| `400` | Неправильный запрос    | `Http4XXResponse`        |
| `401` | Не авторизован         | `object`                 |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_goods_return(date_from=..., date_to=..., status=..., limit=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1GoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.ReportsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1GoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1GoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1GoodsReturn(dateFrom, dateTo));
```

:::
