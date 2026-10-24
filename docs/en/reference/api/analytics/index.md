---
title: "Analytics and Data"
description: "Module `analytics` has 20 operations."
---

# Analytics and Data · `analytics`

Module `analytics` has 20 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/analytics) · [All modules](/en/reference/api/)

Data on seller analytics.

## Sales Funnel

| Method | Path                                              | Operation                                                                                                              |
| ------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v3/sales-funnel/products`         | [Listings Statistics per Period](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-products)              |
| `POST` | `/api/analytics/v3/sales-funnel/products/history` | [Listings Statistics per Days](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-products-history)        |
| `POST` | `/api/analytics/v3/sales-funnel/grouped/history`  | [Grouped Listings Statistics per Days](/en/reference/api/analytics/post-api-analytics-v3-sales-funnel-grouped-history) |

## Seller Analytics CSV

| Method | Path                                            | Operation                                                                                    |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/nm-report/downloads`                   | [Create the Report](/en/reference/api/analytics/post-api-v2-nm-report-downloads)             |
| `GET`  | `/api/v2/nm-report/downloads`                   | [Get the Reports List](/en/reference/api/analytics/get-api-v2-nm-report-downloads)           |
| `POST` | `/api/v2/nm-report/downloads/retry`             | [Regenerate the Report](/en/reference/api/analytics/post-api-v2-nm-report-downloads-retry)   |
| `GET`  | `/api/v2/nm-report/downloads/file/{downloadId}` | [Get the Report](/en/reference/api/analytics/get-api-v2-nm-report-downloads-file-downloadid) |

## Search Queries for Your Items

| Method | Path                                         | Operation                                                                                                         |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/search-report/report`               | [Main Page](/en/reference/api/analytics/post-api-v2-search-report-report)                                         |
| `POST` | `/api/v2/search-report/table/groups`         | [Pagination by Groups](/en/reference/api/analytics/post-api-v2-search-report-table-groups)                        |
| `POST` | `/api/v2/search-report/table/details`        | [Pagination by Items Within a Group](/en/reference/api/analytics/post-api-v2-search-report-table-details)         |
| `POST` | `/api/v2/search-report/product/search-texts` | [Search Texts by Item](/en/reference/api/analytics/post-api-v2-search-report-product-search-texts)                |
| `POST` | `/api/v2/search-report/product/orders`       | [Orders and Positions by Item Search Texts](/en/reference/api/analytics/post-api-v2-search-report-product-orders) |

## Stocks Report

| Method | Path                                                | Operation                                                                                                        |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v1/stocks-report/wb-warehouses`     | [WB Warehouses Inventory](/en/reference/api/analytics/post-api-analytics-v1-stocks-report-wb-warehouses)         |
| `POST` | `/api/analytics/v1/stocks-report/seller-warehouses` | [Seller Warehouses Inventory](/en/reference/api/analytics/post-api-analytics-v1-stocks-report-seller-warehouses) |
| `POST` | `/api/v2/stocks-report/products/groups`             | [Group Data](/en/reference/api/analytics/post-api-v2-stocks-report-products-groups)                              |
| `POST` | `/api/v2/stocks-report/products/products`           | [Item Data](/en/reference/api/analytics/post-api-v2-stocks-report-products-products)                             |
| `POST` | `/api/v2/stocks-report/products/sizes`              | [Size Data](/en/reference/api/analytics/post-api-v2-stocks-report-products-sizes)                                |
| `POST` | `/api/v2/stocks-report/offices`                     | [Warehouse Data](/en/reference/api/analytics/post-api-v2-stocks-report-offices)                                  |

## Item Rating

| Method | Path                            | Operation                                                                   |
| ------ | ------------------------------- | --------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v2/item-rating` | [Get Report](/en/reference/api/analytics/post-api-analytics-v2-item-rating) |

## Order Feed

| Method | Path                           | Operation                                                                  |
| ------ | ------------------------------ | -------------------------------------------------------------------------- |
| `POST` | `/api/analytics/v1/order-feed` | [Get Report](/en/reference/api/analytics/post-api-analytics-v1-order-feed) |
