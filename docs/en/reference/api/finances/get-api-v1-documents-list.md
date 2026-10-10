---
title: "Список документов"
description: "Метод возвращает список документов продавца. Вы можете получить один или несколько документов из полученного списка."
---

# Список документов

```http
GET /api/v1/documents/list
```

**Base URL:** `https://documents-api.wildberries.ru` · **Module:** [`finances`](/en/reference/api/finances/) · **Section:** Документы · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/finances/get-api-v1-documents-list) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsList)

Метод возвращает список документов продавца. Вы можете получить [один](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsDownload) или [несколько](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/postV1DocumentsDownloadAll) документов из полученного списка.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый            | 24 ч   | 1 запрос | 24 ч     | 1 запрос   |

## Parameters

| Name          | In    | Type      | Req. | Description                                                                                                                                            |
| ------------- | ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `beginTime`   | query | `string`  | no   | Начало периода. Только вместе с `endTime`                                                                                                              |
| `endTime`     | query | `string`  | no   | Конец периода. Только вместе с `beginTime`                                                                                                             |
| `sort`        | query | `string`  | no   | Сортировка: - `date` — по дате создания документа - `category` — по категории (только при `locale=ru`) Только вместе с `order`                         |
| `order`       | query | `string`  | no   | Сортировка: - `desc` — по убыванию - `asc` — по возрастанию Только вместе с `sort`                                                                     |
| `category`    | query | `string`  | no   | ID [категории документов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsCategories) из поля `name` |
| `serviceName` | query | `string`  | no   | Уникальный ID документа                                                                                                                                |
| `limit`       | query | `integer` | no   | Максимальное количество строк ответа                                                                                                                   |
| `offset`      | query | `integer` | no   | После какой строки выдавать данные                                                                                                                     |

## Responses

| Code  | Description            | Schema    |
| ----- | ---------------------- | --------- |
| `200` | Успешно                | `GetList` |
| `400` | Неправильный запрос    | `object`  |
| `401` | Не авторизован         | `object`  |
| `402` | Требуется платёж       | `object`  |
| `403` | Доступ запрещён        | `object`  |
| `429` | Слишком много запросов | `object`  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<your WB JWT>")
api = FinancesApi(ApiClient(cfg))

result = api.get_v1_documents_list(locale=..., begin_time=..., end_time=..., sort=..., order=..., category=..., service_name=..., limit=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FinancesApi(cfg);

const { data } = await api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.GetV1DocumentsList(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1DocumentsList());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1DocumentsList().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1DocumentsList());
```

:::
