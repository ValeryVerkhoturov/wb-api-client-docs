---
title: "Список несозданных карточек товаров с ошибками"
description: "Метод возвращает список карточек товаров (черновиков), при создании или редактировании которых произошли ошибки, с описанием этих ошибок."
---

# Список несозданных карточек товаров с ошибками

```http
POST /content/v2/cards/error/list
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

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

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для методов:

- [получения лимитов карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/getV2CardsLimits)
- [получения несозданных карточек товаров с ошибками](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

| Период | Лимит       | Интервал | Всплеск    |
| ------ | ----------- | -------- | ---------- |
| 1 мин  | 10 запросов | 6 сек    | 5 запросов |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                                                                     |
| -------- | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| `locale` | query | `string` | нет   | Язык названий предметов: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице |

## Тело запроса

`application/json` — схема `requestPublicViewerPublicErrorsTableListV2`, обязательно

- `cursor` `swagger.PublicErrorsCursorInput`
  - `limit` `number<int>` — Количество пакетов в ответе
  - `updatedAt` `string` — Дата и время формирования последнего пакета в ответе на предыдущий запрос
  - `batchUUID` `string<UUID>` — ID последнего пакета в ответе на предыдущий запрос
- `order` `swagger.PublicErrorsOrderV2`
  - `ascending` `boolean` — - `false` — сортировка по убыванию - `true` — сортировка по возрастанию

## Ответы

| Код   | Описание               | Схема                                         |
| ----- | ---------------------- | --------------------------------------------- |
| `200` | Успешно                | `responsePublicViewerPublicErrorsTableListV2` |
| `400` | Неправильный запрос    | `responseBodyContentError400`                 |
| `401` | Не авторизован         | `object`                                      |
| `403` | Доступ запрещён        | `responseBodyContentError403`                 |
| `429` | Слишком много запросов | `object`                                      |

**Структура `200`:**

- `data` `models.ErrorTableListPublicRespV2`
  - `items` `models.ErrorTableListPublicRespV2Item[]` — Пакеты данных
    - `batchUUID` `string<UUID>` — ID пакета
    - `subjects` `object` — Предметы. Разбивка по `vendorCodes`
    - `brands` `object` — Бренды. Разбивка по `vendorCodes`
    - `vendorCodes` `string[]` — Артикулы продавца
    - `errors` `object` — Ошибки. Разбивка по `vendorCodes`
    - `updatedAt` `string` — Дата и время создания или редактирования пакета
  - `cursor` `viewer_contract.PublicErrorsCursorOutput`
    - `next` `boolean` — Есть ли ещё черновики: - `false` — нет - `true` — да
    - `updatedAt` `string` — Дата и время формирования последнего пакета в ответе
    - `batchUUID` `string<UUID>` — ID последнего пакета в ответе
- `error` `boolean` — Флаг ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `object` — Дополнительные ошибки

**Структура `400`:**

- `data` `object` — Данные ошибки
- `error` `boolean` — Флаг ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `object` — Дополнительные ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `403`:**

- `data` `object` — Данные ошибки
- `error` `boolean` — Флаг ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string` — Дополнительные ошибки

**Структура `429`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
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
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setAccessToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsErrorList($request_public_viewer_public_errors_table_list_v2));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsErrorList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsErrorList(requestPublicViewerPublicErrorsTableListV2));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::post_v2_cards_error_list(&cfg, request_public_viewer_public_errors_table_list_v2, locale).await;
    println!("{:#?}", result);
}
```

:::
