---
title: "Заявки покупателей на возврат"
description: "Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете отвечать на эти заявки."
---

# Заявки покупателей на возврат

```http
GET /api/v1/claims
```

**База:** `https://returns-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Возвраты покупателями · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/getV1Claims)

Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете [отвечать на эти заявки](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns/operation/patchV1Claim).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Сервисный          | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 20 запросов | 3 сек    | 10 запросов |
| Базовый            | 1 ч    | 1 запрос    | 1 ч      | 1 запрос    |

## Ответы

| Код   | Описание               | Схема    |
| ----- | ---------------------- | -------- |
| `200` | Успешно                | `object` |
| `400` | Неправильный запрос    | `object` |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `object` |
| `429` | Слишком много запросов | `object` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1Claims(isArchive, id, limit, offset, nmId);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1Claims(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1Claims(isArchive, id, limit, offset, nmId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1Claims($is_archive));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ВозвратыПокупателямиApi(Настройки);

Сообщить(Клиент.GetV1Claims(is_archive).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1Claims(isArchive));
```

:::
