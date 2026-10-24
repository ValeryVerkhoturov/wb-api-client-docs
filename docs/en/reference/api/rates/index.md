---
title: "Rates"
description: "Module `rates` has 5 operations."
---

# Rates · `rates`

Module `rates` has 5 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates) · [All modules](/en/reference/api/)

Management of rates and fees.

## Fees

| Method | Path                         | Operation                                                                  |
| ------ | ---------------------------- | -------------------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/commission` | [Item Category Fee](/en/reference/api/rates/get-api-v1-tariffs-commission) |

## Supply Rates

| Method | Path                                      | Operation                                                                          |
| ------ | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/tariffs/v1/acceptance/coefficients` | [Supply Rates](/en/reference/api/rates/get-api-tariffs-v1-acceptance-coefficients) |

## Stock Rates

| Method | Path                     | Operation                                                         |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/box`    | [Box Rates](/en/reference/api/rates/get-api-v1-tariffs-box)       |
| `GET`  | `/api/v1/tariffs/pallet` | [Pallet Rates](/en/reference/api/rates/get-api-v1-tariffs-pallet) |

## Return Cost to Seller

| Method | Path                     | Operation                                                         |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/return` | [Return Rates](/en/reference/api/rates/get-api-v1-tariffs-return) |
