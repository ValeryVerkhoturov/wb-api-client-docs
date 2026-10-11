---
title: "Тарифы"
description: "Module `rates` has 5 operations."
---

# Тарифы · `rates`

Module `rates` has 5 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/rates) · [All modules](/en/reference/api/)

Узнать больше о тарифах можно в [справочном центре](https://seller.wildberries.ru/instructions/ru/ru/material/fees-site-section)

В разделе описаны методы получения:

1. [Комиссий](https://dev.wildberries.ru/openapi/rates#tag/fees)
2. [Тарифов на поставку](https://dev.wildberries.ru/openapi/rates#tag/supplyRates)
3. [Тарифов на остаток](https://dev.wildberries.ru/openapi/rates#tag/stockRates)
4. [Тарифов на возврат товаров продавцу](https://dev.wildberries.ru/openapi/rates#tag/returnCostToSeller)

## Комиссии

| Method | Path                         | Operation                                                                               |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/commission` | [Комиссия по категориям товаров](/en/reference/api/rates/get-api-v1-tariffs-commission) |

## Тарифы на поставку

| Method | Path                                      | Operation                                                                                |
| ------ | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET`  | `/api/tariffs/v1/acceptance/coefficients` | [Тарифы на поставку](/en/reference/api/rates/get-api-tariffs-v1-acceptance-coefficients) |

## Тарифы на остаток

| Method | Path                     | Operation                                                                  |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/box`    | [Тарифы для коробов](/en/reference/api/rates/get-api-v1-tariffs-box)       |
| `GET`  | `/api/v1/tariffs/pallet` | [Тарифы для монопаллет](/en/reference/api/rates/get-api-v1-tariffs-pallet) |

## Стоимость возврата продавцу

| Method | Path                     | Operation                                                              |
| ------ | ------------------------ | ---------------------------------------------------------------------- |
| `GET`  | `/api/v1/tariffs/return` | [Тарифы на возврат](/en/reference/api/rates/get-api-v1-tariffs-return) |
