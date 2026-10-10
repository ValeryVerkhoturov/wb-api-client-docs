---
title: "Генерация баркодов"
description: "Метод генерирует массив уникальных баркодов для создания размера в карточке товара. Можно использовать, если у вас нет собственных баркодов."
---

# Генерация баркодов

```http
POST /content/v2/barcodes
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Создание карточек товаров · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/items/post-content-v2-barcodes) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listingItems/operation/postV2Barcodes)

Метод генерирует массив уникальных баркодов для создания размера в [карточке товара](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload). Можно использовать, если у вас нет собственных баркодов.

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

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `PostV2BarcodesResponse200`   |
| `401` | Не авторизован         | `object`                      |
| `402` | Требуется платёж       | `object`                      |
| `403` | Доступ запрещён        | `responseBodyContentError403` |
| `429` | Слишком много запросов | `object`                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_barcodes(post_v2_barcodes_request=...)
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

const { data } = await api.postV2Barcodes(postV2BarcodesRequest);
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

result, _, err := client.ItemsAPI.PostV2Barcodes(context.Background()).PostV2BarcodesRequest(postV2BarcodesRequest).Execute()
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

System.out.println(api.postV2Barcodes(postV2BarcodesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2Barcodes($post_v2_barcodes_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2Barcodes(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2Barcodes(postV2BarcodesRequest));
```

:::
