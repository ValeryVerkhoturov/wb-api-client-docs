---
title: "Список несозданных карточек товаров с ошибками"
description: "Метод возвращает список карточек товаров (черновиков), при создании или редактировании которых произошли ошибки, с описанием этих ошибок."
---

# Список несозданных карточек товаров с ошибками

```http
POST /content/v2/cards/error/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Карточки товаров · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

Метод возвращает список карточек товаров ([черновиков](https://seller.wildberries.ru/new-goods/error-cards)), при создании или редактировании которых произошли ошибки, с описанием этих ошибок.

Данные в ответе возвращаются пакетами `batch`. Один пакет содержит:

- все ошибки по одному массиву `variants` одного запроса при [создании](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload) карточек товаров
- все ошибки одного запроса при [создании с присоединением](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd) или [редактировании](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) карточек товаров

Чтобы получить более 100 пакетов, используйте пагинацию:

1. Сделайте первый запрос:

```
        {
          "cursor": {
            "limit": 100
          },
          "order": {
            "ascending": true
          }
        }
```

2. Скопируйте `"updatedAt":"\*\*\*","batchUUID":"\*\*\*" `из `cursor` ответа и вставьте в `cursor` запроса.
3. Повторите запрос.
4. Повторяйте пункты 2 и 3, пока не получите в ответе `"next":false`. Это будет означать, что вы получили все пакеты.

Чтобы удалить карточку товара из списка, сделайте ещё один запрос на создание, создание с присоединением или редактирование карточки товара с исправленными ошибками

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов:

- [получения лимитов карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/getV2CardsLimits)
- [получения несозданных карточек товаров с ошибками](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

| Период | Лимит       | Интервал | Всплеск    |
| ------ | ----------- | -------- | ---------- |
| 1 мин  | 10 запросов | 6 сек    | 5 запросов |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                  |
| -------- | ----- | -------- | ---- | ------------------------------------------------------------------------------------------------------------ |
| `locale` | query | `string` | no   | Язык названий предметов: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице |

## Request body

`application/json` — schema `requestPublicViewerPublicErrorsTableListV2`, required

## Responses

| Code  | Description            | Schema                                        |
| ----- | ---------------------- | --------------------------------------------- |
| `200` | Успешно                | `responsePublicViewerPublicErrorsTableListV2` |
| `400` | Неправильный запрос    | `responseBodyContentError400`                 |
| `401` | Не авторизован         | `object`                                      |
| `403` | Доступ запрещён        | `responseBodyContentError403`                 |
| `429` | Слишком много запросов | `object`                                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_cards_error_list(request_public_viewer_public_errors_table_list_v2=..., locale=...)
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

const { data } = await api.postV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2, locale);
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

result, _, err := client.ItemsAPI.PostV2CardsErrorList(context.Background()).RequestPublicViewerPublicErrorsTableListV2(requestPublicViewerPublicErrorsTableListV2).Locale(locale).Execute()
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

System.out.println(api.postV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsErrorList($request_public_viewer_public_errors_table_list_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsErrorList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2));
```

:::
