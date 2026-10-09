---
title: "Замеры склада"
description: "Метод возвращает отчёт о замерах склада"
---

# Замеры склада

```http
GET /api/analytics/v1/warehouse-measurements
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`reports`](/reference/api/reports/) · **Раздел:** Отчёты об удержаниях · [Документация WB ↗](https://dev.wildberries.ru/openapi/reports#tag/retentionReports/operation/getV1WarehouseMeasurements)

Метод возвращает отчёт о [замерах склада](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/warehouse-measurements)

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
| `limit`    | query | `integer` | да    | Количество замеров в ответе                                                                             |
| `offset`   | query | `integer` | нет   | Сколько элементов пропустить. Например, для значения `10` ответ начнётся с 11 элемента                  |

## Ответы

| Код   | Описание               | Схема                   |
| ----- | ---------------------- | ----------------------- |
| `200` | Успешно                | `WHM`                   |
| `400` | Неправильный запрос    | `Response400Retentions` |
| `401` | Не авторизован         | `object`                |
| `402` | Требуется платёж       | `object`                |
| `403` | Доступ запрещён        | `Response403Retentions` |
| `429` | Слишком много запросов | `object`                |

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

const { data } = await api.getV1WarehouseMeasurements(dateTo, limit, dateFrom, offset);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1WarehouseMeasurements(context.Background()).DateTo(dateTo).Limit(limit).Execute()
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

System.out.println(api.getV1WarehouseMeasurements(dateTo, limit, dateFrom, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1WarehouseMeasurements($date_to, $limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ОтчётыОбУдержанияхApi(Настройки);

Сообщить(Клиент.GetV1WarehouseMeasurements(dateTo, limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1WarehouseMeasurements(dateTo, limit));
```

:::
