---
title: "Детализации к отчётам реализации по ID отчётов"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Детализации к отчётам реализации по ID отчётов

```http
POST /api/finance/v1/sales-reports/detailed/{reportId}
```

**База:** `https://finance-api.wildberries.ru` · **Модуль:** [`finances`](/reference/api/finances/) · **Раздел:** Финансовые отчёты · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements) по ID отчётов.

Данные доступны с 29 января 2024 года.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один профиль продавца:

| Период | Лимит    | Интервал | Всплеск  |
| ------ | -------- | -------- | -------- |
| 1 мин  | 1 запрос | 1 мин    | 1 запрос |

## Параметры

| Имя        | Где  | Тип              | Обяз. | Описание                                                                                                                                                                               |
| ---------- | ---- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reportId` | path | `integer<int64>` | да    | ID отчёта. Для ежедневных отчётов вместо стандартной десериализации рекомендуем использовать нестандартные библиотеки с поддержкой [BigInt](https://www.npmjs.com/package/json-bigint) |

## Тело запроса

`application/json` — схема `FinancialReportsDetailedReportIdReq`, обязательно

- `limit` `integer<int64>` — Количество строк в ответе
- `rrdId` `integer<int64>` — ID строки ответа. Необходим для получения отчёта частями. Начинайте загрузку отчёта с `"rrdid":0`. В последующих запросах передавайте значение `rrdId` из последней строки предыдущего ответа. Повторяйте запрос, пока не получите ответ `204`
- `fields` `string[]` — Список полей, которые вернутся в ответе. Если параметр не указан, возвращаются все поля

## Ответы

| Код   | Описание               | Схема                                           |
| ----- | ---------------------- | ----------------------------------------------- |
| `200` | Успешно                | `PostV1SalesReportsDetailedReportIdResponse200` |
| `204` | Нет данных             | —                                               |
| `400` | Неправильный запрос    | `object`                                        |
| `401` | Не авторизован         | `object`                                        |
| `402` | Требуется платёж       | `object`                                        |
| `403` | Доступ запрещён        | `Response4XX`                                   |
| `404` | Не найдено             | `object`                                        |
| `429` | Слишком много запросов | `object`                                        |

**Структура `200` — `SalesReportsDetailedRes[]`:**

- `reportId` `integer<int64>` — ID отчёта
- `dateFrom` `string` — Дата начала отчётного периода
- `dateTo` `string` — Дата конца отчётного периода
- `createDate` `string` — Дата формирования отчёта
- `currency` `string` — Валюта отчёта
- `reportType` `integer<int64>` = `1` | `2` — Тип отчёта: - `1` — основной - `2` — по выкупам
- `rrdId` `integer<int64>` — ID строки
- `giId` `integer<int64>` — ID поставки
- `dlvPrc` `number` — Фиксированный коэффициент склада по поставке
- `fixTariffDateFrom` `string` — Дата начала действия фиксации
- `fixTariffDateTo` `string` — Дата конца действия фиксации
- `subjectName` `string` — Предмет
- `nmId` `integer<int64>` — Артикул WB
- `brandName` `string` — Бренд
- `vendorCode` `string` — Артикул продавца
- `title` `string` — Название товара
- `techSize` `string` — Размер
- `sku` `string` — Баркод
- `docTypeName` `string` — Тип документа
- `quantity` `integer<int64>` — Количество
- `retailPrice` `string` — Цена розничная
- `retailAmount` `string` — Wildberries реализовал Товар (Пр)
- `salePercent` `integer<int64>` — Согласованный продуктовый дисконт, %
- `commissionPercent` `number` — Размер кВВ, %
- `officeName` `string` — Склад
- `sellerOperName` `string` — Обоснование для оплаты
- `orderDt` `string` — Дата и время заказа
- `saleDt` `string` — Дата и время продажи
- `rrDate` `string` — Дата операции
- `shkId` `integer<int64>` — Штрихкод
- `retailPriceWithDisc` `string` — Цена розничная с учётом согласованной скидки
- `deliveryAmount` `integer<int64>` — Количество доставок
- `returnAmount` `integer<int64>` — Количество возврата
- `deliveryService` `string` — Услуги по доставке товара покупателю
- `giBoxTypeName` `string` — Тип коробов
- `productDiscountForReport` `number` — Итоговая согласованная скидка, %
- `sellerPromo` `number` — Промокод, %
- `spp` `number` — Платформенные скидки, %
- `kvwBase` `number` — Размер кВВ без НДС, % базовый
- `kvw` `number` — Итоговый кВВ без НДС, %
- `supRatingUp` `number` — Размер снижения кВВ из-за рейтинга, %
- `isKgvpV2` `number` — Размер снижения кВВ из-за акции, %
- `ppvzSalesCommission` `string` — Вознаграждение с продаж до вычета услуг поверенного, без НДС
- `forPay` `string` — К перечислению продавцу за реализованный товар
- `ppvzReward` `string` — Возмещение за выдачу и возврат товаров на ПВЗ
- `acquiringFee` `string` — Компенсация платёжных услуг/комиссия за интеграцию платёжных сервисов
- `acquiringPercent` `number` — Размер компенсации платёжных услуг/комиссии за интеграцию платёжных сервисов
- `paymentProcessing` `string` — Тип платежа: компенсация платёжных услуг/комиссия за интеграцию платёжных сервисов
- `acquiringBank` `string` — Наименование банка-эквайера
- `vw` `string` — Вознаграждение Wildberries (ВВ), без НДС
- `vwNds` `string` — НДС с вознаграждения Wildberries
- `ppvzOfficeName` `string` — Наименование офиса доставки
- `ppvzOfficeId` `integer<int64>` — ID офиса доставки
- `ppvzSupplierName` `string` — Партнёр
- `ppvzSupplierInn` `string` — ИНН партнёра
- `declarationNumber` `string` — Номер таможенной декларации
- `bonusTypeName` `string` — Виды доставок, штрафов и корректировок ВВ
- `stickerId` `string` — Стикер МП
- `country` `string` — Страна продажи
- `srvDbs` `boolean` — Признак услуги платной доставки
- `penalty` `string` — Общая сумма штрафов
- `additionalPayment` `string` — Корректировка Вознаграждения Wildberries (ВВ)
- `rebillLogisticCost` `string` — Возмещение издержек по перемещению и операционной обработке товара
- `rebillLogisticOrg` `string` — Организатор перевозки
- `paidStorage` `string` — Хранение
- `deduction` `string` — Удержания
- `paidAcceptance` `string` — Операции на приёмке
- `orderId` `integer<int64>` — ID сборочного задания
- `kiz` `string` — Код маркировки [Честного знака](https://честныйзнак.рф)
- `isB2b` `boolean` — Признак B2B-продажи
- `trbxId` `string` — ID короба для обработки товара
- `installmentCofinancingAmount` `string` — Скидка по программе софинансирования
- `wibesDiscountPercent` `number` — Скидка Wibes, %
- `cashbackAmount` `string` — Сумма баллов, удержанных по программе лояльности
- `cashbackDiscount` `string` — Компенсация скидки по программе лояльности
- `cashbackCommissionChange` `string` — Стоимость участия в программе лояльности
- `paymentSchedule` `string` — Разовое изменение срока перечисления денежных средств
- `deliveryMethod` `string` — Способ продажи и тип товара
- `sellerPromoId` `integer<int64>` — ID собственной акции продавца с дополнительной скидкой
- `sellerPromoDiscount` `number` — Размер дополнительной скидки по собственной акции продавца, %
- `loyaltyId` `integer<int64>` — ID скидки лояльности от продавца
- `loyaltyDiscount` `number` — Размер скидки лояльности от продавца, %
- `uuidPromocode` `string` — ID промокода
- `salePricePromocodeDiscountPrc` `number` — Скидка за промокод, %
- `articleSubstitution` `string` — ID подменного артикула
- `salePriceAffiliatedDiscountPrc` `number` — Скидка по подменному артикулу, %
- `agencyVat` `number` — Удержание Агентского НДС, %. Только для продавцов из Кыргызстана
- `salePriceWholesaleDiscountPrc` `number` — Оптовая скидка для бизнеса, %
- `b2bCustomerTin` `string` — ИНН B2B-покупателя
- `paidWithSocialCertificate` `boolean` — Оплата социальным сертификатом
- `warehouseLogisticsCoeff` `number` — Коэффициент доставки
- `buyerTaxRegistrationReasonCode` `string` — КПП B2B-покупателя
- `utdUcdNumber` `string` — Номер УПД или УКД
- `utdUcdDate` `string` — Дата УПД или УКД
- `orderUid` `string` — ID корзины заказа — транзакции. Заказы в одной корзине покупателя будут иметь одинаковый `orderUid`
- `srid` `string` — ID заказа. В ответах методов сборочных заданий [FBS](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders), [DBW](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), [DBS](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) и [Самовывоз](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) `srid` равен `rid`

**Структура `400`:**

- `status` `integer<int64>` (обязательно) — HTTP статус-код
- `title` `string` (обязательно) — Заголовок ошибки
- `detail` `string` (обязательно) — Детали ошибки
- `requestId` `string` (обязательно) — ID запроса
- `origin` `string` (обязательно) — ID внутреннего сервиса WB

**Структура `401`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `402`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки. Ошибка возвращается только сервисам из [Каталога решений для бизнеса](https://dev.wildberries.ru/business-solutions)

**Структура `403`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

**Структура `404`:**

- `status` `integer<int64>` (обязательно) — HTTP статус-код
- `title` `string` (обязательно) — Заголовок ошибки
- `detail` `string` (обязательно) — Детали ошибки
- `requestId` `string` (обязательно) — ID запроса
- `origin` `string` (обязательно) — ID внутреннего сервиса WB

**Структура `429`:**

- `title` `string` — Заголовок ошибки
- `detail` `string` — Детали ошибки
- `code` `string` — Внутренний код ошибки
- `requestId` `string` — Уникальный ID запроса
- `origin` `string` — ID внутреннего сервиса WB
- `status` `number` — HTTP статус-код
- `statusText` `string` — Расшифровка HTTP статус-кода
- `timestamp` `string` — Дата и время запроса

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.finances import Configuration, ApiClient
from wb_api_client.finances.api import FinancesApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = FinancesApi(ApiClient(cfg))

result = api.post_v1_sales_reports_detailed_report_id(report_id=..., financial_reports_detailed_report_id_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  FinancesApi,
} from "@valeryverkhoturov/wb-api-client/finances";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new FinancesApi(cfg);

const { data } = await api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbfinances "github.com/ValeryVerkhoturov/wb-api-client-go/finances"
)

cfg := wbfinances.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbfinances.NewAPIClient(cfg)

result, _, err := client.FinancesAPI.PostV1SalesReportsDetailedReportId(context.Background(), reportId).FinancialReportsDetailedReportIdReq(financialReportsDetailedReportIdReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.finances.ApiClient;
import io.github.valeryverkhoturov.wbapi.finances.SecretString;
import io.github.valeryverkhoturov.wbapi.finances.api.FinancesApi;

ApiClient client = new ApiClient();
client.setAccessToken(new SecretString("<ваш JWT WB>"));
FinancesApi api = new FinancesApi(client);

System.out.println(api.postV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Finances\Configuration;
use ValeryVerkhoturov\WbApiClient\Finances\SecretString;
use ValeryVerkhoturov\WbApiClient\Finances\Api\FinancesApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new FinancesApi(new Client(), $config);

print_r($api->postV1SalesReportsDetailedReportId($report_id, $financial_reports_detailed_report_id_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый FinancesApi(Настройки);

Сообщить(Клиент.PostV1SalesReportsDetailedReportId(reportId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Finances.Api;
using ValeryVerkhoturov.WbApiClient.Finances.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new FinancesApi(config);

Console.WriteLine(api.PostV1SalesReportsDetailedReportId(reportId, financialReportsDetailedReportIdReq));
```

```rust [Rust]
use wb_api_client::finances::apis::{configuration::Configuration, finances_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");

    let result = finances_api::post_v1_sales_reports_detailed_report_id(&cfg, report_id, financial_reports_detailed_report_id_req).await;
    println!("{:#?}", result);
}
```

:::
