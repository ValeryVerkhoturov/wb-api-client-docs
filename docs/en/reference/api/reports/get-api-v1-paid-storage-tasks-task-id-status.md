---
title: "Проверить статус"
description: "Метод возвращает статус задания на генерацию отчёта о платном хранении."
---

# Проверить статус

```http
GET /api/v1/paid_storage/tasks/{task_id}/status
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Платное хранение · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/paidStorage/operation/getV1PaidStorageTasksTaskIdStatus)

Метод возвращает статус [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/paidStorage/operation/getV1PaidStorage) отчёта о [платном хранении](https://dev.wildberries.ru/openapi/reports#tag/paidStorage/operation/getV1PaidStorageTasksTaskIdDownload).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск    |
| ------------------ | ------ | --------- | -------- | ---------- |
| Персональный       | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Сервисный          | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Базовый с секретом | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 2 запроса  |

## Parameters

| Name      | In   | Type     | Req. | Description             |
| --------- | ---- | -------- | ---- | ----------------------- |
| `task_id` | path | `string` | yes  | ID задания на генерацию |

## Responses

| Code  | Description            | Schema             |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `GetTasksResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`  |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `object`           |
| `404` | Не найдено             | `Http4XXResponse`  |
| `429` | Слишком много запросов | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1PaidStorageTasksTaskIdStatus(taskId);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1PaidStorageTasksTaskIdStatus(context.Background(), taskId).Execute()
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

System.out.println(api.getV1PaidStorageTasksTaskIdStatus(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1PaidStorageTasksTaskIdStatus($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ПлатноеХранениеApi(Настройки);

Сообщить(Клиент.GetV1PaidStorageTasksTaskIdStatus(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1PaidStorageTasksTaskIdStatus(taskId));
```

:::
