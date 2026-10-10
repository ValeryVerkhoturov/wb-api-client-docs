---
title: "Родительские категории товаров"
description: "Метод возвращает названия и ID всех родительских категорий для создания карточек товаров: например, Электроника, Бытовая химия, Рукоделие."
---

# Родительские категории товаров

```http
GET /content/v2/object/parent/all
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Категории, предметы и характеристики · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/items/get-content-v2-object-parent-all) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectParentAll)

Метод возвращает названия и ID всех родительских категорий для [создания карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems): например, `Электроника`, `Бытовая химия`, `Рукоделие`.

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

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                                                                                                                            |
| -------- | ----- | -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык поля ответа `name`: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Ответы

| Код   | Описание               | Схема                             |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `GetV2ObjectParentAllResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`     |
| `401` | Не авторизован         | `object`                          |
| `403` | Доступ запрещён        | `responseBodyContentError403`     |
| `429` | Слишком много запросов | `object`                          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_object_parent_all(locale=...)
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

const { data } = await api.getV2ObjectParentAll(locale);
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

result, _, err := client.ItemsAPI.GetV2ObjectParentAll(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.getV2ObjectParentAll(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ObjectParentAll());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ObjectParentAll().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ObjectParentAll());
```

:::
