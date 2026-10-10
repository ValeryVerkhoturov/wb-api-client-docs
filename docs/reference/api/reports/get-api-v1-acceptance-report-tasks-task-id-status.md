---
title: "Проверить статус"
description: "Метод возвращает статус задания на генерацию отчёта об операциях при приёмке."
---

# Проверить статус

```http
GET /api/v1/acceptance_report/tasks/{task_id}/status
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Операции при приёмке · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-status) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/acceptanceExpenses/operation/getV1AcceptanceReportTasksTaskIdStatus)

Метод возвращает статус [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/acceptanceExpenses/operation/getV1AcceptanceReport) отчёта об [операциях при приёмке](https://dev.wildberries.ru/openapi/reports#tag/acceptanceExpenses/operation/getV1AcceptanceReportTasksTaskIdDownload).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 5 сек  | 1 запрос  | 5 сек    | 1 запрос |
| Сервисный          | 5 сек  | 1 запрос  | 5 сек    | 1 запрос |
| Базовый с секретом | 5 сек  | 1 запрос  | 5 сек    | 1 запрос |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос |

## Параметры

| Имя       | Где  | Тип      | Обяз. | Описание                |
| --------- | ---- | -------- | ----- | ----------------------- |
| `task_id` | path | `string` | да    | ID задания на генерацию |

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `GetTasksResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`  |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `object`           |
| `404` | Не найдено             | `Http4XXResponse`  |
| `429` | Слишком много запросов | `object`           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_acceptance_report_tasks_task_id_status(task_id=...)
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

const { data } = await api.getV1AcceptanceReportTasksTaskIdStatus(taskId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1AcceptanceReportTasksTaskIdStatus(context.Background(), taskId).Execute()
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

System.out.println(api.getV1AcceptanceReportTasksTaskIdStatus(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AcceptanceReportTasksTaskIdStatus($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AcceptanceReportTasksTaskIdStatus(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AcceptanceReportTasksTaskIdStatus(taskId));
```

:::
