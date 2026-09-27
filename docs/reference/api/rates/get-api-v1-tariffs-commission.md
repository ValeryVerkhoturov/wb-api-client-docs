---
title: "Комиссия по категориям товаров"
description: "Метод возвращает данные о комиссии WB по родительским категориям товаров согласно модели продаж."
---

# Комиссия по категориям товаров

```http
GET /api/v1/tariffs/commission
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Комиссии · [Документация WB ↗](https://dev.wildberries.ru/openapi/rates#tag/fees/operation/getV1TariffsCommission)

Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB по [родительским категориям товаров](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectParentAll) согласно модели продаж.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск   |
| ------------------ | ------ | ---------- | -------- | --------- |
| Персональный       | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Сервисный          | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Базовый с секретом | 1 мин  | 1 запрос   | 1 мин    | 2 запроса |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос  |

## Ответы

| Код   | Описание               | Схема        |
| ----- | ---------------------- | ------------ |
| `200` | Успешно                | `object`     |
| `400` | Неправильный запрос    | `BadRequest` |
| `401` | Не авторизован         | `object`     |
| `402` | Требуется платёж       | `object`     |
| `429` | Слишком много запросов | `object`     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.get_v1_tariffs_commission(locale=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1TariffsCommission(locale);
console.log(data);
```

```go [Go]
cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1TariffsCommission(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.rates.ApiClient;
import io.github.valeryverkhoturov.wbapi.rates.SecretString;
import io.github.valeryverkhoturov.wbapi.rates.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1TariffsCommission(locale));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1TariffsCommission());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый КомиссииApi(Настройки);

Сообщить(Клиент.GetV1TariffsCommission().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1TariffsCommission());
```

:::
