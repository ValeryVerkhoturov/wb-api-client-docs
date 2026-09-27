---
title: "Детализации к отчётам реализации за период"
description: "Метод возвращает детализации к отчётам реализации за указанный период."
---

# Детализации к отчётам реализации за период

```http
POST /api/finance/v1/sales-reports/detailed
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Финансовые отчёты · [Документация WB ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)

Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements) за указанный период.

Данные доступны с 29 января 2024 года.

Вы можете выгрузить данные в [Google Таблицы](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-650c-7b04-9596-ba441936f9d3)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос  | 1 мин    | 1 запрос |
| Базовый            | 24 ч   | 2 запроса | 12 ч     | 1 запрос |

## Тело запроса

`application/json` — схема `SalesReportsDetailedReq`, обязательно

## Ответы

| Код   | Описание               | Схема                                   |
| ----- | ---------------------- | --------------------------------------- |
| `200` | Успешно                | `PostV1SalesReportsDetailedResponse200` |
| `204` | Нет данных             | —                                       |
| `400` | Неправильный запрос    | `object`                                |
| `401` | Не авторизован         | `object`                                |
| `402` | Требуется платёж       | `object`                                |
| `403` | Доступ запрещён        | `object`                                |
| `429` | Слишком много запросов | `object`                                |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.post_v1_sales_reports_detailed(sales_reports_detailed_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1SalesReportsDetailed(salesReportsDetailedReq);
console.log(data);
```

```go [Go]
cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1SalesReportsDetailed(context.Background()).SalesReportsDetailedReq(salesReportsDetailedReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1SalesReportsDetailed(salesReportsDetailedReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1SalesReportsDetailed($sales_reports_detailed_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ФинансовыеОтчётыApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsDetailed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1SalesReportsDetailed(salesReportsDetailedReq));
```

:::
