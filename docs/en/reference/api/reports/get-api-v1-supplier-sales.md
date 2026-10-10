---
title: "Продажи"
description: "Метод возвращает информацию о продажах и возвратах. Данные обновляются раз в 30 минут."
---

# Продажи

```http
GET /api/v1/supplier/sales
```

**Base URL:** `https://statistics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Основные отчёты · [WB documentation ↗](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales)

Метод возвращает информацию о продажах и возвратах.
Данные обновляются раз в 30 минут.

1 строка = 1 заказ = 1 сборочное задание = 1 единица товара.
Для определения заказа рекомендуем использовать поле `srid`.

Информация о заказе хранится 90 дней с момента оформления.

Данные этого отчёта являются предварительными и служат для оперативного мониторинга

- В ответах могут отсутствовать заказы, по которым не подтверждена оплата, даже если эти заказы есть в детализациях к отчётам реализации. Например, заказы с отложенными платежами или оплатой в рассрочку
- Значения полей `priceWithDisc` и `forPay` рассчитываются по упрощённой логике и могут отличаться от `retail\_price\_withdisc\_rub` и `ppvz\_for\_pay` соответственно в детализациях к отчётам реализации
- Поля `finishedPrice`, `priceWithDisc`, `forPay` могут временно иметь значение `0`: данные заполняются асинхронно, актуализируются в течение 24 часов
- Для заказов, которые оплачены в валюте, отличной от валюты продавца, возможны округления цен из-за конвертации валют
  Для точных финансовых расчётов, сверки и отчётности используйте [детализации к отчётам реализации](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports).

Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все продажи и возвраты, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom `используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.
Если в ответе отдаётся пустой массив `[]`, все продажи и возвраты уже выгружены.

В песочнице для параметров `dateFrom` и `dateTo` можно задать диапазон только за последние 4 месяца от текущей даты.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск  |
| ------------------ | ------ | -------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый            | 2 ч    | 1 запрос | 2 ч      | 1 запрос |

## Parameters

| Name       | In    | Type     | Req. | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----- | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFrom` | query | `string` | yes  | Дата и время последнего изменения по продаже/возврату. Дата в формате RFC3339. Можно передать дату или дату со временем. Время можно указывать с точностью до [секунд](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) или миллисекунд. Время передаётся в часовом поясе Москва (UTC+3). Примеры: - `2019-06-20` - `2019-06-20T23:59:59` - `2019-06-20T00:00:00.12345` - `2017-03-25T00:00:00` |

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `GetV1SupplierSalesResponse200` |
| `400` | Неправильный запрос    | `object`                        |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `object`                        |
| `429` | Слишком много запросов | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_supplier_sales(date_from=..., flag=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ReportsApi,
} from "@valeryverkhoturov/wb-api-client/reports";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ReportsApi(cfg);

const { data } = await api.getV1SupplierSales(dateFrom, flag);
console.log(data);
```

```go [Go]
cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1SupplierSales(context.Background()).DateFrom(dateFrom).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
ReportsApi api = new ReportsApi(client);

System.out.println(api.getV1SupplierSales(dateFrom, flag));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1SupplierSales($date_from));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1SupplierSales(dateFrom).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1SupplierSales(dateFrom));
```

:::
