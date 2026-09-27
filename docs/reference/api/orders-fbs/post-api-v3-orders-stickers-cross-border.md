---
title: "Получить стикеры сборочных заданий трансграничных поставок"
description: "Метод возвращает список стикеров сборочных заданий трансграничных поставок в формате PDF."
---

# Получить стикеры сборочных заданий трансграничных поставок

```http
POST /api/v3/orders/stickers/cross-border
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Сборочные задания FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStickersCrossBorder)

Метод возвращает список стикеров [сборочных заданий](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/getV3Orders) трансграничных поставок в формате PDF.

Для каждого сборочного задания в ответе указывается статус генерации стикера:

- `awaitingTrackNumber` — стикер не готов. Ожидается трек-номер от перевозчика.
- `ready` — стикер готов

Стикер может генерироваться с задержкой. Повторяйте запрос, пока не получите статус `ready`.

Ограничения:

- За один запрос можно получить максимум 100 стикеров.
- Можно получить стикеры только для сборочных заданий, находящихся на сборке или в доставке — [статусы](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders/operation/postV3OrdersStatus) `confirm`, `complete`.
  В песочнице этот метод всегда возвращает ответ `200`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема                                        |
| ----- | ---------------------- | -------------------------------------------- |
| `200` | Успешно                | `PostV3OrdersStickersCrossBorderResponse200` |
| `400` | Неправильный запрос    | `Error`                                      |
| `401` | Не авторизован         | `object`                                     |
| `402` | Требуется платёж       | `object`                                     |
| `403` | Доступ запрещён        | `Error`                                      |
| `429` | Слишком много запросов | `object`                                     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import FBSApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FBSApi(ApiClient(cfg))

result = api.post_v3_orders_stickers_cross_border(post_v3_orders_stickers_cross_border_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FBSApi(cfg);

const { data } = await api.postV3OrdersStickersCrossBorder(postV3OrdersStickersCrossBorderRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PostV3OrdersStickersCrossBorder(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.FbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
FbsApi api = new FbsApi(client);

System.out.println(api.postV3OrdersStickersCrossBorder(postV3OrdersStickersCrossBorderRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FBSApi(new Client(), $config);

print_r($api->postV3OrdersStickersCrossBorder());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СборочныеЗаданияFBSApi(Настройки);

Сообщить(Клиент.PostV3OrdersStickersCrossBorder(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FBSApi(config);

Console.WriteLine(api.PostV3OrdersStickersCrossBorder());
```

:::
