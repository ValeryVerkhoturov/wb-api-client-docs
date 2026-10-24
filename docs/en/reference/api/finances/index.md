---
title: "Documents and Accounting"
description: "Module `finances` has 11 operations."
---

# Documents and Accounting · `finances`

Module `finances` has 11 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/documents-and-accounting) · [All modules](/en/reference/api/)

View seller [balance](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/balance), [financial reports](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/financialReports), and [documents](https://dev.wildberries.ru/openapi/documents-and-accounting#tag/documents).

## Balance

| Method | Path                      | Operation                                                                   |
| ------ | ------------------------- | --------------------------------------------------------------------------- |
| `GET`  | `/api/v1/account/balance` | [Get Seller Balance](/en/reference/api/finances/get-api-v1-account-balance) |

## Financial Reports

| Method | Path                                                | Operation                                                                                                                             |
| ------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/finance/v1/sales-reports/list`                | [Sales Reports List](/en/reference/api/finances/post-api-finance-v1-sales-reports-list)                                               |
| `POST` | `/api/finance/v1/sales-reports/detailed/{reportId}` | [Details for the Sales Reports by Report ID](/en/reference/api/finances/post-api-finance-v1-sales-reports-detailed-reportid)          |
| `POST` | `/api/finance/v1/sales-reports/detailed`            | [Details for the Sales Reports by Period](/en/reference/api/finances/post-api-finance-v1-sales-reports-detailed)                      |
| `POST` | `/api/finance/v1/acquiring/list`                    | [Acquiring Expenses Reports List](/en/reference/api/finances/post-api-finance-v1-acquiring-list)                                      |
| `POST` | `/api/finance/v1/acquiring/detailed/{reportId}`     | [Details for the Acquiring Expenses Reports by Report ID](/en/reference/api/finances/post-api-finance-v1-acquiring-detailed-reportid) |
| `POST` | `/api/finance/v1/acquiring/detailed`                | [Details for the Acquiring Expenses Reports by Period](/en/reference/api/finances/post-api-finance-v1-acquiring-detailed)             |

## Documents

| Method | Path                             | Operation                                                                          |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/documents/categories`   | [Documents Categories](/en/reference/api/finances/get-api-v1-documents-categories) |
| `GET`  | `/api/v1/documents/list`         | [Documents List](/en/reference/api/finances/get-api-v1-documents-list)             |
| `GET`  | `/api/v1/documents/download`     | [Get Document](/en/reference/api/finances/get-api-v1-documents-download)           |
| `POST` | `/api/v1/documents/download/all` | [Get Documents](/en/reference/api/finances/post-api-v1-documents-download-all)     |
