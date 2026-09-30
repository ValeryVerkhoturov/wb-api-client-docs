---
title: "Остатки на складах продавца"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Остатки на складах продавца

```http
POST /api/analytics/v1/stocks-report/seller-warehouses
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** История остатков · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport/operation/postV1StocksReportSellerWarehouses)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает текущие остатки товаров на складах продавца.

Данные обновляются 1 раз в 30 минут.

1 строка ответа — данные об 1 размере товара на 1 складе продавца.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит     | Интервал | Всплеск  |
| ------ | --------- | -------- | -------- |
| 1 мин  | 3 запроса | 20 сек   | 1 запрос |

## Request body

`application/json` — schema `InventoryRequest`, required

## Responses

| Code  | Description            | Schema                                          |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `PostV1StocksReportSellerWarehousesResponse200` |
| `204` | Нет данных             | —                                               |
| `400` | Неправильный запрос    | `ErrorObject400`                                |
| `401` | Не авторизован         | `object`                                        |
| `403` | Доступ запрещён        | `ErrorObject403`                                |
| `429` | Слишком много запросов | `object`                                        |

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

const { data } = await api.postV1StocksReportSellerWarehouses(inventoryRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1StocksReportSellerWarehouses(context.Background()).InventoryRequest(inventoryRequest).Execute()
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

System.out.println(api.postV1StocksReportSellerWarehouses(inventoryRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1StocksReportSellerWarehouses($inventory_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИсторияОстатковApi(Настройки);

Сообщить(Клиент.PostV1StocksReportSellerWarehouses(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1StocksReportSellerWarehouses(inventoryRequest));
```

:::
