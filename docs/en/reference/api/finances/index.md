---
title: "Документы и бухгалтерия"
description: "Module `finances` has 11 operations."
---

# Документы и бухгалтерия · `finances`

Module `finances` has 11 operations.

[WB documentation ↗](https://dev.wildberries.ru/openapi/documents-and-accounting) · [All modules](/en/reference/api/)

Узнать больше о документах и бухгалтерии можно в [справочном центре](https://seller.wildberries.ru/instructions/category/ba929b64-1f89-4426-82d7-ce998ee552bd?goBackOption=prevRoute&categoryId=3c971375-9939-45e8-ab82-376019be8942)

Просмотр [баланса](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/balance), [финансовых отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports) и [документов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents) продавца.

## Баланс

| Method | Path                      | Operation                                                                         |
| ------ | ------------------------- | --------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/account/balance` | [Получить баланс продавца](/en/reference/api/finances/get-api-v1-account-balance) |

## Финансовые отчёты

| Method | Path                                                | Operation                                                                                                                                        |
| ------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/finance/v1/sales-reports/list`                | [Список отчётов реализации](/en/reference/api/finances/post-api-finance-v1-sales-reports-list)                                                   |
| `POST` | `/api/finance/v1/sales-reports/detailed/{reportId}` | [Детализации к отчётам реализации по ID отчётов](/en/reference/api/finances/post-api-finance-v1-sales-reports-detailed-reportid)                 |
| `POST` | `/api/finance/v1/sales-reports/detailed`            | [Детализации к отчётам реализации за период](/en/reference/api/finances/post-api-finance-v1-sales-reports-detailed)                              |
| `POST` | `/api/finance/v1/acquiring/list`                    | [Список отчётов об издержках на приём платежей](/en/reference/api/finances/post-api-finance-v1-acquiring-list)                                   |
| `POST` | `/api/finance/v1/acquiring/detailed/{reportId}`     | [Детализации к отчётам об издержках на приём платежей по ID отчётов](/en/reference/api/finances/post-api-finance-v1-acquiring-detailed-reportid) |
| `POST` | `/api/finance/v1/acquiring/detailed`                | [Детализации к отчётам об издержках на приём платежей за период](/en/reference/api/finances/post-api-finance-v1-acquiring-detailed)              |

## Документы

| Method | Path                             | Operation                                                                           |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/documents/categories`   | [Категории документов](/en/reference/api/finances/get-api-v1-documents-categories)  |
| `GET`  | `/api/v1/documents/list`         | [Список документов](/en/reference/api/finances/get-api-v1-documents-list)           |
| `GET`  | `/api/v1/documents/download`     | [Получить документ](/en/reference/api/finances/get-api-v1-documents-download)       |
| `POST` | `/api/v1/documents/download/all` | [Получить документы](/en/reference/api/finances/post-api-v1-documents-download-all) |
