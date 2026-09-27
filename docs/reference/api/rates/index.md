---
title: "Тарифы"
description: "Операций модуля `rates` — 5."
---

# Тарифы · `rates`

Операций модуля `rates` — 5.

[Документация WB ↗](https://dev.wildberries.ru/openapi/rates) · [Все модули](/reference/api/)

Узнать больше о тарифах можно в [справочном центре](https://seller.wildberries.ru/instructions/ru/ru/material/fees-site-section)

В разделе описаны методы получения:

1. [Комиссий](https://dev.wildberries.ru/openapi/rates#tag/fees)
2. [Тарифов на поставку](https://dev.wildberries.ru/openapi/rates#tag/supplyRates)
3. [Тарифов на остаток](https://dev.wildberries.ru/openapi/rates#tag/stockRates)
4. [Тарифов на возврат товаров продавцу](https://dev.wildberries.ru/openapi/rates#tag/returnCostToSeller)

## Комиссии

| Метод | Путь                         | Операция                                                                             |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------ |
| `GET` | `/api/v1/tariffs/commission` | [Комиссия по категориям товаров](/reference/api/rates/get-api-v1-tariffs-commission) |

## Тарифы на поставку

| Метод | Путь                                      | Операция                                                                              |
| ----- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET` | `/api/tariffs/v1/acceptance/coefficients` | [Тарифы на поставку](/reference/api/rates/get-api-tariffs-v1-acceptance-coefficients) |

## Тарифы на остаток

| Метод | Путь                     | Операция                                                                |
| ----- | ------------------------ | ----------------------------------------------------------------------- |
| `GET` | `/api/v1/tariffs/box`    | [Тарифы для коробов](/reference/api/rates/get-api-v1-tariffs-box)       |
| `GET` | `/api/v1/tariffs/pallet` | [Тарифы для монопаллет](/reference/api/rates/get-api-v1-tariffs-pallet) |

## Стоимость возврата продавцу

| Метод | Путь                     | Операция                                                            |
| ----- | ------------------------ | ------------------------------------------------------------------- |
| `GET` | `/api/v1/tariffs/return` | [Тарифы на возврат](/reference/api/rates/get-api-v1-tariffs-return) |
