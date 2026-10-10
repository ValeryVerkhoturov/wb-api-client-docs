---
title: "Отчёты"
description: "Module `reports` has 24 operations."
---

# Отчёты · `reports`

Module `reports` has 24 operations.

[Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/reports/) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/reports) · [All modules](/en/reference/api/)

Узнать больше об отчётах можно в [справочном центре](https://seller.wildberries.ru/instructions/subcategory/5f2162c5-069b-416d-a4e1-48da2a76e6b0)

С помощью этих методов вы можете получать [основные отчёты](https://dev.wildberries.ru/openapi/reports#tag/mainReports) и отчёты о:

1. [Остатках на складах](https://dev.wildberries.ru/openapi/reports#tag/warehousesInventoryReport)
2. [Товарах с обязательной маркировкой](https://dev.wildberries.ru/openapi/reports#tag/reportOnItemsWithMandatoryLabeling)
3. [Удержаниях](https://dev.wildberries.ru/openapi/reports#tag/retentionReports)
4. [Операциях при приёмке](https://dev.wildberries.ru/openapi/reports#tag/acceptanceExpenses)
5. [Платном хранении](https://dev.wildberries.ru/openapi/reports#tag/paidStorage)
6. [Продажах по регионам](https://dev.wildberries.ru/openapi/reports#tag/salesByRegions)
7. [Доле бренда в продажах](https://dev.wildberries.ru/openapi/reports#tag/shareOfBrandInSales)
8. [Заблокированных карточках](https://dev.wildberries.ru/openapi/reports#tag/blockedItems)
9. [Возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/returnsAndItemMovementReport)

## Основные отчёты

| Method | Path                      | Operation                                                      |
| ------ | ------------------------- | -------------------------------------------------------------- |
| `GET`  | `/api/v1/supplier/orders` | [Заказы](/en/reference/api/reports/get-api-v1-supplier-orders) |
| `GET`  | `/api/v1/supplier/sales`  | [Продажи](/en/reference/api/reports/get-api-v1-supplier-sales) |

## Отчёт о товарах c обязательной маркировкой

| Method | Path                              | Operation                                                                       |
| ------ | --------------------------------- | ------------------------------------------------------------------------------- |
| `POST` | `/api/v1/analytics/excise-report` | [Получить отчёт](/en/reference/api/reports/post-api-v1-analytics-excise-report) |

## Отчёт об остатках на складах

| Method | Path                                                 | Operation                                                                                       |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/warehouse_remains`                          | [Создать отчёт](/en/reference/api/reports/get-api-v1-warehouse-remains)                         |
| `GET`  | `/api/v1/warehouse_remains/tasks/{task_id}/status`   | [Проверить статус](/en/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-status) |
| `GET`  | `/api/v1/warehouse_remains/tasks/{task_id}/download` | [Получить отчёт](/en/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-download) |

## Отчёты об удержаниях

| Method | Path                                       | Operation                                                                                                         |
| ------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/analytics/v1/measurement-penalties`  | [Удержания за занижение габаритов упаковки](/en/reference/api/reports/get-api-analytics-v1-measurement-penalties) |
| `GET`  | `/api/analytics/v1/warehouse-measurements` | [Замеры склада](/en/reference/api/reports/get-api-analytics-v1-warehouse-measurements)                            |
| `GET`  | `/api/analytics/v1/deductions`             | [Подмены и неверные вложения](/en/reference/api/reports/get-api-analytics-v1-deductions)                          |
| `GET`  | `/api/v1/analytics/antifraud-details`      | [Самовыкупы](/en/reference/api/reports/get-api-v1-analytics-antifraud-details)                                    |
| `GET`  | `/api/v1/analytics/goods-labeling`         | [Маркировка товара](/en/reference/api/reports/get-api-v1-analytics-goods-labeling)                                |

## Операции при приёмке

| Method | Path                                                 | Operation                                                                                       |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/acceptance_report`                          | [Создать отчёт](/en/reference/api/reports/get-api-v1-acceptance-report)                         |
| `GET`  | `/api/v1/acceptance_report/tasks/{task_id}/status`   | [Проверить статус](/en/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-status) |
| `GET`  | `/api/v1/acceptance_report/tasks/{task_id}/download` | [Получить отчёт](/en/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-download) |

## Платное хранение

| Method | Path                                            | Operation                                                                                  |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/paid_storage`                          | [Создать отчёт](/en/reference/api/reports/get-api-v1-paid-storage)                         |
| `GET`  | `/api/v1/paid_storage/tasks/{task_id}/status`   | [Проверить статус](/en/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-status) |
| `GET`  | `/api/v1/paid_storage/tasks/{task_id}/download` | [Получить отчёт](/en/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-download) |

## Продажи по регионам

| Method | Path                            | Operation                                                                    |
| ------ | ------------------------------- | ---------------------------------------------------------------------------- |
| `GET`  | `/api/v1/analytics/region-sale` | [Получить отчёт](/en/reference/api/reports/get-api-v1-analytics-region-sale) |

## Доля бренда в продажах

| Method | Path                                            | Operation                                                                                                   |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/analytics/brand-share/brands`          | [Бренды продавца](/en/reference/api/reports/get-api-v1-analytics-brand-share-brands)                        |
| `GET`  | `/api/v1/analytics/brand-share/parent-subjects` | [Родительские категории бренда](/en/reference/api/reports/get-api-v1-analytics-brand-share-parent-subjects) |
| `GET`  | `/api/v1/analytics/brand-share`                 | [Получить отчёт](/en/reference/api/reports/get-api-v1-analytics-brand-share)                                |

## Заблокированные карточки

| Method | Path                                        | Operation                                                                                |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/analytics/banned-products/blocked` | [Получить отчёт](/en/reference/api/reports/get-api-v1-analytics-banned-products-blocked) |

## Отчёт о возвратах и перемещении товаров

| Method | Path                             | Operation                                                                     |
| ------ | -------------------------------- | ----------------------------------------------------------------------------- |
| `GET`  | `/api/v1/analytics/goods-return` | [Получить отчёт](/en/reference/api/reports/get-api-v1-analytics-goods-return) |
| `GET`  | `/api/analytics/v1/item-returns` | [Получить отчёт](/en/reference/api/reports/get-api-analytics-v1-item-returns) |
