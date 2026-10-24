---
title: "DBW Orders"
description: "Module `orders-dbw` has 16 operations."
---

# DBW Orders · `orders-dbw`

Module `orders-dbw` has 16 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-dbw) · [All modules](/en/reference/api/)

Use DBW (Delivery WB) orders methods to:

- get [assembly orders](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwAssemblyOrders) information, manage statuses, and cancel assembly orders
- get, add, edit, and delete [label identifiers](https://dev.wildberries.ru/openapi/orders-dbw#tag/dbwLabelIdentifiers) for assembly orders

You can learn how to use methods in business cases in the [instructions](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-036a-7721-98e8-bed5f1a4f72d/dbw-orders) on working with **DBW orders**

## DBW Assembly Orders

| Method  | Path                                            | Operation                                                                                                              |
| ------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v3/dbw/orders/new`                        | [Get New Orders](/en/reference/api/orders-dbw/get-api-v3-dbw-orders-new)                                               |
| `GET`   | `/api/v3/dbw/orders`                            | [Get Information on Completed Orders](/en/reference/api/orders-dbw/get-api-v3-dbw-orders)                              |
| `POST`  | `/api/v3/dbw/orders/delivery-date`              | [Get Delivery Date and Time](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-delivery-date)                        |
| `POST`  | `/api/marketplace/v3/dbw/orders/client`         | [Buyer Information](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-client)                            |
| `POST`  | `/api/v3/dbw/orders/status`                     | [Get Orders Statuses](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-status)                                      |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/confirm`          | [Transfer to Assembly](/en/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-confirm)                           |
| `POST`  | `/api/v3/dbw/orders/stickers`                   | [Get Orders Stickers](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-stickers)                                    |
| `POST`  | `/api/marketplace/v3/dbw/orders/status/deliver` | [Transfer Assembly Orders to Delivery](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-status-deliver) |
| `POST`  | `/api/v3/dbw/orders/courier`                    | [Courier Info](/en/reference/api/orders-dbw/post-api-v3-dbw-orders-courier)                                            |
| `PATCH` | `/api/v3/dbw/orders/{orderId}/cancel`           | [Cancel the Order](/en/reference/api/orders-dbw/patch-api-v3-dbw-orders-orderid-cancel)                                |

## DBW Label Identifiers

| Method | Path                                          | Operation                                                                                                                        |
| ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/details` | [Get Order Label Identifiers](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-details)                      |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/delete`  | [Delete Assembly Orders Label Identifiers](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-delete)          |
| `POST` | `/api/marketplace/v3/dbw/orders/meta/sgtin`   | [Add Labeling Codes Chestny ZNAK to Assembly Orders](/en/reference/api/orders-dbw/post-api-marketplace-v3-dbw-orders-meta-sgtin) |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/uin`       | [Add UIN (Unique Identification Number) to the Order](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-uin)       |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/imei`      | [Add IMEI to the Order](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-imei)                                    |
| `PUT`  | `/api/v3/dbw/orders/{orderId}/meta/gtin`      | [Add GTIN to the Order](/en/reference/api/orders-dbw/put-api-v3-dbw-orders-orderid-meta-gtin)                                    |
