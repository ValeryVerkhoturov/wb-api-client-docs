---
title: "Получить отчёт"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Получить отчёт

```http
POST /api/analytics/v2/item-rating
```

**Base URL:** `https://seller-analytics-api.wildberries.ru` · **Module:** [`analytics`](/en/reference/api/analytics/) · **Section:** Оценка товара · [WB documentation ↗](https://dev.wildberries.ru/openapi/analytics#tag/itemRating/operation/postV2ItemRating)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод формирует набор данных об оценках товаров.

Данные отчёта обновляются 1 раз в час.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит     | Интервал | Всплеск   |
| ------ | --------- | -------- | --------- |
| 1 мин  | 3 запроса | 20 сек   | 3 запроса |

## Request body

`application/json` — schema `ItemRatingRequest`, required

## Responses

| Code  | Description            | Schema                        |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `PostV2ItemRatingResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`              |
| `401` | Не авторизован         | `object`                      |
| `403` | Доступ запрещён        | `ErrorObject403`              |
| `429` | Слишком много запросов | `object`                      |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV2ItemRating(itemRatingRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2ItemRating(context.Background()).ItemRatingRequest(itemRatingRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV2ItemRating(itemRatingRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2ItemRating($item_rating_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ОценкаТовараApi(Настройки);

Сообщить(Клиент.PostV2ItemRating(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2ItemRating(itemRatingRequest));
```

:::
