---
title: "Статистика групп карточек товаров по дням"
description: "Метод возвращает статистику карточек товаров по дням или неделям. Карточки товаров сгруппированы по предметам, брендам и ярлыкам. Можно получить данные…"
---

# Статистика групп карточек товаров по дням

```http
POST /api/analytics/v3/sales-funnel/grouped/history
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Воронка продаж · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-grouped-history) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics#tag/salesFunnel/operation/postV3SalesFunnelGroupedHistory)

Метод возвращает статистику карточек товаров по дням или неделям.
Карточки товаров сгруппированы по предметам, брендам и ярлыкам.
Можно получить данные максимум за последнюю неделю.

Данные отчёта обновляются 1 раз в 2 часа.

В течение часа после события появляется большая часть данных:

- о заказах
- о переходах в карточку товара
- о добавлениях товаров в корзину
  Малая часть этих данных может появляться в течение нескольких дней.

Выкупы, отмены и возвраты отображаются в отчёте за тот день, когда товар был заказан. Например, если заказ был сделан 1 января, а покупатель вернул товар 10 января, данные об этом возврате появятся в отчёте за 1 января.
Окончательные итоги продаж вы можете отслеживать с помощью [детализаций к отчётам реализации](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

Параметры `brandNames`, `subjectIds`, `tagIds` могут быть пустыми `[]`, тогда группировка происходит по всем карточкам продавца.

Произведение количества предметов, брендов, ярлыков в запросе может быть не больше 16. Например, 4 бренда и 4 предмета или 2 предмета, 2 ярлыка и 4 бренда.

Чтобы получать отчёты за период до года, используйте методы [Аналитика продавца CSV](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv) — тип `GROUPED_HISTORY_REPORT`. Отчёты этого типа доступны только с подпиской [Джем](https://seller.wildberries.ru/monetization/jam)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Request body

`application/json` — schema `GroupedHistoryRequest`, required

## Responses

| Code  | Description            | Schema                                       |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV3SalesFunnelGroupedHistoryResponse200` |
| `400` | Неправильный запрос    | `ErrorObject`                                |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `ErrorObject`                                |
| `429` | Слишком много запросов | `object`                                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<your WB JWT>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v3_sales_funnel_grouped_history(grouped_history_request=...)
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

const { data } = await api.postV3SalesFunnelGroupedHistory(groupedHistoryRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbanalytics "github.com/ValeryVerkhoturov/wb-api-client-go/analytics"
)

cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV3SalesFunnelGroupedHistory(context.Background()).GroupedHistoryRequest(groupedHistoryRequest).Execute()
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

System.out.println(api.postV3SalesFunnelGroupedHistory(groupedHistoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV3SalesFunnelGroupedHistory($grouped_history_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV3SalesFunnelGroupedHistory(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV3SalesFunnelGroupedHistory(groupedHistoryRequest));
```

:::
