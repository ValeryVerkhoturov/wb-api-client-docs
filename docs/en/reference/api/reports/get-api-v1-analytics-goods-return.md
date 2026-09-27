---
title: "Получить отчёт"
description: "Метод будет отключен 26 октября."
---

# Получить отчёт

```http
GET /api/v1/analytics/goods-return
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёт о возвратах и перемещении товаров · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1AnalyticsGoodsReturn)

Метод будет отключен [26 октября](https://dev.wildberries.ru/release-notes?id=577).

## Parameters

| Name       | In    | Type           | Req. | Description                      |
| ---------- | ----- | -------------- | ---- | -------------------------------- |
| `dateFrom` | query | `string<date>` | yes  | Дата начала отчётного периода    |
| `dateTo`   | query | `string<date>` | yes  | Дата окончания отчётного периода |

## Responses

| Code  | Description            | Schema                                 |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `GetV1AnalyticsGoodsReturnResponse200` |
| `400` | Неправильный запрос    | `Http4XXResponse`                      |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `object`                               |
| `429` | Слишком много запросов | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.get_v1_analytics_goods_return(date_from=..., date_to=...)
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

const { data } = await api.getV1AnalyticsGoodsReturn(dateFrom, dateTo);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1AnalyticsGoodsReturn(context.Background()).DateFrom(dateFrom).DateTo(dateTo).Execute()
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

System.out.println(api.getV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1AnalyticsGoodsReturn($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ОтчётОВозвратахИПеремещенииТоваровApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsGoodsReturn(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1AnalyticsGoodsReturn(dateFrom, dateTo));
```

:::
