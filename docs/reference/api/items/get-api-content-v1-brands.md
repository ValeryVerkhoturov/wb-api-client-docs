---
title: "Бренды"
description: "Метод возвращает список брендов по ID предмета."
---

# Бренды

```http
GET /api/content/v1/brands
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Категории, предметы и характеристики · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV1Brands)

Метод возвращает список брендов по ID предмета.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит    | Интервал | Всплеск    |
| ------------------ | ------ | -------- | -------- | ---------- |
| Персональный       | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Сервисный          | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый с секретом | 1 сек  | 1 запрос | 1 сек    | 5 запросов |
| Базовый            | 1 ч    | 1 запрос | 1 ч      | 1 запрос   |

## Параметры

| Имя         | Где   | Тип       | Обяз. | Описание                                                                                         |
| ----------- | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------ |
| `subjectId` | query | `integer` | да    | ID предмета                                                                                      |
| `next`      | query | `integer` | нет   | Параметр пагинации. Используйте значение `next` из ответа, чтобы получить следующий пакет данных |

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `BrandsResponse`      |
| `400` | Неправильный запрос    | `BrandsResponseError` |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `object`              |
| `404` | Не найдено             | `BrandsResponseError` |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.get_v1_brands(subject_id=..., next=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1Brands(subjectId, next);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1Brands(context.Background()).SubjectId(subjectId).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1Brands(subjectId, next));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1Brands($subject_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый КатегорииПредметыИХарактеристикиApi(Настройки);

Сообщить(Клиент.GetV1Brands(subjectId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1Brands(subjectId));
```

:::
