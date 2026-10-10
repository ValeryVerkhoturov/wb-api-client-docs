---
title: "Получить информацию о завершённых сборочных заданиях"
description: "Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа."
---

# Получить информацию о завершённых сборочных заданиях

```http
GET /api/v3/click-collect/orders
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Сборочные задания Самовывоз · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/in-store-pickup/get-api-v3-click-collect-orders) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/getV3ClickCollectOrders)

Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа.

Можно получить данные за заданный период, максимум 30 календарных дней одним запросом.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий Самовывоз**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Параметры

| Имя        | Где   | Тип       | Обяз. | Описание                                                                                                                                                            |
| ---------- | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`    | query | `integer` | да    | Количество элементов в ответе                                                                                                                                       |
| `next`     | query | `integer` | да    | Параметр пагинации. Чтобы получить полный список данных, укажите `0` в первом запросе. Чтобы получить следующий пакет данных, используйте значение `next` из ответа |
| `dateFrom` | query | `integer` | да    | Дата начала периода в формате Unix timestamp                                                                                                                        |
| `dateTo`   | query | `integer` | да    | Дата конца периода в формате Unix timestamp                                                                                                                         |

## Ответы

| Код   | Описание               | Схема        |
| ----- | ---------------------- | ------------ |
| `200` | Успешно                | `api.Orders` |
| `400` | Неправильный запрос    | `Error`      |
| `401` | Не авторизован         | `object`     |
| `402` | Требуется платёж       | `object`     |
| `403` | Доступ запрещён        | `Error`      |
| `429` | Слишком много запросов | `object`     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.get_v3_click_collect_orders(limit=..., next=..., date_from=..., date_to=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  InStorePickupApi,
} from "@valeryverkhoturov/wb-api-client/in-store-pickup";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new InStorePickupApi(cfg);

const { data } = await api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbinstorepickup "github.com/ValeryVerkhoturov/wb-api-client-go/in_store_pickup"
)

cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.GetV3ClickCollectOrders(context.Background()).Limit(limit).Next(next).DateFrom(dateFrom).DateTo(dateTo).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.getV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->getV3ClickCollectOrders($limit, $next, $date_from, $date_to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.GetV3ClickCollectOrders(limit, next, dateFrom, dateTo));
```

:::
