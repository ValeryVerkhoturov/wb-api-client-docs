---
title: "Создание карточек товаров с присоединением"
description: "Метод создаёт карточки товаров, присоединяя их к существующим отдельным карточкам и группам объединённых карточек. В одной группе объединённых карточек товаров…"
---

# Создание карточек товаров с присоединением

```http
POST /content/v2/cards/upload/add
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Создание карточек товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)

Метод создаёт карточки товаров, присоединяя их к существующим отдельным карточкам и группам [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек. В одной группе объединённых карточек товаров может быть не более 30 карточек, соответственно, создать с присоединением можно не более 29 карточек товаров за один запрос.
Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`.

Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsErrorList).
Создание карточки товара происходит асинхронно. Синхронизация новой карточки с сервисами может занимать до 30 минут. В течение этого времени невозможно добавить остатки на склады и настроить цены.
В песочнице карточка товара создаётся сразу, без ожидания.

Чтобы прикрепить документы к карточке товара, передайте данные документов в объекте запроса `documents`.
Чтобы подтвердить, что для товара не требуются документы, передайте `true` в параметре `excludeDocuments`.
Проверка документов выполняется асинхронно и может занимать до 3 дней. При изменении карточки или документа проверка запускается повторно.
Результаты проверки отображаются в [списке карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), объект `documents`:

- результат по каждому документу в полях `verdict` объекта `items`. Если `verdict` не возвращается в ответе — проверка документа ещё не завершена
- итоговый общий результат по карточке в поле `overallVerdict`. При общей проверке карточки учитываются не только результаты проверки документов, но и другие данные. Например, наличие обязательной маркировки и сведения из внешних реестров. Если `overallVerdict` не возвращается в ответе — проверка карточки ещё не завершена

Типы документов, которые вы можете добавить для товара, указаны в [характеристиках предмета](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectCharcsSubjectId).

При этом не все документы, которые вы можете добавить, обязательны и проходят проверку — вы самостоятельно определяете, какие разрешительные документы требуются для товара в соответствии с законодательством.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Сервисный          | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Базовый с секретом | 1 мин  | 10 запросов | 6 сек    | 5 запросов |
| Базовый            | 2 ч    | 1 запрос    | 2 ч      | 1 запрос   |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание                               | Схема                             |
| ----- | -------------------------------------- | --------------------------------- |
| `200` | Успешно                                | `responseItemList`                |
| `400` | Неправильный запрос                    | `responseBodyContentError400`     |
| `401` | Не авторизован                         | `object`                          |
| `402` | Требуется платёж                       | `object`                          |
| `403` | Доступ запрещён                        | `object`                          |
| `413` | Превышен лимит объёма данных в запросе | `PostV2CardsUploadAddResponse413` |
| `429` | Слишком много запросов                 | `object`                          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2CardsUploadAdd(postV2CardsUploadAddRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2CardsUploadAdd(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2CardsUploadAdd(postV2CardsUploadAddRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2CardsUploadAdd());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СозданиеКарточекТоваровApi(Настройки);

Сообщить(Клиент.PostV2CardsUploadAdd(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2CardsUploadAdd());
```

:::
