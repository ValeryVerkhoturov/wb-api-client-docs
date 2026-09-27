---
title: "Расхождения в поставке"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Расхождения в поставке

```http
GET /api/supplies/v1/discrepancies/{supplyId}
```

**База:** `https://supplies-api.wildberries.ru` · **Модуль:** [`orders-fbw`](/reference/api/orders-fbw/) · **Раздел:** Информация о поставках · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает информацию о выявленных расхождениях между заявленным и фактическим количеством товара в поставке.

Для поставок принятых не позднее года назад.

\*\*Типы расхождений:\*\*

Расхождение в большую сторону:

1. Избыток товара с заявленным баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "surplus"`

2. Избыток товара с несоответствующим заявленному баркодом:

- `"discrepancyType": "surplus"`
- `"discrepancyLabel": "re-sorting"`
  Расхождение в меньшую сторону:

1. Не хватает товара:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "shortage"`

2. Некоторые баркоды не соответствуют заявленным:

- `"discrepancyType": "shortage"`
- `"discrepancyLabel": "re-sorting"`

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Параметры

| Имя        | Где  | Тип               | Обяз. | Описание    |
| ---------- | ---- | ----------------- | ----- | ----------- |
| `supplyId` | path | `string<integer>` | да    | ID поставки |

## Ответы

| Код   | Описание               | Схема                                                   |
| ----- | ---------------------- | ------------------------------------------------------- |
| `200` | Успешно                | `GetV1SuppliesSupplyIdDiscrepanciesQuantityResponse200` |
| `400` | Неправильный запрос    | `models.ErrorModel`                                     |
| `401` | Не авторизован         | `object`                                                |
| `403` | Доступ запрещён        | `models.SupplyAcceptedMoreThanYearAgo`                  |
| `404` | Не найдено             | `models.ErrorModel`                                     |
| `429` | Слишком много запросов | `object`                                                |

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

const { data } = await api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId);
console.log(data);
```

```go [Go]
cfg := wbordersfbw.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbw.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1SuppliesSupplyIdDiscrepanciesQuantity(context.Background(), supplyId).Execute()
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

System.out.println(api.getV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbw\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1SuppliesSupplyIdDiscrepanciesQuantity($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ИнформацияОПоставкахApi(Настройки);

Сообщить(Клиент.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbw.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1SuppliesSupplyIdDiscrepanciesQuantity(supplyId));
```

:::
