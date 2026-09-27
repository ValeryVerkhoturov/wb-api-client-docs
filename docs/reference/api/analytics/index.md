---
title: "Аналитика и данные"
description: "Операций модуля `analytics` — 20."
---

# Аналитика и данные · `analytics`

Операций модуля `analytics` — 20.

[Документация WB ↗](https://dev.wildberries.ru/openapi/analytics) · [Все модули](/reference/api/)

Узнать больше об аналитике и данных можно в [справочном центре](https://seller.wildberries.ru/instructions/ru/ru/subcategory/seller-analytics)

В разделе описаны методы получения:

1. [Воронки продаж](https://dev.wildberries.ru/openapi/analytics#tag/salesFunnel)
2. [Ленты заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed)
3. [Поисковых запросов по вашим товарам](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems)
4. [Истории остатков](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport)
5. [Оценки товара](https://dev.wildberries.ru/openapi/analytics#tag/itemRating)
6. [Аналитики продавца в формате CSV](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv)

## Воронка продаж

| Метод  | Путь                                              | Операция                                                                                                                 |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/analytics/v3/sales-funnel/products`         | [Статистика карточек товаров за период](/reference/api/analytics/post-api-analytics-v3-sales-funnel-products)            |
| `POST` | `/api/analytics/v3/sales-funnel/products/history` | [Статистика карточек товаров по дням](/reference/api/analytics/post-api-analytics-v3-sales-funnel-products-history)      |
| `POST` | `/api/analytics/v3/sales-funnel/grouped/history`  | [Статистика групп карточек товаров по дням](/reference/api/analytics/post-api-analytics-v3-sales-funnel-grouped-history) |

## Аналитика продавца CSV

| Метод  | Путь                                            | Операция                                                                                       |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/nm-report/downloads`                   | [Создать отчёт](/reference/api/analytics/post-api-v2-nm-report-downloads)                      |
| `GET`  | `/api/v2/nm-report/downloads`                   | [Получить список отчётов](/reference/api/analytics/get-api-v2-nm-report-downloads)             |
| `POST` | `/api/v2/nm-report/downloads/retry`             | [Сгенерировать отчёт повторно](/reference/api/analytics/post-api-v2-nm-report-downloads-retry) |
| `GET`  | `/api/v2/nm-report/downloads/file/{downloadId}` | [Получить отчёт](/reference/api/analytics/get-api-v2-nm-report-downloads-file-downloadid)      |

## Поисковые запросы по вашим товарам

| Метод  | Путь                                         | Операция                                                                                                           |
| ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/v2/search-report/report`               | [Основная страница](/reference/api/analytics/post-api-v2-search-report-report)                                     |
| `POST` | `/api/v2/search-report/table/groups`         | [Пагинация по группам](/reference/api/analytics/post-api-v2-search-report-table-groups)                            |
| `POST` | `/api/v2/search-report/table/details`        | [Пагинация по товарам в группе](/reference/api/analytics/post-api-v2-search-report-table-details)                  |
| `POST` | `/api/v2/search-report/product/search-texts` | [Поисковые запросы по товару](/reference/api/analytics/post-api-v2-search-report-product-search-texts)             |
| `POST` | `/api/v2/search-report/product/orders`       | [Заказы и позиции по поисковым запросам товара](/reference/api/analytics/post-api-v2-search-report-product-orders) |

## История остатков

| Метод  | Путь                                                | Операция                                                                                                      |
| ------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v1/stocks-report/wb-warehouses`     | [Остатки на складах WB](/reference/api/analytics/post-api-analytics-v1-stocks-report-wb-warehouses)           |
| `POST` | `/api/analytics/v1/stocks-report/seller-warehouses` | [Остатки на складах продавца](/reference/api/analytics/post-api-analytics-v1-stocks-report-seller-warehouses) |
| `POST` | `/api/v2/stocks-report/products/groups`             | [Данные по группам](/reference/api/analytics/post-api-v2-stocks-report-products-groups)                       |
| `POST` | `/api/v2/stocks-report/products/products`           | [Данные по товарам](/reference/api/analytics/post-api-v2-stocks-report-products-products)                     |
| `POST` | `/api/v2/stocks-report/products/sizes`              | [Данные по размерам](/reference/api/analytics/post-api-v2-stocks-report-products-sizes)                       |
| `POST` | `/api/v2/stocks-report/offices`                     | [Данные по складам](/reference/api/analytics/post-api-v2-stocks-report-offices)                               |

## Оценка товара

| Метод  | Путь                            | Операция                                                                     |
| ------ | ------------------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v2/item-rating` | [Получить отчёт](/reference/api/analytics/post-api-analytics-v2-item-rating) |

## Лента заказов

| Метод  | Путь                           | Операция                                                                    |
| ------ | ------------------------------ | --------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v1/order-feed` | [Получить отчёт](/reference/api/analytics/post-api-analytics-v1-order-feed) |
