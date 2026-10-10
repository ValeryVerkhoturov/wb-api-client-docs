---
title: "Проверить, что заказ принадлежит покупателю"
description: "Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду."
---

# Проверить, что заказ принадлежит покупателю

```http
POST /api/v3/click-collect/orders/client/identity
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`in-store-pickup`](/reference/api/in-store-pickup/) · **Раздел:** Сборочные задания Самовывоз · [Документация WB ↗](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersClientIdentity)

Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду.

Доступно, если хотя бы одно сборочное задание из заказа находится в статусе prepare - готов к выдаче.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период                                                          | Лимит       | Интервал | Всплеск     |
| --------------------------------------------------------------- | ----------- | -------- | ----------- |
| 1 мин                                                           | 30 запросов | 2 сек    | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Тело запроса

`application/json` — схема `api.CheckIdentityRequest`, обязательно

## Ответы

| Код   | Описание                        | Схема                 |
| ----- | ------------------------------- | --------------------- |
| `200` | Успешно                         | `api.CheckedIdentity` |
| `400` | Неправильный запрос             | `Error`               |
| `401` | Не авторизован                  | `object`              |
| `402` | Требуется платёж                | `object`              |
| `403` | Доступ запрещён                 | `Error`               |
| `404` | Не найдено                      | `api.Error`           |
| `409` | Введён неверный проверочный код | `api.Error`           |
| `429` | Слишком много запросов          | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.in_store_pickup import Configuration, ApiClient
from wb_api_client.in_store_pickup.api import InStorePickupApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = InStorePickupApi(ApiClient(cfg))

result = api.post_v3_click_collect_orders_client_identity(api_check_identity_request=...)
print(result)
```

```go [Go]
cfg := wbinstorepickup.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbinstorepickup.NewAPIClient(cfg)

result, _, err := client.InStorePickupAPI.PostV3ClickCollectOrdersClientIdentity(context.Background()).ApiCheckIdentityRequest(apiCheckIdentityRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.in_store_pickup.ApiClient;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.SecretString;
import io.github.valeryverkhoturov.wbapi.in_store_pickup.api.InStorePickupApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
InStorePickupApi api = new InStorePickupApi(client);

System.out.println(api.postV3ClickCollectOrdersClientIdentity(apiCheckIdentityRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\InStorePickup\Configuration;
use ValeryVerkhoturov\WbApiClient\InStorePickup\SecretString;
use ValeryVerkhoturov\WbApiClient\InStorePickup\Api\InStorePickupApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new InStorePickupApi(new Client(), $config);

print_r($api->postV3ClickCollectOrdersClientIdentity($api_check_identity_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый InStorePickupApi(Настройки);

Сообщить(Клиент.PostV3ClickCollectOrdersClientIdentity(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.InStorePickup.Api;
using ValeryVerkhoturov.WbApiClient.InStorePickup.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new InStorePickupApi(config);

Console.WriteLine(api.PostV3ClickCollectOrdersClientIdentity(apiCheckIdentityRequest));
```

:::
