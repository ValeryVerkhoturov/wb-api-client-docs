---
title: "General"
description: "Module `general` has 10 operations."
---

# General · `general`

Module `general` has 10 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information) · [All modules](/en/reference/api/)

In this section:

- [WB API general information](https://dev.wildberries.ru/openapi/api-information#tag/introduction)
- how to [get started with the WB API](https://dev.wildberries.ru/openapi/api-information#tag/introduction/How-to-get-started-with-the-API)
- how to [log in](https://dev.wildberries.ru/openapi/api-information#tag/authorization) and [create tokens](https://dev.wildberries.ru/openapi/api-information#tag/authorization/How-to-create-a-personal-access-base-or-test-token)
- main [HTTP status codes](https://dev.wildberries.ru/openapi/api-information#tag/introduction/HTTP-status-codes)
- [rate limits](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits)
- how to contact [support](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Support)
  Use the methods in this section to:
- check the [WB API connection](https://dev.wildberries.ru/openapi/api-information#tag/connectionCheck)
- get [seller portal news](https://dev.wildberries.ru/openapi/api-information#tag/newsApi/operation/getV2News)
- get [seller information](https://dev.wildberries.ru/openapi/api-information#tag/sellerInformation)
- [manage seller users](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement)

## WB API Connection Check

| Method | Path    | Operation                                              |
| ------ | ------- | ------------------------------------------------------ |
| `GET`  | `/ping` | [Connection Check](/en/reference/api/general/get-ping) |

## News API

| Method | Path                          | Operation                                                                              |
| ------ | ----------------------------- | -------------------------------------------------------------------------------------- |
| `GET`  | `/api/communications/v2/news` | [Getting Seller Portal News](/en/reference/api/general/get-api-communications-v2-news) |

## Seller Information

| Method | Path                                        | Operation                                                                                                            |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/seller-info`                       | [Get Seller Information](/en/reference/api/general/get-api-v1-seller-info)                                           |
| `GET`  | `/api/common/v1/rating`                     | [Get Seller Rating](/en/reference/api/general/get-api-common-v1-rating)                                              |
| `GET`  | `/api/common/v1/subscriptions`              | [Get Jam Subscription Information](/en/reference/api/general/get-api-common-v1-subscriptions)                        |
| `GET`  | `/api/common/v1/tariff-constructor/options` | [Get Information about Plan Builder Options](/en/reference/api/general/get-api-common-v1-tariff-constructor-options) |

## Seller User Management

| Method   | Path                   | Operation                                                                                  |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `POST`   | `/api/v1/invite`       | [Create an Invitation for a New User](/en/reference/api/general/post-api-v1-invite)        |
| `GET`    | `/api/v1/users`        | [Get a List of Seller Active or Invited Users](/en/reference/api/general/get-api-v1-users) |
| `PUT`    | `/api/v1/users/access` | [Update User's Access Permissions](/en/reference/api/general/put-api-v1-users-access)      |
| `DELETE` | `/api/v1/user`         | [Delete User](/en/reference/api/general/delete-api-v1-user)                                |
