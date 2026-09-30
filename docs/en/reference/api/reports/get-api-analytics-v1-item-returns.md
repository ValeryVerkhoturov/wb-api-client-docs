---
title: "Получить отчёт"
description: "Метод возвращает отчёт о возвратах товаров продавцу."
---

# Получить отчёт

```http
GET /api/analytics/v1/item-returns
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёт о возвратах и перемещении товаров · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1GoodsReturn)

Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/return-transfer-reports).

## Parameters

| Name       | In    | Type            | Req. | Description                                                                          |
| ---------- | ----- | --------------- | ---- | ------------------------------------------------------------------------------------ |
| `dateFrom` | query | `string<date>`  | yes  | Дата начала отчётного периода                                                        |
| `dateTo`   | query | `string<date>`  | yes  | Дата окончания отчётного периода                                                     |
| `status`   | query | `string`        | yes  | Статус возврата: - `archive` — архивный - `active` — активный                        |
| `limit`    | query | `integer<date>` | yes  | Количество возвратов в ответе                                                        |
| `offset`   | query | `integer<date>` | yes  | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента |

## Responses

| Code  | Description            | Schema                   |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `GoodsReturn200Response` |
| `204` | Нет данных             | —                        |
| `400` | Неправильный запрос    | `Http4XXResponse`        |
| `401` | Не авторизован         | `object`                 |
| `429` | Слишком много запросов | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.get_v1_goods_return(date_from=..., date_to=..., status=..., limit=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1GoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Status(status).Limit(limit).Offset(offset).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1GoodsReturn(dateFrom, dateTo, status, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1GoodsReturn($date_from, $date_to, $status, $limit, $offset));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ОтчётОВозвратахИПеремещенииТоваровApi(Настройки);

Сообщить(Клиент.GetV1GoodsReturn(dateFrom, dateTo, status, limit, offset).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1GoodsReturn(dateFrom, dateTo, status, limit, offset));
```

:::
