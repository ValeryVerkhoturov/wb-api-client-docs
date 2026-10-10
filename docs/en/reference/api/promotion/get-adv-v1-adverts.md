---
title: "Список медиакампаний"
description: "Метод возвращает список всех медиакампаний продавца по их типам и статусам."
---

# Список медиакампаний

```http
GET /adv/v1/adverts
```

**Base URL:** `https://advert-media-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Медиа · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/media/operation/getV1Adverts)

Метод возвращает список всех [медиакампаний](https://dev.wildberries.ru/openapi/promotion#tag/media/operation/getV1Advert) продавца по их типам и статусам.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Сервисный          | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Базовый с секретом | 1 сек  | 10 запросов | 100 мс   | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Parameters

| Name        | In    | Type      | Req. | Description                                                                                                                                                                                                                                                                                             |
| ----------- | ----- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`    | query | `string`  | no   | Статус медиакампании: - `1` — черновик - `2` — модерация - `3` — отклонена (с возможностью вернуть на модерацию) - `4` — готова к запуску - `5` — запланирована - `6` — на показах - `7` — завершена - `8` — отменена - `9` — приостановлена продавцом - `10` — пауза по дневному лимиту - `11` — пауза |
| `type`      | query | `integer` | no   | Тип медиакампании: - `1` — размещение по дням - `2` — размещение по просмотрам                                                                                                                                                                                                                          |
| `limit`     | query | `integer` | no   | Количество кампаний в ответе                                                                                                                                                                                                                                                                            |
| `offset`    | query | `integer` | no   | Смещение относительно первой медиакампании                                                                                                                                                                                                                                                              |
| `order`     | query | `string`  | no   | Порядок вывода ответа: - `create` — по времени создания медиакампании - `id` — по ID медиакампании                                                                                                                                                                                                      |
| `direction` | query | `string`  | no   | Порядок сортировки: - `desc` — от большего к меньшему - `asc` — от меньшего к большему                                                                                                                                                                                                                  |

## Responses

| Code  | Description              | Schema                    |
| ----- | ------------------------ | ------------------------- |
| `200` | Успешно                  | `GetV1AdvertsResponse200` |
| `204` | Медиакампании не найдены | —                         |
| `401` | Не авторизован           | `object`                  |
| `403` | Доступ запрещён          | `object`                  |
| `429` | Слишком много запросов   | `object`                  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_adverts(status=..., type=..., limit=..., offset=..., order=..., direction=...)
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

const { data } = await api.getV1Adverts(status, type, limit, offset, order, direction);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV1Adverts(context.Background()).Execute()
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

System.out.println(api.getV1Adverts(status, type, limit, offset, order, direction));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Adverts());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Adverts().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Adverts());
```

:::
