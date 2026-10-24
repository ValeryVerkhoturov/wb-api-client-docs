---
title: "In-Store Pickup"
description: "Module `in-store-pickup` has 18 operations."
---

# In-Store Pickup · `in-store-pickup`

Module `in-store-pickup` has 18 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup) · [All modules](/en/reference/api/)

Management of [assembly orders](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) and [order label identifiers](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers) for the In-Store Pickup scheme.

You can test the In-Store Pickup methods in the [sandbox](https://dev.wildberries.ru/en/sandbox). Also you can use [special methods](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/marketplaceInStorePickup) in the sandbox for emulating user actions

## In-Store Pickup Assembly Orders

| Method | Path                                                      | Operation                                                                                                                                             |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v3/click-collect/orders/new`                        | [Get New Assembly Orders List](/en/reference/api/in-store-pickup/get-api-v3-click-collect-orders-new)                                                 |
| `GET`  | `/api/v3/click-collect/orders`                            | [Get Information on Completed Orders](/en/reference/api/in-store-pickup/get-api-v3-click-collect-orders)                                              |
| `POST` | `/api/marketplace/v3/click-collect/orders/final-price`    | [Get seller prices and amounts charged to the buyer](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-final-price)      |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/confirm` | [Transfer to Assembly](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-confirm)                                 |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/prepare` | [Notify That the Assembly Orders Are Ready for Pickup](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-prepare) |
| `POST` | `/api/v3/click-collect/orders/client`                     | [Buyer Information](/en/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client)                                                        |
| `POST` | `/api/v3/click-collect/orders/client/identity`            | [Check If the Order Belongs to the Buyer](/en/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client-identity)                         |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/receive` | [Notify That the Orders Were Received by the Buyers](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-receive)   |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/reject`  | [Notify that the Orders Are Declined](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-reject)                   |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/info`    | [Get Assembly Order Statuses](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-info)                             |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/cancel`  | [Cancel the Assembly Orders](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-cancel)                            |

## In-Store Pickup Label Identifiers

| Method | Path                                                                | Operation                                                                                                                                                          |
| ------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/details`             | [Get Assembly Orders Label Identifiers](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-details)                               |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/delete`              | [Delete Assembly Order Label Identifiers](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-delete)                              |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/sgtin`               | [Add Labeling codes Chestny ZNAK to the Assembly Orders (Chestny ZNAK)](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-sgtin) |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/uin`                 | [Add UIN (Unique Identification Numbers) to the Assembly Orders](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-uin)          |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/imei`                | [Add IMEI to the Assembly Orders](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-imei)                                        |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/gtin`                | [Add GTIN to the Assembly Orders](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-gtin)                                        |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/customs-declaration` | [Add Customs Declaration Numbers to the Orders](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-customs-declaration)           |
