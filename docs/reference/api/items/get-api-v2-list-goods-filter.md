---
title: "Получить товары с ценами"
description: "Метод возвращает информацию о товарах: цены, валюту, общие скидки, скидки WB Клуба и оптовые скидки для B2B-продаж."
---

# Получить товары с ценами

```http
GET /api/v2/list/goods/filter
```

**База:** `https://discounts-prices-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Цены и скидки · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsFilter)

Метод возвращает информацию о товарах: цены, валюту, общие скидки, [скидки WB Клуба](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskClubDiscount) и [оптовые скидки для B2B-продаж](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV1UploadTaskB2bWholesale).

В одном запросе можно указать только один артикул.

Чтобы получить информацию обо всех товарах продавца, не указывая артикулы, установите `limit=1000`, в параметре `offset` установите смещение по количеству записей. Количество нужно рассчитать по формуле: `offset` плюс `limit` из предыдущего запроса. Повторяйте запрос, пока вы не получите ответ с пустым массивом.

Используйте отдельные методы, чтобы получить информацию:

- о [нескольких товарах по артикулам](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2ListGoodsFilter)
- о [размерах товара](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsSizeNm)

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Цены и скидки**:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный          | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 4 запроса   | 15 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Ответы

| Код   | Описание               | Схема           |
| ----- | ---------------------- | --------------- |
| `200` | Успешно                | `object`        |
| `400` | Неправильный запрос    | `ResponseError` |
| `401` | Не авторизован         | `object`        |
| `402` | Требуется платёж       | `object`        |
| `403` | Доступ запрещён        | `ResponseError` |
| `429` | Слишком много запросов | `object`        |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_list_goods_filter(limit=..., offset=..., filter_nm_id=...)
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

const { data } = await api.getV2ListGoodsFilter(limit, offset, filterNmID);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.GetV2ListGoodsFilter(context.Background()).Execute()
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

System.out.println(api.getV2ListGoodsFilter(limit, offset, filterNmID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2ListGoodsFilter($limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2ListGoodsFilter(limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2ListGoodsFilter(limit));
```

:::
