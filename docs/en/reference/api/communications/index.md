---
title: "Общение с покупателями"
description: "Module `communications` has 25 operations."
---

# Общение с покупателями · `communications`

Module `communications` has 25 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication) · [All modules](/en/reference/api/)

Узнать больше об общении с покупателями можно в [справочном центре](https://seller.wildberries.ru/instructions/category/f7f6c465-dd12-422d-80a0-a6d9562115d5?goBackOption=prevRoute&categoryId=30817062-14cc-4a82-bc78-3600c2b0685b)

С помощью методов общения с покупателями вы можете работать с:

1. [Вопросами](https://dev.wildberries.ru/openapi/customer-communication#tag/questions) и [отзывами](https://dev.wildberries.ru/openapi/customer-communication#tag/feedbacks) покупателей
2. [Закреплёнными отзывами](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks)
3. [Чатами с покупателями](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat)
4. [Заявками покупателей на возврат](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersReturns)
   Вы можете протестировать методы общения с покупателями в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/questionsAndFeedbacks) для управления тестовыми вопросами и отзывами

Узнать, как использовать методы в бизнес-кейсах, можно в [инструкции](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-0b26-7620-8d0b-e3050b7cd01d/obshchenie-s-pokupateliami) по работе с разделом **Общение с покупателями**

## Вопросы

| Method  | Path                                 | Operation                                                                                               |
| ------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/new-feedbacks-questions`    | [Непросмотренные отзывы и вопросы](/en/reference/api/communications/get-api-v1-new-feedbacks-questions) |
| `GET`   | `/api/v1/questions/count-unanswered` | [Неотвеченные вопросы](/en/reference/api/communications/get-api-v1-questions-count-unanswered)          |
| `GET`   | `/api/v1/questions/count`            | [Количество вопросов](/en/reference/api/communications/get-api-v1-questions-count)                      |
| `GET`   | `/api/v1/questions`                  | [Список вопросов](/en/reference/api/communications/get-api-v1-questions)                                |
| `PATCH` | `/api/v1/questions`                  | [Работа с вопросами](/en/reference/api/communications/patch-api-v1-questions)                           |
| `GET`   | `/api/v1/question`                   | [Получить вопрос по ID](/en/reference/api/communications/get-api-v1-question)                           |

## Отзывы

| Method  | Path                                 | Operation                                                                                          |
| ------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/feedbacks/count-unanswered` | [Необработанные отзывы](/en/reference/api/communications/get-api-v1-feedbacks-count-unanswered)    |
| `GET`   | `/api/v1/feedbacks/count`            | [Количество отзывов](/en/reference/api/communications/get-api-v1-feedbacks-count)                  |
| `GET`   | `/api/v1/feedbacks`                  | [Список отзывов](/en/reference/api/communications/get-api-v1-feedbacks)                            |
| `POST`  | `/api/v1/feedbacks/answer`           | [Ответить на отзыв](/en/reference/api/communications/post-api-v1-feedbacks-answer)                 |
| `PATCH` | `/api/v1/feedbacks/answer`           | [Отредактировать ответ на отзыв](/en/reference/api/communications/patch-api-v1-feedbacks-answer)   |
| `POST`  | `/api/v1/feedbacks/order/return`     | [Возврат товара по ID отзыва](/en/reference/api/communications/post-api-v1-feedbacks-order-return) |
| `GET`   | `/api/v1/feedback`                   | [Получить отзыв по ID](/en/reference/api/communications/get-api-v1-feedback)                       |
| `GET`   | `/api/v1/feedbacks/archive`          | [Список архивных отзывов](/en/reference/api/communications/get-api-v1-feedbacks-archive)           |

## Закреплённые отзывы

| Method   | Path                            | Operation                                                                                                          |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/feedbacks/v1/pins`        | [Список закреплённых и откреплённых отзывов](/en/reference/api/communications/get-api-feedbacks-v1-pins)           |
| `POST`   | `/api/feedbacks/v1/pins`        | [Закрепить отзывы](/en/reference/api/communications/post-api-feedbacks-v1-pins)                                    |
| `DELETE` | `/api/feedbacks/v1/pins`        | [Открепить отзывы](/en/reference/api/communications/delete-api-feedbacks-v1-pins)                                  |
| `GET`    | `/api/feedbacks/v1/pins/count`  | [Количество закреплённых и откреплённых отзывов](/en/reference/api/communications/get-api-feedbacks-v1-pins-count) |
| `GET`    | `/api/feedbacks/v1/pins/limits` | [Лимиты закреплённых отзывов](/en/reference/api/communications/get-api-feedbacks-v1-pins-limits)                   |

## Чат с покупателями

| Method | Path                           | Operation                                                                                    |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/seller/chats`         | [Список чатов](/en/reference/api/communications/get-api-v1-seller-chats)                     |
| `GET`  | `/api/v1/seller/events`        | [События чатов](/en/reference/api/communications/get-api-v1-seller-events)                   |
| `POST` | `/api/v1/seller/message`       | [Отправить сообщение](/en/reference/api/communications/post-api-v1-seller-message)           |
| `GET`  | `/api/v1/seller/download/{id}` | [Получить файл из сообщения](/en/reference/api/communications/get-api-v1-seller-download-id) |

## Возвраты покупателями

| Method  | Path             | Operation                                                                           |
| ------- | ---------------- | ----------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/claims` | [Заявки покупателей на возврат](/en/reference/api/communications/get-api-v1-claims) |
| `PATCH` | `/api/v1/claim`  | [Ответ на заявку покупателя](/en/reference/api/communications/patch-api-v1-claim)   |
