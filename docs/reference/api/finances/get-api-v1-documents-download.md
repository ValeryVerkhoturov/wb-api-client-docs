---
title: "Получить документ"
description: "Метод загружает один документ из списка документов продавца."
---

# Получить документ

```http
GET /api/v1/documents/download
```

**База:** `https://documents-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Документы · [Документация WB ↗](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsDownload)

Метод загружает один документ из [списка документов продавца](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents/operation/getV1DocumentsList).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Сервисный          | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый с секретом | 10 сек | 1 запрос | 10 сек   | 5 запросов |
| Базовый            | 24 ч   | 1 запрос | 24 ч     | 1 запрос   |

## Параметры

| Имя           | Где   | Тип      | Обяз. | Описание                |
| ------------- | ----- | -------- | ----- | ----------------------- |
| `serviceName` | query | `string` | да    | Уникальный ID документа |
| `extension`   | query | `string` | да    | Формат документа        |

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `GetDoc` |
| `400` | Неправильный запрос    | `object` |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FinancesApi(ApiClient(cfg))

result = api.get_v1_documents_download(service_name=..., extension=...)
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

const { data } = await api.getV1DocumentsDownload(serviceName, extension);
console.log(data);
```

```go [Go]
cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.GetV1DocumentsDownload(context.Background()).ServiceName(serviceName).Extension(extension).Execute()
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

System.out.println(api.getV1DocumentsDownload(serviceName, extension));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->getV1DocumentsDownload($service_name, $extension));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.GetV1DocumentsDownload(serviceName, extension).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.GetV1DocumentsDownload(serviceName, extension));
```

:::
