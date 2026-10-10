---
title: "Общее"
description: "Операций модуля `general` — 10."
---

# Общее · `general`

Операций модуля `general` — 10.

[Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/general/) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/api-information) · [Все модули](/reference/api/)

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

| Метод | Путь    | Операция                                                |
| ----- | ------- | ------------------------------------------------------- |
| `GET` | `/ping` | [Проверка подключения](/reference/api/general/get-ping) |

## API новостей

| Метод | Путь                          | Операция                                                                                      |
| ----- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| `GET` | `/api/communications/v2/news` | [Получение новостей портала продавцов](/reference/api/general/get-api-communications-v2-news) |

## Информация о продавце

| Метод | Путь                                        | Операция                                                                                                                  |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/v1/seller-info`                       | [Получить информацию о продавце](/reference/api/general/get-api-v1-seller-info)                                           |
| `GET` | `/api/common/v1/rating`                     | [Получить рейтинг продавца](/reference/api/general/get-api-common-v1-rating)                                              |
| `GET` | `/api/common/v1/subscriptions`              | [Получить информацию о подписке Джем](/reference/api/general/get-api-common-v1-subscriptions)                             |
| `GET` | `/api/common/v1/tariff-constructor/options` | [Получить информацию об опциях Конструктора тарифов](/reference/api/general/get-api-common-v1-tariff-constructor-options) |

## Управление пользователями продавца

| Метод    | Путь                   | Операция                                                                                                    |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/v1/invite`       | [Создать приглашение для нового пользователя](/reference/api/general/post-api-v1-invite)                    |
| `GET`    | `/api/v1/users`        | [Получить список активных или приглашённых пользователей продавца](/reference/api/general/get-api-v1-users) |
| `PUT`    | `/api/v1/users/access` | [Изменить права доступа пользователей](/reference/api/general/put-api-v1-users-access)                      |
| `DELETE` | `/api/v1/user`         | [Удалить пользователя](/reference/api/general/delete-api-v1-user)                                           |
