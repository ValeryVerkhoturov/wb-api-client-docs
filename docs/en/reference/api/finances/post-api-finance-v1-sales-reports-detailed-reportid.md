---
title: "Детализации к отчётам реализации по ID отчётов"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Детализации к отчётам реализации по ID отчётов

```http
POST /api/finance/v1/sales-reports/detailed/{reportId}
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Финансовые отчёты · [WB documentation ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements) по ID отчётов.

Данные доступны с 29 января 2024 года.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Parameters

| Name       | In   | Type             | Req. | Description                                                                                                                                                                            |
| ---------- | ---- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reportId` | path | `integer<int64>` | yes  | ID отчёта. Для ежедневных отчётов вместо стандартной десериализации рекомендуем использовать нестандартные библиотеки с поддержкой [BigInt](https://www.npmjs.com/package/json-bigint) |

## Request body

`application/json` — schema `FinancialReportsDetailedReportIdReq`, required

## Responses

| Code  | Description            | Schema                                          |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `PostV1SalesReportsDetailedReportIdResponse200` |
| `204` | Нет данных             | —                                               |
| `400` | Неправильный запрос    | `object`                                        |
| `401` | Не авторизован         | `object`                                        |
| `402` | Требуется платёж       | `object`                                        |
| `403` | Доступ запрещён        | `Response4XX`                                   |
| `404` | Не найдено             | `object`                                        |
| `429` | Слишком много запросов | `object`                                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FinancesApi(cfg);

const { data } = await api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq);
console.log(data);
```

```go [Go]
cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.PostV1SalesReportsDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

:::
