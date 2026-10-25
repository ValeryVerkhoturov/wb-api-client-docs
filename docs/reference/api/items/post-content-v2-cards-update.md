---
title: "Редактирование карточек товаров"
description: "Метод обновляет данные карточек товаров. Также используйте его, чтобы добавлять новые размеры и документы."
---

# Редактирование карточек товаров

```http
POST /content/v2/cards/update
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)

Метод обновляет данные карточек товаров. Также используйте его, чтобы добавлять новые размеры и документы.

Карточка товара перезаписывается при обновлении. Поэтому в запросе нужно передать в том числе те параметры карточки, которые вы не собираетесь обновлять. Их значения можно получить в [списке карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) и [списке карточек товаров в корзине](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash).

При обновлении карточки объект **documents** также полностью перезаписывается. Передавайте в запросе данные всех документов, которые должны остаться в карточке, включая документы без изменений.

С помощью этого метода нельзя обновлять или удалять:

- баркоды размеров товара. Можно только добавить дополнительные баркоды
- параметры `photos`, `video` и `tags`
- цены товаров. Цену можно задать, только если вы добавляете новые размеры
  При добавлении нового размера укажите его цену через параметр `price`. Если в запросе не указан `price`, цена размера будет `0` — в этом случае изменить её можно будет с помощью методов:
- [Установить цены и скидки](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask), если у [товара](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter) `"editablePriceSize":false`
- [Установить цены для размеров](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize), если у [товара](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter) `"editablePriceSize":true`
  Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`.

Одним запросом можно отредактировать максимум 3000 карточек товаров (`nmID`). Максимальный размер запроса 10 Мб.
Если ответ `Успешно` (`200`), но какие-то карточки не обновились, проверьте [список несозданных карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList).
Синхронизация данных с сервисами может занимать до 30 минут. В течение этого времени невозможно добавить остатки на склады и настроить цены.

