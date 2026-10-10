---
title: "Получить отчёт"
description: "Метод возвращает список заблокированных карточек товаров продавца с причинами блокировки."
---

# Получить отчёт

```http
GET /api/v1/analytics/banned-products/blocked
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Заблокированные карточки · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/reports/get-api-v1-analytics-banned-products-blocked) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/blockedItems/operation/getV1AnalyticsBannedProducsBlocked)

Метод возвращает список [заблокированных карточек товаров продавца](https://seller.wildberries.ru/analytics-reports/banned-products) с причинами блокировки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Parameters

| Name    | In    | Type     | Req. | Description                                                                                                                                                                                                                     |
| ------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sort`  | query | `string` | yes  | Сортировка - `brand` — по бренду - `nmId` — по артикулу WB - `title` — по наименованию товара - `vendorCode` — по артикулу продавца - `reason` — по причине блокировки                                                          |
| `order` | query | `string` | yes  | Порядок выдачи - `desc` — от наибольшего числового значения к наименьшему, от последнего по алфавиту значения к первому - `asc` — от наименьшего числового значения к наибольшему, от первого по алфавиту значения к последнему |

## Responses

| Code  | Description            | Schema                                          |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `GetV1AnalyticsBannedProducsBlockedResponse200` |
| `400` | Неправильный запрос    | `GetV1AnalyticsBannedProducsBlockedResponse400` |
| `401` | Не авторизован         | `object`                                        |
| `402` | Требуется платёж       | `object`                                        |
| `403` | Доступ запрещён        | `object`                                        |
| `429` | Слишком много запросов | `object`                                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_analytics_banned_producs_blocked(sort=..., order=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1AnalyticsBannedProducsBlocked(sort, order);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1AnalyticsBannedProducsBlocked(context.Background()).Sort(sort).Order(order).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1AnalyticsBannedProducsBlocked(sort, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsBannedProducsBlocked($sort, $order));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsBannedProducsBlocked(sort, order).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsBannedProducsBlocked(sort, order));
```

:::
