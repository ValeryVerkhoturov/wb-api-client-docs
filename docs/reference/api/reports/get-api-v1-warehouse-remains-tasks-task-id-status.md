---
title: "Проверить статус"
description: "Метод возвращает статус задания на генерацию отчёта об остатках на складах WB."
---

# Проверить статус

```http
GET /api/v1/warehouse_remains/tasks/{task_id}/status
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт об остатках на складах · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemainsTasksTaskIdStatus)

Метод возвращает статус [задания на генерацию](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemains) отчёта об [остатках на складах WB](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemainsTasksTaskIdDownload).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск    |
| ------------------ | ------ | --------- | -------- | ---------- |
| Персональный       | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Сервисный          | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Базовый с секретом | 5 сек  | 1 запрос  | 5 сек    | 5 запросов |
| Базовый            | 1 ч    | 4 запроса | 15 мин   | 1 запрос   |

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

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1WarehouseRemainsTasksTaskIdStatus(taskId);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1WarehouseRemainsTasksTaskIdStatus(context.Background(), taskId).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1WarehouseRemainsTasksTaskIdStatus(taskId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1WarehouseRemainsTasksTaskIdStatus($task_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОтчётОбОстаткахНаСкладахApi(Настройки);

Сообщить(Клиент.GetV1WarehouseRemainsTasksTaskIdStatus(task_id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1WarehouseRemainsTasksTaskIdStatus(taskId));
```

:::
