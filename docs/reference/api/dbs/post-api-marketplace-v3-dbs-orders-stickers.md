---
title: "Получить стикеры для сборочных заданий с доставкой в ПВЗ"
description: "Метод доступен по Персональному токену, Сервисному токену, Базовому токену с секретом"
---

# Получить стикеры для сборочных заданий с доставкой в ПВЗ

```http
POST /api/marketplace/v3/dbs/orders/stickers
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/dbs/post-api-marketplace-v3-dbs-orders-stickers) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStickers)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену,
**Базовому** токену **с секретом**

Метод возвращает стикеры для сборочных заданий с доставкой в ПВЗ в [статусах](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersStatusInfo):

- `confirm` — на сборке
- `deliver` — в доставке
  Получить стикеры можно только в размере 580x400 px в формате PDF.

[Лимит запросов](https://dev.wildberries.ru/docs/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий DBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя      | Где   | Тип       | Обяз. | Описание       |
| -------- | ----- | --------- | ----- | -------------- |
| `type`   | query | `string`  | да    | Формат стикера |
| `width`  | query | `integer` | да    | Ширина стикера |
| `height` | query | `integer` | да    | Высота стикера |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема                                |
| ----- | ---------------------- | ------------------------------------ |
| `200` | Успешно                | `PostV3DbsOrdersStickersResponse200` |
| `400` | Неправильный запрос    | `Error`                              |
| `401` | Не авторизован         | `object`                             |
| `402` | Требуется платёж       | `object`                             |
| `403` | Доступ запрещён        | `Error`                              |
| `429` | Слишком много запросов | `object`                             |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DbsApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_stickers(type=..., width=..., height=..., post_v3_dbs_orders_stickers_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DbsApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DbsApi(cfg);

const { data } = await api.postV3DbsOrdersStickers(type, width, height, postV3DbsOrdersStickersRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbdbs "github.com/ValeryVerkhoturov/wb-api-client-go/dbs"
)

cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DbsAPI.PostV3DbsOrdersStickers(context.Background()).Width(width).Height(height).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.dbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.dbs.SecretString;
import io.github.valeryverkhoturov.wbapi.dbs.api.DbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DbsApi api = new DbsApi(client);

System.out.println(api.postV3DbsOrdersStickers(type, width, height, postV3DbsOrdersStickersRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DbsApi(new Client(), $config);

print_r($api->postV3DbsOrdersStickers($type, $width, $height));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый DbsApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersStickers(type, width, height, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DbsApi(config);

Console.WriteLine(api.PostV3DbsOrdersStickers(type, width, height));
```

:::
