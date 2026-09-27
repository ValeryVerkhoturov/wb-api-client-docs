---
title: "Получить отчёт"
description: "Метод возвращает отчёт с расширенной аналитикой продавца по ID задания на генерацию."
---

# Получить отчёт

```http
GET /api/v2/nm-report/downloads/file/{downloadId}
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Аналитика продавца CSV · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId)

Метод возвращает отчёт с расширенной аналитикой продавца по ID [задания на генерацию](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads).

Можно получить отчёт, который сгенерирован за последние 48 часов.
Отчёт будет загружен внутри архива ZIP в формате CSV.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Parameters

| Name         | In   | Type           | Req. | Description |
| ------------ | ---- | -------------- | ---- | ----------- |
| `downloadId` | path | `string<uuid>` | yes  | ID отчёта   |

## Responses

| Code  | Description            | Schema                                            |
| ----- | ---------------------- | ------------------------------------------------- |
| `200` | Успешно                | `string`                                          |
| `400` | Неправильный запрос    | `GetV2NmReportDownloadsFileDownloadIdResponse400` |
| `401` | Не авторизован         | `object`                                          |
| `402` | Требуется платёж       | `object`                                          |
| `403` | Доступ запрещён        | `ErrorObject`                                     |
| `429` | Слишком много запросов | `object`                                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import CSVApi

cfg = Configuration(access_token="<your WB JWT>")
api = CSVApi(ApiClient(cfg))

result = api.get_v2_nm_report_downloads_file_download_id(download_id=...)
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

const { data } = await api.getV2NmReportDownloadsFileDownloadId(downloadId);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.CSVAPI.GetV2NmReportDownloadsFileDownloadId(context.Background(), downloadId).Execute()
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

System.out.println(api.getV2NmReportDownloadsFileDownloadId(downloadId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\CSVApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new CSVApi(new Client(), $config);

print_r($api->getV2NmReportDownloadsFileDownloadId($download_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый АналитикаПродавцаCSVApi(Настройки);

Сообщить(Клиент.GetV2NmReportDownloadsFileDownloadId(downloadId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new CSVApi(config);

Console.WriteLine(api.GetV2NmReportDownloadsFileDownloadId(downloadId));
```

:::
