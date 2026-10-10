---
title: "Пополнение бюджета кампании"
description: "Метод пополняет бюджет кампании. Чтобы запустить кампанию после пополнения бюджета, используйте метод Запуск кампании."
---

# Пополнение бюджета кампании

```http
POST /adv/v1/budget/deposit
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Финансы · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/postV1BudgetDeposit)

Метод пополняет [бюджет](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/postV2Budget) кампании.
Чтобы запустить кампанию после пополнения бюджета, используйте метод [Запуск кампании](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0Start).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 1 запрос   | 1 сек    | 5 запросов |
| Сервисный          | 1 сек  | 1 запрос   | 1 сек    | 5 запросов |
| Базовый с секретом | 1 сек  | 1 запрос   | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя  | Где   | Тип       | Обяз. | Описание    |
| ---- | ----- | --------- | ----- | ----------- |
| `id` | query | `integer` | да    | ID кампании |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `ResponseWithReturn`             |
| `400` | Неправильный запрос    | `PostV1BudgetDepositResponse400` |
| `401` | Не авторизован         | `object`                         |
| `403` | Доступ запрещён        | `object`                         |
| `429` | Слишком много запросов | `object`                         |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v1_budget_deposit(id=..., post_v1_budget_deposit_request=...)
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

const { data } = await api.postV1BudgetDeposit(id, postV1BudgetDepositRequest);
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

result, _, err := client.PromotionAPI.PostV1BudgetDeposit(context.Background()).Id(id).PostV1BudgetDepositRequest(postV1BudgetDepositRequest).Execute()
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

System.out.println(api.postV1BudgetDeposit(id, postV1BudgetDepositRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1BudgetDeposit($id, $post_v1_budget_deposit_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1BudgetDeposit(id, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1BudgetDeposit(id, postV1BudgetDepositRequest));
```

:::
