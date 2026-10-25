---
title: "Получить отзыв по ID"
description: "Метод возвращает данные отзыва по его ID."
---

# Получить отзыв по ID

```http
GET /api/v1/feedback
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Отзывы · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/feedbacks/operation/getV1Feedback)

Метод возвращает данные [отзыва](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks/operation/getV1Feedbacks) по его ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя  | Где   | Тип      | Обяз. | Описание  |
| ---- | ----- | -------- | ----- | --------- |
| `id` | query | `string` | да    | ID отзыва |

## Ответы

| Код   | Описание                            | Схема                         |
| ----- | ----------------------------------- | ----------------------------- |
| `200` | Успешно                             | `GetV1FeedbackResponse200`    |
| `401` | Не авторизован                      | `object`                      |
| `402` | Требуется платёж                    | `object`                      |
| `403` | Доступ запрещён                     | `object`                      |
| `422` | Ошибка обработки параметров запроса | `responseFeedbackQuestionErr` |
| `429` | Слишком много запросов              | `object`                      |

**Структура `200`:**

- `data` `object`
  - `id` `string` — ID отзыва
  - `text` `string` — Текст отзыва
  - `pros` `string` — Достоинства товара
  - `cons` `string` — Недостатки товара
  - `matchingSize` `string` — Соответствие заявленного размера реальному. Возможные значения: - ` ` - для безразмерных товаров - `ок` - соответствует размеру - `smaller` - маломерит - `bigger` - большемерит
  - `productValuation` `integer<int64>` — Оценка товара
  - `createdDate` `string` — Дата и время создания отзыва
  - `answer` `object` — Структура ответа
    - `text` `string` — Текст ответа
    - `state` `string` — Статус: - `none` — новый - `wbRu`— отображается на сайте - `reviewRequired` — ответ проходит проверку - `rejected` — ответ отклонён
    - `editable` `boolean` — Можно ли отредактировать ответ: - `false` — нет - `true` — да
  - `state` `string` — Статус отзыва: - `none` - не обработан (новый) - `wbRu` - обработан
  - `productDetails` `object` — Item information
    - `nmId` `integer<int64>` — Артикул WB
    - `imtId` `integer<int64>` — ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров
    - `productName` `string` — Название товара
    - `supplierArticle` `string` — Артикул продавца
    - `supplierName` `string` — Имя продавца
    - `brandName` `string` — Бренд товара
    - `size` `string` — Размер товара (`techSize` в КТ)
  - `photoLinks` `object[]` — Массив структур фотографий
    - `fullSize` `string` — Адрес фотографии полного размера
    - `miniSize` `string` — Адрес фотографии маленького размера
  - `userName` `string` — Имя автора отзыва
  - `orderStatus` `string` — Статус заказа. Возможные значения: - `buyout` — выкуплен - `rejected` — отказались - `returned` — возврат - `notSpecified` — статус не присвоен
  - `video` `object` — Структура видео
    - `previewImage` `string` — Ссылка на обложку видео
    - `link` `string` — Ссылка на файл плейлиста видео (доступно по протоколу hls)
    - `durationSec` `integer<int64>` — Общая продолжительность видео
  - `wasViewed` `boolean` — Просмотрен ли отзыв
  - `isAbleSupplierFeedbackValuation` `boolean` — Доступна ли продавцу возможность оставить жалобу на отзыв: - `true`— да - `false` — нет
  - `supplierFeedbackValuation` `integer<int64>` — Ключ причины жалобы на отзыв
  - `isAbleSupplierProductValuation` `boolean` — Доступна ли продавцу возможность сообщить о проблеме с товаром (`true` - доступна, `false` - не доступна)
  - `supplierProductValuation` `integer<int64>` — Ключ проблемы с товаром
  - `isAbleReturnProductOrders` `boolean` — Опция возврата товара: - `true` — доступна - `false` — недоступна
  - `returnProductOrdersDate` `string` — Дата и время, когда на запрос возврата был получен ответ со статус-кодом 200.
  - `bables` `string[]` — Список тегов покупателя
  - `lastOrderShkId` `integer<int64>` — Штрихкод единицы товара
  - `lastOrderCreatedAt` `string` — Дата покупки
  - `color` `string` — Цвет товара
  - `subjectId` `integer<int64>` — ID предмета
  - `subjectName` `string` — Название предмета
  - `parentFeedbackId` `string` — ID начального отзыва (`null`, если этот отзыв начальный)
  - `childFeedbackId` `string` — ID дополненного отзыва (`null`, если этот отзыв дополненный)
- `error` `boolean` — Есть ли ошибка
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string[]` — Дополнительные ошибки

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

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `422`:**

- `data` `object`
- `error` `boolean` — Есть ли ошибка
- `errorText` `string` — Описание ошибки
- `additionalErrors` `string[]` — Дополнительные ошибки
- `requestId` `string`

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
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_feedback(id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1Feedback(id);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1Feedback(context.Background()).Id(id).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1Feedback(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1Feedback($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1Feedback(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1Feedback(id));
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::get_v1_feedback(&cfg, id).await;
    println!("{:#?}", result);
}
```

:::
