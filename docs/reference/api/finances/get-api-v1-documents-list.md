---
title: "Список документов"
description: "Метод возвращает список документов продавца. Вы можете получить один или несколько документов из полученного списка."
---

# Список документов

```http
GET /api/v1/documents/list
```

**База:** `https://documents-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Документы · [Документация WB ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsList)

Метод возвращает список документов продавца. Вы можете получить [один](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsDownload) или [несколько](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/postV1DocumentsDownloadAll) документов из полученного списка.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый            | 24 ч   | 1 запрос | 24 ч     | 1 запрос   |

## Параметры

| Имя           | Где   | Тип       | Обяз. | Описание                                                                                                                                               |
| ------------- | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `beginTime`   | query | `string`  | нет   | Начало периода. Только вместе с `endTime`                                                                                                              |
| `endTime`     | query | `string`  | нет   | Конец периода. Только вместе с `beginTime`                                                                                                             |
| `sort`        | query | `string`  | нет   | Сортировка: - `date` — по дате создания документа - `category` — по категории (только при `locale=ru`) Только вместе с `order`                         |
| `order`       | query | `string`  | нет   | Сортировка: - `desc` — по убыванию - `asc` — по возрастанию Только вместе с `sort`                                                                     |
| `category`    | query | `string`  | нет   | ID [категории документов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsCategories) из поля `name` |
| `serviceName` | query | `string`  | нет   | Уникальный ID документа                                                                                                                                |
| `limit`       | query | `integer` | нет   | Максимальное количество строк ответа                                                                                                                   |
| `offset`      | query | `integer` | нет   | После какой строки выдавать данные                                                                                                                     |

## Ответы

| Код   | Описание               | Схема     |
| ----- | ---------------------- | --------- |
| `200` | Успешно                | `GetList` |
| `400` | Неправильный запрос    | `object`  |
| `401` | Не авторизован         | `object`  |
| `402` | Требуется платёж       | `object`  |
| `403` | Доступ запрещён        | `object`  |
| `429` | Слишком много запросов | `object`  |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
const api = new FinancesApi(cfg);

const { data } = await api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client/clients/go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.getV1DocumentsList(locale, beginTime, endTime, sort, order, category, serviceName, limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1DocumentsList());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1DocumentsList().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1DocumentsList());
```

:::
