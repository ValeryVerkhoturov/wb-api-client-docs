---
title: "Список отчётов об издержках на приём платежей"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список отчётов об издержках на приём платежей

```http
POST /api/finance/v1/acquiring/list
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Финансовые отчёты · [Документация WB ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringList)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список отчётов об издержках на приём платежей по формату [таблицы отчётов](https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/acquiring-reports).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Тело запроса

`application/json` — схема `AcquiringReportListReq`, обязательно

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `PostV1AcquiringListResponse200` |
| `204` | Нет данных             | —                                |
| `400` | Неправильный запрос    | `object`                         |
| `401` | Не авторизован         | `object`                         |
| `403` | Доступ запрещён        | `Response4XX`                    |
| `429` | Слишком много запросов | `object`                         |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.post_v1_acquiring_list(acquiring_report_list_req=...)
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

const { data } = await api.postV1AcquiringList(acquiringReportListReq);
console.log(data);
```

```go [Go]
cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1AcquiringList(context.Background()).AcquiringReportListReq(acquiringReportListReq).Execute()
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

System.out.println(api.postV1AcquiringList(acquiringReportListReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1AcquiringList($acquiring_report_list_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ФинансовыеОтчётыApi(Настройки);

Сообщить(Клиент.PostV1AcquiringList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1AcquiringList(acquiringReportListReq));
```

:::
