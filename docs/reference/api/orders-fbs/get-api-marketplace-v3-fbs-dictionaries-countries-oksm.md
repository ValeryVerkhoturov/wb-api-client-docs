---
title: "Получить список стран ОКСМ"
description: "Метод возвращает список стран ОКСМ — Общероссийского классификатора стран мира — с полными названиями и кодами."
---

# Получить список стран ОКСМ

```http
GET /api/marketplace/v3/fbs/dictionaries/countries/oksm
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm)

Метод возвращает список стран ОКСМ — Общероссийского классификатора стран мира — с полными названиями и кодами.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Ответы

| Код   | Описание               | Схема               |
| ----- | ---------------------- | ------------------- |
| `200` | Успешно                | `CountriesOKSMList` |
| `401` | Не авторизован         | `object`            |
| `403` | Доступ запрещён        | `object`            |
| `429` | Слишком много запросов | `object`            |

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

const { data } = await api.getV3FbsDictionariesCountriesOksm();
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.GetV3FbsDictionariesCountriesOksm(context.Background()).Execute()
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

System.out.println(api.getV3FbsDictionariesCountriesOksm());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FBSApi(new Client(), $config);

print_r($api->getV3FbsDictionariesCountriesOksm());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ПоставкиFBSApi(Настройки);

Сообщить(Клиент.GetV3FbsDictionariesCountriesOksm().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FBSApi(config);

Console.WriteLine(api.GetV3FbsDictionariesCountriesOksm());
```

:::
