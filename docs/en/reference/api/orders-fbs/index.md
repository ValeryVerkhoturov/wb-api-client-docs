---
title: "FBS Orders"
description: "Module `orders-fbs` has 48 operations."
---

# FBS Orders · `orders-fbs`

Module `orders-fbs` has 48 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs) · [All modules](/en/reference/api/)

Use the FBS Orders (Fulfillment by Seller) methods to:

- get information about [assembly orders](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsAssemblyOrders) and their statuses, cancel assembly orders, and get stickers
- get, add, edit, and delete [label identifiers](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsLabelIdentifiers) for assembly orders
- manage [supplies](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies)
- create, edit, and delete [passes](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses) to WB warehouses
  You can test the FBS order methods in the [sandbox](https://dev.wildberries.ru/en/sandbox). Also you can use [special methods](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/marketplaceFbs) in the sandbox for emulating user actions

You can learn how to use methods in business cases in the [instructions](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-0771-7571-aea9-11d5b597f34c/fbs-orders) on working with **FBS orders**

## FBS Passes

| Method   | Path                      | Operation                                                                      |
| -------- | ------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/v3/passes/offices`  | [Get Offices for Pass](/en/reference/api/orders-fbs/get-api-v3-passes-offices) |
| `GET`    | `/api/v3/passes`          | [Get Passes](/en/reference/api/orders-fbs/get-api-v3-passes)                   |
| `POST`   | `/api/v3/passes`          | [Create Pass](/en/reference/api/orders-fbs/post-api-v3-passes)                 |
| `PUT`    | `/api/v3/passes/{passId}` | [Update Pass](/en/reference/api/orders-fbs/put-api-v3-passes-passid)           |
| `DELETE` | `/api/v3/passes/{passId}` | [Delete the Pass](/en/reference/api/orders-fbs/delete-api-v3-passes-passid)    |

## FBS Assembly Orders

| Method  | Path                                     | Operation                                                                                                              |
| ------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v3/orders/new`                     | [Get New Assembly Orders](/en/reference/api/orders-fbs/get-api-v3-orders-new)                                          |
| `GET`   | `/api/v3/orders`                         | [Get Assembly Orders](/en/reference/api/orders-fbs/get-api-v3-orders)                                                  |
| `POST`  | `/api/v3/orders/status`                  | [Get Assembly Orders Statuses](/en/reference/api/orders-fbs/post-api-v3-orders-status)                                 |
| `GET`   | `/api/v3/supplies/orders/reshipment`     | [Get All Assembly Orders for Re-shipment](/en/reference/api/orders-fbs/get-api-v3-supplies-orders-reshipment)          |
| `PATCH` | `/api/v3/orders/{orderId}/cancel`        | [Cancel the Assembly Order](/en/reference/api/orders-fbs/patch-api-v3-orders-orderid-cancel)                           |
| `POST`  | `/api/v3/orders/stickers`                | [Get Assembly Orders Stickers](/en/reference/api/orders-fbs/post-api-v3-orders-stickers)                               |
| `POST`  | `/api/v3/orders/stickers/cross-border`   | [Get Stickers for Cross-Border Assembly Orders](/en/reference/api/orders-fbs/post-api-v3-orders-stickers-cross-border) |
| `POST`  | `/api/v3/orders/status/history`          | [Status History for Cross-Border Orders](/en/reference/api/orders-fbs/post-api-v3-orders-status-history)               |
| `POST`  | `/api/v3/orders/client`                  | [Orders with Client Information](/en/reference/api/orders-fbs/post-api-v3-orders-client)                               |
| `GET`   | `/api/marketplace/v3/fbs/orders/archive` | [Get the List of Archived Assembly Orders](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-orders-archive)     |

## FBS Label Identifiers

| Method   | Path                                                            | Operation                                                                                                                                 |
| -------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/marketplace/v3/orders/meta`                               | [Get Assembly Orders Label Identifiers](/en/reference/api/orders-fbs/post-api-marketplace-v3-orders-meta)                                 |
| `DELETE` | `/api/v3/orders/{orderId}/meta`                                 | [Delete Assembly Order Label Identifiers](/en/reference/api/orders-fbs/delete-api-v3-orders-orderid-meta)                                 |
| `PUT`    | `/api/v3/orders/{orderId}/meta/sgtin`                           | [Add Labeling Code Chestny ZNAK to the Assembly Order](/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-sgtin)                 |
| `PUT`    | `/api/v3/orders/{orderId}/meta/uin`                             | [Add UIN (Unique Identification Number) to the Assembly Order](/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-uin)           |
| `PUT`    | `/api/v3/orders/{orderId}/meta/imei`                            | [Add IMEI to the Assembly Order](/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-imei)                                        |
| `PUT`    | `/api/v3/orders/{orderId}/meta/gtin`                            | [Add GTIN to the Assembly Order](/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-gtin)                                        |
| `PUT`    | `/api/v3/orders/{orderId}/meta/expiration`                      | [Add Expiration Date to the Assembly Order](/en/reference/api/orders-fbs/put-api-v3-orders-orderid-meta-expiration)                       |
| `PUT`    | `/api/marketplace/v3/orders/{orderId}/meta/customs-declaration` | [Add Custom Declaration number to the Order](/en/reference/api/orders-fbs/put-api-marketplace-v3-orders-orderid-meta-customs-declaration) |

## FBS Supplies

| Method   | Path                                                          | Operation                                                                                                                              |
| -------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/v3/supplies`                                            | [Create a New Supply](/en/reference/api/orders-fbs/post-api-v3-supplies)                                                               |
| `GET`    | `/api/v3/supplies`                                            | [Get a Supplies List](/en/reference/api/orders-fbs/get-api-v3-supplies)                                                                |
| `PATCH`  | `/api/marketplace/v3/supplies/{supplyId}/orders`              | [Add Assembly Orders to the Supply](/en/reference/api/orders-fbs/patch-api-marketplace-v3-supplies-supplyid-orders)                    |
| `PATCH`  | `/api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer` | [Transfer Orders From Supply To Assembly](/en/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-supplies-supplyid-orders-transfer) |
| `GET`    | `/api/v3/supplies/{supplyId}`                                 | [Get Supply Details](/en/reference/api/orders-fbs/get-api-v3-supplies-supplyid)                                                        |
| `DELETE` | `/api/v3/supplies/{supplyId}`                                 | [Delete the Supply](/en/reference/api/orders-fbs/delete-api-v3-supplies-supplyid)                                                      |
| `GET`    | `/api/marketplace/v3/supplies/{supplyId}/order-ids`           | [Get Supply Assembly Order IDs](/en/reference/api/orders-fbs/get-api-marketplace-v3-supplies-supplyid-order-ids)                       |
| `GET`    | `/api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points` | [Get Supply Shipping Points](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-supplies-supplyid-shipping-points)                |
| `GET`    | `/api/marketplace/v3/fbs/shipping-points`                     | [Get Supply Shipping Points](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-shipping-points)                                  |
| `PATCH`  | `/api/marketplace/v3/fbs/supplies/shipping-method`            | [Set Supply Shipping Method](/en/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-supplies-shipping-method)                       |
| `PATCH`  | `/api/v3/supplies/{supplyId}/deliver`                         | [Move the Supply to the Delivery](/en/reference/api/orders-fbs/patch-api-v3-supplies-supplyid-deliver)                                 |
| `GET`    | `/api/v3/supplies/{supplyId}/barcode`                         | [Get the Supply QR Code](/en/reference/api/orders-fbs/get-api-v3-supplies-supplyid-barcode)                                            |
| `GET`    | `/api/v3/supplies/{supplyId}/trbx`                            | [Get Supply Shipping Units List](/en/reference/api/orders-fbs/get-api-v3-supplies-supplyid-trbx)                                       |
| `POST`   | `/api/v3/supplies/{supplyId}/trbx`                            | [Add Shipping Units to the Supply](/en/reference/api/orders-fbs/post-api-v3-supplies-supplyid-trbx)                                    |
| `DELETE` | `/api/v3/supplies/{supplyId}/trbx`                            | [Delete Shipping Units from the Supply](/en/reference/api/orders-fbs/delete-api-v3-supplies-supplyid-trbx)                             |
| `POST`   | `/api/v3/supplies/{supplyId}/trbx/stickers`                   | [Get the Supply Shipping Unit QR Code Stickers](/en/reference/api/orders-fbs/post-api-v3-supplies-supplyid-trbx-stickers)              |
| `GET`    | `/api/marketplace/v3/fbs/dictionaries/countries/oksm`         | [Get the OKSM Country List](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-dictionaries-countries-oksm)                       |
| `PUT`    | `/api/marketplace/v3/fbs/supplies/{supplyId}/spot`            | [Add SPOT Data to Supply](/en/reference/api/orders-fbs/put-api-marketplace-v3-fbs-supplies-supplyid-spot)                              |
| `POST`   | `/api/marketplace/v3/fbs/supplies/spot/list`                  | [Get SPOT Data for Supply List](/en/reference/api/orders-fbs/post-api-marketplace-v3-fbs-supplies-spot-list)                           |
| `GET`    | `/api/marketplace/v3/fbs/supplies/{supplyId}/stickers/spot`   | [Get the Supply SPOT QR Code](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-supplies-supplyid-stickers-spot)                 |

## Auto-return Settings

| Method  | Path                                                                    | Operation                                                                                                                                                          |
| ------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`   | `/api/marketplace/v3/fbs/settings/autoreturns`                          | [Get Auto-Return Seller Settings](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-settings-autoreturns)                                                    |
| `PATCH` | `/api/marketplace/v3/fbs/settings/autoreturns`                          | [Update Seller Auto-Return Settings](/en/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-settings-autoreturns)                                               |
| `POST`  | `/api/marketplace/v3/fbs/settings/autoreturns/items`                    | [Get Item Auto-Return Settings](/en/reference/api/orders-fbs/post-api-marketplace-v3-fbs-settings-autoreturns-items)                                               |
| `PATCH` | `/api/marketplace/v3/fbs/settings/autoreturns/items`                    | [Update Item Auto-Return Settings](/en/reference/api/orders-fbs/patch-api-marketplace-v3-fbs-settings-autoreturns-items)                                           |
| `GET`   | `/api/marketplace/v3/fbs/settings/autoreturns/subcategories/restricted` | [Get Subcategories That Can't Be Returned to the Warehouse](/en/reference/api/orders-fbs/get-api-marketplace-v3-fbs-settings-autoreturns-subcategories-restricted) |
