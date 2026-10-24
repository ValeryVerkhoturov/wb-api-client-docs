---
title: "DBS"
description: "Module `dbs` has 21 operations."
---

# DBS · `dbs`

Module `dbs` has 21 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/dbs) · [All modules](/en/reference/api/)

DBS orders and label identifiers management.

You can test the DBS methods in the [sandbox](https://dev.wildberries.ru/en/sandbox). Also you can use [special methods](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/marketplaceDbs) in the sandbox for emulating user actions

## DBS Assembly Orders

| Method | Path                                            | Operation                                                                                                                           |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v3/dbs/orders/new`                        | [Get New Orders List](/en/reference/api/dbs/get-api-v3-dbs-orders-new)                                                              |
| `GET`  | `/api/v3/dbs/orders`                            | [Get Information on Completed Orders](/en/reference/api/dbs/get-api-v3-dbs-orders)                                                  |
| `POST` | `/api/marketplace/v3/dbs/orders/final-price`    | [Get Seller Prices and Amounts Charged to the Buyer](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-final-price)          |
| `POST` | `/api/v3/dbs/groups/info`                       | [Get Information on Paid Delivery](/en/reference/api/dbs/post-api-v3-dbs-groups-info)                                               |
| `POST` | `/api/v3/dbs/orders/client`                     | [Buyer Information](/en/reference/api/dbs/post-api-v3-dbs-orders-client)                                                            |
| `POST` | `/api/marketplace/v3/dbs/orders/b2b/info`       | [B2B Buyer Information](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-b2b-info)                                          |
| `POST` | `/api/v3/dbs/orders/delivery-date`              | [Get Delivery Date and Time](/en/reference/api/dbs/post-api-v3-dbs-orders-delivery-date)                                            |
| `POST` | `/api/marketplace/v3/dbs/orders/status/info`    | [Get Assembly Order Statuses](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-info)                                 |
| `POST` | `/api/marketplace/v3/dbs/orders/status/cancel`  | [Cancel Assembly Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-cancel)                                    |
| `POST` | `/api/marketplace/v3/dbs/orders/status/confirm` | [Transfer to Assembly](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-confirm)                                     |
| `POST` | `/api/marketplace/v3/dbs/orders/stickers`       | [Get Stickers for Assembly Orders with Delivery to Pickup Point](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-stickers) |
| `POST` | `/api/marketplace/v3/dbs/orders/status/deliver` | [Transfer to Delivery](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-deliver)                                     |
| `POST` | `/api/marketplace/v3/dbs/orders/status/receive` | [Notify that the Orders Are Received](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-receive)                      |
| `POST` | `/api/marketplace/v3/dbs/orders/status/reject`  | [Notify that the Orders Are Declined](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-status-reject)                       |

## DBS Label Identifiers

| Method | Path                                                      | Operation                                                                                                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/details`             | [Get Assembly Orders Label Identifiers](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-details)                 |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/delete`              | [Delete Assembly Orders Label Identifiers](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-delete)               |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/sgtin`               | [Add Labeling Codes Chestny ZNAK to Assembly Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-sgtin)      |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/uin`                 | [Add UIN (Unique Identification Number) to Assembly Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-uin) |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/imei`                | [Add IMEI to Assembly Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-imei)                              |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/gtin`                | [Add GTIN to Assembly Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-gtin)                              |
| `POST` | `/api/marketplace/v3/dbs/orders/meta/customs-declaration` | [Add Custom Declaration to the Orders](/en/reference/api/dbs/post-api-marketplace-v3-dbs-orders-meta-customs-declaration)      |
