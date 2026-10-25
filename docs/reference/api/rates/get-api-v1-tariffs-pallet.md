---
title: "Тарифы для монопаллет"
description: "Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает стоимость: - доставки со склада до покупателя - доставки от покупателя до…"
---

# Тарифы для монопаллет

```http
GET /api/v1/tariffs/pallet
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Тарифы на остаток · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/stockRates/operation/getV1TariffsPallet)

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories):

- доставки со склада до покупателя
- доставки от покупателя до склада
- хранения на складе WB

Тарифы для монопаллет совпадают с тарифами для **Поштучных паллет**

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

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

**Структура `200`:**

- `response` `models.RatesPalletResponse`
  - `data` `models.WarehousesPalletRates`
    - `currency` `string` — Валюта тарифов
    - `dtNextPallet` `string` — Дата начала следующего тарифа
    - `dtTillMax` `string` — Дата окончания последнего установленного тарифа
    - `warehouseList` `models.WarehousePalletRates[]` — Тарифы для монопаллет, сгруппированные по складам
      - `palletDeliveryExpr` `string` — Коэффициент доставки, %. На него умножается стоимость доставки. Во всех тарифах этот коэффициент уже учтён
      - `palletDeliveryValueBase` `string` — Доставка 1 литра, ₽
      - `palletDeliveryValueLiter` `string` — Доставка каждого дополнительного литра, ₽
      - `palletStorageExpr` `string` — Коэффициент хранения, %. На него умножается стоимость хранения. Во всех тарифах этот коэффициент уже учтён
      - `palletStorageValueExpr` `string` — Хранение 1 монопаллеты, ₽
      - `warehouseName` `string` — Название склада

**Структура `400`:**

- `detail` `string` — Детали ошибки
- `origin` `string` — ID внутреннего сервиса WB
- `requestId` `string` — Уникальный ID запроса
- `title` `string` — Заголовок ошибки

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `429`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

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
client.setAccessToken(new SecretString("<ваш JWT WB>"));
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

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = rates_api::get_v1_tariffs_pallet(&cfg, date).await;
    println!("{:#?}", result);
}
```

:::
