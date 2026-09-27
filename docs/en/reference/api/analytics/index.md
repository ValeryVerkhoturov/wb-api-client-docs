---
title: "Аналитика и данные"
description: "Module `analytics` has 20 operations."
---

# Аналитика и данные · `analytics`

Module `analytics` has 20 operations.

[WB documentation ↗](https://dev.wildberries.ru/openapi/analytics) · [All modules](/en/reference/api/)

Узнать больше об аналитике и данных можно в [справочном центре](https://seller.wildberries.ru/instructions/ru/ru/subcategory/seller-analytics)

В разделе описаны методы получения:

1. [Воронки продаж](https://dev.wildberries.ru/openapi/analytics#tag/salesFunnel)
2. [Ленты заказов](https://dev.wildberries.ru/openapi/analytics#tag/orderFeed)
3. [Поисковых запросов по вашим товарам](https://dev.wildberries.ru/openapi/analytics#tag/searchQueriesForYourItems)
4. [Истории остатков](https://dev.wildberries.ru/openapi/analytics#tag/stocksReport)
5. [Оценки товара](https://dev.wildberries.ru/openapi/analytics#tag/itemRating)
6. [Аналитики продавца в формате CSV](https://dev.wildberries.ru/openapi/analytics#tag/sellerAnalyticsCsv)

## Воронка продаж

| Method | Path                                              | Operation                                                                                                                   |
| ------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v3/sales-funnel/products`         | [Статистика карточек товаров за период](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-products)            |
| `POST` | `/api/analytics/v3/sales-funnel/products/history` | [Статистика карточек товаров по дням](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-products-history)      |
| `POST` | `/api/analytics/v3/sales-funnel/grouped/history`  | [Статистика групп карточек товаров по дням](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-grouped-history) |

## Аналитика продавца CSV

| Method | Path                                            | Operation                                                                                         |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/nm-report/downloads`                   | [Создать отчёт](/en/reference/api/analytics/post-api-v2-nm-report-downloads)                      |
| `GET`  | `/api/v2/nm-report/downloads`                   | [Получить список отчётов](/en/reference/api/analytics/get-api-v2-nm-report-downloads)             |
| `POST` | `/api/v2/nm-report/downloads/retry`             | [Сгенерировать отчёт повторно](/en/reference/api/analytics/post-api-v2-nm-report-downloads-retry) |
| `GET`  | `/api/v2/nm-report/downloads/file/{downloadId}` | [Получить отчёт](/en/reference/api/analytics/get-api-v2-nm-report-downloads-file-downloadid)      |

## Поисковые запросы по вашим товарам

| Method | Path                                         | Operation                                                                                                             |
| ------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/search-report/report`               | [Основная страница](/en/reference/api/analytics/post-api-v2-search-report-report)                                     |
| `POST` | `/api/v2/search-report/table/groups`         | [Пагинация по группам](/en/reference/api/analytics/post-api-v2-search-report-table-groups)                            |
| `POST` | `/api/v2/search-report/table/details`        | [Пагинация по товарам в группе](/en/reference/api/analytics/post-api-v2-search-report-table-details)                  |
| `POST` | `/api/v2/search-report/product/search-texts` | [Поисковые запросы по товару](/en/reference/api/analytics/post-api-v2-search-report-product-search-texts)             |
| `POST` | `/api/v2/search-report/product/orders`       | [Заказы и позиции по поисковым запросам товара](/en/reference/api/analytics/post-api-v2-search-report-product-orders) |

## История остатков

| Method | Path                                                | Operation                                                                                                        |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v1/stocks-report/wb-warehouses`     | [Остатки на складах WB](/en/reference/api/analytics/post-api-analytics-v1-stocks-report-wb-warehouses)           |
| `POST` | `/api/analytics/v1/stocks-report/seller-warehouses` | [Остатки на складах продавца](/en/reference/api/analytics/post-api-analytics-v1-stocks-report-seller-warehouses) |
| `POST` | `/api/v2/stocks-report/products/groups`             | [Данные по группам](/en/reference/api/analytics/post-api-v2-stocks-report-products-groups)                       |
| `POST` | `/api/v2/stocks-report/products/products`           | [Данные по товарам](/en/reference/api/analytics/post-api-v2-stocks-report-products-products)                     |
| `POST` | `/api/v2/stocks-report/products/sizes`              | [Данные по размерам](/en/reference/api/analytics/post-api-v2-stocks-report-products-sizes)                       |
| `POST` | `/api/v2/stocks-report/offices`                     | [Данные по складам](/en/reference/api/analytics/post-api-v2-stocks-report-offices)                               |

## Оценка товара

| Method | Path                            | Operation                                                                       |
| ------ | ------------------------------- | ------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v2/item-rating` | [Получить отчёт](/en/reference/api/analytics/post-api-analytics-v2-item-rating) |

## Лента заказов

| Method | Path                           | Operation                                                                      |
| ------ | ------------------------------ | ------------------------------------------------------------------------------ |
| `POST` | `/api/analytics/v1/order-feed` | [Получить отчёт](/en/reference/api/analytics/post-api-analytics-v1-order-feed) |
