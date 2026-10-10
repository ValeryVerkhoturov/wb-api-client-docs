---
title: "Список карточек товаров"
description: "Метод возвращает список созданных карточек товаров."
---

# Список карточек товаров

```http
POST /content/v2/get/cards/list
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Карточки товаров · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/items/post-content-v2-get-cards-list) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)

Метод возвращает список созданных карточек товаров.

В ответе метода не будет карточек, находящихся в корзине. Получить такие карточки можно через [отдельный метод](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash)

Чтобы получить \*\*больше 100\*\* карточек товаров, используйте пагинацию:

1. Сделайте первый запрос:

```
        {
          "settings": {
            "sort": {
              "ascending": true
            },
            "cursor": {
              "limit": 100
            },
            "filter": {
              "withPhoto": -1
            }
          }
        }
```

Чтобы после выгрузки получать только новые или обновлённые карточки товаров, используйте сортировку по возрастанию: `"sort":{"ascending":true}`. 2. Скопируйте `"updatedAt":"\*\*\*","nmID":"\*\*\*"` из `cursor` ответа и вставьте в `cursor` запроса. 3. Повторите запрос. 4. Повторяйте пункты 2 и 3, пока значение `total` в ответе не станет меньше, чем значение `limit` в запросе. Это будет означать, что вы получили все карточки.
Чтобы получать только карточки товаров, которые были созданы или обновлены после предыдущей выгрузки данных:

1. Сохраните поля `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}` из последнего ответа предыдущей выгрузки. При выгрузке используйте сортировку по возрастанию: `"sort":{"ascending":true}`.
2. Укажите в первом запросе сохранённые поля `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}`. Продолжайте использовать сортировку по возрастанию.
3. Сохраните поля `"cursor":{"updatedAt":"\*\*\*","nmID":"\*\*\*"}` из последнего ответа текущей выгрузки.

В объекте `documents` метод возвращает:

- информацию о переданных документах — массив `items`
- результаты проверки по каждому документу — объект `verdict` в `items`. Если `verdict` не возвращается в ответе — проверка документа ещё не завершена
- результат проверки всей карточки — объект `overallVerdict`. Проверка всей карточки включает проверку не только документов, но и других данных. Например, наличия обязательной маркировки и сведений из внешних реестров. Если `overallVerdict` не возвращается в ответе — проверка карточки ещё не завершена

Проверки документов и карточки выполняются асинхронно и могут занимать до 3 дней.
Каждое изменение результата проверки обновляет дату и время изменения карточки в поле ответа `updatedAt`.
Чтобы получить новые результаты проверки, используйте выгрузку с пагинацией с сортировкой по возрастанию.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Parameters

| Name     | In    | Type     | Req. | Description                                                                                                                                                                              |
| -------- | ----- | -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | no   | Язык полей ответа `name`, `value` и `object`: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `PostV2GetCardsListResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`   |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `responseBodyContentError403`   |
| `429` | Слишком много запросов | `object`                        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_get_cards_list(post_v2_get_cards_list_request=..., locale=...)
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

const { data } = await api.postV2GetCardsList(postV2GetCardsListRequest, locale);
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

result, _, err := client.ItemsAPI.PostV2GetCardsList(context.Background()).PostV2GetCardsListRequest(postV2GetCardsListRequest).Locale(locale).Execute()
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

System.out.println(api.postV2GetCardsList(postV2GetCardsListRequest, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2GetCardsList($post_v2_get_cards_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2GetCardsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2GetCardsList(postV2GetCardsListRequest));
```

:::
