---
title: "Получить данные СПОТ для списка поставок"
description: "Метод возвращает данные СПОТ для списка поставок."
---

# Получить данные СПОТ для списка поставок

```http
POST /api/marketplace/v3/fbs/supplies/spot/list
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/orders-fbs/post-api-marketplace-v3-fbs-supplies-spot-list) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList)

Метод возвращает данные СПОТ для списка поставок.

Вы можете получить данные СПОТ, только если выполняются все условия:

- поставка находится на этапе доставки
- продавец зарегистрирован в любой стране ЕАЭС кроме РФ
- склад назначения находится в РФ

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                    |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `SupplySpotDataResponse` |
| `400` | Неправильный запрос    | `ApiErrorV3`             |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `object`                 |
| `429` | Слишком много запросов | `object`                 |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_fbs_supplies_spot_list(post_v3_fbs_supplies_spot_list_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3FbsSuppliesSpotList(context.Background()).PostV3FbsSuppliesSpotListRequest(postV3FbsSuppliesSpotListRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3FbsSuppliesSpotList($post_v3_fbs_supplies_spot_list_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3FbsSuppliesSpotList(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3FbsSuppliesSpotList(postV3FbsSuppliesSpotListRequest));
```

:::
