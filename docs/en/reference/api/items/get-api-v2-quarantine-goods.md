---
title: "Получить товары в карантине"
description: "Метод возвращает информацию о товарах в карантине."
---

# Получить товары в карантине

```http
GET /api/v2/quarantine/goods
```

**Base URL:** `https://discounts-prices-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Цены и скидки · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2QuarantineGoods)

Метод возвращает информацию о товарах в карантине.

Если новая цена товара со скидкой будет меньше [порогового значения](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine#2ef3641a-5165-41db-9ac7-e4374c9fc3f1), товар попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и будет продаваться по старой цене. Ошибка об этом будет в [детализации загрузки](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryGoodsTask).

Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine).

Для товаров с [поразмерной установкой цен](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize) карантин не применяется.

В [песочнице](https://dev.wildberries.ru/sandbox) товары автоматически удаляются из карантина через 3 дня.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Цены и скидки**:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный          | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 4 запроса   | 15 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Responses

| Code  | Description            | Schema          |
| ----- | ---------------------- | --------------- |
| `200` | Успешно                | `object`        |
| `400` | Неправильный запрос    | `ResponseError` |
| `401` | Не авторизован         | `object`        |
| `402` | Требуется платёж       | `object`        |
| `403` | Доступ запрещён        | `ResponseError` |
| `422` | Неожидаемый результат  | `ResponseError` |
| `429` | Слишком много запросов | `object`        |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.get_v2_quarantine_goods(limit=..., offset=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.getV2QuarantineGoods(limit, offset);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.GetV2QuarantineGoods(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.getV2QuarantineGoods(limit, offset));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->getV2QuarantineGoods($limit));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.GetV2QuarantineGoods(limit).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.GetV2QuarantineGoods(limit));
```

:::
