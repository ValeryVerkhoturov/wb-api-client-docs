---
title: "Удержания за занижение габаритов упаковки"
description: "Метод возвращает отчёт об удержаниях за занижение габаритов упаковки"
---

# Удержания за занижение габаритов упаковки

```http
GET /api/analytics/v1/measurement-penalties
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёты об удержаниях · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/retentionReports/operation/getV1MeasurementPenalties)

Метод возвращает отчёт об [удержаниях за занижение габаритов упаковки](https://seller.wildberries.ru/analytics-reports/dimensions-penalties)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск  |
| ------------------ | ------ | -------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый            | 6 ч    | 1 запрос | 6 ч      | 1 запрос |

## Параметры

| Имя        | Где   | Тип       | Обяз. | Описание                                                                                                |
| ---------- | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string`  | нет   | Начало отчётного периода. По умолчанию используется дата, когда были впервые получены данные для отчёта |
| `dateTo`   | query | `string`  | да    | Конец отчётного периода                                                                                 |
| `limit`    | query | `integer` | да    | Количество удержаний в ответе                                                                           |
| `offset`   | query | `integer` | нет   | Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента                  |

## Ответы

| Код   | Описание               | Схема                   |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `MeasurementPenalties`  |
| `400` | Неправильный запрос    | `Response400Retentions` |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Response403Retentions` |
| `429` | Слишком много запросов | `object`                |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_measurement_penalties(date_to=..., limit=..., date_from=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1MeasurementPenalties(dateTo, limit, dateFrom, offset);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1MeasurementPenalties(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1MeasurementPenalties(dateTo, limit, dateFrom, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1MeasurementPenalties($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1MeasurementPenalties(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1MeasurementPenalties(dateTo, limit));
```

:::
