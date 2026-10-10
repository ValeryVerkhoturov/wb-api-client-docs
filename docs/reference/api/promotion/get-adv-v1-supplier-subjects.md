---
title: "Предметы для кампаний"
description: "Метод возвращает список предметов, которые можно добавить в рекламную кампанию."
---

# Предметы для кампаний

```http
GET /adv/v1/supplier/subjects
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Создание кампаний · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/promotion/get-adv-v1-supplier-subjects) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion#tag/creatingCampaigns/operation/getV1SupplierSubjects)

Метод возвращает список [предметов](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2ObjectAll), которые можно добавить в рекламную [кампанию](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск    |
| ------------------ | ------ | --------- | -------- | ---------- |
| Персональный       | 12 сек | 1 запрос  | 12 сек   | 5 запросов |
| Сервисный          | 12 сек | 1 запрос  | 12 сек   | 5 запросов |
| Базовый с секретом | 12 сек | 1 запрос  | 12 сек   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса | 30 мин   | 1 запрос   |

## Параметры

| Имя            | Где   | Тип      | Обяз. | Описание                                          |
| -------------- | ----- | -------- | ----- | ------------------------------------------------- |
| `payment_type` | query | `string` | нет   | Тип оплаты: - `cpm` — за показы - `cpc` — за клик |

## Ответы

| Код   | Описание               | Схема                              |
| ----- | ---------------------- | ---------------------------------- |
| `200` | Успешно                | `GetV1SupplierSubjectsResponse200` |
| `401` | Не авторизован         | `object`                           |
| `403` | Доступ запрещён        | `object`                           |
| `404` | Не найдено             | —                                  |
| `429` | Слишком много запросов | `object`                           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.get_v1_supplier_subjects(payment_type=...)
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

const { data } = await api.getV1SupplierSubjects(paymentType);
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

result, _, err := client.PromotionAPI.GetV1SupplierSubjects(context.Background()).Execute()
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

System.out.println(api.getV1SupplierSubjects(paymentType));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->getV1SupplierSubjects());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.GetV1SupplierSubjects().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.GetV1SupplierSubjects());
```

:::
