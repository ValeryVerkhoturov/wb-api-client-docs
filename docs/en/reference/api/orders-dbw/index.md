---
title: "Заказы DBW"
description: "Module `orders-dbw` has 16 operations."
---

# Заказы DBW · `orders-dbw`

Module `orders-dbw` has 16 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw) · [All modules](/en/reference/api/)

С помощью методов Заказы DBW (Деливери WB) вы можете:

- получать информацию о [сборочных заданиях](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), управлять статусами и отменять сборочные задания
- получать, добавлять, редактировать и удалять [метаданные](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers) сборочных заданий

Узнать, как использовать методы в бизнес-кейсах, можно в [инструкции](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-036a-7721-98e8-bed5f1a4f72d/zakazy-dbw) по работе с **заказами DBW**

## Сборочные задания DBW

| Method  | Path                                            | Operation                                                                                                                |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `GET`   | `/api/v3/dbw/orders/new`                        | [Получить список новых сборочных заданий](/en/reference/api/orders-dbw/get-api-v3-dbw-orders-new)                        |
| `GET`   | `/api/v3/dbw/orders`                            | [Получить информацию о завершенных сборочных заданиях](/en/reference/api/orders-dbw/get-api-v3-dbw-orders)               |
| `POST`  | `/api/v3/dbw/orders/delivery-date`              | [Получить дату и время доставки](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-delivery-date)                      |
| `POST`  | `/api/marketplace/v3/dbw/orders/client`         | [Информация о покупателе](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-client)                        |
| `POST`  | `/api/v3/dbw/orders/status`                     | [Получить статусы сборочных заданий](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-status)                         |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/confirm`          | [Перевести на сборку](/en/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-confirm)                              |
| `POST`  | `/api/v3/dbw/orders/stickers`                   | [Получить стикеры сборочных заданий](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-stickers)                       |
| `POST`  | `/api/marketplace/v3/dbw/orders/status/deliver` | [Перевести сборочные задания в доставку](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-status-deliver) |
| `POST`  | `/api/v3/dbw/orders/courier`                    | [Информация о курьере](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-courier)                                      |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/cancel`           | [Отменить сборочное задание](/en/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-cancel)                        |

## Идентификаторы маркировки DBW

| Method | Path                                          | Operation                                                                                                                                      |
| ------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/details` | [Получить идентификаторы маркировки сборочных заданий](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/delete`  | [Удалить идентификаторы маркировки сборочных заданий](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/sgtin`   | [Закрепить коды маркировки Честного знака за сборочными заданиями](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-sgtin) |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/uin`       | [Закрепить УИН за сборочным заданием](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-uin)                                     |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/imei`      | [Закрепить IMEI за сборочным заданием](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-imei)                                   |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/gtin`      | [Закрепить GTIN за сборочным заданием](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-gtin)                                   |
