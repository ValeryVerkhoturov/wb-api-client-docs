---
title: "Документы и бухгалтерия"
description: "Операций модуля `finances` — 11."
---

# Документы и бухгалтерия · `finances`

Операций модуля `finances` — 11.

[Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/finances/) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting) · [Все модули](/reference/api/)

Узнать больше о документах и бухгалтерии можно в [справочном центре](https://seller.wildberries.ru/instructions/category/ba929b64-1f89-4426-82d7-ce998ee552bd?goBackOption=prevRoute&categoryId=3c971375-9939-45e8-ab82-376019be8942)

Просмотр [баланса](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/balance), [финансовых отчётов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports) и [документов](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents) продавца.

## Баланс

| Метод | Путь                      | Операция                                                                       |
| ----- | ------------------------- | ------------------------------------------------------------------------------ |
| `GET` | `/api/v1/account/balance` | [Получить баланс продавца](/reference/api/finances/get-api-v1-account-balance) |

## Финансовые отчёты

| Метод  | Путь                                                | Операция                                                                                                                                      |
| ------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/finance/v1/sales-reports/list`                | [Список отчётов реализации](/reference/api/finances/post-api-finance-v1-sales-reports-list)                                                   |
| `POST` | `/api/finance/v1/sales-reports/detailed/{reportId}` | [Детализации к отчётам реализации по ID отчётов](/reference/api/finances/post-api-finance-v1-sales-reports-detailed-reportid)                 |
| `POST` | `/api/finance/v1/sales-reports/detailed`            | [Детализации к отчётам реализации за период](/reference/api/finances/post-api-finance-v1-sales-reports-detailed)                              |
| `POST` | `/api/finance/v1/acquiring/list`                    | [Список отчётов об издержках на приём платежей](/reference/api/finances/post-api-finance-v1-acquiring-list)                                   |
| `POST` | `/api/finance/v1/acquiring/detailed/{reportId}`     | [Детализации к отчётам об издержках на приём платежей по ID отчётов](/reference/api/finances/post-api-finance-v1-acquiring-detailed-reportid) |
| `POST` | `/api/finance/v1/acquiring/detailed`                | [Детализации к отчётам об издержках на приём платежей за период](/reference/api/finances/post-api-finance-v1-acquiring-detailed)              |

## Документы

| Метод  | Путь                             | Операция                                                                         |
| ------ | -------------------------------- | -------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/documents/categories`   | [Категории документов](/reference/api/finances/get-api-v1-documents-categories)  |
| `GET`  | `/api/v1/documents/list`         | [Список документов](/reference/api/finances/get-api-v1-documents-list)           |
| `GET`  | `/api/v1/documents/download`     | [Получить документ](/reference/api/finances/get-api-v1-documents-download)       |
| `POST` | `/api/v1/documents/download/all` | [Получить документы](/reference/api/finances/post-api-v1-documents-download-all) |
