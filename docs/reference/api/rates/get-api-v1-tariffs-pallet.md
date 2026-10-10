---
title: "Тарифы для монопаллет"
description: "Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает стоимость: - доставки со склада до покупателя - доставки от покупателя до…"
---

# Тарифы для монопаллет

```http
GET /api/v1/tariffs/pallet
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Тарифы на остаток · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/rates/get-api-v1-tariffs-pallet) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/stockRates/operation/getV1TariffsPallet)

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories):

- доставки со склада до покупателя
- доставки от покупателя до склада
- хранения на складе WB

Тарифы для монопаллет совпадают с тарифами для **Поштучных паллет**

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
| `200` | Успешно                | `RatesPalletResponse` |
| `400` | Неправильный запрос    | `BadRequest`          |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.rates import Configuration, ApiClient
from wb_api_client.rates.api import RatesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = RatesApi(ApiClient(cfg))

result = api.get_v1_tariffs_pallet(var_date=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  RatesApi,
} from "@valeryverkhoturov/wb-api-client/rates";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new RatesApi(cfg);

const { data } = await api.getV1TariffsPallet(date);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbrates "github.com/ValeryVerkhoturov/wb-api-client-go/rates"
)

cfg := wbrates.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbrates.NewAPIClient(cfg)

result, _, err := client.RatesAPI.GetV1TariffsPallet(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
RatesApi api = new RatesApi(client);

System.out.println(api.getV1TariffsPallet(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsPallet($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsPallet(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsPallet(date));
```

:::
