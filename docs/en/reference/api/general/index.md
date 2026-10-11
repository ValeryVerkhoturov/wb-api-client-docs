---
title: "Общее"
description: "Module `general` has 10 operations."
---

# Общее · `general`

Module `general` has 10 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/api-information) · [All modules](/en/reference/api/)

В этом разделе:

- [общая информация о WB API](https://dev.wildberries.ru/openapi/api-information#tag/introduction)
- как [начать работу с WB API](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Kak-nachat-rabotu-s-API)
- как [авторизоваться](https://dev.wildberries.ru/openapi/api-information#tag/authorization) и [создавать токены](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kak-sozdat-personalnyj-bazovyj-ili-testovyj-token)
- основные [статус-коды ответов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Status-kody-HTTP)
- [лимиты запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov)
- как обратиться в [поддержку](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Podderzhka)
  С помощью методов этого раздела вы можете:
- проверить [подключение к WB API](https://dev.wildberries.ru/openapi/api-information#tag/connectionCheck/operation/getPing)
- получить [новости портала продавцов](https://dev.wildberries.ru/openapi/api-information#tag/newsApi/operation/getV2News)
- получить [информацию о продавце](https://dev.wildberries.ru/openapi/api-information#tag/sellerInformation/operation/getV1SellerInfo)
- [управлять пользователями продавца](https://dev.wildberries.ru/openapi/api-information#tag/sellerUserManagement)

## Проверка подключения к WB API

| Method | Path    | Operation                                                  |
| ------ | ------- | ---------------------------------------------------------- |
| `GET`  | `/ping` | [Проверка подключения](/en/reference/api/general/get-ping) |

## API новостей

| Method | Path                          | Operation                                                                                        |
| ------ | ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/communications/v2/news` | [Получение новостей портала продавцов](/en/reference/api/general/get-api-communications-v2-news) |

## Информация о продавце

| Method | Path                                        | Operation                                                                                                                    |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/seller-info`                       | [Получить информацию о продавце](/en/reference/api/general/get-api-v1-seller-info)                                           |
| `GET`  | `/api/common/v1/rating`                     | [Получить рейтинг продавца](/en/reference/api/general/get-api-common-v1-rating)                                              |
| `GET`  | `/api/common/v1/subscriptions`              | [Получить информацию о подписке Джем](/en/reference/api/general/get-api-common-v1-subscriptions)                             |
| `GET`  | `/api/common/v1/tariff-constructor/options` | [Получить информацию об опциях Конструктора тарифов](/en/reference/api/general/get-api-common-v1-tariff-constructor-options) |

## Управление пользователями продавца

| Method   | Path                   | Operation                                                                                                      |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/v1/invite`       | [Создать приглашение для нового пользователя](/en/reference/api/general/post-api-v1-invite)                    |
| `GET`    | `/api/v1/users`        | [Получить список активных или приглашённых пользователей продавца](/en/reference/api/general/get-api-v1-users) |
| `PUT`    | `/api/v1/users/access` | [Изменить права доступа пользователей](/en/reference/api/general/put-api-v1-users-access)                      |
| `DELETE` | `/api/v1/user`         | [Удалить пользователя](/en/reference/api/general/delete-api-v1-user)                                           |
