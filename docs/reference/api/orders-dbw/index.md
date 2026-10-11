---
title: "Заказы DBW"
description: "Операций модуля `orders-dbw` — 16."
---

# Заказы DBW · `orders-dbw`

Операций модуля `orders-dbw` — 16.

[Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw) · [Все модули](/reference/api/)

С помощью методов Заказы DBW (Деливери WB) вы можете:

- получать информацию о [сборочных заданиях](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders), управлять статусами и отменять сборочные задания
- получать, добавлять, редактировать и удалять [метаданные](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers) сборочных заданий

Узнать, как использовать методы в бизнес-кейсах, можно в [инструкции](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-036a-7721-98e8-bed5f1a4f72d/zakazy-dbw) по работе с **заказами DBW**

## Сборочные задания DBW

| Метод   | Путь                                            | Операция                                                                                                              |
| ------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v3/dbw/orders/new`                        | [Получить список новых сборочных заданий](/reference/api/orders-dbw/get-api-v3-dbw-orders-new)                        |
| `GET`   | `/api/v3/dbw/orders`                            | [Получить информацию о завершенных сборочных заданиях](/reference/api/orders-dbw/get-api-v3-dbw-orders)               |
| `POST`  | `/api/v3/dbw/orders/delivery-date`              | [Получить дату и время доставки](/reference/api/orders-dbw/post-api-v3-dbw-orders-delivery-date)                      |
| `POST`  | `/api/marketplace/v3/dbw/orders/client`         | [Информация о покупателе](/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-client)                        |
| `POST`  | `/api/v3/dbw/orders/status`                     | [Получить статусы сборочных заданий](/reference/api/orders-dbw/post-api-v3-dbw-orders-status)                         |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/confirm`          | [Перевести на сборку](/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-confirm)                              |
| `POST`  | `/api/v3/dbw/orders/stickers`                   | [Получить стикеры сборочных заданий](/reference/api/orders-dbw/post-api-v3-dbw-orders-stickers)                       |
| `POST`  | `/api/marketplace/v3/dbw/orders/status/deliver` | [Перевести сборочные задания в доставку](/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-status-deliver) |
| `POST`  | `/api/v3/dbw/orders/courier`                    | [Информация о курьере](/reference/api/orders-dbw/post-api-v3-dbw-orders-courier)                                      |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/cancel`           | [Отменить сборочное задание](/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-cancel)                        |

## Идентификаторы маркировки DBW

| Метод  | Путь                                          | Операция                                                                                                                                    |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/details` | [Получить идентификаторы маркировки сборочных заданий](/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/delete`  | [Удалить идентификаторы маркировки сборочных заданий](/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/sgtin`   | [Закрепить коды маркировки Честного знака за сборочными заданиями](/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-sgtin) |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/uin`       | [Закрепить УИН за сборочным заданием](/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-uin)                                     |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/imei`      | [Закрепить IMEI за сборочным заданием](/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-imei)                                   |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/gtin`      | [Закрепить GTIN за сборочным заданием](/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-gtin)                                   |
