---
title: "Упаковка поставки"
description: "Метод возвращает информацию об упаковке поставки."
---

# Упаковка поставки

```http
GET /api/v1/supplies/{ID}/package
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesIdPackage)

Метод возвращает информацию об упаковке поставки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Сервисный          | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый с секретом | 1 мин  | 30 запросов | 2 сек    | 10 запросов |
| Базовый            | 1 ч    | 2 запроса   | 30 мин   | 1 запрос    |

## Параметры

| Имя  | Где  | Тип       | Обяз. | Описание    |
| ---- | ---- | --------- | ----- | ----------- |
| `ID` | path | `integer` | да    | ID поставки |

## Ответы

| Код   | Описание               | Схема                               |
| ----- | ---------------------- | ----------------------------------- |
| `200` | Успешно                | `GetV1SuppliesIdPackageResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`                 |
| `401` | Не авторизован         | `object`                            |
| `402` | Требуется платёж       | `object`                            |
| `403` | Доступ запрещён        | `object`                            |
| `429` | Слишком много запросов | `object`                            |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbw";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1SuppliesIdPackage(iD);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1SuppliesIdPackage(context.Background(), iD).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbw.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbw.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbw.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1SuppliesIdPackage(ID));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1SuppliesIdPackage($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИнформацияОПоставкахApi(Настройки);

Сообщить(Клиент.GetV1SuppliesIdPackage(ID).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1SuppliesIdPackage(ID));
```

:::
