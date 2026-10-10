---
title: "Удалить черновик"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Удалить черновик

```http
DELETE /api/supplies/v1/drafts/{draftId}
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Черновики поставок · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftId)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод удаляет черновик поставки по его ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Параметры

| Имя       | Где  | Тип            | Обяз. | Описание     |
| --------- | ---- | -------------- | ----- | ------------ |
| `draftId` | path | `string<UUID>` | да    | ID черновика |

## Ответы

| Код   | Описание               | Схема               |
| ----- | ---------------------- | ------------------- |
| `204` | Успешно                | —                   |
| `400` | Неправильный запрос    | `errors.DraftError` |
| `401` | Не авторизован         | `object`            |
| `403` | Доступ запрещён        | `object`            |
| `404` | Не найдено             | `errors.DraftError` |
| `429` | Слишком много запросов | `object`            |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.delete_v1_drafts_draft_id(draft_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.deleteV1DraftsDraftId(draftId);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbw "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbw"
)

cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.DeleteV1DraftsDraftId(context.Background(), draftId).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.deleteV1DraftsDraftId(draftId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->deleteV1DraftsDraftId($draft_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.DeleteV1DraftsDraftId(draftId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.DeleteV1DraftsDraftId(draftId));
```

:::
