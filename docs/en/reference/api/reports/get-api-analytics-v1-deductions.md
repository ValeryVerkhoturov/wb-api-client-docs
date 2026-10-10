---
title: "Подмены и неверные вложения"
description: "Метод возвращает отчёт об удержаниях за подмены и неверные вложения"
---

# Подмены и неверные вложения

```http
GET /api/analytics/v1/deductions
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёты об удержаниях · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/retentionReports/operation/getV1Deductions)

Метод возвращает отчёт об удержаниях за [подмены и неверные вложения](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/retentions)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 1 ч    | 4 запроса | 15 мин   | 1 запрос |

## Parameters

| Name       | In    | Type      | Req. | Description                                                                                                        |
| ---------- | ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `dateFrom` | query | `string`  | no   | Начало отчётного периода. По умолчанию используются дата и время, когда были впервые получены данные для отчёта    |
| `dateTo`   | query | `string`  | yes  | Конец отчётного периода                                                                                            |
| `sort`     | query | `string`  | no   | Сортировка: - `nmId` — по артикулу WB - `dtBonus` — по дате и времени удержания - `bonusSumm` — по сумме удержания |
| `order`    | query | `string`  | no   | Порядок выдачи: - `desc` — по убыванию - `asc` — по возрастанию                                                    |
| `limit`    | query | `integer` | yes  | Количество удержаний в ответе                                                                                      |
| `offset`   | query | `integer` | no   | Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента                             |

## Responses

| Code  | Description            | Schema                  |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `object`                |
| `400` | Неправильный запрос    | `Response400Retentions` |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Response403Retentions` |
| `429` | Слишком много запросов | `object`                |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_deductions(date_to=..., limit=..., date_from=..., sort=..., order=..., offset=...)
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

const { data } = await api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1Deductions(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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

System.out.println(api.getV1Deductions(dateTo, limit, dateFrom, sort, order, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1Deductions($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1Deductions(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1Deductions(dateTo, limit));
```

:::
