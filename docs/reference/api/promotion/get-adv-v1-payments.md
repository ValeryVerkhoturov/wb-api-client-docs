---
title: "Получение истории пополнений счёта"
description: "Метод возвращает историю пополнений счёта \\\\WB Продвижение\\\\ за заданный период."
---

# Получение истории пополнений счёта

```http
GET /adv/v1/payments
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Финансы · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/promotion/get-adv-v1-payments) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/finances/operation/getV1Payments)

Метод возвращает историю пополнений счёта \*\*WB Продвижение\*\* за заданный период.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Сервисный          | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый с секретом | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Параметры

| Имя    | Где   | Тип      | Обяз. | Описание                                                        |
| ------ | ----- | -------- | ----- | --------------------------------------------------------------- |
| `from` | query | `string` | нет   | Начало интервала                                                |
| `to`   | query | `string` | нет   | Конец интервала. (Минимальный интервал 1 день, максимальный 31) |

## Ответы

| Код   | Описание                            | Схема                      |
| ----- | ----------------------------------- | -------------------------- |
| `200` | Успешно                             | `GetV1PaymentsResponse200` |
| `204` | История пополнений счета не найдена | —                          |
| `400` | Неправильный запрос                 | `string`                   |
| `401` | Не авторизован                      | `object`                   |
| `403` | Доступ запрещён                     | `object`                   |
| `429` | Слишком много запросов              | `object`                   |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_payments(var_from=..., to=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.getV1Payments(from, to);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbpromotion "github.com/ValeryVerkhoturov/wb-api-client-go/promotion"
)

cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.GetV1Payments(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.getV1Payments(from, to));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1Payments());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1Payments().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1Payments());
```

:::
