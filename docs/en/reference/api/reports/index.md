---
title: "Reports"
description: "Module `reports` has 24 operations."
---

# Reports · `reports`

Module `reports` has 24 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports) · [All modules](/en/reference/api/)

Reports on items, retentions, and paid storage

## Main Reports

| Method | Path                      | Operation                                                      |
| ------ | ------------------------- | -------------------------------------------------------------- |
| `GET`  | `/api/v1/supplier/orders` | [Orders](/en/reference/api/reports/get-api-v1-supplier-orders) |
| `GET`  | `/api/v1/supplier/sales`  | [Sales](/en/reference/api/reports/get-api-v1-supplier-sales)   |

## Report on Items with Mandatory Labeling

| Method | Path                              | Operation                                                                                                |
| ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v1/analytics/excise-report` | [Report on Items with Mandatory Labeling](/en/reference/api/reports/post-api-v1-analytics-excise-report) |

## Warehouses Inventory Report

| Method | Path                                                 | Operation                                                                                       |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/warehouse_remains`                          | [Create the Report](/en/reference/api/reports/get-api-v1-warehouse-remains)                     |
| `GET`  | `/api/v1/warehouse_remains/tasks/{task_id}/status`   | [Check the Status](/en/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-status) |
| `GET`  | `/api/v1/warehouse_remains/tasks/{task_id}/download` | [Get the Report](/en/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-download) |

## Retention Reports

| Method | Path                                       | Operation                                                                                                      |
| ------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/analytics/v1/measurement-penalties`  | [Logistics and Storage Costs Multiplier](/en/reference/api/reports/get-api-analytics-v1-measurement-penalties) |
| `GET`  | `/api/analytics/v1/warehouse-measurements` | [Warehouse Measurements](/en/reference/api/reports/get-api-analytics-v1-warehouse-measurements)                |
| `GET`  | `/api/analytics/v1/deductions`             | [Substitutions and Incorrect Attachments](/en/reference/api/reports/get-api-analytics-v1-deductions)           |
| `GET`  | `/api/v1/analytics/antifraud-details`      | [Self-purchases](/en/reference/api/reports/get-api-v1-analytics-antifraud-details)                             |
| `GET`  | `/api/v1/analytics/goods-labeling`         | [Item Labeling](/en/reference/api/reports/get-api-v1-analytics-goods-labeling)                                 |

## Acceptance Expenses

| Method | Path                                                 | Operation                                                                                       |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/acceptance_report`                          | [Create the Report](/en/reference/api/reports/get-api-v1-acceptance-report)                     |
| `GET`  | `/api/v1/acceptance_report/tasks/{task_id}/status`   | [Check the Status](/en/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-status) |
| `GET`  | `/api/v1/acceptance_report/tasks/{task_id}/download` | [Get the Report](/en/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-download) |

## Paid Storage

| Method | Path                                            | Operation                                                                                  |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/paid_storage`                          | [Generate the Report](/en/reference/api/reports/get-api-v1-paid-storage)                   |
| `GET`  | `/api/v1/paid_storage/tasks/{task_id}/status`   | [Check the Status](/en/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-status) |
| `GET`  | `/api/v1/paid_storage/tasks/{task_id}/download` | [Get the Report](/en/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-download) |

## Sales by Regions

| Method | Path                            | Operation                                                                |
| ------ | ------------------------------- | ------------------------------------------------------------------------ |
| `GET`  | `/api/v1/analytics/region-sale` | [Get Report](/en/reference/api/reports/get-api-v1-analytics-region-sale) |

## Share of Brand in Sales

| Method | Path                                            | Operation                                                                                                    |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/analytics/brand-share/brands`          | [Seller Brands](/en/reference/api/reports/get-api-v1-analytics-brand-share-brands)                           |
| `GET`  | `/api/v1/analytics/brand-share/parent-subjects` | [Parent Categories of the Brand](/en/reference/api/reports/get-api-v1-analytics-brand-share-parent-subjects) |
| `GET`  | `/api/v1/analytics/brand-share`                 | [Get Report](/en/reference/api/reports/get-api-v1-analytics-brand-share)                                     |

## Blocked Items

| Method | Path                                        | Operation                                                                            |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/analytics/banned-products/blocked` | [Get Report](/en/reference/api/reports/get-api-v1-analytics-banned-products-blocked) |

## Returns and Item Movement Report

| Method | Path                             | Operation                                                                 |
| ------ | -------------------------------- | ------------------------------------------------------------------------- |
| `GET`  | `/api/v1/analytics/goods-return` | [Get Report](/en/reference/api/reports/get-api-v1-analytics-goods-return) |
| `GET`  | `/api/analytics/v1/item-returns` | [Get Report](/en/reference/api/reports/get-api-analytics-v1-item-returns) |
