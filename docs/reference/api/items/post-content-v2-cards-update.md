---
title: "Редактирование карточек товаров"
description: "Метод обновляет данные карточек товаров. Также используйте его, чтобы добавлять новые размеры."
---

# Редактирование карточек товаров

```http
POST /content/v2/cards/update
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2CardsUpdate)

Метод обновляет данные карточек товаров. Также используйте его, чтобы добавлять новые размеры.

Карточка товара перезаписывается при обновлении. Поэтому в запросе нужно передать в том числе те параметры карточки, которые вы не собираетесь обновлять. Их значения можно получить в [списке карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList) и [списке карточек товаров в корзине](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash).

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

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск    |
| ------ | ----------- | -------- | ---------- |
| 1 мин  | 10 запросов | 6 сек    | 5 запросов |

## Тело запроса

`application/json` — схема `object[]`, необязательно

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

const { data } = await api.postV2CardsUpdate(postV2CardsUpdateRequestInner);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2CardsUpdate(postV2CardsUpdateRequestInner));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2CardsUpdate());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый КарточкиТоваровApi(Настройки);

Сообщить(Клиент.PostV2CardsUpdate(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2CardsUpdate());
```

:::
