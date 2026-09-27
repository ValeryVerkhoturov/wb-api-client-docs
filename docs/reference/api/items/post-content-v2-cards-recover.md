---
title: "Восстановление карточек товаров из корзины"
description: "Метод восстанавливает карточки товаров из корзины."
---

# Восстановление карточек товаров из корзины

```http
POST /content/v2/cards/recover
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsRecover)

Метод восстанавливает [карточки товаров из корзины](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash).

Карточка товара сохраняет тот же `imtID` — ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров — что был присвоен ей при [перемещении в корзину](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsDeleteTrash)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск    |
| ------------------ | ------ | --------- | -------- | ---------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 5 запросов |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 5 запросов |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос   |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `PostV2CardsRecoverResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`   |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `responseBodyContentError403`   |
| `429` | Слишком много запросов | `object`                        |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2CardsRecover(postV2CardsDeleteTrashRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2CardsRecover(context.Background()).PostV2CardsDeleteTrashRequest(postV2CardsDeleteTrashRequest).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2CardsRecover(postV2CardsDeleteTrashRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2CardsRecover($post_v2_cards_delete_trash_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый КарточкиТоваровApi(Настройки);

Сообщить(Клиент.PostV2CardsRecover(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2CardsRecover(postV2CardsDeleteTrashRequest));
```

:::
