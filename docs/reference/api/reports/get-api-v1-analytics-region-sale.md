---
title: "Получить отчёт"
description: "Метод возвращает отчёт с данными продаж, сгруппированных по регионам стран."
---

# Получить отчёт

```http
GET /api/v1/analytics/region-sale
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Продажи по регионам · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale)

Метод возвращает отчёт с [данными продаж, сгруппированных по регионам стран](https://seller.wildberries.ru/analytics-reports/region-sale).

Можно получить отчёт максимум за 31 день.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Ответы

| Код   | Описание               | Схема             |
| ----- | ---------------------- | ----------------- |
| `200` | Успешно                | `object`          |
| `400` | Неправильный запрос    | `Http4XXResponse` |
| `401` | Не авторизован         | `object`          |
| `402` | Требуется платёж       | `object`          |
| `403` | Доступ запрещён        | `object`          |
| `429` | Слишком много запросов | `object`          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1AnalyticsRegionSale(dateFrom, dateTo);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1AnalyticsRegionSale(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.reports.ApiClient;
import io.github.valeryverkhoturov.wbapi.reports.SecretString;
import io.github.valeryverkhoturov.wbapi.reports.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1AnalyticsRegionSale(dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1AnalyticsRegionSale($date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ПродажиПоРегионамApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsRegionSale(dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1AnalyticsRegionSale(dateFrom, dateTo));
```

:::
