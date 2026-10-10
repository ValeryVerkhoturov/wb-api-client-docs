---
title: "Код ТН ВЭД предмета"
description: "Метод возвращает список кодов ТН ВЭД по ID предмета и фрагменту кода ТН ВЭД."
---

# Код ТН ВЭД предмета

```http
GET /content/v2/directory/tnved
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Категории, предметы и характеристики · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/items/get-content-v2-directory-tnved) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnved)

Метод возвращает список кодов ТН ВЭД по ID [предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll) и фрагменту кода ТН ВЭД.

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

## Parameters

| Name        | In    | Type      | Req. | Description                                                                                                                                                   |
| ----------- | ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subjectID` | query | `integer` | yes  | ID предмета                                                                                                                                                   |
| `search`    | query | `integer` | no   | Поиск по коду ТН ВЭД. Работает только в паре с `subjectID`                                                                                                    |
| `locale`    | query | `string`  | no   | Язык полей ответа: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Responses

| Code  | Description            | Schema                           |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `GetV2DirectoryTnvedResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`    |
| `401` | Не авторизован         | `object`                         |
| `403` | Доступ запрещён        | `responseBodyContentError403`    |
| `429` | Слишком много запросов | `object`                         |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_directory_tnved(subject_id=..., search=..., locale=...)
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

const { data } = await api.getV2DirectoryTnved(subjectID, search, locale);
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

result, _, err := client.ItemsAPI.GetV2DirectoryTnved(context.Background()).SubjectID(subjectID).Execute()
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

System.out.println(api.getV2DirectoryTnved(subjectID, search, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2DirectoryTnved($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2DirectoryTnved(subjectID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2DirectoryTnved(subjectID));
```

:::
