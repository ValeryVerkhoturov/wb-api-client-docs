---
title: "Получить отчёт"
description: "Метод формирует набор данных о заказах и продажах."
---

# Получить отчёт

```http
POST /api/analytics/v1/order-feed
```

**База:** `https://seller-analytics-api.wildberries.ru` · **Модуль:** [`analytics`](/reference/api/analytics/) · **Раздел:** Лента заказов · [Документация WB ↗](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed)

Метод формирует набор данных о заказах и продажах.

Данные отчёта обновляются в режиме реального времени.

> 1 заказ = 1 сборочное задание = 1 единица товара
> Параметры `brandNames`,`subjectIds`, `tagIds`, `nmIds` могут быть пустыми `[]`, тогда в ответе возвращаются все заказы продавца.
> Если вы указали несколько параметров, в ответе будут заказы, в которых есть одновременно все эти параметры. Если заказы не подходят по параметрам запроса, вернётся пустой массив `[]`.

Можно получить отчёт максимум за последние 31 день.

Заказы отдаются по времени текущего статуса, от самого нового к самому раннему.

Можно использовать пагинацию.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск  |
| ------------------ | ------ | -------- | -------- | -------- |
| Персональный       | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Сервисный          | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый с секретом | 1 мин  | 1 запрос | 1 мин    | 1 запрос |
| Базовый            | 3 ч    | 1 запрос | 3 ч      | 1 запрос |

## Тело запроса

`application/json` — схема `OrderFeedRequest`, необязательно

## Ответы

| Код   | Описание               | Схема                        |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `PostV1OrderFeedResponse200` |
| `400` | Неправильный запрос    | `ErrorObject400`             |
| `401` | Не авторизован         | `object`                     |
| `403` | Доступ запрещён        | `ErrorObject403`             |
| `429` | Слишком много запросов | `object`                     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.analytics import Configuration, ApiClient
from wb_api_client.analytics.api import AnalyticsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = AnalyticsApi(ApiClient(cfg))

result = api.post_v1_order_feed(order_feed_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  AnalyticsApi,
} from "@valeryverkhoturov/wb-api-client/analytics";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new AnalyticsApi(cfg);

const { data } = await api.postV1OrderFeed(orderFeedRequest);
console.log(data);
```

```go [Go]
cfg := wbanalytics.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbanalytics.NewAPIClient(cfg)

result, _, err := client.AnalyticsAPI.PostV1OrderFeed(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.analytics.ApiClient;
import io.github.valeryverkhoturov.wbapi.analytics.SecretString;
import io.github.valeryverkhoturov.wbapi.analytics.api.AnalyticsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
AnalyticsApi api = new AnalyticsApi(client);

System.out.println(api.postV1OrderFeed(orderFeedRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Analytics\Configuration;
use ValeryVerkhoturov\WbApiClient\Analytics\SecretString;
use ValeryVerkhoturov\WbApiClient\Analytics\Api\AnalyticsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new AnalyticsApi(new Client(), $config);

print_r($api->postV1OrderFeed());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый AnalyticsApi(Настройки);

Сообщить(Клиент.PostV1OrderFeed(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Analytics.Api;
using ValeryVerkhoturov.WbApiClient.Analytics.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new AnalyticsApi(config);

Console.WriteLine(api.PostV1OrderFeed());
```

:::
