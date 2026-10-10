---
title: "DBS"
description: "Операций модуля `dbs` — 21."
---

# DBS · `dbs`

Операций модуля `dbs` — 21.

[Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/dbs/) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/dbs) · [Все модули](/reference/api/)

Узнать больше о модели DBS можно в [справочном центре](https://seller.wildberries.ru/instructions/category/6572e024-7428-4db1-86a8-a4c7dbebbfcf?goBackOption=prevRoute&categoryId=5a8e1202-0865-45b7-acae-5d0afc7add56)

Управление [сборочными заданиями](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) и [идентификаторами маркировки](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers) DBS (Delivery by Seller).

Вы можете протестировать методы DBS в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs) для эмуляции действий пользователя

## Сборочные задания DBS

| Метод  | Путь                                            | Операция                                                                                                                   |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v3/dbs/orders/new`                        | [Получить список новых сборочных заданий](/reference/api/dbs/get-api-v3-dbs-orders-new)                                    |
| `GET`  | `/api/v3/dbs/orders`                            | [Получить информацию о завершенных сборочных заданиях](/reference/api/dbs/get-api-v3-dbs-orders)                           |
| `POST` | `/api/marketplace/v3/dbs/orders/final-price`    | [Получить цены продавца и суммы к оплате](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-final-price)               |
| `POST` | `/api/v3/dbs/groups/info`                       | [Получить информацию о платной доставке](/reference/api/dbs/post-api-v3-dbs-groups-info)                                   |
| `POST` | `/api/v3/dbs/orders/client`                     | [Информация о покупателе](/reference/api/dbs/post-api-v3-dbs-orders-client)                                                |
| `POST` | `/api/marketplace/v3/dbs/orders/b2b/info`       | [Информация о покупателе B2B](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-b2b-info)                              |
| `POST` | `/api/v3/dbs/orders/delivery-date`              | [Получить дату и время доставки](/reference/api/dbs/post-api-v3-dbs-orders-delivery-date)                                  |
| `POST` | `/api/marketplace/v3/dbs/orders/status/info`    | [Получить статусы сборочных заданий](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-info)                    |
| `POST` | `/api/marketplace/v3/dbs/orders/status/cancel`  | [Отменить сборочные задания](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-cancel)                          |
| `POST` | `/api/marketplace/v3/dbs/orders/status/confirm` | [Перевести сборочные задания на сборку](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-confirm)              |
| `POST` | `/api/marketplace/v3/dbs/orders/stickers`       | [Получить стикеры для сборочных заданий с доставкой в ПВЗ](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-stickers) |
| `POST` | `/api/marketplace/v3/dbs/orders/status/deliver` | [Перевести сборочные задания в доставку](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-deliver)             |
| `POST` | `/api/marketplace/v3/dbs/orders/status/receive` | [Сообщить о получении заказов](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-receive)                       |
| `POST` | `/api/marketplace/v3/dbs/orders/status/reject`  | [Сообщить об отказе от заказов](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-reject)                       |

## Идентификаторы маркировки DBS

| Метод  | Путь                                                      | Операция                                                                                                                             |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/details`             | [Получить идентификаторы маркировки сборочных заданий](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/delete`              | [Удалить идентификаторы маркировки сборочных заданий](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/sgtin`               | [Закрепить коды маркировки Честного знака за сборочными заданиями](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-sgtin) |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/uin`                 | [Закрепить УИН за сборочными заданиями](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-uin)                              |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/imei`                | [Закрепить IMEI за сборочными заданиями](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-imei)                            |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/gtin`                | [Закрепить GTIN за сборочными заданиями](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-gtin)                            |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/customs-declaration` | [Закрепить номера ДТ за сборочными заданиями](/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-customs-declaration)        |
