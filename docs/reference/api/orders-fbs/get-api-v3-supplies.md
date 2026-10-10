---
title: "Получить список поставок"
description: "Метод возвращает список поставок."
---

# Получить список поставок

```http
GET /api/v3/supplies
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3Supplies)

Метод возвращает список [поставок](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3SuppliesSupplyId).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Ответы

| Код   | Описание               | Схема                      |
| ----- | ---------------------- | -------------------------- |
| `200` | Успешно                | `GetV3SuppliesResponse200` |
| `400` | Неправильный запрос    | `Error`                    |
| `401` | Не авторизован         | `object`                   |
| `402` | Требуется платёж       | `object`                   |
| `403` | Доступ запрещён        | `Error`                    |
| `429` | Слишком много запросов | `object`                   |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_supplies(limit=..., next=...)
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

const { data } = await api.getV3Supplies(limit, next);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3Supplies(context.Background()).Execute()
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

System.out.println(api.getV3Supplies(limit, next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3Supplies($limit, $next));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3Supplies(limit, next).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3Supplies(limit, next));
```

:::
