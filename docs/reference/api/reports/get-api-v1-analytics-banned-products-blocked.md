---
title: "Получить отчёт"
description: "Метод возвращает список заблокированных карточек товаров продавца с причинами блокировки."
---

# Получить отчёт

```http
GET /api/v1/analytics/banned-products/blocked
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Заблокированные карточки · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/reports/get-api-v1-analytics-banned-products-blocked) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/blockedItems/operation/getV1AnalyticsBannedProducsBlocked)

Метод возвращает список [заблокированных карточек товаров продавца](https://seller.wildberries.ru/analytics-reports/banned-products) с причинами блокировки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 6 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Параметры

| Имя     | Где   | Тип      | Обяз. | Описание                                                                                                                                                                                                                        |
| ------- | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sort`  | query | `string` | да    | Сортировка - `brand` — по бренду - `nmId` — по артикулу WB - `title` — по наименованию товара - `vendorCode` — по артикулу продавца - `reason` — по причине блокировки                                                          |
| `order` | query | `string` | да    | Порядок выдачи - `desc` — от наибольшего числового значения к наименьшему, от последнего по алфавиту значения к первому - `asc` — от наименьшего числового значения к наибольшему, от первого по алфавиту значения к последнему |

## Ответы

| Код   | Описание               | Схема                                           |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `GetV1AnalyticsBannedProducsBlockedResponse200` |
| `400` | Неправильный запрос    | `GetV1AnalyticsBannedProducsBlockedResponse400` |
| `401` | Не авторизован         | `object`                                        |
| `402` | Требуется платёж       | `object`                                        |
| `403` | Доступ запрещён        | `object`                                        |
| `429` | Слишком много запросов | `object`                                        |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_analytics_banned_producs_blocked(sort=..., order=...)
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

const { data } = await api.getV1AnalyticsBannedProducsBlocked(sort, order);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1AnalyticsBannedProducsBlocked(context.Background()).Sort(sort).Order(order).Execute()
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

System.out.println(api.getV1AnalyticsBannedProducsBlocked(sort, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1AnalyticsBannedProducsBlocked($sort, $order));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsBannedProducsBlocked(sort, order).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1AnalyticsBannedProducsBlocked(sort, order));
```

:::
