---
title: "Данные по группам"
description: "Метод формирует набор данных об остатках по группам товаров."
---

# Данные по группам

```http
POST /api/v2/stocks-report/products/groups
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** История остатков · [Документация WB ↗](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport/operation/postV2StocksReportProductsGroups)

Метод формирует набор данных об остатках по группам товаров.

Группа товаров описывается кортежем `subjectID, brandName, tagID`.

Данные отчёта обновляются 1 раз в 2 часа.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск   |
| ------------------ | ------ | --------- | -------- | --------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 3 запроса |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос  |

## Тело запроса

`application/json` — схема `TableGroupRequestSt`, обязательно

## Ответы

| Код   | Описание               | Схема                                         |
| ----- | ---------------------- | --------------------------------------------- |
| `200` | Успешно                | `PostV2StocksReportProductsGroupsResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`                              |
| `401` | Не авторизован         | `object`                                      |
| `402` | Требуется платёж       | `object`                                      |
| `403` | Доступ запрещён        | `ErrorObject403`                              |
| `429` | Слишком много запросов | `object`                                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2StocksReportProductsGroups(tableGroupRequestSt);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2StocksReportProductsGroups(context.Background()).TableGroupRequestSt(tableGroupRequestSt).Execute()
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

System.out.println(api.postV2StocksReportProductsGroups(tableGroupRequestSt));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2StocksReportProductsGroups($table_group_request_st));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИсторияОстатковApi(Настройки);

Сообщить(Клиент.PostV2StocksReportProductsGroups(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2StocksReportProductsGroups(tableGroupRequestSt));
```

:::
