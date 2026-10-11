---
title: "Удалить товары из черновика"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Удалить товары из черновика

```http
DELETE /api/supplies/v1/drafts/{draftId}/items
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Черновики поставок · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftIdItems)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод удаляет товары из черновика поставки по списку баркодов.

Баркоды не валидируются. Если в запросе вы передали некорректные баркоды, вы не получите ошибку. При этом корректные баркоды будут удалены из черновика.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Parameters

| Name      | In   | Type     | Req. | Description  |
| --------- | ---- | -------- | ---- | ------------ |
| `draftId` | path | `string` | yes  | ID черновика |

## Request body

`application/json` — schema `models.DraftDeleteitemsRequest`, required

## Responses

| Code  | Description            | Schema                                 |
| ----- | ---------------------- | -------------------------------------- |
| `200` | Успешно                | `models.DraftDeleteItemsErrorResponse` |
| `400` | Неправильный запрос    | `errors.DraftError`                    |
| `401` | Не авторизован         | `object`                               |
| `403` | Доступ запрещён        | `object`                               |
| `404` | Не найдено             | `errors.DraftError`                    |
| `429` | Слишком много запросов | `object`                               |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.delete_v1_drafts_draft_id_items(draft_id=..., models_draft_deleteitems_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.deleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.DeleteV1DraftsDraftIdItems(context.Background(), draftId).ModelsDraftDeleteitemsRequest(modelsDraftDeleteitemsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.deleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->deleteV1DraftsDraftIdItems($draft_id, $models_draft_deleteitems_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.DeleteV1DraftsDraftIdItems(draftId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.DeleteV1DraftsDraftIdItems(draftId, modelsDraftDeleteitemsRequest));
```

:::
