---
title: "Изменение ставок в кампаниях"
description: "Метод меняет ставки карточек товаров по артикулам WB в кампаниях: - с единой ставкой - с ручной ставкой - с моделью оплаты cpc — за клики Для кампаний в…"
---

# Изменение ставок в кампаниях

```http
PATCH /api/advert/v1/bids
```

**Base URL:** `https://advert-api.wildberries.ru` · **Module:** [`promotion`](/en/reference/api/promotion/) · **Section:** Управление кампаниями · [WB documentation ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/patchV1Bids)

Метод меняет ставки карточек товаров по артикулам WB в кампаниях:

- с единой ставкой
- с ручной ставкой
- с моделью оплаты `cpc` — за клики
  Для кампаний в статусах `4`, `9` и `11`.

В запросе укажите место размещения в параметре `placement`:

- `combined` — в поиске и рекомендациях для кампаний с единой ставкой
- `search `или `recommendations` — в поиске или рекомендациях для кампаний с ручной ставкой

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса  | 30 мин   | 1 запрос   |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema                   |
| ----- | ---------------------- | ------------------------ |
| `200` | Успешно                | `PatchV1BidsResponse200` |
| `400` | Неправильный запрос    | `response400`            |
| `401` | Не авторизован         | `object`                 |
| `403` | Доступ запрещён        | `object`                 |
| `429` | Слишком много запросов | `object`                 |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<your WB JWT>")
api = Api(ApiClient(cfg))

result = api.patch_v1_bids(patch_v1_bids_request=...)
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

const { data } = await api.patchV1Bids(patchV1BidsRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PatchV1Bids(context.Background()).PatchV1BidsRequest(patchV1BidsRequest).Execute()
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

System.out.println(api.patchV1Bids(patchV1BidsRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->patchV1Bids($patch_v1_bids_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый УправлениеКампаниямиApi(Настройки);

Сообщить(Клиент.PatchV1Bids(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PatchV1Bids(patchV1BidsRequest));
```

:::
