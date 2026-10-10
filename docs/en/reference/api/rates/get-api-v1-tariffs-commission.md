---
title: "Комиссия по категориям товаров"
description: "Метод возвращает данные о комиссии WB по родительским категориям товаров согласно модели продаж."
---

# Комиссия по категориям товаров

```http
GET /api/v1/tariffs/commission
```

**Base URL:** `https://common-api.wildberries.ru` · **Module:** [`rates`](/en/reference/api/rates/) · **Section:** Комиссии · [WB documentation ↗](https://dev.wildberries.ru/openapi/rates#tag/fees/operation/getV1TariffsCommission)

Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB по [родительским категориям товаров](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectParentAll) согласно модели продаж.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск   |
| ------------------ | ------ | ---------- | -------- | --------- |
| Персональный       | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Сервисный          | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Базовый с секретом | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос  |

## Responses

| Code  | Description            | Schema       |
| ----- | ---------------------- | ------------ |
| `200` | Успешно                | `object`     |
| `400` | Неправильный запрос    | `BadRequest` |
| `401` | Не авторизован         | `object`     |
| `402` | Требуется платёж       | `object`     |
| `429` | Слишком много запросов | `object`     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<your WB JWT>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_tariffs_commission(locale=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  RatesApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new RatesApi(cfg);

const { data } = await api.getV1TariffsCommission(locale);
console.log(data);
```

```go [Go]
cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.RatesAPI.GetV1TariffsCommission(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.rates.ApiClient;
import io.github.valeryverkhoturov.wbapi.rates.SecretString;
import io.github.valeryverkhoturov.wbapi.rates.api.RatesApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1TariffsCommission(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsCommission());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsCommission().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsCommission());
```

:::
