---
title: "Карточки товаров для кампаний"
description: "Метод возвращает список карточек товаров, которые можно добавить в рекламную кампанию. Для получения карточек необходимы ID предметов, также доступных для…"
---

# Карточки товаров для кампаний

```http
POST /adv/v2/supplier/nms
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Создание кампаний · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/creatingCampaigns/operation/postV2SupplierNms)

Метод возвращает список [карточек товаров](https://dev.wildberries.ru/openapi/item-management#tag/listings/operation/postV2GetCardsList), которые можно добавить в рекламную [кампанию](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts). Для получения карточек необходимы ID [предметов](https://dev.wildberries.ru/openapi/promotion#tag/creatingCampaigns/operation/getV1SupplierSubjects), также доступных для добавления в кампанию.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный          | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Базовый с секретом | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса  | 30 мин   | 1 запрос   |

## Request body

`application/json` — schema `integer[]`, optional

## Responses

| Code  | Description            | Schema                         |
| ----- | ---------------------- | ------------------------------ |
| `200` | Успешно                | `PostV2SupplierNmsResponse200` |
| `400` | Неправильный запрос    | `string`                       |
| `401` | Не авторизован         | `object`                       |
| `403` | Доступ запрещён        | `object`                       |
| `429` | Слишком много запросов | `object`                       |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.post_v2_supplier_nms(request_body=...)
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

const { data } = await api.postV2SupplierNms(requestBody);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV2SupplierNms(context.Background()).Execute()
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

System.out.println(api.postV2SupplierNms(requestBody));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV2SupplierNms());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый СозданиеКампанийApi(Настройки);

Сообщить(Клиент.PostV2SupplierNms(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV2SupplierNms());
```

:::
