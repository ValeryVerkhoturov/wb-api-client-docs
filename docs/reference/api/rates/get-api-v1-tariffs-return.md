---
title: "Тарифы на возврат"
description: "Метод возвращает тарифы: - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец"
---

# Тарифы на возврат

```http
GET /api/v1/tariffs/return
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Стоимость возврата продавцу · [Документация WB ↗](https://dev.wildberries.ru/openapi/rates#tag/returnCostToSeller/operation/getV1TariffsReturn)

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost):

- на перевозку товаров со склада WB или из пункта приёма до продавца
- на обратную перевозку возвратов, которые не забрал продавец

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Сервисный          | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Базовый с секретом | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос   |

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `ReturnRatesResponse` |
| `400` | Неправильный запрос    | `BadRequest`          |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.get_v1_tariffs_return(var_date=...)
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

const { data } = await api.getV1TariffsReturn(date);
console.log(data);
```

```go [Go]
cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1TariffsReturn(context.Background()).Execute()
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

System.out.println(api.getV1TariffsReturn(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1TariffsReturn($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СтоимостьВозвратаПродавцуApi(Настройки);

Сообщить(Клиент.GetV1TariffsReturn(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1TariffsReturn(date));
```

:::
