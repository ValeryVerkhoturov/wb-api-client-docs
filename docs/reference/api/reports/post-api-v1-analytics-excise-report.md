---
title: "Получить отчёт"
description: "Метод возвращает отчёт с операциями по товарам с обязательной маркировкой."
---

# Получить отчёт

```http
POST /api/v1/analytics/excise-report
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёт о товарах c обязательной маркировкой · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/reportOnItemsWithMandatoryLabeling/operation/postV1AnalyticsExciseReport)

Метод возвращает отчёт с [операциями по товарам с обязательной маркировкой](https://seller.wildberries.ru/analytics-reports/excise-report).

Данный отчёт можно сохранить в [формате таблиц](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-650c-7b04-9596-ba441936f9d3).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Сервисный          | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый с секретом | 5 ч    | 10 запросов | 30 мин   | 10 запросов |
| Базовый            | 24 ч   | 2 запроса   | 12 ч     | 1 запрос    |

## Тело запроса

`application/json` — схема `ExciseReportRequest`, необязательно

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `ExciseReportResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`      |
| `401` | Не авторизован         | `object`               |
| `402` | Требуется платёж       | `object`               |
| `403` | Доступ запрещён        | `object`               |
| `429` | Слишком много запросов | `object`               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import CApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CApi(ApiClient(cfg))

result = api.post_v1_analytics_excise_report(date_from=..., date_to=..., excise_report_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CApi(cfg);

const { data } = await api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.CAPI.PostV1AnalyticsExciseReport(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.CApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
CApi api = new CApi(client);

System.out.println(api.postV1AnalyticsExciseReport(dateFrom, dateTo, exciseReportRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\CApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CApi(new Client(), $config);

print_r($api->postV1AnalyticsExciseReport($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОтчётОТоварахCОбязательнойМаркировкойApi(Настройки);

Сообщить(Клиент.PostV1AnalyticsExciseReport(dateFrom, dateTo, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CApi(config);

Console.WriteLine(api.PostV1AnalyticsExciseReport(dateFrom, dateTo));
```

:::
