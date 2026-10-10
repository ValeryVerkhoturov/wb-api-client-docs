---
title: "Получение истории затрат"
description: "Метод формирует список фактических затрат на рекламные кампании за заданный период."
---

# Получение истории затрат

```http
GET /adv/v1/upd
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Финансы · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/getV1Upd)

Метод формирует список фактических затрат на рекламные кампании за заданный период.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Сервисный          | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый с секретом | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Parameters

| Name   | In    | Type     | Req. | Description                                                     |
| ------ | ----- | -------- | ---- | --------------------------------------------------------------- |
| `from` | query | `string` | yes  | Начало интервала                                                |
| `to`   | query | `string` | yes  | Конец интервала. (Минимальный интервал 1 день, максимальный 31) |

## Responses

| Code  | Description            | Schema                |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `GetV1UpdResponse200` |
| `400` | Неправильный запрос    | `string`              |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `object`              |
| `429` | Слишком много запросов | `object`              |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_upd(var_from=..., to=...)
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

const { data } = await api.getV1Upd(from, to);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV1Upd(context.Background()).From(from).To(to).Execute()
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

System.out.println(api.getV1Upd(from, to));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Upd($from, $to));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Upd(from, _to).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Upd(from, to));
```

:::
