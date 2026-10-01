---
title: "Редактирование карточек товаров"
description: "Метод обновляет данные карточек товаров. Также используйте его, чтобы добавлять новые размеры и документы."
---

# Редактирование карточек товаров

```http
POST /content/v2/cards/update
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Карточки товаров · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)

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

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск    |
| ------ | ----------- | -------- | ---------- |
| 1 мин  | 10 запросов | 6 сек    | 5 запросов |

## Request body

`application/json` — schema `object[]`, optional

## Responses

| Code  | Description                            | Schema                         |
| ----- | -------------------------------------- | ------------------------------ |
| `200` | Успешно                                | `responseItemList`             |
| `400` | Неправильный запрос                    | `responseBodyContentError400`  |
| `401` | Не авторизован                         | `object`                       |
| `402` | Требуется платёж                       | `object`                       |
| `403` | Доступ запрещён                        | `responseBodyContentError403`  |
| `413` | Превышен лимит объёма данных в запросе | `PostV2CardsUpdateResponse413` |
| `429` | Слишком много запросов                 | `object`                       |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2CardsUpdate(postV2CardsUpdateRequestInner);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2CardsUpdate(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2CardsUpdate(postV2CardsUpdateRequestInner));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2CardsUpdate());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый КарточкиТоваровApi(Настройки);

Сообщить(Клиент.PostV2CardsUpdate(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2CardsUpdate());
```

:::
