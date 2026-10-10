---
title: "Список предметов"
description: "Метод возвращает список названий родительских категорий предметов и их предметов с ID. Например, у категории Игрушки будут предметы Калейдоскопы, Куклы, Мячики."
---

# Список предметов

```http
GET /content/v2/object/all
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Категории, предметы и характеристики · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll)

Метод возвращает список названий [родительских категорий предметов](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectParentAll) и их предметов с ID. Например, у категории `Игрушки` будут предметы `Калейдоскопы`, `Куклы`, `Мячики`.

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

| Имя        | Где   | Тип       | Обяз. | Описание                                                                                                                                                      |
| ---------- | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`   | query | `string`  | нет   | Язык полей ответа: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |
| `name`     | query | `string`  | нет   | Поиск по названию предмета (Носки), поиск работает по подстроке, искать можно на любом из поддерживаемых языков                                               |
| `limit`    | query | `integer` | нет   | Количество предметов, максимум 1000                                                                                                                           |
| `offset`   | query | `integer` | нет   | Сколько элементов пропустить. Например, для значения `10` ответ начнется с 11 элемента                                                                        |
| `parentID` | query | `integer` | нет   | ID родительской категории предмета                                                                                                                            |

## Ответы

| Код   | Описание               | Схема                       |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `GetV2ObjectAllResponse200` |
| `401` | Не авторизован         | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_object_all(locale=..., name=..., limit=..., offset=..., parent_id=...)
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

const { data } = await api.getV2ObjectAll(locale, name, limit, offset, parentID);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.GetV2ObjectAll(context.Background()).Execute()
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

System.out.println(api.getV2ObjectAll(locale, name, limit, offset, parentID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ObjectAll());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ObjectAll().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ObjectAll());
```

:::
