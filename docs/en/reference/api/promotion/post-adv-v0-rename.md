---
title: "Переименование кампании"
description: "Метод меняет название кампании. Это можно сделать в любой момент существования кампании."
---

# Переименование кампании

```http
POST /adv/v0/rename
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/postV0Rename)

Метод меняет название [кампании](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts). Это можно сделать в любой момент существования кампании.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса  | 30 мин   | 1 запрос   |

## Request body

`application/json` — schema `object`, optional

## Responses

| Code  | Description                         | Schema   |
| ----- | ----------------------------------- | -------- |
| `200` | Успешно                             | —        |
| `400` | Неправильный запрос                 | `string` |
| `401` | Не авторизован                      | `object` |
| `403` | Доступ запрещён                     | `object` |
| `422` | Ошибка обработки параметров запроса | `string` |
| `429` | Слишком много запросов              | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<your WB JWT>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v0_rename(post_v0_rename_request=...)
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

const { data } = await api.postV0Rename(postV0RenameRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV0Rename(context.Background()).Execute()
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

System.out.println(api.postV0Rename(postV0RenameRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV0Rename());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV0Rename(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV0Rename());
```

:::
