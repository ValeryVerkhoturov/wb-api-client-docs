---
title: "Завершение кампании"
description: "Метод завершает кампании в статусах: - 9 — активна - 11 — пауза"
---

# Завершение кампании

```http
GET /adv/v0/stop
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0Stop)

Метод завершает [кампании](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts) в статусах:

- `9` — активна
- `11` — пауза

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Parameters

| Name | In    | Type      | Req. | Description |
| ---- | ----- | --------- | ---- | ----------- |
| `id` | query | `integer` | yes  | ID кампании |

## Responses

| Code  | Description            | Schema            |
| ----- | ---------------------- | ----------------- |
| `200` | Успешно                | —                 |
| `400` | Неправильный запрос    | `Http400Response` |
| `401` | Не авторизован         | `object`          |
| `403` | Доступ запрещён        | `object`          |
| `422` | Статус не изменен      | `string`          |
| `429` | Слишком много запросов | `object`          |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.get_v0_stop(id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.getV0Stop(id);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV0Stop(context.Background()).Id(id).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV0Stop(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV0Stop($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый УправлениеКампаниямиApi(Настройки);

Сообщить(Клиент.GetV0Stop(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV0Stop(id));
```

:::
