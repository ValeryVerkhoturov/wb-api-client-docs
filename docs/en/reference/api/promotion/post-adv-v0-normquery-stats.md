---
title: "Статистика поисковых кластеров"
description: "Метод формирует статистику по поисковым кластерам за указанный период. Можно использовать для кампаний с моделями оплаты cpm — за показы и cpc — за клики."
---

# Статистика поисковых кластеров

```http
POST /adv/v0/normquery/stats
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Статистика · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/statistics/operation/postV0NormqueryStats)

Метод формирует статистику по поисковым кластерам за указанный период.
Можно использовать для кампаний с моделями оплаты `cpm` — за показы и `cpc` — за клики.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Сервисный          | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый с секретом | 1 мин  | 10 запросов | 6 сек    | 20 запросов |
| Базовый            | 1 ч    | 5 запросов  | 12 мин   | 1 запрос    |

## Request body

`application/json` — schema `V0GetNormQueryStatsRequest`, required

## Responses

| Code  | Description            | Schema                        |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `V0GetNormQueryStatsResponse` |
| `400` | Неправильный запрос    | `response400`                 |
| `401` | Не авторизован         | `object`                      |
| `403` | Доступ запрещён        | `StandardizedBatchError`      |
| `429` | Слишком много запросов | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

result = api.post_v0_normquery_stats(v0_get_norm_query_stats_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV0NormqueryStats(v0GetNormQueryStatsRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV0NormqueryStats(context.Background()).V0GetNormQueryStatsRequest(v0GetNormQueryStatsRequest).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV0NormqueryStats(v0GetNormQueryStatsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV0NormqueryStats($v0_get_norm_query_stats_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СтатистикаApi(Настройки);

Сообщить(Клиент.PostV0NormqueryStats(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV0NormqueryStats(v0GetNormQueryStatsRequest));
```

:::
