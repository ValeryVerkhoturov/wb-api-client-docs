---
title: "Получить отчёт"
description: "Метод возвращает отчёт об остатках на складах WB по ID задания на генерацию."
---

# Получить отчёт

```http
GET /api/v1/warehouse_remains/tasks/{task_id}/download
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёт об остатках на складах · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemainsTasksTaskIdDownload)

Метод возвращает отчёт об [остатках на складах WB](https://seller.wildberries.ru/analytics-reports/warehouse-remains) по ID [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemains).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 1 ч    | 4 запроса | 15 мин   | 1 запрос |

## Parameters

| Name      | In   | Type     | Req. | Description             |
| --------- | ---- | -------- | ---- | ----------------------- |
| `task_id` | path | `string` | yes  | ID задания на генерацию |

## Responses

| Code  | Description            | Schema                                                |
| ----- | ---------------------- | ----------------------------------------------------- |
| `200` | Успешно                | `GetV1WarehouseRemainsTasksTaskIdDownloadResponse200` |
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

result = api.get_v1_warehouse_remains_tasks_task_id_download(task_id=...)
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

const { data } = await api.getV1WarehouseRemainsTasksTaskIdDownload(taskId);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1WarehouseRemainsTasksTaskIdDownload(context.Background(), taskId).Execute()
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

System.out.println(api.getV1WarehouseRemainsTasksTaskIdDownload(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1WarehouseRemainsTasksTaskIdDownload($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1WarehouseRemainsTasksTaskIdDownload(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1WarehouseRemainsTasksTaskIdDownload(taskId));
```

:::
