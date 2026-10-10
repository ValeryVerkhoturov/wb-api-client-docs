---
title: "Список черновиков"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список черновиков

```http
GET /api/supplies/v1/drafts
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Черновики поставок · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/supplyDrafts/operation/getV1Drafts)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список черновиков поставок.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Параметры

| Имя      | Где   | Тип       | Обяз. | Описание                                                                                            |
| -------- | ----- | --------- | ----- | --------------------------------------------------------------------------------------------------- |
| `limit`  | query | `integer` | нет   | Количество черновиков в ответе                                                                      |
| `offset` | query | `integer` | нет   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента                |
| `sort`   | query | `string`  | нет   | Сортировка: - `createdDt` — по дате создания черновика - `updatedDt` — по дате обновления черновика |
| `order`  | query | `string`  | нет   | Порядок выдачи: - `desc` — по убыванию - `asc` — по возрастанию                                     |

## Ответы

| Код   | Описание               | Схема                       |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `models.ListDraftsResponse` |
| `400` | Неправильный запрос    | `errors.DraftError`         |
| `401` | Не авторизован         | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbw import Configuration, ApiClient
from wb_api_client.orders_fbw.api import OrdersFbwApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbwApi(ApiClient(cfg))

result = api.get_v1_drafts(limit=..., offset=..., sort=..., order=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbwApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbwApi(cfg);

const { data } = await api.getV1Drafts(limit, offset, sort, order);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.OrdersFbwAPI.GetV1Drafts(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.OrdersFbwApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbwApi api = new OrdersFbwApi(client);

System.out.println(api.getV1Drafts(limit, offset, sort, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\OrdersFbwApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbwApi(new Client(), $config);

print_r($api->getV1Drafts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbwApi(Настройки);

Сообщить(Клиент.GetV1Drafts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbwApi(config);

Console.WriteLine(api.GetV1Drafts());
```

:::
