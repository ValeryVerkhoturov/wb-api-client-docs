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

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1DraftsDraftIdItems(context.Background(), draftId).ModelsDraftAdditemsRequest(modelsDraftAdditemsRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1DraftsDraftIdItems($draft_id, $models_draft_additems_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ЧерновикиПоставокApi(Настройки);

Сообщить(Клиент.PostV1DraftsDraftIdItems(draftId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1DraftsDraftIdItems(draftId, modelsDraftAdditemsRequest));
```

:::
