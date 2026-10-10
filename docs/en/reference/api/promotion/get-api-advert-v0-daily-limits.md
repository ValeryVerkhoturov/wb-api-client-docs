---
title: "Получить настройки дневных лимитов кампаний"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Получить настройки дневных лимитов кампаний

```http
GET /api/advert/v0/daily-limits
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0DailyLimits)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает текущие настройки [дневных лимитов кампаний CPC](https://cmp.wildberries.ru/campaigns/help/knowledge-base/options#%D0%94%D0%BD%D0%B5%D0%B2%D0%BD%D0%BE%D0%B9%D0%BB%D0%B8%D0%BC%D0%B8%D1%82%D0%B2%D0%BA%D0%B0%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F%D1%85%D1%81%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%BE%D0%B9%D0%B7%D0%B0%D0%BA%D0%BB%D0%B8%D0%BA%D0%B8%D0%A1%D0%A0%D0%A1) — максимальных сумм, которые кампании могут потратить на продвижение в течение суток.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип          | Период | Лимит      | Интервал | Всплеск    |
| ------------ | ------ | ---------- | -------- | ---------- |
| Персональный | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный    | 1 мин  | 5 запросов | 12 сек   | 5 запросов |

## Parameters

| Name        | In    | Type     | Req. | Description                                               |
| ----------- | ----- | -------- | ---- | --------------------------------------------------------- |
| `advertIds` | query | `string` | yes  | ID кампаний, максимум 100. Укажите значения через запятую |

## Responses

| Code  | Description            | Schema                     |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `V0GetDailyLimitsResponse` |
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

result = api.get_v0_daily_limits(advert_ids=...)
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

const { data } = await api.getV0DailyLimits(advertIds);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV0DailyLimits(context.Background()).AdvertIds(advertIds).Execute()
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

System.out.println(api.getV0DailyLimits(advertIds));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV0DailyLimits($advert_ids));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV0DailyLimits(advertIds).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV0DailyLimits(advertIds));
```

:::
