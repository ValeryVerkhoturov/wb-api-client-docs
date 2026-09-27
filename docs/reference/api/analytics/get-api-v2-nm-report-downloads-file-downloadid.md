---
title: "Получить отчёт"
description: "Метод возвращает отчёт с расширенной аналитикой продавца по ID задания на генерацию."
---

# Получить отчёт

```http
GET /api/v2/nm-report/downloads/file/{downloadId}
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Аналитика продавца CSV · [Документация WB ↗](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId)

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

## Параметры

| Имя          | Где  | Тип            | Обяз. | Описание  |
| ------------ | ---- | -------------- | ----- | --------- |
| `downloadId` | path | `string<uuid>` | да    | ID отчёта |

## Ответы

| Код   | Описание               | Схема                                             |
| ----- | ---------------------- | ------------------------------------------------- |
| `200` | Успешно                | `string`                                          |
| `400` | Неправильный запрос    | `GetV2NmReportDownloadsFileDownloadIdResponse400` |
| `401` | Не авторизован         | `object`                                          |
| `402` | Требуется платёж       | `object`                                          |
| `403` | Доступ запрещён        | `ErrorObject`                                     |
| `429` | Слишком много запросов | `object`                                          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import CSVApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
const api = new CSVApi(cfg);

const { data } = await api.getV2NmReportDownloadsFileDownloadId(downloadId);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
CsvApi api = new CsvApi(client);

System.out.println(api.getV2NmReportDownloadsFileDownloadId(downloadId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\CSVApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CSVApi(new Client(), $config);

print_r($api->getV2NmReportDownloadsFileDownloadId($download_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый АналитикаПродавцаCSVApi(Настройки);

Сообщить(Клиент.GetV2NmReportDownloadsFileDownloadId(downloadId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CSVApi(config);

Console.WriteLine(api.GetV2NmReportDownloadsFileDownloadId(downloadId));
```

:::
