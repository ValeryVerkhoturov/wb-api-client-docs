---
title: "Список карточек товаров в корзине"
description: "Метод возвращает список карточек товаров в корзине."
---

# Список карточек товаров в корзине

```http
POST /content/v2/get/cards/trash
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Карточки товаров · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsTrash)

Метод возвращает список карточек товаров в корзине.

Чтобы получить \*\*больше 100\*\* карточек товаров, используйте пагинацию.

1. Сделайте первый запрос:

```
        {
          "settings": {
            "sort": {
              "ascending": true
            },
            "cursor": {
              "limit": 100
            }
          }
        }
```

Чтобы получать только карточки товаров, которые были перенесены в корзину после выгрузки, используйте сортировку по возрастанию: `"sort":{"ascending":true}`. 2. Скопируйте `"trashedAt":"\*\*\*","nmID":\*\*\*` из `cursor` ответа и вставьте в `cursor` запроса. 3. Повторите запрос. 4. Повторяйте пункты 2 и 3, пока значение `total` в ответе не станет меньше, чем значение `limit` в запросе. Это будет означать, что вы получили все карточки.
Чтобы получать только карточки товаров, которые были перенесены в корзину после предыдущей выгрузки данных:

1. Сохраните поля `"cursor":{"trashedAt":"\*\*\*","nmID":\*\*\*}` из последнего ответа предыдущей выгрузки. При выгрузке используйте сортировку по возрастанию: `"sort":{"ascending":true}`.
2. Укажите в первом запросе сохранённые поля `"cursor":{"trashedAt":"\*\*\*","nmID":"\*\*\*"}`. Продолжайте использовать сортировку по возрастанию.
3. Сохраните поля `"cursor":{"trashedAt":"\*\*\*","nmID":\*\*\*}` из последнего ответа текущей выгрузки.

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

| Имя      | Где   | Тип      | Обяз. | Описание                                                                                                                                                                                 |
| -------- | ----- | -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale` | query | `string` | нет   | Язык полей ответа `name`, `value` и `object`: - `ru` — русский - `en` — английский - `zh` — китайский Не используется в песочнице. Данные песочницы возвращаются только на русском языке |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                            |
| ----- | ---------------------- | -------------------------------- |
| `200` | Успешно                | `PostV2GetCardsTrashResponse200` |
| `400` | Неправильный запрос    | `responseBodyContentError400`    |
| `401` | Не авторизован         | `object`                         |
| `402` | Требуется платёж       | `object`                         |
| `403` | Доступ запрещён        | `responseBodyContentError403`    |
| `429` | Слишком много запросов | `object`                         |

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

const { data } = await api.postV2GetCardsTrash(postV2GetCardsTrashRequest, locale);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2GetCardsTrash(context.Background()).PostV2GetCardsTrashRequest(postV2GetCardsTrashRequest).Locale(locale).Execute()
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

System.out.println(api.postV2GetCardsTrash(postV2GetCardsTrashRequest, locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2GetCardsTrash($post_v2_get_cards_trash_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый КарточкиТоваровApi(Настройки);

Сообщить(Клиент.PostV2GetCardsTrash(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2GetCardsTrash(postV2GetCardsTrashRequest));
```

:::
