---
title: "Детализации к отчётам об издержках на приём платежей по ID отчётов"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Детализации к отчётам об издержках на приём платежей по ID отчётов

```http
POST /api/finance/v1/acquiring/detailed/{reportId}
```

**Base URL:** `https://finance-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Финансовые отчёты · [WB documentation ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает детализации к [отчётам об издержках на приём платежей](https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/acquiring-reports) по ID отчётов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Parameters

| Name       | In   | Type             | Req. | Description |
| ---------- | ---- | ---------------- | ---- | ----------- |
| `reportId` | path | `integer<int64>` | yes  | ID отчёта   |

## Request body

`application/json` — schema `FinancialReportsDetailedReportIdReq`, required

## Responses

| Code  | Description            | Schema                                       |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV1AcquiringDetailedReportIdResponse200` |
| `204` | Нет данных             | —                                            |
| `400` | Неправильный запрос    | `object`                                     |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `Response4XX`                                |
| `404` | Не найдено             | `object`                                     |
| `429` | Слишком много запросов | `object`                                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v1_acquiring_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq);
console.log(data);
```

```go [Go]
cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1AcquiringDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1AcquiringDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ФинансовыеОтчётыApi(Настройки);

Сообщить(Клиент.PostV1AcquiringDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1AcquiringDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

:::
