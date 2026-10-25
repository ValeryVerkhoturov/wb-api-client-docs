---
title: "Характеристики предмета"
description: "Метод возвращает параметры характеристик предмета: названия, типы данных, единицы измерения и так далее. В запросе необходимо указать ID предмета."
---

# Характеристики предмета

```http
GET /content/v2/object/charcs/{subjectId}
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Категории, предметы и характеристики · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId)

Метод возвращает параметры характеристик предмета: названия, типы данных, единицы измерения и так далее. В запросе необходимо указать ID [предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll).

Для получения значений характеристик [Цвет](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryColors), [Пол](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryKinds), [Страна производства](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryCountries), [Сезон](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectorySeasons), [Ставка НДС](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryVat) и [ТНВЭД-код](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnved) используйте отдельные методы

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов категории **Контент**:

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

| Имя         | Где   | Тип              | Обяз. | Описание                                                                                                                                                                             |
| ----------- | ----- | ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `subjectId` | path  | `integer<int64>` | да    | ID предмета                                                                                                                                                                          |
| `locale`    | query | `string`         | нет   | Язык полей ответа `subjectName` и `name`: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Ответы

| Код   | Описание               | Схема                                   |
| ----- | ---------------------- | --------------------------------------- |
| `200` | Успешно                | `GetV2ObjectCharcsSubjectIdResponse200` |
| `400` | Неправильный запрос    | `object`                                |
| `401` | Не авторизован         | `object`                                |
| `403` | Доступ запрещён        | `responseBodyContentError403`           |
| `429` | Слишком много запросов | `object`                                |

**Структура `200`:**

- `data` `object[]` — Данные
  - `charcID` `integer<int64>` — ID характеристики
  - `subjectName` `string` — Название предмета
  - `subjectID` `integer<int64>` — ID предмета
  - `name` `string` — Название характеристики
  - `required` `boolean` — - `true` — характеристику необходимо обязательно указать в карточке товара - `false` — характеристику необязательно указывать
  - `unitName` `string` — Единица измерения
  - `maxCount` `integer<int64>` — Максимальное количество значений, которое можно присвоить характеристике при [создании](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) или [редактировании](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) карточек товаров. Используется только для характеристик с `"charcType":1` — массив строк. Характеристикам с `"charcType":4` — число, можно присвоить только одно значение. Если `"maxCount":0`, количество значений не ограничено
  - `popular` `boolean` — Характеристика популярна у пользователей (true - да, false - нет)
  - `charcType` `integer<int64>` — Тип данных характеристики, который необходимо использовать при [создании](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) или [редактировании](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) карточек товаров: - `1` — массив строк - `4` — число (целое либо с десятичной дробью) - `0` — характеристика не используется
  - `hasFilter` `boolean` — Ключевая характеристика. Является ли характеристика значимой для покупателей: - `true` — да - `false` — нет
  - `isVariable` `boolean` — Признак [меняющейся характеристики](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov). Значение размечает характеристики, по которым варианты отличаются друг от друга: - `true` — варианты товара отличаются по этой характеристике - `false` — варианты товара не отличаются по этой характеристике
  - `existNamedField` `boolean` — Как передать характеристику в запросах на [cоздание](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUpload), [создание с присоединением](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd) и [редактирование](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate) карточек товара: - `true` — в соответствующем параметре запроса - `false` — внутри массива `characteristics`
- `error` `boolean` — Флаг наличия ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string` — Дополнительные ошибки

**Структура `400`:**

- один из вариантов: `responseBodyContentError400`, `responseBodyContentError400InvalidSyntax`

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

result = api.get_v2_object_charcs_subject_id(subject_id=..., locale=...)
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

const { data } = await api.getV2ObjectCharcsSubjectId(subjectId, locale);
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

result, _, err := client.ItemsAPI.GetV2ObjectCharcsSubjectId(context.Background(), subjectId).Execute()
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

System.out.println(api.getV2ObjectCharcsSubjectId(subjectId, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ObjectCharcsSubjectId($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ObjectCharcsSubjectId(subjectId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ObjectCharcsSubjectId(subjectId));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::get_v2_object_charcs_subject_id(&cfg, subject_id, locale).await;
    println!("{:#?}", result);
}
```

:::
