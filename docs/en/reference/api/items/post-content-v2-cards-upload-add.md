---
title: "Создание карточек товаров с присоединением"
description: "Метод создаёт карточки товаров, присоединяя их к существующим отдельным карточкам и группам объединённых карточек. В одной группе объединённых карточек товаров…"
---

# Создание карточек товаров с присоединением

```http
POST /content/v2/cards/upload/add
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Создание карточек товаров · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)

Метод создаёт карточки товаров, присоединяя их к существующим отдельным карточкам и группам [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек. В одной группе объединённых карточек товаров может быть не более 30 карточек, соответственно, создать с присоединением можно не более 29 карточек товаров за один запрос.
Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`.

Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList).
Создание карточки товара происходит асинхронно. Синхронизация новой карточки с сервисами может занимать до 30 минут. В течение этого времени невозможно добавить остатки на склады и настроить цены.

В песочнице карточка товара создаётся сразу, без ожидания.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Сервисный          | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Базовый с секретом | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Базовый            | 2 ч    | 1 запрос    | 2 ч      | 1 запрос   |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description                            | Schema                            |
| ----- | -------------------------------------- | --------------------------------- |
| `200` | Успешно                                | `responseItemList`                |
| `400` | Неправильный запрос                    | `responseBodyContentError400`     |
| `401` | Не авторизован                         | `object`                          |
| `402` | Требуется платёж                       | `object`                          |
| `403` | Доступ запрещён                        | `object`                          |
| `413` | Превышен лимит объёма данных в запросе | `PostV2CardsUploadAddResponse413` |
| `429` | Слишком много запросов                 | `object`                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2CardsUploadAdd(postV2CardsUploadAddRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2CardsUploadAdd(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2CardsUploadAdd(postV2CardsUploadAddRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2CardsUploadAdd());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СозданиеКарточекТоваровApi(Настройки);

Сообщить(Клиент.PostV2CardsUploadAdd(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2CardsUploadAdd());
```

:::
