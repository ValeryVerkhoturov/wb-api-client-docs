---
title: "Список черновиков"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Список черновиков

```http
GET /api/supplies/v1/drafts
```

**Base URL:** `https://supplies-api.wildberries.ru` · **Module:** [`orders-fbw`](/en/reference/api/orders-fbw/) · **Section:** Черновики поставок · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/supplyDrafts/operation/getV1Drafts)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает список черновиков поставок.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит       | Интервал | Всплеск     |
| ------ | ----------- | -------- | ----------- |
| 1 мин  | 30 запросов | 2 сек    | 10 запросов |

## Parameters

| Name     | In    | Type      | Req. | Description                                                                                         |
| -------- | ----- | --------- | ---- | --------------------------------------------------------------------------------------------------- |
| `limit`  | query | `integer` | no   | Количество черновиков в ответе                                                                      |
| `offset` | query | `integer` | no   | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента                |
| `sort`   | query | `string`  | no   | Сортировка: - `createdDt` — по дате создания черновика - `updatedDt` — по дате обновления черновика |
| `order`  | query | `string`  | no   | Порядок выдачи: - `desc` — по убыванию - `asc` — по возрастанию                                     |

## Responses

| Code  | Description            | Schema                      |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `models.ListDraftsResponse` |
| `400` | Неправильный запрос    | `errors.DraftError`         |
| `401` | Не авторизован         | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

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

const { data } = await api.getV1Drafts(limit, offset, sort, order);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1Drafts(context.Background()).Execute()
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

System.out.println(api.getV1Drafts(limit, offset, sort, order));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1Drafts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ЧерновикиПоставокApi(Настройки);

Сообщить(Клиент.GetV1Drafts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1Drafts());
```

:::
