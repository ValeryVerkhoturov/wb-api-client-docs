---
title: "Получить рейтинг продавца"
description: "Для доступа к методу используйте токен для категории Вопросы и отзывы"
---

# Получить рейтинг продавца

```http
GET /api/common/v1/rating
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`general`](/reference/api/general/) · **Раздел:** Информация о продавце · [Документация WB ↗](https://dev.wildberries.ru/openapi/api-information#tag/sellerInformation/operation/getV1Rating)

Для доступа к методу используйте [токен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kak-sozdat-personalnyj-bazovyj-ili-testovyj-token) для категории **Вопросы и отзывы**

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Сервисному** токену

Метод возвращает пользовательский рейтинг продавца и количество отзывов.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `SupplierRatingModel` |
| `401` | Не авторизован         | `object`              |
| `402` | Требуется платёж       | `object`              |
| `403` | Доступ запрещён        | `Response4XX`         |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.get_v1_rating()
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1Rating();
console.log(data);
```

```go [Go]
cfg := wbgeneral.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbgeneral.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1Rating(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1Rating());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1Rating());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИнформацияОПродавцеApi(Настройки);

Сообщить(Клиент.GetV1Rating().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1Rating());
```

:::
