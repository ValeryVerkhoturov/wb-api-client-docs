---
title: "Товары поставки"
description: "Метод возвращает информацию о товарах в поставке."
---

# Товары поставки

```http
GET /api/v1/supplies/{ID}/goods
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Информация о поставках · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesIdGoods)

Метод возвращает информацию о товарах в поставке.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Сервисный          | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Parameters

| Name           | In    | Type      | Req. | Description                                                                                                                |
| -------------- | ----- | --------- | ---- | -------------------------------------------------------------------------------------------------------------------------- |
| `limit`        | query | `integer` | no   | Количество записей в ответе                                                                                                |
| `offset`       | query | `integer` | no   | После какого элемента выдавать данные                                                                                      |
| `isPreorderID` | query | `boolean` | no   | Поиск по: - `true` — ID заказа, если в `ID` передаёте ID заказа - `false` — ID поставки, если в `ID` передаёте ID поставки |
| `ID`           | path  | `integer` | yes  | ID поставки или заказа                                                                                                     |

## Responses

| Code  | Description            | Schema                            |
| ----- | ---------------------- | --------------------------------- |
| `200` | Успешно                | `GetV1SuppliesIdGoodsResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`               |
| `401` | Не авторизован         | `object`                          |
| `402` | Требуется платёж       | `object`                          |
| `403` | Доступ запрещён        | `object`                          |
| `429` | Слишком много запросов | `object`                          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1SuppliesIdGoods(iD, limit, offset, isPreorderID);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1SuppliesIdGoods(context.Background(), iD).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1SuppliesIdGoods(ID, limit, offset, isPreorderID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1SuppliesIdGoods($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИнформацияОПоставкахApi(Настройки);

Сообщить(Клиент.GetV1SuppliesIdGoods(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1SuppliesIdGoods(ID));
```

:::
