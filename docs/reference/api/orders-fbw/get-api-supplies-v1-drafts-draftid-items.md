---
title: "Список товаров в черновике"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список товаров в черновике

```http
GET /api/supplies/v1/drafts/{draftId}/items
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Черновики поставок · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/supplyDrafts/operation/getV1DraftsDraftIdItems)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список товаров черновика.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Параметры

| Имя       | Где  | Тип      | Обяз. | Описание     |
| --------- | ---- | -------- | ----- | ------------ |
| `draftId` | path | `string` | да    | ID черновика |

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `models.ListDraftItemsResponse` |
| `400` | Неправильный запрос    | `errors.DraftError`             |
| `401` | Не авторизован         | `object`                        |
| `403` | Доступ запрещён        | `object`                        |
| `404` | Не найдено             | `errors.DraftError`             |
| `429` | Слишком много запросов | `object`                        |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_drafts_draft_id_items(draft_id=...)
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

const { data } = await api.getV1DraftsDraftIdItems(draftId);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1DraftsDraftIdItems(context.Background(), draftId).Execute()
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

System.out.println(api.getV1DraftsDraftIdItems(draftId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1DraftsDraftIdItems($draft_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1DraftsDraftIdItems(draftId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1DraftsDraftIdItems(draftId));
```

:::
