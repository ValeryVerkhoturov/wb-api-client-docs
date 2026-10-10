---
title: "Отчёты"
description: "Операций модуля `reports` — 24."
---

# Отчёты · `reports`

Операций модуля `reports` — 24.

[Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/reports/) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/reports) · [Все модули](/reference/api/)

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

| Метод | Путь                      | Операция                                                    |
| ----- | ------------------------- | ----------------------------------------------------------- |
| `GET` | `/api/v1/supplier/orders` | [Заказы](/reference/api/reports/get-api-v1-supplier-orders) |
| `GET` | `/api/v1/supplier/sales`  | [Продажи](/reference/api/reports/get-api-v1-supplier-sales) |

## Отчёт о товарах c обязательной маркировкой

| Метод  | Путь                              | Операция                                                                     |
| ------ | --------------------------------- | ---------------------------------------------------------------------------- |
| `POST` | `/api/v1/analytics/excise-report` | [Получить отчёт](/reference/api/reports/post-api-v1-analytics-excise-report) |

## Отчёт об остатках на складах

| Метод | Путь                                                 | Операция                                                                                     |
| ----- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/warehouse_remains`                          | [Создать отчёт](/reference/api/reports/get-api-v1-warehouse-remains)                         |
| `GET` | `/api/v1/warehouse_remains/tasks/{task_id}/status`   | [Проверить статус](/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-status) |
| `GET` | `/api/v1/warehouse_remains/tasks/{task_id}/download` | [Получить отчёт](/reference/api/reports/get-api-v1-warehouse-remains-tasks-task-id-download) |

## Отчёты об удержаниях

| Метод | Путь                                       | Операция                                                                                                       |
| ----- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/analytics/v1/measurement-penalties`  | [Удержания за занижение габаритов упаковки](/reference/api/reports/get-api-analytics-v1-measurement-penalties) |
| `GET` | `/api/analytics/v1/warehouse-measurements` | [Замеры склада](/reference/api/reports/get-api-analytics-v1-warehouse-measurements)                            |
| `GET` | `/api/analytics/v1/deductions`             | [Подмены и неверные вложения](/reference/api/reports/get-api-analytics-v1-deductions)                          |
| `GET` | `/api/v1/analytics/antifraud-details`      | [Самовыкупы](/reference/api/reports/get-api-v1-analytics-antifraud-details)                                    |
| `GET` | `/api/v1/analytics/goods-labeling`         | [Маркировка товара](/reference/api/reports/get-api-v1-analytics-goods-labeling)                                |

## Операции при приёмке

| Метод | Путь                                                 | Операция                                                                                     |
| ----- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/acceptance_report`                          | [Создать отчёт](/reference/api/reports/get-api-v1-acceptance-report)                         |
| `GET` | `/api/v1/acceptance_report/tasks/{task_id}/status`   | [Проверить статус](/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-status) |
| `GET` | `/api/v1/acceptance_report/tasks/{task_id}/download` | [Получить отчёт](/reference/api/reports/get-api-v1-acceptance-report-tasks-task-id-download) |

## Платное хранение

| Метод | Путь                                            | Операция                                                                                |
| ----- | ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/paid_storage`                          | [Создать отчёт](/reference/api/reports/get-api-v1-paid-storage)                         |
| `GET` | `/api/v1/paid_storage/tasks/{task_id}/status`   | [Проверить статус](/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-status) |
| `GET` | `/api/v1/paid_storage/tasks/{task_id}/download` | [Получить отчёт](/reference/api/reports/get-api-v1-paid-storage-tasks-task-id-download) |

## Продажи по регионам

| Метод | Путь                            | Операция                                                                  |
| ----- | ------------------------------- | ------------------------------------------------------------------------- |
| `GET` | `/api/v1/analytics/region-sale` | [Получить отчёт](/reference/api/reports/get-api-v1-analytics-region-sale) |

## Доля бренда в продажах

| Метод | Путь                                            | Операция                                                                                                 |
| ----- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/analytics/brand-share/brands`          | [Бренды продавца](/reference/api/reports/get-api-v1-analytics-brand-share-brands)                        |
| `GET` | `/api/v1/analytics/brand-share/parent-subjects` | [Родительские категории бренда](/reference/api/reports/get-api-v1-analytics-brand-share-parent-subjects) |
| `GET` | `/api/v1/analytics/brand-share`                 | [Получить отчёт](/reference/api/reports/get-api-v1-analytics-brand-share)                                |

## Заблокированные карточки

| Метод | Путь                                        | Операция                                                                              |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/analytics/banned-products/blocked` | [Получить отчёт](/reference/api/reports/get-api-v1-analytics-banned-products-blocked) |

## Отчёт о возвратах и перемещении товаров

| Метод | Путь                             | Операция                                                                   |
| ----- | -------------------------------- | -------------------------------------------------------------------------- |
| `GET` | `/api/v1/analytics/goods-return` | [Получить отчёт](/reference/api/reports/get-api-v1-analytics-goods-return) |
| `GET` | `/api/analytics/v1/item-returns` | [Получить отчёт](/reference/api/reports/get-api-analytics-v1-item-returns) |
