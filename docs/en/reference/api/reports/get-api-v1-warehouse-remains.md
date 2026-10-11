---
title: "Создать отчёт"
description: "Метод создаёт задание на генерацию отчёта об остатках на складах WB."
---

# Создать отчёт

```http
GET /api/v1/warehouse_remains
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`reports`](/en/reference/api/reports/) · **Section:** Отчёт об остатках на складах · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemains)

Метод создаёт [задание на генерацию](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemainsTasksTaskIdStatus) отчёта об [остатках на складах WB](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport/operation/getV1WarehouseRemainsTasksTaskIdDownload).

Параметры `groupBy` и `filter` (группировки и фильтры) можно задать в любой комбинации — аналогично [версии](https://seller.wildberries.ru/analytics-reports/warehouse-remains) в личном кабинете.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск    |
| ------------------ | ------ | --------- | -------- | ---------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 5 запросов |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 5 запросов |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 5 запросов |
| Базовый            | 1 ч    | 4 запроса | 15 мин   | 1 запрос   |

## Parameters

| Name             | In    | Type      | Req. | Description                                                                                                                                        |
| ---------------- | ----- | --------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`         | query | `string`  | no   | Язык полей ответа `subjectName` и `warehouseName`: - `ru` — русский - `en` — английский - `zh` — китайский. Значения `warehouseName` на английском |
| `groupByBrand`   | query | `boolean` | no   | Разбивка по брендам                                                                                                                                |
| `groupBySubject` | query | `boolean` | no   | Разбивка по предметам                                                                                                                              |
| `groupBySa`      | query | `boolean` | no   | Разбивка по артикулам продавца                                                                                                                     |
| `groupByNm`      | query | `boolean` | no   | Разбивка по артикулам WB. Если `groupByNm=true`, в ответе будет поле `volume`                                                                      |
| `groupByBarcode` | query | `boolean` | no   | Разбивка по баркодам                                                                                                                               |
| `groupBySize`    | query | `boolean` | no   | Разбивка по размерам                                                                                                                               |
| `filterPics`     | query | `integer` | no   | Фильтр по фото: - `-1` — без фото - `0` — не применять фильтр - `1` — с фото                                                                       |
| `filterVolume`   | query | `integer` | no   | Фильтр по объёму: - `-1` — без габаритов - `0` — не применять фильтр - `3` — свыше трёх литров                                                     |

## Responses

| Code  | Description            | Schema               |
| ----- | ---------------------- | -------------------- |
| `200` | Успешно                | `CreateTaskResponse` |
| `400` | Неправильный запрос    | `Http4XXResponse`    |
| `401` | Не авторизован         | `object`             |
| `402` | Требуется платёж       | `object`             |
| `403` | Доступ запрещён        | `object`             |
| `429` | Слишком много запросов | `object`             |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.reports import Configuration, ApiClient
from wb_api_client.reports.api import ReportsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ReportsApi(ApiClient(cfg))

result = api.get_v1_warehouse_remains(locale=..., group_by_brand=..., group_by_subject=..., group_by_sa=..., group_by_nm=..., group_by_barcode=..., group_by_size=..., filter_pics=..., filter_volume=...)
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

const { data } = await api.getV1WarehouseRemains(locale, groupByBrand, groupBySubject, groupBySa, groupByNm, groupByBarcode, groupBySize, filterPics, filterVolume);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbreports "github.com/ValeryVerkhoturov/wb-api-client-go/reports"
)

cfg := wbreports.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbreports.NewAPIClient(cfg)

result, _, err := client.ReportsAPI.GetV1WarehouseRemains(context.Background()).Execute()
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

System.out.println(api.getV1WarehouseRemains(locale, groupByBrand, groupBySubject, groupBySa, groupByNm, groupByBarcode, groupBySize, filterPics, filterVolume));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Reports\Configuration;
use ValeryVerkhoturov\WbApiClient\Reports\SecretString;
use ValeryVerkhoturov\WbApiClient\Reports\Api\ReportsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ReportsApi(new Client(), $config);

print_r($api->getV1WarehouseRemains());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ReportsApi(Настройки);

Сообщить(Клиент.GetV1WarehouseRemains().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Reports.Api;
using ValeryVerkhoturov.WbApiClient.Reports.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ReportsApi(config);

Console.WriteLine(api.GetV1WarehouseRemains());
```

:::
