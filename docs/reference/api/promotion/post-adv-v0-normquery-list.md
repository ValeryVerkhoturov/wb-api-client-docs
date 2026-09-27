---
title: "Списки активных и неактивных поисковых кластеров"
description: "Метод возвращает списки активных и неактивных поисковых кластеров, по которым было не меньше 100 показов."
---

# Списки активных и неактивных поисковых кластеров

```http
POST /adv/v0/normquery/list
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Поисковые кластеры · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/searchClusters/operation/postV0NormqueryList)

Метод возвращает списки активных и неактивных поисковых кластеров, по которым было не меньше 100 показов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск     |
| ------------------ | ------ | ---------- | -------- | ----------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 10 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос    |

## Тело запроса

`application/json` — схема `V0GetNormQueryListRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                        |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `V0GetNormQueryListResponse` |
| `400` | Неправильный запрос    | `response400`                |
| `401` | Не авторизован         | `object`                     |
| `403` | Доступ запрещён        | `object`                     |
| `429` | Слишком много запросов | `object`                     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.post_v0_normquery_list(v0_get_norm_query_list_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV0NormqueryList(v0GetNormQueryListRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV0NormqueryList(context.Background()).V0GetNormQueryListRequest(v0GetNormQueryListRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV0NormqueryList(v0GetNormQueryListRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV0NormqueryList($v0_get_norm_query_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ПоисковыеКластерыApi(Настройки);

Сообщить(Клиент.PostV0NormqueryList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV0NormqueryList(v0GetNormQueryListRequest));
```

:::
