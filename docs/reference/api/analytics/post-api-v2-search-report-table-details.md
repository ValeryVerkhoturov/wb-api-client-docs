---
title: "Пагинация по товарам в группе"
description: "Метод формирует дополнительные данные к основному отчёту с пагинацией по товарам в группе. Пагинация возможна вне зависимости от наличия фильтров."
---

# Пагинация по товарам в группе

```http
POST /api/v2/search-report/table/details
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Поисковые запросы по вашим товарам · [Документация WB ↗](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableDetails)

Метод формирует дополнительные данные к [основному отчёту](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport) с пагинацией по товарам в группе. Пагинация возможна вне зависимости от наличия фильтров.

Фильтры для пагинации по товарам в группе или без фильтров:

- кортеж `subjectId`,`brandName`,`tagId` — фильтр для группы
- `nmIds` — фильтр по карточке товара
  Дополнительный параметр выбора списка товаров:
- `positionCluster` — средняя позиция в поиске
  Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Данные отчёта обновляются 1 раз в час.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос  |

## Тело запроса

`application/json` — схема `TableDetailsRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                                       |
| ----- | ---------------------- | ------------------------------------------- |
| `200` | Успешно                | `PostV2SearchReportTableDetailsResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                            |
| `401` | Не авторизован         | `object`                                    |
| `402` | Требуется платёж       | `object`                                    |
| `403` | Доступ запрещён        | `ErrorObject403`                            |
| `429` | Слишком много запросов | `object`                                    |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.post_v2_search_report_table_details(table_details_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2SearchReportTableDetails(tableDetailsRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2SearchReportTableDetails(context.Background()).TableDetailsRequest(tableDetailsRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2SearchReportTableDetails(tableDetailsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2SearchReportTableDetails($table_details_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ПоисковыеЗапросыПоВашимТоварамApi(Настройки);

Сообщить(Клиент.PostV2SearchReportTableDetails(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2SearchReportTableDetails(tableDetailsRequest));
```

:::
