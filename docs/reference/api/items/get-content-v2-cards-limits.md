---
title: "Лимиты карточек товаров"
description: "Возвращает бесплатные и платные лимиты продавца на создание карточек товаров."
---

# Лимиты карточек товаров

```http
GET /content/v2/cards/limits
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Создание карточек товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/getV2CardsLimits)

Возвращает бесплатные и платные лимиты продавца на [создание карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload).

Формула для получения количества карточек, которые можно создать:

> (`freeLimits` + `paidLimits`) - количество созданных карточек
> Созданными считаются карточки, которые можно получить через методы [список карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) и [список карточек товаров в корзине](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов:

- [получения лимитов карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/getV2CardsLimits)
- [получения несозданных карточек товаров с ошибками](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList)

| Тип                | Период | Лимит        | Интервал | Всплеск    |
| ------------------ | ------ | ------------ | -------- | ---------- |
| Персональный       | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Сервисный          | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса    | 30 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `GetV2CardsLimitsResponse200` |
| `401` | Не авторизован         | `object`                      |
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

result = api.get_v2_cards_limits()
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

const { data } = await api.getV2CardsLimits();
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.GetV2CardsLimits(context.Background()).Execute()
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

System.out.println(api.getV2CardsLimits());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2CardsLimits());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2CardsLimits().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2CardsLimits());
```

:::
