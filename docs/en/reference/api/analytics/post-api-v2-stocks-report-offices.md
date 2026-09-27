---
title: "Данные по складам"
description: "Метод формирует набор данных об остатках по складам."
---

# Данные по складам

```http
POST /api/v2/stocks-report/offices
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** История остатков · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport/operation/postV2StocksReportOffices)

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

## Request body

`application/json` — schema `TableShippingOfficeRequest`, required

## Responses

| Code  | Description            | Schema                                 |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `PostV2StocksReportOfficesResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                       |
| `401` | Не авторизован         | `object`                               |
| `402` | Требуется платёж       | `object`                               |
| `403` | Доступ запрещён        | `ErrorObject403`                       |
| `429` | Слишком много запросов | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2StocksReportOffices(tableShippingOfficeRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2StocksReportOffices(context.Background()).TableShippingOfficeRequest(tableShippingOfficeRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2StocksReportOffices(tableShippingOfficeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2StocksReportOffices($table_shipping_office_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИсторияОстатковApi(Настройки);

Сообщить(Клиент.PostV2StocksReportOffices(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2StocksReportOffices(tableShippingOfficeRequest));
```

:::
