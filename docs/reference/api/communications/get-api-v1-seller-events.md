---
title: "События чатов"
description: "Метод возвращает список событий всех чатов с покупателями. Чтобы получить все события: 1. Сделайте первый запрос без параметра next. 2. Повторяйте запрос со…"
---

# События чатов

```http
GET /api/v1/seller/events
```

**База:** `https://buyer-chat-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Чат с покупателями · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/buyersChat/operation/getV1SellerEvents)

Метод возвращает список событий всех [чатов с покупателями](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerChats).
Чтобы получить все события:

1. Сделайте первый запрос без параметра `next`.
2. Повторяйте запрос со значением параметра `next` из ответа на предыдущий запрос, пока `totalEvents` не станет равным `0`. Это будет означать, что вы получили все события.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Сервисный          | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый с секретом | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Параметры

| Имя    | Где   | Тип              | Обяз. | Описание                                                                                                    |
| ------ | ----- | ---------------- | ----- | ----------------------------------------------------------------------------------------------------------- |
| `next` | query | `integer<int64>` | нет   | Пагинатор. С какого момента получить следующий пакет данных. Формат Unix timestamp \*\*с миллисекундами\*\* |

## Ответы

| Код   | Описание               | Схема                          |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `EventsResponse`               |
| `400` | Неправильный запрос    | `GetV1SellerEventsResponse400` |
| `401` | Не авторизован         | `object`                       |
| `402` | Требуется платёж       | `object`                       |
| `403` | Доступ запрещён        | `object`                       |
| `429` | Слишком много запросов | `object`                       |

**Структура `200`:**

- `result` `EventsResult`
  - `next` `integer<int64>` — Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных
  - `newestEventTime` `string` — Время новейшего события в ответе
  - `oldestEventTime` `string` — Время старейшего события в ответе
  - `totalEvents` `integer<int64>` — Количество событий
  - `events` `Event[]`
    - `chatID` `string` — ID чата
    - `eventID` `string` — ID события
    - `eventType` `EventType`
    - `isNewChat` `boolean` — Признак нового чата: - `false` — чат не новый - `true` — чат новый
    - `message` `object` — Данные сообщения
      - `attachments` `EventAttachments`
        - `goodCard` `Listing`
          - `nmID` `integer<int64>` — Артикул WB
            - …
          - `price` `integer<int64>` — Фактическая цена с учетом всех скидок. Взимается с покупателя
            - …
          - `priceCurrency` `string` — Валюта
            - …
          - `rid` `string` — Уникальный ID заказа. Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims) - [Лента заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierOrders) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/mainReports/operation/getV1SupplierSales) - [Отчёт о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport) - [Детализации к отчётам реализации по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId) - [Детализации к отчётам реализации за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed) - [Детализации к отчётам об издержках на приём платежей по ID отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailedReportId) - [Детализации к отчётам об издержках на приём платежей за период](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports/operation/postV1AcquiringDetailed)
            - …
          - `size` `string` — Размер товара, соответствует `wbSize` в [карточке товара](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList)
            - …
        - `files` `File[]` — Файлы
          - `contentType` `string` — Тип файла
            - …
          - `date` `string` — Дата загрузки файла
            - …
          - `downloadID` `string` — ID файла. [Получить файл](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerDownloadId)
            - …
          - `name` `string` — Название файла
            - …
          - `url` `string` — URL для получения файла
            - …
          - `size` `integer<int64>` — Размер файла в байтах
            - …
        - `images` `Image[]` — Изображения
          - `date` `string` — Дата загрузки изображения
            - …
          - `downloadID` `string` — ID файла. [Получить файл](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerDownloadId)
            - …
          - `url` `string` — URL для получения изображения
            - …
      - `text` `string` — Текст сообщения
    - `source` `string` — Источник отправки сообщения: - `seller-portal` — портал продавцов - `seller-public-api` — API Чата с покупателями - `rusite` — портал покупателей - `global` — портал `global.wildberries.ru` - `ios` — мобильная операционная система от **Apple** - `android` — операционная система **Android** от **Google**
    - `addTimestamp` `integer<int64>` — Время появления события на сервере. Формат Unix timestamp
    - `addTime` `string` — Время появления события на сервере в UTC
    - `replySign` `string` — Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/postV1SellerMessage)
    - `sender` `Sender`
    - `clientName` `string` — Имя покупателя
- `errors` `string[]` — Ошибки, если есть

**Структура `400`:**

- `status` `number` — HTTP статус-код
- `title` `string` — Заголовок ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `detail` `string` — Детали ошибки
- `requestId` `string` — Уникальный ID запроса
- `error` `string` — Текст ошибки

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

result = api.get_v1_seller_events(next=...)
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

const { data } = await api.getV1SellerEvents(next);
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

result, _, err := client.CommunicationsAPI.GetV1SellerEvents(context.Background()).Execute()
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

System.out.println(api.getV1SellerEvents(next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1SellerEvents());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1SellerEvents().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1SellerEvents());
```

```rust [Rust]
use wb_api_client::communications::apis::{configuration::Configuration, communications_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = communications_api::get_v1_seller_events(&cfg, next).await;
    println!("{:#?}", result);
}
```

:::
