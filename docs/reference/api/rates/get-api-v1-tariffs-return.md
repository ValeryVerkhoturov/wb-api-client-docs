---
title: "Тарифы на возврат"
description: "Метод возвращает тарифы: - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец"
---

# Тарифы на возврат

```http
GET /api/v1/tariffs/return
```

**База:** `https://common-api.wildberries.ru` · **Модуль:** [`rates`](/reference/api/rates/) · **Раздел:** Стоимость возврата продавцу · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/rates#tag/returnCostToSeller/operation/getV1TariffsReturn)

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost):

- на перевозку товаров со склада WB или из пункта приёма до продавца
- на обратную перевозку возвратов, которые не забрал продавец

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
| `200` | Успешно                | `ReturnRatesResponse` |
| `400` | Неправильный запрос    | `BadRequest`          |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `429` | Слишком много запросов | `object`              |

**Структура `200`:**

- `response` `models.ReturnRatesResponse`
  - `data` `models.WarehousesReturnRates`
    - `currency` `string` — Валюта тарифов
    - `dtNextDeliveryDumpKgt` `string` — Дата начала следующего тарифа при грузовой доставке
    - `dtNextDeliveryDumpSrg` `string` — Дата начала следующего тарифа для неопознанных товаров
    - `dtNextDeliveryDumpSup` `string` — Дата начала следующего тарифа при обычной доставке
    - `warehouseList` `models.WarehouseReturnRates[]` — Тарифы на возврат, сгруппированные по складам: - стоимость возврата брака и возврата по инициативе продавца при грузовой доставке. - стоимость возврата неопознанного складом товара. - стоимость возврата брака, возврата по инициативе продавца и автовозвратов Маркетплейс (в пункт выдачи и обратно). Можно получить стоимость возврата в пункт выдачи (ПВЗ) и обратной логистики — если продавец не забрал товары из пункта выдачи за 7 дней.
      - `deliveryDumpKgtOfficeBase` `string` — **Стоимость возврата при грузовой доставке, доставка на ПВЗ (базовая цена за 1 л), ₽** Применяется для крупногабаритных товаров, когда: - продавец хочет вывезти товары со склада WB; - на складе обнаружили бракованные товары; - покупатель возвращает товар, но его нельзя вернуть в продажу.
      - `deliveryDumpKgtOfficeLiter` `string` — \*\*Стоимость возврата при грузовой доставке, доставка на ПВЗ (доп. литр), ₽\*\* Стоимость за каждый дополнительный литр.
      - `deliveryDumpKgtReturnExpr` `string` — \*\*Стоимость возврата при грузовой доставке, обратная логистика невостребованного возврата, ₽\*\* Грузовая доставка невостребованного возврата обратно на склад WB. За единицу товара.
      - `deliveryDumpSrgOfficeExpr` `string` — \*\*Стоимость возврата неопознанного складом товара за каждую единицу, доставка на ПВЗ, ₽\*\* Применяется для товаров, которые не смогли принять на складе.
      - `deliveryDumpSrgReturnExpr` `string` — \*\*Стоимость возврата неопознанного складом товара за каждую единицу, обратная логистика невостребованного возврата, ₽\*\* Доставка невостребованного возврата обратно на склад WB.
      - `deliveryDumpSupCourierBase` `string` — **Стоимость возврата, доставка курьером (базовая цена за 1 л), ₽** Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс
      - `deliveryDumpSupCourierLiter` `string` — \*\*Стоимость возврата, доставка курьером (доп. л), ₽\*\* Стоимость за каждый дополнительный литр.
      - `deliveryDumpSupOfficeBase` `string` — **Стоимость возврата, доставка на ПВЗ (базовая цена за 1 л), ₽** Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс
      - `deliveryDumpSupOfficeLiter` `string` — \*\*Стоимость возврата, доставка на ПВЗ (доп. литр), ₽\*\* Стоимость за каждый дополнительный литр
      - `deliveryDumpSupReturnExpr` `string` — \*\*Стоимость возврата, обратная логистика невостребованного возврата, за единицу товара, ₽\*\* Доставка невостребованного возврата обратно на склад Wildberries. Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс
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

result = api.get_v1_tariffs_return(var_date=...)
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

const { data } = await api.getV1TariffsReturn(date);
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

result, _, err := client.RatesAPI.GetV1TariffsReturn(context.Background()).Execute()
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

System.out.println(api.getV1TariffsReturn(date));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Rates\Configuration;
use ValeryVerkhoturov\WbApiClient\Rates\SecretString;
use ValeryVerkhoturov\WbApiClient\Rates\Api\RatesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new RatesApi(new Client(), $config);

print_r($api->getV1TariffsReturn($date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый RatesApi(Настройки);

Сообщить(Клиент.GetV1TariffsReturn(date).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Rates.Api;
using ValeryVerkhoturov.WbApiClient.Rates.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new RatesApi(config);

Console.WriteLine(api.GetV1TariffsReturn(date));
```

```rust [Rust]
use wb_api_client::rates::apis::{configuration::Configuration, rates_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = rates_api::get_v1_tariffs_return(&cfg, date).await;
    println!("{:#?}", result);
}
```

:::
