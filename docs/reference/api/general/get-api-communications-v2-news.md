---
title: "Получение новостей портала продавцов"
description: "Метод позволяет получать новости портала продавцов. Для получения успешного ответа необходимо указать один из параметров from или fromID. За один запрос можно…"
---

# Получение новостей портала продавцов

```http
GET /api/communications/v2/news
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** API новостей · [Документация WB ↗](https://dev.wildberries.ru/openapi/api-information#tag/newsApi/operation/getV2News)

Метод позволяет получать новости портала продавцов.
Для получения успешного ответа необходимо указать
один из параметров `from` или `fromID`.
За один запрос можно получить не более 100 новостей.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск     |
| ------------------ | ------ | -------- | -------- | ----------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос    |

## Параметры

| Имя      | Где   | Тип               | Обяз. | Описание                                                                    |
| -------- | ----- | ----------------- | ----- | --------------------------------------------------------------------------- |
| `from`   | query | `string`          | нет   | Дата, от которой необходимо выдать новости                                  |
| `fromID` | query | `integer<uint64>` | нет   | ID новости, начиная с которой — включая её — нужно получить список новостей |

## Ответы

| Код   | Описание               | Схема                  |
| ----- | ---------------------- | ---------------------- |
| `200` | Успешно                | `GetV2NewsResponse200` |
| `400` | Неправильный запрос    | —                      |
| `401` | Не авторизован         | `object`               |
| `429` | Слишком много запросов | `object`               |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import APIApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = APIApi(ApiClient(cfg))

result = api.get_v2_news(var_from=..., from_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  APIApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new APIApi(cfg);

const { data } = await api.getV2News(from, fromID);
console.log(data);
```

```go [Go]
cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.APIAPI.GetV2News(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.ApiApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ApiApi api = new ApiApi(client);

System.out.println(api.getV2News(from, fromID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\APIApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new APIApi(new Client(), $config);

print_r($api->getV2News());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый APIНовостейApi(Настройки);

Сообщить(Клиент.GetV2News().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new APIApi(config);

Console.WriteLine(api.GetV2News());
```

:::
