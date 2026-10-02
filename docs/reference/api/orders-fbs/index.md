---
title: "Заказы FBS"
description: "Операций модуля `orders-fbs` — 46."
---

# Заказы FBS · `orders-fbs`

Операций модуля `orders-fbs` — 46.

[Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs) · [Все модули](/reference/api/)

С помощью методов раздела Заказы FBS (Fulfillment by Seller) вы можете:

- получать информацию о [сборочных заданиях](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders) и их статусах, отменять сборочные задания, получать стикеры
- добавлять, редактировать и удалять [идентификаторы маркировки](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers) сборочных заданий
- управлять [поставками](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies)
- создавать, редактировать и удалять [пропуска](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses) на склады WB
  Вы можете протестировать методы заказов FBS в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceFbs) для эмуляции действий пользователя

Узнать, как использовать методы в бизнес-кейсах, можно в [инструкции](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-0771-7571-aea9-11d5b597f34c/zakazy-fbs) по работе с **заказами FBS**

Узнать больше о заказах FBS можно в [справочном центре](https://seller.wildberries.ru/instructions/ru/ru/category/b3e60238-fd4c-49ce-8668-ff688725a12d)

## Пропуска FBS

| Метод    | Путь                      | Операция                                                                                                      |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v3/passes/offices`  | [Получить список складов, для которых требуется пропуск](/reference/api/orders-fbs/get-api-v3-passes-offices) |
| `GET`    | `/api/v3/passes`          | [Получить список пропусков](/reference/api/orders-fbs/get-api-v3-passes)                                      |
| `POST`   | `/api/v3/passes`          | [Создать пропуск](/reference/api/orders-fbs/post-api-v3-passes)                                               |
| `PUT`    | `/api/v3/passes/{passId}` | [Обновить пропуск](/reference/api/orders-fbs/put-api-v3-passes-passid)                                        |
| `DELETE` | `/api/v3/passes/{passId}` | [Удалить пропуск](/reference/api/orders-fbs/delete-api-v3-passes-passid)                                      |

## Сборочные задания FBS

| Метод   | Путь                                     | Операция                                                                                                                         |
| ------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v3/orders/new`                     | [Получить список новых сборочных заданий](/reference/api/orders-fbs/get-api-v3-orders-new)                                       |
| `GET`   | `/api/v3/orders`                         | [Получить информацию о сборочных заданиях](/reference/api/orders-fbs/get-api-v3-orders)                                          |
| `POST`  | `/api/v3/orders/status`                  | [Получить статусы сборочных заданий](/reference/api/orders-fbs/post-api-v3-orders-status)                                        |
| `GET`   | `/api/v3/supplies/orders/reshipment`     | [Получить все сборочные задания для повторной отгрузки](/reference/api/orders-fbs/get-api-v3-supplies-orders-reshipment)         |
| `PATCH` | `/api/v3/orders/{orderId}/cancel`        | [Отменить сборочное задание](/reference/api/orders-fbs/patch-api-v3-orders-orderid-cancel)                                       |
| `POST`  | `/api/v3/orders/stickers`                | [Получить стикеры сборочных заданий](/reference/api/orders-fbs/post-api-v3-orders-stickers)                                      |
| `POST`  | `/api/v3/orders/stickers/cross-border`   | [Получить стикеры сборочных заданий трансграничных поставок](/reference/api/orders-fbs/post-api-v3-orders-stickers-cross-border) |
| `POST`  | `/api/v3/orders/status/history`          | [История статусов для сборочных заданий трансграничных поставок](/reference/api/orders-fbs/post-api-v3-orders-status-history)    |
| `POST`  | `/api/v3/orders/client`                  | [Заказы с информацией по клиенту](/reference/api/orders-fbs/post-api-v3-orders-client)                                           |
| `GET`   | `/api/marketplace/v3/fbs/orders/archive` | [Получить список архивных сборочных заданий](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-orders-archive)                |

## Идентификаторы маркировки FBS

| Метод    | Путь                                                            | Операция                                                                                                                             |
| -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/api/marketplace/v3/orders/meta`                               | [Получить идентификаторы маркировки сборочных заданий](/reference/api/orders-fbs/post-api-marketplace-v3-orders-meta)                |
| `DELETE` | `/api/v3/orders/{orderId}/meta`                                 | [Удалить идентификаторы маркировки сборочного задания](/reference/api/orders-fbs/delete-api-v3-orders-orderid-meta)                  |
| `PUT`    | `/api/v3/orders/{orderId}/meta/sgtin`                           | [Закрепить код маркировки Честного знака за сборочным заданием](/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-sgtin)      |
| `PUT`    | `/api/v3/orders/{orderId}/meta/uin`                             | [Закрепить УИН за сборочным заданием](/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-uin)                                  |
| `PUT`    | `/api/v3/orders/{orderId}/meta/imei`                            | [Закрепить IMEI за сборочным заданием](/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-imei)                                |
| `PUT`    | `/api/v3/orders/{orderId}/meta/gtin`                            | [Закрепить GTIN за сборочным заданием](/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-gtin)                                |
| `PUT`    | `/api/v3/orders/{orderId}/meta/expiration`                      | [Закрепить за сборочным заданием срок годности товара](/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-expiration)          |
| `PUT`    | `/api/marketplace/v3/orders/{orderId}/meta/customs-declaration` | [Закрепить номер ДТ за сборочным заданием](/reference/api/orders-fbs/put-api-marketplace-v3-orders-orderid-meta-customs-declaration) |

## Поставки FBS

| Метод    | Путь                                                        | Операция                                                                                                                  |
| -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/v3/supplies`                                          | [Создать новую поставку](/reference/api/orders-fbs/post-api-v3-supplies)                                                  |
| `GET`    | `/api/v3/supplies`                                          | [Получить список поставок](/reference/api/orders-fbs/get-api-v3-supplies)                                                 |
| `PATCH`  | `/api/marketplace/v3/supplies/{supplyId}/orders`            | [Добавить сборочные задания к поставке](/reference/api/orders-fbs/patch-api-marketplace-v3-supplies-supplyid-orders)      |
| `GET`    | `/api/v3/supplies/{supplyId}`                               | [Получить информацию о поставке](/reference/api/orders-fbs/get-api-v3-supplies-supplyid)                                  |
| `DELETE` | `/api/v3/supplies/{supplyId}`                               | [Удалить поставку](/reference/api/orders-fbs/delete-api-v3-supplies-supplyid)                                             |
| `GET`    | `/api/marketplace/v3/supplies/{supplyId}/order-ids`         | [Получить ID сборочных заданий поставки](/reference/api/orders-fbs/get-api-marketplace-v3-supplies-supplyid-order-ids)    |
| `GET`    | `/api/marketplace/v3/fbs/shipping-points`                   | [Получить список пунктов отгрузки поставок](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-shipping-points)         |
| `PATCH`  | `/api/marketplace/v3/fbs/supplies/shipping-method`          | [Установить параметры отгрузки поставок](/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-supplies-shipping-method) |
| `PATCH`  | `/api/v3/supplies/{supplyId}/deliver`                       | [Передать поставку в доставку](/reference/api/orders-fbs/patch-api-v3-supplies-supplyid-deliver)                          |
| `GET`    | `/api/v3/supplies/{supplyId}/barcode`                       | [Получить QR-код поставки](/reference/api/orders-fbs/get-api-v3-supplies-supplyid-barcode)                                |
| `GET`    | `/api/v3/supplies/{supplyId}/trbx`                          | [Получить список грузомест поставки](/reference/api/orders-fbs/get-api-v3-supplies-supplyid-trbx)                         |
| `POST`   | `/api/v3/supplies/{supplyId}/trbx`                          | [Добавить грузоместа к поставке](/reference/api/orders-fbs/post-api-v3-supplies-supplyid-trbx)                            |
| `DELETE` | `/api/v3/supplies/{supplyId}/trbx`                          | [Удалить грузоместа из поставки](/reference/api/orders-fbs/delete-api-v3-supplies-supplyid-trbx)                          |
| `POST`   | `/api/v3/supplies/{supplyId}/trbx/stickers`                 | [Получить стикеры грузомест поставки](/reference/api/orders-fbs/post-api-v3-supplies-supplyid-trbx-stickers)              |
| `GET`    | `/api/marketplace/v3/fbs/dictionaries/countries/oksm`       | [Получить список стран ОКСМ](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-dictionaries-countries-oksm)            |
| `PUT`    | `/api/marketplace/v3/fbs/supplies/{supplyId}/spot`          | [Добавить данные СПОТ в поставку](/reference/api/orders-fbs/put-api-marketplace-v3-fbs-supplies-supplyid-spot)            |
| `POST`   | `/api/marketplace/v3/fbs/supplies/spot/list`                | [Получить данные СПОТ для списка поставок](/reference/api/orders-fbs/post-api-marketplace-v3-fbs-supplies-spot-list)      |
| `GET`    | `/api/marketplace/v3/fbs/supplies/{supplyId}/stickers/spot` | [Получить QR-код СПОТ](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-supplies-supplyid-stickers-spot)              |

## Настройки автовозврата

| Метод   | Путь                                                                    | Операция                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/marketplace/v3/fbs/settings/autoreturns`                          | [Получить настройки автовозврата продавца](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-settings-autoreturns)                                      |
| `PATCH` | `/api/marketplace/v3/fbs/settings/autoreturns`                          | [Обновить настройки автовозврата продавца](/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-settings-autoreturns)                                    |
| `POST`  | `/api/marketplace/v3/fbs/settings/autoreturns/items`                    | [Получить настройки автовозврата товаров](/reference/api/orders-fbs/post-api-marketplace-v3-fbs-settings-autoreturns-items)                                |
| `PATCH` | `/api/marketplace/v3/fbs/settings/autoreturns/items`                    | [Обновить настройки автовозврата товаров](/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-settings-autoreturns-items)                               |
| `GET`   | `/api/marketplace/v3/fbs/settings/autoreturns/subcategories/restricted` | [Получить предметы, которые не хранятся на складах WB](/reference/api/orders-fbs/get-api-marketplace-v3-fbs-settings-autoreturns-subcategories-restricted) |
