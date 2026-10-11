---
title: "Остатки бюджетов кампаний"
description: "Метод возвращает информацию об остатках бюджетов кампаний. Для кампаний в статусах: - 4 — готова к запуску - 9 — активна - 11 — на паузе"
---

# Остатки бюджетов кампаний

```http
POST /api/advert/v2/budget
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Финансы · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/finances/operation/postV2Budget)

Метод возвращает информацию об остатках бюджетов [кампаний](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts).
Для кампаний в [статусах](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV1PromotionCount):

- `4` — готова к запуску
- `9` — активна
- `11` — на паузе

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск   |
| ------------------ | ------ | ----------- | -------- | --------- |
| Персональный       | 1 мин  | 20 запросов | 3 сек    | 4 запроса |
| Сервисный          | 1 мин  | 20 запросов | 3 сек    | 4 запроса |
| Базовый с секретом | 1 мин  | 20 запросов | 3 сек    | 4 запроса |
| Базовый            | 1 ч    | 4 запроса   | 15 мин   | 1 запрос  |

## Request body

`application/json` — schema `V2BudgetRequest`, required

## Responses

| Code  | Description            | Schema             |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `V2BudgetResponse` |
| `400` | Неправильный запрос    | `string`           |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `object`           |
| `429` | Слишком много запросов | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v2_budget(v2_budget_request=...)
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

const { data } = await api.postV2Budget(v2BudgetRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV2Budget(context.Background()).V2BudgetRequest(v2BudgetRequest).Execute()
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

System.out.println(api.postV2Budget(v2BudgetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV2Budget($v2_budget_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV2Budget(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV2Budget(v2BudgetRequest));
```

:::
