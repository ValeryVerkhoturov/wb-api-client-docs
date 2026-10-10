---
title: "Добавить товары в черновик"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Добавить товары в черновик

```http
POST /api/supplies/v1/drafts/{draftId}/items
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Черновики поставок · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/supplyDrafts/operation/postV1DraftsDraftIdItems)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод добавляет товары в черновик поставки.

Метод работает по принципу атомарности:

- если все баркоды прошли валидацию успешно, то все товары добавятся в черновик. В ответе вернётся `{"results":[]}`
- если хотя бы один баркод не прошел валидацию, ни один товар в черновик не добавится. В ответе вернётся список невалидных баркодов

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Параметры

| Имя       | Где  | Тип      | Обяз. | Описание     |
| --------- | ---- | -------- | ----- | ------------ |
| `draftId` | path | `string` | да    | ID черновика |

## Тело запроса

`application/json` — схема `models.DraftAdditemsRequest`, обязательно

## Ответы

| Код   | Описание               | Схема                               |
| ----- | ---------------------- | ----------------------------------- |
| `200` | Успешно                | `models.DraftAddItemsErrorResponse` |
| `400` | Неправильный запрос    | `errors.DraftError`                 |
| `401` | Не авторизован         | `object`                            |
| `403` | Доступ запрещён        | `object`                            |
| `404` | Не найдено             | `errors.DraftError`                 |
| `429` | Слишком много запросов | `object`                            |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.post_v1_drafts_draft_id_items(draft_id=..., models_draft_additems_request=...)
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

const { data } = await api.postV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.PostV1DraftsDraftIdItems(context.Background(), draftId).ModelsDraftAdditemsRequest(modelsDraftAdditemsRequest).Execute()
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

System.out.println(api.postV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->postV1DraftsDraftIdItems($draft_id, $models_draft_additems_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.PostV1DraftsDraftIdItems(draftId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.PostV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest));
```

:::
