---
title: "DBS"
description: "Module `dbs` has 21 operations."
---

# DBS · `dbs`

Module `dbs` has 21 operations.

[Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/dbs/) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs) · [All modules](/en/reference/api/)

Узнать больше о модели DBS можно в [справочном центре](https://seller.wildberries.ru/instructions/category/6572e024-7428-4db1-86a8-a4c7dbebbfcf?goBackOption=prevRoute&categoryId=5a8e1202-0865-45b7-acae-5d0afc7add56)

Управление [сборочными заданиями](https://dev.wildberries.ru/openapi/dbs#tag/dbsAssemblyOrders) и [идентификаторами маркировки](https://dev.wildberries.ru/openapi/dbs#tag/dbsLabelIdentifiers) DBS (Delivery by Seller).

Вы можете протестировать методы DBS в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs) для эмуляции действий пользователя

## Сборочные задания DBS

| Method | Path                                            | Operation                                                                                                                     |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v3/dbs/orders/new`                        | [Получить список новых сборочных заданий](/en/reference/api/dbs/get-api-v3-dbs-orders-new)                                    |
| `GET`  | `/api/v3/dbs/orders`                            | [Получить информацию о завершенных сборочных заданиях](/en/reference/api/dbs/get-api-v3-dbs-orders)                           |
| `POST` | `/api/marketplace/v3/dbs/orders/final-price`    | [Получить цены продавца и суммы к оплате](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-final-price)               |
| `POST` | `/api/v3/dbs/groups/info`                       | [Получить информацию о платной доставке](/en/reference/api/dbs/post-api-v3-dbs-groups-info)                                   |
| `POST` | `/api/v3/dbs/orders/client`                     | [Информация о покупателе](/en/reference/api/dbs/post-api-v3-dbs-orders-client)                                                |
| `POST` | `/api/marketplace/v3/dbs/orders/b2b/info`       | [Информация о покупателе B2B](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-b2b-info)                              |
| `POST` | `/api/v3/dbs/orders/delivery-date`              | [Получить дату и время доставки](/en/reference/api/dbs/post-api-v3-dbs-orders-delivery-date)                                  |
| `POST` | `/api/marketplace/v3/dbs/orders/status/info`    | [Получить статусы сборочных заданий](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-info)                    |
| `POST` | `/api/marketplace/v3/dbs/orders/status/cancel`  | [Отменить сборочные задания](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-cancel)                          |
| `POST` | `/api/marketplace/v3/dbs/orders/status/confirm` | [Перевести сборочные задания на сборку](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-confirm)              |
| `POST` | `/api/marketplace/v3/dbs/orders/stickers`       | [Получить стикеры для сборочных заданий с доставкой в ПВЗ](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-stickers) |
| `POST` | `/api/marketplace/v3/dbs/orders/status/deliver` | [Перевести сборочные задания в доставку](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-deliver)             |
| `POST` | `/api/marketplace/v3/dbs/orders/status/receive` | [Сообщить о получении заказов](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-receive)                       |
| `POST` | `/api/marketplace/v3/dbs/orders/status/reject`  | [Сообщить об отказе от заказов](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-reject)                       |

## Идентификаторы маркировки DBS

| Method | Path                                                      | Operation                                                                                                                               |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/details`             | [Получить идентификаторы маркировки сборочных заданий](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/delete`              | [Удалить идентификаторы маркировки сборочных заданий](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/sgtin`               | [Закрепить коды маркировки Честного знака за сборочными заданиями](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-sgtin) |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/uin`                 | [Закрепить УИН за сборочными заданиями](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-uin)                              |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/imei`                | [Закрепить IMEI за сборочными заданиями](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-imei)                            |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/gtin`                | [Закрепить GTIN за сборочными заданиями](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-gtin)                            |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/customs-declaration` | [Закрепить номера ДТ за сборочными заданиями](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-customs-declaration)        |
