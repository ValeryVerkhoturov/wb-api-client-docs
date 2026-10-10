---
title: "Остатки бюджетов кампаний"
description: "Метод возвращает информацию об остатках бюджетов кампаний. Для кампаний в статусах: - 4 — готова к запуску - 9 — активна - 11 — на паузе"
---

# Остатки бюджетов кампаний

```http
POST /api/advert/v2/budget
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Финансы · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/postV2Budget)

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

## Тело запроса

`application/json` — схема `V2BudgetRequest`, обязательно

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `V2BudgetResponse` |
| `400` | Неправильный запрос    | `string`           |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `object`           |
| `429` | Слишком много запросов | `object`           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.postV2Budget(v2BudgetRequest);
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.postV2Budget(v2BudgetRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV2Budget($v2_budget_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV2Budget(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV2Budget(v2BudgetRequest));
```

:::
