---
title: "Родительские категории бренда"
description: "Метод возвращает родительские категории бренда продавца для отчёта о доле бренда в продажах."
---

# Родительские категории бренда

```http
GET /api/v1/analytics/brand-share/parent-subjects
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Доля бренда в продажах · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/shareOfBrandInSales/operation/getV1AnalyticsBrandShareParentSubjects)

Метод возвращает родительские категории бренда продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share).

Можно получить отчёт максимум за 365 дней. Данные доступны с 1 ноября 2022.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск     |
| ------------------ | ------ | -------- | -------- | ----------- |
| Персональный       | 5 сек  | 1 запрос | 5 сек    | 20 запросов |
| Сервисный          | 5 сек  | 1 запрос | 5 сек    | 20 запросов |
| Базовый с секретом | 5 сек  | 1 запрос | 5 сек    | 20 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос    |

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                                               |
| -------- | ----- | -------- | ----- | -------------------------------------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык поля ответа `parentName`: - `ru` — русский - `en` — английский - `zh` — китайский |
| `brand`  | query | `string` | да    | Бренд                                                                                  |

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

const { data } = await api.getV1AnalyticsBrandShareParentSubjects(brand, dateFrom, dateTo, locale);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1AnalyticsBrandShareParentSubjects(context.Background()).Brand(brand).Execute()
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

System.out.println(api.getV1AnalyticsBrandShareParentSubjects(brand, dateFrom, dateTo, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1AnalyticsBrandShareParentSubjects($brand, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ДоляБрендаВПродажахApi(Настройки);

Сообщить(Клиент.GetV1AnalyticsBrandShareParentSubjects(brand, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1AnalyticsBrandShareParentSubjects(brand, dateFrom, dateTo));
```

:::
