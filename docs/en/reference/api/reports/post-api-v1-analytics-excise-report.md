---
title: "Получить отчёт"
description: "Метод возвращает отчёт с операциями по товарам с обязательной маркировкой."
---

# Получить отчёт

```http
POST /api/v1/analytics/excise-report
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёт о товарах c обязательной маркировкой · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/reports/post-api-v1-analytics-excise-report) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/reportOnItemsWithMandatoryLabeling/operation/postV1AnalyticsExciseReport)

Метод возвращает отчёт с [операциями по товарам с обязательной маркировкой](https://seller.wildberries.ru/analytics-reports/excise-report).

Данный отчёт можно сохранить в [формате таблиц](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-650c-7b04-9596-ba441936f9d3).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Сервисный          | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый с секретом | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый            | 24 ч   | 2 запроса   | 12 ч     | 1 запрос    |

## Request body

`application/json` — schema `ExciseReportRequest`, optional

## Responses

| Code  | Description            | Schema                 |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `ExciseReportResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`      |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `429` | Слишком много запросов | `object`               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.post_v1_analytics_excise_report(date_from=..., date_to=..., excise_report_request=...)
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

const { data } = await api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest);
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

result, _, err := client.ReportsAPI.PostV1AnalyticsExciseReport(context.Background()).Execute()
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

System.out.println(api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->postV1AnalyticsExciseReport($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.PostV1AnalyticsExciseReport(dateFrom, dateTo, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.PostV1AnalyticsExciseReport(dateFrom, dateTo));
```

:::
