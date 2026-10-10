---
title: "Заказы и позиции по поисковым запросам товара"
description: "Метод формирует данные для таблицы: - о заказах по каждому поисковому запросу для конкретного товара - о позициях товара в результатах поиска по каждому…"
---

# Заказы и позиции по поисковым запросам товара

```http
POST /api/v2/search-report/product/orders
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Поисковые запросы по вашим товарам · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductOrders)

Метод формирует данные для таблицы:

- о заказах по каждому поисковому запросу для конкретного товара
- о позициях товара в результатах поиска по каждому запросу
  Данные указаны в рамках периода для [запрошенного товара](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts) и сгруппированы по дням. Максимальный период — 7 дней.

Данные отчёта обновляются 1 раз в 2 часа.

Можно получить отчёт максимум за последние 365 дней с момента выполнения запроса

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Request body

`application/json` — schema `ItemOrdersRequest`, required

## Responses

| Code  | Description            | Schema                                       |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV2SearchReportProductOrdersResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                             |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `ErrorObject403`                             |
| `429` | Слишком много запросов | `object`                                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v2_search_report_product_orders(item_orders_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV2SearchReportProductOrders(itemOrdersRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV2SearchReportProductOrders(context.Background()).ItemOrdersRequest(itemOrdersRequest).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV2SearchReportProductOrders(itemOrdersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV2SearchReportProductOrders($item_orders_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV2SearchReportProductOrders(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV2SearchReportProductOrders(itemOrdersRequest));
```

:::
