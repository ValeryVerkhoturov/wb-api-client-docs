---
title: "Список карточек товаров"
description: "Метод возвращает список созданных карточек товаров."
---

# Список карточек товаров

```http
POST /content/v2/get/cards/list
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)

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

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Параметры

| Имя      | Где   | Тип      | Обяз. | Описание                                                                                                                                                                                 |
| -------- | ----- | -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык полей ответа `name`, `value` и `object`: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Тело запроса

`application/json` — схема `object`, обязательно

- `settings` `object` — Настройки
  - `sort` `object` — Сортировка по дате и времени изменения карточек товаров `updatedAt`
    - `ascending` `boolean` — Порядок сортировки: - `false` — по убыванию - `true` — по возрастанию
  - `filter` `object` — Параметры фильтрации
    - `withPhoto` `integer<int64>` = `-1` | `0` | `1` | `2` — Фильтр по фото: * `-1` — любые карточки товаров * `0` — любые карточки товаров * `1` — только карточки с фото * `2` — только карточки без фото
    - `textSearch` `string` — Поиск по артикулу продавца, артикулу WB, баркоду
    - `tagIDs` `integer<int64>[]` — Поиск по ID ярлыков
    - `allowedCategoriesOnly` `boolean` — Фильтр по категории: - `true` — только разрешённые - `false` — все Не используется в песочнице
    - `objectIDs` `integer<int64>[]` — Поиск по ID предметов
    - `brands` `string[]` — Поиск по брендам
    - `imtID` `integer<int64>` — Поиск по [ID для объединённых карточек товаров](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov)
  - `cursor` `object` — Курсор
    - `limit` `integer<int64>` — Сколько карточек товаров выдать в ответе
    - `updatedAt` `string` — Дата и время изменения
    - `nmID` `integer<int64>` — Артикул WB, с которого надо запрашивать следующий список карточек товаров

## Ответы

| Код   | Описание               | Схема                           |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `PostV2GetCardsListResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`   |
| `401` | Не авторизован         | `object`                        |
| `402` | Требуется платёж       | `object`                        |
| `403` | Доступ запрещён        | `responseBodyContentError403`   |
| `429` | Слишком много запросов | `object`                        |

**Структура `200`:**

- `cards` `object[]` — Список карточек товаров
  - `nmID` `integer<int64>` — Артикул WB
  - `imtID` `integer<int64>` — ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров. Един для всех артикулов WB группы объединённых карточек. У каждой карточки товара есть `imtID`, даже если она не объединена с другими карточками
  - `nmUUID` `string<UUID>` — Внутренний технический ID карточки товара
  - `subjectID` `integer<int64>` — ID предмета
  - `subjectName` `string` — Название предмета
  - `vendorCode` `string` — Артикул продавца
  - `brand` `string` — Бренд
  - `title` `string` — Наименование товара
  - `gtin` `string` — Дополнительный GTIN. Поле вернётся только при заполненном дополнительном GTIN. Только для продавцов из РФ
  - `description` `string` — Описание товара
  - `needKiz` `boolean` — Требуется ли код маркировки [Честного знака](https://честныйзнак.рф/) для этого товара: - `false` — не требуется - `true` — требуется
  - `kizMarked` `boolean` — Есть ли подтверждение от продавца, что обязательный код маркировки [Честного знака](https://честныйзнак.рф/) нанесён на товар: - `true` — да - `false` — нет Является ли код маркировки [Честного знака](https://честныйзнак.рф/) обязательным, указано в поле `needKiz`
  - `photos` `object[]` — Массив фото
    - `big` `string` — URL фото `900x1200`
    - `c246x328` `string` — URL фото `248x328`
    - `c516x688` `string` — URL фото `516x688`
    - `square` `string` — URL фото `600x600`
    - `tm` `string` — URL фото `75x100`
  - `video` `string` — URL видео
  - `wholesale` `object` — B2B-продажа
    - `enabled` `boolean` — Предназначен ли товар для продажи только B2B-покупателям: - `true` — товар предназначен для продажи только B2B-покупателям - `false` — товар предназначен для продажи B2B и B2C-покупателям
    - `quantum` `number<uint64>` — Минимальное количество единиц товара в одной корзине B2B-покупателя. Только при `"enable":true`
  - `dimensions` `object` — Габариты и вес товара c упаковкой, см и кг
    - `length` `integer<int64>` — Длина, см
    - `width` `integer<int64>` — Ширина, см
    - `height` `integer<int64>` — Высота, см
    - `weightBrutto` `number` — Вес, кг Количество знаков после запятой <=3
    - `isValid` `boolean` — Потенциальная некорректность габаритов товара: - `true` — не выявлена. `"isValid":true` не гарантирует, что размеры указаны корректно. В отдельных случаях (например, при создании новой категории товаров) `"isValid":true` будет возвращаться при любых значениях, кроме нулевых. - `false` — указанные габариты значительно отличаются от средних по категории (предмету). Рекомендуется перепроверить, правильно ли указаны размеры товара в упаковке в `сантиметрах`. Функциональность карточки товара, в том числе начисление логистики и хранения, при этом ограничена не будет. Логистика и хранение продолжают начисляться — по текущим габаритам. Также `"isValid":false` возвращается при отсутствии значений или нулевом значении любой стороны.
  - `documents` `object` — Документы, прикреплённые к карточке товара. Результаты проверки каждого документа указаны в `items`. Результат проверки всей карточки товара указан в `overallVerdict`
    - `items` `object[]` — Список документов и результаты проверки каждого документа
      - `id` `string` — ID документа
      - `type` `integer<int64>` — Тип документа: - `1` — Сертификат соответствия - `2` — Декларация о соответствии - `3` — Свидетельство о государственной регистрации (СГР) - `4` — Регистрационное удостоверение (РУ) на медицинские изделия - `5` — Регистрационное удостоверение Республики Беларусь - `7` — Данные о регистрации пестицида - `8` — Данные о регистрации агрохимиката - `9` — Регистрационное удостоверение (РУ) на лекарственные препараты
      - `number` `string` — Номер документа
      - `productNumber` `string` — Дополнительный номер документа
      - `tradeName` `string` — Торговое наименование
      - `applicant` `string` — Представитель изготовителя медицинского изделия
      - `startDate` `string` — Дата и время начала срока действия документа
      - `endDate` `string` — Дата и время окончания срока действия документа
      - `isEndless` `boolean` — Бессрочный ли документ: - `true` — да, документ бессрочный - `false` — нет, у документа есть срок действия
      - `verdict` `object` — Результат проверки документа. Возвращается, когда проверка документа завершена
        - `verified` `boolean` — - `true` — документ проверен - `false` — документ не проверен
        - `status` `integer<int64>` — Результат проверки документа: - `1` — проверка пройдена - `2` — проверка не пройдена
        - `reason` `reasonDocument`
        - `additionalData` `object` — Дополнительная информация
        - `createdAt` `string` — Дата проверки документа
      - `createdAt` `string` — Дата добавления документа
    - `overallVerdict` `object` — Общий результат проверки всей карточки товара. Возвращается, когда проверка завершена. Результаты проверок отдельных документов и общий результат карточки могут различаться. Например, карточка может пройти проверку, если обязательный документ прошёл проверку, а дополнительный документ не прошёл
      - `isFullyChecked` `boolean` — - `true` — карточка товара проверена - `false` — карточка товара не проверена
      - `status` `integer<int64>` — Результат проверки карточки товара: - `1` — проверка пройдена - `2` — проверка не пройдена
      - `reason` `reasonListing`
      - `createdAt` `string` — Дата и время проверки карточки товара
    - `excludeDocuments` `boolean` — Подтверждение продавца, что для товара не требуются разрешительные документы: - `true` — продавец подтверждает, что документы не требуются. Все значения, переданные в `documents`, будут заменены на пустые значения - `false` — продавец не подтверждает, что документы не требуются Обязательность документов проверяется при создании и изменении карточки товара. Если для товара требуются документы и указано значение `true`, карточка не пройдёт проверку
  - `characteristics` `object[]` — Характеристики
    - `id` `integer<int64>` — ID характеристики
    - `name` `string` — Название характеристики
    - `value` `object` — Значение характеристики. Тип значения зависит от типа характеристики
  - `sizes` `object[]` — Размеры товара
    - `chrtID` `integer<int64>` — Числовой ID размера для данного артикула WB
    - `techSize` `string` — Размер товара (А, XXL, 57 и др.)
    - `wbSize` `string` — Российский размер товара
    - `skus` `string[]` — Баркод товара
  - `tags` `object[]` — Ярлыки
    - `id` `integer<int64>` — ID ярлыка
    - `name` `string` — Название ярлыка
    - `color` `string` — Цвет ярлыка. Доступные цвета: - `D1CFD7` — серый - `FEE0E0` — красный - `ECDAFF` — фиолетовый - `E4EAFF` — синий - `DEF1DD` — зеленый - `FFECC7` — желтый
  - `createdAt` `string` — Дата и время создания
  - `updatedAt` `string` — Дата и время изменения
- `cursor` `object` — Пагинатор
  - `updatedAt` `string` — Дата и время, с которых надо запрашивать следующий список карточек товаров
  - `nmID` `integer<int64>` — Артикул WB, с которого надо запрашивать следующий список карточек товаров
  - `total` `integer<int64>` — Количество возвращённых карточек товаров

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

result = api.post_v2_get_cards_list(post_v2_get_cards_list_request=..., locale=...)
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
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setAccessToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2GetCardsList(postV2GetCardsListRequest, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2GetCardsList($post_v2_get_cards_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2GetCardsList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2GetCardsList(postV2GetCardsListRequest));
```

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = items_api::post_v2_get_cards_list(&cfg, post_v2_get_cards_list_request, locale).await;
    println!("{:#?}", result);
}
```

:::
