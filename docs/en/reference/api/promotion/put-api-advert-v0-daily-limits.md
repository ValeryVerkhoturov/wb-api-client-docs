---
title: "Настройка дневных лимитов кампаний"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Настройка дневных лимитов кампаний

```http
PUT /api/advert/v0/daily-limits
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/putV0DailyLimits)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод включает, выключает и обновляет дневной лимит кампаний.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип          | Период | Лимит      | Интервал | Всплеск    |
| ------------ | ------ | ---------- | -------- | ---------- |
| Персональный | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный    | 1 мин  | 5 запросов | 12 сек   | 5 запросов |

## Request body

`application/json` — schema `V0PutDailyLimitsRequest`, required

## Responses

| Code  | Description            | Schema                     |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `V0PutDailyLimitsResponse` |
| `400` | Неправильный запрос    | `response400`              |
| `401` | Не авторизован         | `object`                   |
| `403` | Доступ запрещён        | `object`                   |
| `429` | Слишком много запросов | `object`                   |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.put_v0_daily_limits(v0_put_daily_limits_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new PromotionApi(cfg);

const { data } = await api.putV0DailyLimits(v0PutDailyLimitsRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PutV0DailyLimits(context.Background()).V0PutDailyLimitsRequest(v0PutDailyLimitsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.putV0DailyLimits(v0PutDailyLimitsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0DailyLimits($v0_put_daily_limits_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0DailyLimits(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0DailyLimits(v0PutDailyLimitsRequest));
```

:::
