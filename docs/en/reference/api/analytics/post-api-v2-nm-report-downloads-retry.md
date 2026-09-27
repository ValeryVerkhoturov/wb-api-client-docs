---
title: "Сгенерировать отчёт повторно"
description: "Метод создает повторное задание на генерацию отчёта с расширенной аналитикой продавца. Необходимо, если при генерации отчёта вы получили статус FAILED."
---

# Сгенерировать отчёт повторно

```http
POST /api/v2/nm-report/downloads/retry
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Аналитика продавца CSV · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloadsRetry)

Метод создает повторное [задание на генерацию](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads) отчёта с расширенной аналитикой продавца. Необходимо, если при генерации отчёта вы [получили статус](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloads) `FAILED`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Request body

`application/json` — schema `NmReportRetryReportRequest`, required

## Responses

| Code  | Description            | Schema                                    |
| ----- | ---------------------- | ----------------------------------------- |
| `200` | Успешно                | `NmReportRetryReportResponse`             |
| `400` | Неправильный запрос    | `PostV2NmReportDownloadsRetryResponse400` |
| `401` | Не авторизован         | `object`                                  |
| `403` | Доступ запрещён        | `ErrorObject`                             |
| `429` | Слишком много запросов | `object`                                  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import CSVApi

cfg = Configuration(access_token="<your WB JWT>")
api = CSVApi(ApiClient(cfg))

result = api.post_v2_nm_report_downloads_retry(nm_report_retry_report_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CSVApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new CSVApi(cfg);

const { data } = await api.postV2NmReportDownloadsRetry(nmReportRetryReportRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.CSVAPI.PostV2NmReportDownloadsRetry(context.Background()).NmReportRetryReportRequest(nmReportRetryReportRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.CsvApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
CsvApi api = new CsvApi(client);

System.out.println(api.postV2NmReportDownloadsRetry(nmReportRetryReportRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\CSVApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CSVApi(new Client(), $config);

print_r($api->postV2NmReportDownloadsRetry($nm_report_retry_report_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый АналитикаПродавцаCSVApi(Настройки);

Сообщить(Клиент.PostV2NmReportDownloadsRetry(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CSVApi(config);

Console.WriteLine(api.PostV2NmReportDownloadsRetry(nmReportRetryReportRequest));
```

:::
