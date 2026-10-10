---
title: "Настройка дневных лимитов кампаний"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Настройка дневных лимитов кампаний

```http
PUT /api/advert/v0/daily-limits
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Управление кампаниями · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/putV0DailyLimits)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод включает, выключает и обновляет дневной лимит кампаний.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип          | Период | Лимит      | Интервал | Всплеск    |
| ------------ | ------ | ---------- | -------- | ---------- |
| Персональный | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный    | 1 мин  | 5 запросов | 12 сек   | 5 запросов |

## Тело запроса

`application/json` — схема `V0PutDailyLimitsRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                      |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `V0PutDailyLimitsResponse` |
| `400` | Неправильный запрос    | `response400`              |
| `401` | Не авторизован         | `object`                   |
| `403` | Доступ запрещён        | `object`                   |
| `429` | Слишком много запросов | `object`                   |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.putV0DailyLimits(v0PutDailyLimitsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client/clients/go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.putV0DailyLimits(v0PutDailyLimitsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0DailyLimits($v0_put_daily_limits_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0DailyLimits(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0DailyLimits(v0PutDailyLimitsRequest));
```

:::
