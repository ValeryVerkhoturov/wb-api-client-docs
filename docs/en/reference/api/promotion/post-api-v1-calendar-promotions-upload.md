---
title: "Добавить товар в акцию"
description: "Метод создаёт задание на загрузку товара в акцию. Состояние загрузки можно проверить с помощью отдельных методов."
---

# Добавить товар в акцию

```http
POST /api/v1/calendar/promotions/upload
```

**Base URL:** `https://dp-calendar-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Календарь акций · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/promoCalendar/operation/postV1CalendarPromotionsUpload)

Метод создаёт задание на загрузку товара в [акцию](https://dev.wildberries.ru/openapi/promotion#tag/promoCalendar/operation/getV1CalendarPromotionsDetails).
Состояние загрузки можно проверить с помощью [отдельных методов](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryTasks).

Данный метод неприменим для автоакций.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Календарь акций**:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный          | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос   |

## Responses

| Code  | Description                         | Schema   |
| ----- | ----------------------------------- | -------- |
| `200` | Успешно                             | `object` |
| `400` | Неправильный запрос                 | `object` |
| `401` | Не авторизован                      | `object` |
| `402` | Требуется платёж                    | `object` |
| `403` | Доступ запрещён                     | `object` |
| `422` | Ошибка обработки параметров запроса | `object` |
| `429` | Слишком много запросов              | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v1_calendar_promotions_upload(post_v1_calendar_promotions_upload_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new PromotionApi(cfg);

const { data } = await api.postV1CalendarPromotionsUpload(postV1CalendarPromotionsUploadRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV1CalendarPromotionsUpload(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.postV1CalendarPromotionsUpload(postV1CalendarPromotionsUploadRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV1CalendarPromotionsUpload($post_v1_calendar_promotions_upload_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV1CalendarPromotionsUpload(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV1CalendarPromotionsUpload(postV1CalendarPromotionsUploadRequest));
```

:::
