---
title: "Получить список отчётов"
description: "Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID созданных отчётов и статусы генерации."
---

# Получить список отчётов

```http
GET /api/v2/nm-report/downloads
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Аналитика продавца CSV · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/analytics/get-api-v2-nm-report-downloads) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloads)

Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID [созданных отчётов](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads) и статусы генерации.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Параметры

| Имя                   | Где   | Тип              | Обяз. | Описание  |
| --------------------- | ----- | ---------------- | ----- | --------- |
| `filter[downloadIds]` | query | `string<uuid>[]` | нет   | ID отчёта |

## Ответы

| Код   | Описание               | Схема                               |
| ----- | ---------------------- | ----------------------------------- |
| `200` | Успешно                | `NmReportGetReportsResponse`        |
| `400` | Неправильный запрос    | `GetV2NmReportDownloadsResponse400` |
| `401` | Не авторизован         | `object`                            |
| `403` | Доступ запрещён        | `ErrorObject`                       |
| `429` | Слишком много запросов | `object`                            |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = AnalyticsApi(ApiClient(cfg))

result = api.get_v2_nm_report_downloads(filter_download_ids=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new AnalyticsApi(cfg);

const { data } = await api.getV2NmReportDownloads(filterDownloadIds);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.GetV2NmReportDownloads(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.getV2NmReportDownloads(filterDownloadIds));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->getV2NmReportDownloads());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.GetV2NmReportDownloads().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.GetV2NmReportDownloads());
```

:::
