---
title: "Создать пропуск"
description: "Метод создаёт пропуск продавца с привязкой к складу WB. Пропуск действует 48 часов со времени создания."
---

# Создать пропуск

```http
POST /api/v3/passes
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Пропуска FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses/operation/postV3Passes)

Метод создаёт [пропуск продавца](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses/operation/getV3Passes) с привязкой к складу WB.
Пропуск действует 48 часов со времени создания.

Максимум 1 запрос в 10 [минут](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца.
Один запрос с кодами ответов `4XX` учитывается как 10 запросов.

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                     |
| ----- | ---------------------- | ------------------------- |
| `201` | Создано                | `PostV3PassesResponse201` |
| `400` | Неправильный запрос    | `Error`                   |
| `401` | Не авторизован         | `object`                  |
| `402` | Требуется платёж       | `object`                  |
| `403` | Доступ запрещён        | `Error`                   |
| `404` | Не найдено             | `Error`                   |
| `429` | Слишком много запросов | `object`                  |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FBSApi(cfg);

const { data } = await api.postV3Passes(postV3PassesRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PostV3Passes(context.Background()).PostV3PassesRequest(postV3PassesRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.FbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
FbsApi api = new FbsApi(client);

System.out.println(api.postV3Passes(postV3PassesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FBSApi(new Client(), $config);

print_r($api->postV3Passes($post_v3_passes_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ПропускаFBSApi(Настройки);

Сообщить(Клиент.PostV3Passes(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FBSApi(config);

Console.WriteLine(api.PostV3Passes(postV3PassesRequest));
```

:::
