---
title: "Получить цены продавца и суммы к оплате"
description: "Метод возвращает: - цены продавца без учёта скидок - суммы к оплате покупателем с учетом всех скидок и кэшбека"
---

# Получить цены продавца и суммы к оплате

```http
POST /api/marketplace/v3/dbs/orders/final-price
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`dbs`](/reference/api/dbs/) · **Раздел:** Сборочные задания DBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersFinalPrice)

Метод возвращает:

- цены продавца без учёта скидок
- суммы к оплате покупателем с учетом всех скидок и кэшбека

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **получения и удаления идентификаторов маркировки DBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 150 запросов | 400 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Тело запроса

`application/json` — схема `OrdersRequestAPI`, необязательно

## Ответы

| Код   | Описание               | Схема                          |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `api.OrdersFinalPriceResponse` |
| `400` | Неправильный запрос    | `api.BatchError`               |
| `401` | Не авторизован         | `object`                       |
| `403` | Доступ запрещён        | `api.BatchError`               |
| `429` | Слишком много запросов | `object`                       |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.dbs import Configuration, ApiClient
from wb_api_client.dbs.api import DBSApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DBSApi(ApiClient(cfg))

result = api.post_v3_dbs_orders_final_price(orders_request_api=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DBSApi,
} from "@valeryverkhoturov/wb-api-client/dbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DBSApi(cfg);

const { data } = await api.postV3DbsOrdersFinalPrice(ordersRequestAPI);
console.log(data);
```

```go [Go]
cfg := wbdbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbdbs.NewAPIClient(cfg)

result, _, err := client.DBSAPI.PostV3DbsOrdersFinalPrice(context.Background()).Execute()
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

System.out.println(api.postV3DbsOrdersFinalPrice(ordersRequestAPI));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Dbs\Configuration;
use ValeryVerkhoturov\WbApiClient\Dbs\SecretString;
use ValeryVerkhoturov\WbApiClient\Dbs\Api\DBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DBSApi(new Client(), $config);

print_r($api->postV3DbsOrdersFinalPrice());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СборочныеЗаданияDBSApi(Настройки);

Сообщить(Клиент.PostV3DbsOrdersFinalPrice(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Dbs.Api;
using ValeryVerkhoturov.WbApiClient.Dbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DBSApi(config);

Console.WriteLine(api.PostV3DbsOrdersFinalPrice());
```

:::
