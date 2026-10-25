---
title: "Тарифы для коробов"
description: "Для остатков товаров, которые поставляются на склад в коробах, метод возвращает тарифы на: - доставку со склада или пункта приёма до покупателя - доставку от…"
---

# Тарифы для коробов

```http
GET /api/v1/tariffs/box
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Тарифы на остаток · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/stockRates/operation/getV1TariffsBox)

Для остатков товаров, которые поставляются на склад в коробах, метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories) на:

- доставку со склада или пункта приёма до покупателя
- доставку от покупателя до пункта приёма
- хранение на складе WB

Тарифы для коробов совпадают с тарифами для **Суперсейфа**

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Сервисный          | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Базовый с секретом | 1 мин  | 60 запросов | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос   |

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `RatesBoxResponse` |
| `400` | Неправильный запрос    | `BadRequest`       |
| `401` | Не авторизован         | `object`           |
| `402` | Требуется платёж       | `object`           |
| `429` | Слишком много запросов | `object`           |

**Структура `200`:**

- `response` `models.RatesBoxResponse`
  - `data` `models.WarehousesBoxRates`
    - `currency` `string` — Валюта тарифов
    - `dtNextBox` `string` — Дата начала следующего тарифа
    - `dtTillMax` `string` — Дата окончания последнего установленного тарифа
    - `warehouseList` `models.WarehouseBoxRates[]` — Тарифы для коробов, сгруппированные по складам
      - `boxDeliveryBase` `string` — Логистика, первый литр, ₽
      - `boxDeliveryCoefExpr` `string` — Коэффициент **Логистика**, %. На него умножается стоимость логистики. Уже учтён в тарифах
      - `boxDeliveryLiter` `string` — Логистика, дополнительный литр, ₽
      - `boxDeliveryMarketplaceBase` `string` — Логистика FBS, первый литр, ₽
      - `boxDeliveryMarketplaceCoefExpr` `string` — Коэффициент **FBS**, %. На него умножается стоимость логистики FBS. Уже учтён в тарифах
      - `boxDeliveryMarketplaceLiter` `string` — Логистика FBS, дополнительный литр, ₽
      - `boxStorageBase` `string` — Хранение в день, первый литр, ₽
      - `boxStorageCoefExpr` `string` — Коэффициент **Хранение**, %. На него умножается стоимость хранения в день. Уже учтён в тарифах
      - `boxStorageLiter` `string` — Хранение в день, дополнительный литр, ₽
      - `geoName` `string` — Местонахождение склада
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

result = api.get_v1_tariffs_box(var_date=...)
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

const { data } = await api.getV1TariffsBox(date);
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

result, _, err := client.RatesAPI.GetV1TariffsBox(context.Background()).Execute()
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

System.out.println(api.getV1TariffsBox(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsBox($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsBox(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsBox(date));
```

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = rates_api::get_v1_tariffs_box(&cfg, date).await;
    println!("{:#?}", result);
}
```

:::