Чтобы прикрепить документы к карточке товара, передайте данные документов в объекте запроса `documents`.
Чтобы внести изменения в прикрепленный к карточке документ, передайте `id` документа и его данные в объекте запроса `documents`. Получить `id` документа вы можете в [списке карточек товара](https://dev.wildberries.ru/item-management#tag/listings/operation/postV2GetCardsList).
После изменения документа или добавления нового документа карточка повторно отправляется на проверку.

Проверка документов выполняется асинхронно и может занимать до 3 дней.
Вы можете изменить карточку снова до завершения текущей проверки. При этом проверка запустится повторно, а карточка сохранит текущий статус до завершения новой проверки.
Если карточка была доступна для продажи до обновления документа, она будет доступна и до получения нового результата проверки. Если карточка уже была заблокирована, то после обновления данных она останется заблокированной до получения положительного результата повторной проверки.

Результаты проверки отображаются в [списке карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), объект `documents`:

- результат по каждому документу в полях `verdict` объекта `items`. Если `verdict` не возвращается в ответе — проверка документа ещё не завершена
- итоговый общий результат по карточке в поле `overallVerdict`. При общей проверке карточки учитываются не только результаты проверки документов, но и другие данные. Например, наличие обязательной маркировки и сведения из внешних реестров. Если `overallVerdict` не возвращается в ответе — проверка карточки ещё не завершена

Типы документов, которые вы можете добавить для товара, указаны в [характеристиках предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId).

При этом не все документы, которые вы можете добавить, обязательны и проходят проверку — вы самостоятельно определяете, какие разрешительные документы требуются для товара в соответствии с законодательством.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит       | Интервал | Всплеск    |
| ------ | ----------- | -------- | ---------- |
| 1 мин  | 10 запросов | 6 сек    | 5 запросов |

## Тело запроса

`application/json` — схема `object[]`, необязательно

- `nmID` `integer<int64>` (обязательно) — Артикул WB
- `vendorCode` `string` (обязательно) — Артикул продавца
- `kizMarked` `boolean` — Подтверждение, что на товар нанесён обязательный код маркировки [Честного знака](https://честныйзнак.рф/): - `true` — продавец подтверждает, что на товар нанесён обязательный код маркировки. - `false` — продавец не подтверждает, что на товар нанесён обязательный код маркировки. Передайте в запросе `true`, чтобы подтвердить наличие на товаре обязательного кода маркировки. Карточка товара не пройдёт проверку, если нет подтверждения продавца о том, что обязательный код маркировки нанесён на товар. Чтобы проверить, является ли код маркировки [Честного знака](https://честныйзнак.рф/) обязательным, используйте метод [Список карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), поле ответа `needKiz`
- `brand` `string` — Бренд
- `title` `string` — Наименование товара
- `gtin` `string` — Дополнительный GTIN. Укажите этот параметр, если тот же GTIN вы ранее указывали в одной из карточек товара в параметре `skus`. Нельзя указывать один и тот же GTIN в `skus` для разных карточек или размеров товаров. Только для продавцов из РФ
- `description` `string` — Описание товара. Максимальное количество символов зависит от категории товара Стандарт — 2000, минимум — 1000, максимум — 5000 Подробно о \*\*правилах заполнения карточки товара\*\* в [Справочном центре](https://seller.wildberries.ru/instructions/ru/ru/material/how-to-create-card) на портале продавцов
- `dimensions` `object` — Габариты и вес товара \*\*c упаковкой\*\*. Укажите в `сантиметрах` и `килограммах` для любого товара. Синхронизация новых данных с сервисом может занимать до 30 минут
  - `length` `integer<int64>` — Длина, см
  - `width` `integer<int64>` — Ширина, см
  - `height` `integer<int64>` — Высота, см
  - `weightBrutto` `number` — Вес, кг Количество знаков после запятой <=3
- `documents` `object` — Разрешительные документы карточки товара
  - `items` `object[]` — Список разрешительных документов и их данные
    - `id` `string` — ID документа, прикреплённого к карточке. Укажите `id`, чтобы внести изменения в прикреплённый ранее документ. ID документа указан в [списке карточек товаров](https://dev.wildberries.ru/item-management#tag/listings/operation/postV2GetCardsList). Чтобы добавить новый документ, указывать `id` не нужно.
    - `type` `integer<int64>` — Тип документа. Типы документов, которые вы можете добавить для товара, указаны в [характеристиках предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId) — поле `charcID`. Возможные типы документов: - `1` — Сертификат соответствия. Можно указать для `charcID`: 15001136, 15001137, 15001138 - `2` — Декларация о соответствии. Можно указать для `charcID`: 15001135, 15001137, 15001138 - `3` — Свидетельство о государственной регистрации (СГР). Можно указать для `charcID`: 62945173, 15000785, 15004302 - `4` — Регистрационное удостоверение (РУ) на медицинские изделия. Можно указать для `charcID`: 15001574, 15002355, 15002356, 15002357 - `5` — Регистрационное удостоверение Республики Беларусь. Можно указать для `charcID`: 15003071, 15003939 - `7` — Данные о регистрации пестицида. Можно указать для `charcID`: 15003924, 15003925 - `8` — Данные о регистрации агрохимиката. Можно указать для `charcID`: 15003920, 15003921 - `9` — Регистрационное удостоверение (РУ) на лекарственные препараты. Можно указать для `charcID`: 1897013, 15004284
    - `number` `string` — Номер документа
    - `productNumber` `string` — Дополнительный номер документа
    - `tradeName` `string` — Торговое наименование
    - `applicant` `string` — Представитель изготовителя медицинского изделия
    - `startDate` `string` — Дата и время начала срока действия документа
    - `endDate` `string` — Дата и время окончания срока действия документа
    - `isEndless` `boolean` — Бессрочный ли документ: - `true` — да, документ бессрочный - `false` — нет, у документа есть срок действия
  - `excludeDocuments` `boolean` — Подтверждение продавца, что для товара не требуются разрешительные документы: - `true` — продавец подтверждает, что документы не требуются. Все значения, переданные в `documents`, будут заменены на пустые значения - `false` — продавец не подтверждает, что документы не требуются Обязательность документов проверяется при создании и изменении карточки товара. Если для товара требуются документы и указано значение `true`, карточка не пройдёт проверку
- `characteristics` `object[]` — Характеристики товара. Можно получить методом [Характеристики предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId)
  - `id` `integer<int64>` (обязательно) — ID характеристики
  - `value` `object` (обязательно) — Значения характеристики. Тип данных — массив строк или число — зависит от типа характеристики, см. описание поля `charcType` в методе [Характеристики предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId). Допустимое количество значений отображено в поле `maxCount` того же метода
- `sizes` `object[]` (обязательно) — Массив размеров Для безразмерного товара всё равно нужно передавать данный массив без параметров (wbSize и techSize), но с баркодом
  - `chrtID` `integer<int64>` — ID размера для данного артикула WB Обязателен к заполнению для существующих размеров Для добавляемых размеров не указывается
  - `techSize` `string` — Размер товара (например, XL, S, 45)
  - `wbSize` `string` — Российский размер товара
  - `price` `integer<int64>` — Цена товара, ₽ Указывается при добавлении размера
  - `skus` `string[]` — Баркоды

## Ответы

| Код   | Описание                               | Схема                          |
| ----- | -------------------------------------- | ------------------------------ |
| `200` | Успешно                                | `responseItemList`             |
| `400` | Неправильный запрос                    | `responseBodyContentError400`  |
| `401` | Не авторизован                         | `object`                       |
| `402` | Требуется платёж                       | `object`                       |
| `403` | Доступ запрещён                        | `responseBodyContentError403`  |
| `413` | Превышен лимит объёма данных в запросе | `PostV2CardsUpdateResponse413` |
| `429` | Слишком много запросов                 | `object`                       |

**Структура `200`:**

- `data` `object` — Данные ответа
- `error` `boolean` — Флаг ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `object` — Дополнительные ошибки
  - один из вариантов: `object`, `string`, `object`

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

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `403`:**

- `data` `object` — Данные ошибки
- `error` `boolean` — Флаг ошибки
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string` — Дополнительные ошибки

**Структура `413`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода

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

result = api.post_v2_cards_update(post_v2_cards_update_request_inner=...)
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

const { data } = await api.postV2CardsUpdate(postV2CardsUpdateRequestInner);
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

result, _, err := client.ItemsAPI.PostV2CardsUpdate(context.Background()).Execute()
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

System.out.println(api.postV2CardsUpdate(postV2CardsUpdateRequestInner));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2CardsUpdate());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2CardsUpdate(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2CardsUpdate());
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::post_v2_cards_update(&cfg, post_v2_cards_update_request_inner).await;
    println!("{:#?}", result);
}
```

:::
