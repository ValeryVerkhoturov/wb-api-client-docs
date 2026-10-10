---
title: "Объединение и разъединение карточек товаров"
description: "Метод объединяет и разъединяет карточки товаров. Карточки товаров являются объединёнными, если у них одинаковый imtID."
---

# Объединение и разъединение карточек товаров

```http
POST /content/v2/cards/moveNm
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Карточки товаров · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/items/post-content-v2-cards-movenm) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsMoveNm)

Метод [объединяет и разъединяет](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточки товаров. Карточки товаров являются объединёнными, если у них одинаковый `imtID`.

Для объединения карточек товаров сделайте запрос \*\*с указанием\*\* `imtID`. Можно объединять не более 30 карточек товаров.
Для разъединения карточек товаров сделайте запрос \*\*без указания\*\* `imtID`. Для разъединенных карточек будут сгенерированы новые `imtID`.

Если вы разъедините одновременно несколько карточек товаров, эти карточки объединятся в одну и получат новый `imtID`.
Чтобы присвоить каждой карточке товара уникальный `imtID`, необходимо передавать по одной карточке товара за запрос.

Максимальный размер запроса 10 Мб.

Объединить можно карточки товаров только в рамках одного предмета

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Контент**:

| Период               | Лимит        | Интервал | Всплеск    |
| -------------------- | ------------ | -------- | ---------- |
| 1 мин                | 100 запросов | 600 мс   | 5 запросов |
| Исключение — методы: |

- [создания карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- [создания карточек товаров с присоединением](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)
- [редактирования карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [восстановления карточек товаров из корзины](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsRecover)
- [получения списка рекомендаций в карточках товаров](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsList)
- [установки рекомендаций для товаров](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsSet)

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description                            | Schema             |
| ----- | -------------------------------------- | ------------------ |
| `200` | Успешно                                | `responseItemList` |
| `400` | Неправильный запрос                    | `object`           |
| `401` | Не авторизован                         | `object`           |
| `402` | Требуется платёж                       | `object`           |
| `403` | Доступ запрещён                        | `responseItemList` |
| `413` | Превышен лимит объёма данных в запросе | `string`           |
| `429` | Слишком много запросов                 | `object`           |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_move_nm(post_v2_cards_move_nm_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.postV2CardsMoveNm(postV2CardsMoveNmRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV2CardsMoveNm(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2CardsMoveNm(postV2CardsMoveNmRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsMoveNm());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsMoveNm(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsMoveNm());
```

:::
