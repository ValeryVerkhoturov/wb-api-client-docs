---
title: "Данные по складам"
description: "Метод формирует набор данных об остатках по складам."
---

# Данные по складам

```http
POST /api/v2/stocks-report/offices
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** История остатков · [Документация WB ↗](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport/operation/postV2StocksReportOffices)

Метод формирует набор данных об остатках по складам.

Данные по складам продавца приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Свой склад"` и `"offices":[]`.

Данные отчёта обновляются 1 раз в 2 часа.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `TableShippingOfficeRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                                  |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `PostV2StocksReportOfficesResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                       |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `ErrorObject403`                       |
| `429` | Слишком много запросов | `object`                               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v2_stocks_report_offices(table_shipping_office_request=...)
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

const { data } = await api.postV2StocksReportOffices(tableShippingOfficeRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV2StocksReportOffices(context.Background()).TableShippingOfficeRequest(tableShippingOfficeRequest).Execute()
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

System.out.println(api.postV2StocksReportOffices(tableShippingOfficeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2StocksReportOffices($table_shipping_office_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2StocksReportOffices(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2StocksReportOffices(tableShippingOfficeRequest));
```

:::
