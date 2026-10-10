---
title: "Изменение мест размещения в кампаниях с ручной ставкой"
description: "Метод меняет места размещения в кампаниях с ручной ставкой и моделью оплаты за показы — cpm."
---

# Изменение мест размещения в кампаниях с ручной ставкой

```http
PUT /adv/v0/auction/placements
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/promotion/put-adv-v0-auction-placements) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/campaignManagement/operation/putV0AuctionPlacements)

Метод меняет места размещения в кампаниях с ручной ставкой и моделью оплаты за показы — `cpm`.

Для кампаний в статусах `4`, `9` и `11`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Сервисный          | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Базовый с секретом | 1 сек  | 1 запрос  | 1 сек    | 1 запрос |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema        |
| ----- | ---------------------- | ------------- |
| `204` | Успешно                | —             |
| `400` | Неправильный запрос    | `response400` |
| `401` | Не авторизован         | `object`      |
| `403` | Доступ запрещён        | `object`      |
| `429` | Слишком много запросов | `object`      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.put_v0_auction_placements(put_v0_auction_placements_request=...)
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

const { data } = await api.putV0AuctionPlacements(putV0AuctionPlacementsRequest);
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

result, _, err := client.PromotionAPI.PutV0AuctionPlacements(context.Background()).PutV0AuctionPlacementsRequest(putV0AuctionPlacementsRequest).Execute()
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

System.out.println(api.putV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->putV0AuctionPlacements($put_v0_auction_placements_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PutV0AuctionPlacements(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PutV0AuctionPlacements(putV0AuctionPlacementsRequest));
```

:::
