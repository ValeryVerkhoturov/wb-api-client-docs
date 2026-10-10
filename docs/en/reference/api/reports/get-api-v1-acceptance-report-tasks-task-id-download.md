---
title: "Получить отчёт"
description: "Метод возвращает отчёт об операциях при приёмке по ID задания на генерацию."
---

# Получить отчёт

```http
GET /api/v1/acceptance_report/tasks/{task_id}/download
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Операции при приёмке · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-download) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/acceptanceExpenses/operation/getV1AcceptanceReportTasksTaskIdDownload)

Метод возвращает отчёт об [операциях при приёмке](https://seller.wildberries.ru/analytics-reports/acceptance-report) по ID [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/acceptanceExpenses/operation/getV1AcceptanceReport).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос |

## Parameters

| Name      | In   | Type     | Req. | Description             |
| --------- | ---- | -------- | ---- | ----------------------- |
| `task_id` | path | `string` | yes  | ID задания на генерацию |

## Responses

| Code  | Description            | Schema                                                |
| ----- | ---------------------- | ----------------------------------------------------- |
| `200` | Успешно                | `GetV1AcceptanceReportTasksTaskIdDownloadResponse200` |
| `204` | Нет данных             | —                                                     |
| `400` | Неправильный запрос    | `Http4XXResponse`                                     |
| `401` | Не авторизован         | `object`                                              |
| `402` | Требуется платёж       | `object`                                              |
| `403` | Доступ запрещён        | `object`                                              |
| `404` | Не найдено             | `Http4XXResponse`                                     |
| `429` | Слишком много запросов | `object`                                              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_acceptance_report_tasks_task_id_download(task_id=...)
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

const { data } = await api.getV1AcceptanceReportTasksTaskIdDownload(taskId);
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

result, _, err := client.ReportsAPI.GetV1AcceptanceReportTasksTaskIdDownload(context.Background(), taskId).Execute()
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

System.out.println(api.getV1AcceptanceReportTasksTaskIdDownload(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AcceptanceReportTasksTaskIdDownload($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AcceptanceReportTasksTaskIdDownload(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AcceptanceReportTasksTaskIdDownload(taskId));
```

:::
