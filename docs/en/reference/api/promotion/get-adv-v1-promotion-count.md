---
title: "Списки кампаний"
description: "Метод возвращает списки всех рекламных кампаний продавца с их ID. Кампании сгруппированы по типу и статусу, у каждой указана дата последнего изменения."
---

# Списки кампаний

```http
GET /adv/v1/promotion/count
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Кампании · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV1PromotionCount)

Метод возвращает списки всех [рекламных кампаний](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts) продавца с их ID. Кампании сгруппированы по типу и статусу, у каждой указана дата последнего изменения.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 4 запроса  | 15 мин   | 1 запрос   |

## Responses

| Code  | Description            | Schema                           |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV1PromotionCountResponse200` |
| `401` | Не авторизован         | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_promotion_count()
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

const { data } = await api.getV1PromotionCount();
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV1PromotionCount(context.Background()).Execute()
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

System.out.println(api.getV1PromotionCount());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1PromotionCount());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1PromotionCount().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1PromotionCount());
```

:::
