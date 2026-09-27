---
title: "Создать отчёт"
description: "Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца."
---

# Создать отчёт

```http
POST /api/v2/nm-report/downloads
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Аналитика продавца CSV · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads)

Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.

Вы можете создать CSV-версии отчётов по [воронке продаж](https://dev.wildberries.ru/openapi/analytics#tag/salesFunnel) или [параметрам поиска](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems) с группировкой по:
\* артикулам WB
\* предметам, брендам и ярлыкам
В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.

Также можете создать CSV-версии отчётов по [текстам поисковых запросов](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts) и [остаткам](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport).

Каждый новый отчёт должен иметь уникальный ID.

Не используйте одинаковые ID для разных отчётов — это может привести к ошибкам при генерации

Набор параметров запроса в объекте `params` зависит от типа отчёта. Чтобы получить описание параметров, выберите тип отчёта в раскрывающемся списке в описании параметра `reportType`.

Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Если не удалось [получить отчёт](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId), можно создать [повторное задание на генерацию](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloadsRetry). Также можно [получить список и проверить статусы](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloads) отчётов.

Отчёты по [остаткам](https://seller.wildberries.ru/content-analytics/history-remains) — типы `STOCK_HISTORY_REPORT_CSV` и `STOCK_HISTORY_DAILY_CSV` — можно создать без подписки [Джем](https://seller.wildberries.ru/monetization/jam)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description            | Schema                               |
| ----- | ---------------------- | ------------------------------------ |
| `200` | Успешно                | `NmReportCreateReportResponse`       |
| `400` | Неправильный запрос    | `PostV2NmReportDownloadsResponse400` |
| `401` | Не авторизован         | `object`                             |
| `402` | Требуется платёж       | `object`                             |
| `403` | Доступ запрещён        | `ErrorObject`                        |
| `429` | Слишком много запросов | `object`                             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import CSVApi

cfg = Configuration(access_token="<your WB JWT>")
api = CSVApi(ApiClient(cfg))

result = api.post_v2_nm_report_downloads(post_v2_nm_report_downloads_request=...)
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

const { data } = await api.postV2NmReportDownloads(postV2NmReportDownloadsRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.CSVAPI.PostV2NmReportDownloads(context.Background()).Execute()
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

System.out.println(api.postV2NmReportDownloads(postV2NmReportDownloadsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\CSVApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CSVApi(new Client(), $config);

print_r($api->postV2NmReportDownloads());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый АналитикаПродавцаCSVApi(Настройки);

Сообщить(Клиент.PostV2NmReportDownloads(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CSVApi(config);

Console.WriteLine(api.PostV2NmReportDownloads());
```

:::
