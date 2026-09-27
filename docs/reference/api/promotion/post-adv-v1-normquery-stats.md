---
title: "Статистика по поисковым кластерам с детализацией по дням"
description: "Метод формирует статистику по поисковым кластерам за указанный период с детализацией по дням. Можно использовать для кампаний с моделями оплаты cpm — за показы…"
---

# Статистика по поисковым кластерам с детализацией по дням

```http
POST /adv/v1/normquery/stats
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Статистика · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/statistics/operation/postV1NormqueryStats)

Метод формирует статистику по поисковым кластерам за указанный период с детализацией по дням.
Можно использовать для кампаний с моделями оплаты `cpm` — за показы и `cpc` — за клики.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Сервисный          | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый с секретом | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Тело запроса

`application/json` — схема `V1GetNormQueryStatsRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `V1GetNormQueryStatsResponse` |
| `400` | Неправильный запрос    | `response400`                 |
| `401` | Не авторизован         | `object`                      |
| `403` | Доступ запрещён        | `object`                      |
| `429` | Слишком много запросов | `object`                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.post_v1_normquery_stats(v1_get_norm_query_stats_request=...)
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

const { data } = await api.postV1NormqueryStats(v1GetNormQueryStatsRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1NormqueryStats(context.Background()).V1GetNormQueryStatsRequest(v1GetNormQueryStatsRequest).Execute()
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

System.out.println(api.postV1NormqueryStats(v1GetNormQueryStatsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1NormqueryStats($v1_get_norm_query_stats_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СтатистикаApi(Настройки);

Сообщить(Клиент.PostV1NormqueryStats(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1NormqueryStats(v1GetNormQueryStatsRequest));
```

:::
