---
title: "FBW Supplies"
description: "Module `orders-fbw` has 14 operations."
---

# FBW Supplies · `orders-fbw`

Module `orders-fbw` has 14 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw) · [All modules](/en/reference/api/)

This section describes the methods for getting:

- [information for forming supplies](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies)
- [supplies information](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation)

## Information for Forming Supplies

| Method | Path                         | Operation                                                                         |
| ------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `POST` | `/api/v1/acceptance/options` | [Acceptance Options](/en/reference/api/orders-fbw/post-api-v1-acceptance-options) |
| `GET`  | `/api/v1/warehouses`         | [Warehouses List](/en/reference/api/orders-fbw/get-api-v1-warehouses)             |
| `GET`  | `/api/v1/transit-tariffs`    | [Transit Directions](/en/reference/api/orders-fbw/get-api-v1-transit-tariffs)     |

## Supplies Information

| Method | Path                                        | Operation                                                                                       |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `POST` | `/api/v1/supplies`                          | [Supplies List](/en/reference/api/orders-fbw/post-api-v1-supplies)                              |
| `GET`  | `/api/v1/supplies/{ID}`                     | [Supply Details](/en/reference/api/orders-fbw/get-api-v1-supplies-id)                           |
| `GET`  | `/api/v1/supplies/{ID}/goods`               | [Supply Items](/en/reference/api/orders-fbw/get-api-v1-supplies-id-goods)                       |
| `GET`  | `/api/v1/supplies/{ID}/package`             | [Supply Package](/en/reference/api/orders-fbw/get-api-v1-supplies-id-package)                   |
| `GET`  | `/api/supplies/v1/discrepancies/{supplyId}` | [Supply Discrepancies](/en/reference/api/orders-fbw/get-api-supplies-v1-discrepancies-supplyid) |

## Supply Drafts

| Method   | Path                                      | Operation                                                                                           |
| -------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/supplies/v1/drafts`                 | [Drafts List](/en/reference/api/orders-fbw/get-api-supplies-v1-drafts)                              |
| `POST`   | `/api/supplies/v1/drafts`                 | [Create Draft](/en/reference/api/orders-fbw/post-api-supplies-v1-drafts)                            |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}`       | [Delete Draft](/en/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid)                  |
| `GET`    | `/api/supplies/v1/drafts/{draftId}/items` | [Items List in Draft](/en/reference/api/orders-fbw/get-api-supplies-v1-drafts-draftid-items)        |
| `POST`   | `/api/supplies/v1/drafts/{draftId}/items` | [Add Items to Draft](/en/reference/api/orders-fbw/post-api-supplies-v1-drafts-draftid-items)        |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}/items` | [Delete Items from Draft](/en/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid-items) |
