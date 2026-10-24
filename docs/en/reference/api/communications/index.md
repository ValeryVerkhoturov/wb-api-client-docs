---
title: "Customer Communication"
description: "Module `communications` has 25 operations."
---

# Customer Communication · `communications`

Module `communications` has 25 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/communications) · [All modules](/en/reference/api/)

Management of customer inquiries and feedback, chats, and returns processing

You can test the customer communication methods in the [sandbox](https://dev.wildberries.ru/en/sandbox). Also you can use [special methods](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/questionsAndFeedbacks) in the sandbox for managing test feedbacks and questions

You can learn how to use methods in business cases in the [instructions](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-0b26-7620-8d0b-e3050b7cd01d/communicating-with-customers) on working with **Customer Communication** section

## Questions

| Method  | Path                                 | Operation                                                                                             |
| ------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/new-feedbacks-questions`    | [Unseen Feedbacks and Questions](/en/reference/api/communications/get-api-v1-new-feedbacks-questions) |
| `GET`   | `/api/v1/questions/count-unanswered` | [Unanswered Questions](/en/reference/api/communications/get-api-v1-questions-count-unanswered)        |
| `GET`   | `/api/v1/questions/count`            | [Number of Questions](/en/reference/api/communications/get-api-v1-questions-count)                    |
| `GET`   | `/api/v1/questions`                  | [Questions List](/en/reference/api/communications/get-api-v1-questions)                               |
| `PATCH` | `/api/v1/questions`                  | [Working with Questions](/en/reference/api/communications/patch-api-v1-questions)                     |
| `GET`   | `/api/v1/question`                   | [Get the Question by ID](/en/reference/api/communications/get-api-v1-question)                        |

## Feedbacks

| Method  | Path                                 | Operation                                                                                         |
| ------- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/feedbacks/count-unanswered` | [Unanswered Feedbacks](/en/reference/api/communications/get-api-v1-feedbacks-count-unanswered)    |
| `GET`   | `/api/v1/feedbacks/count`            | [Number of Feedbacks](/en/reference/api/communications/get-api-v1-feedbacks-count)                |
| `GET`   | `/api/v1/feedbacks`                  | [Feedbacks List](/en/reference/api/communications/get-api-v1-feedbacks)                           |
| `POST`  | `/api/v1/feedbacks/answer`           | [Reply to Feedback](/en/reference/api/communications/post-api-v1-feedbacks-answer)                |
| `PATCH` | `/api/v1/feedbacks/answer`           | [Edit Response to Feedback](/en/reference/api/communications/patch-api-v1-feedbacks-answer)       |
| `POST`  | `/api/v1/feedbacks/order/return`     | [Return Item by Feedback ID](/en/reference/api/communications/post-api-v1-feedbacks-order-return) |
| `GET`   | `/api/v1/feedback`                   | [Get the Feedback by ID](/en/reference/api/communications/get-api-v1-feedback)                    |
| `GET`   | `/api/v1/feedbacks/archive`          | [List of Archived Feedbacks](/en/reference/api/communications/get-api-v1-feedbacks-archive)       |

## Pinned Feedbacks

| Method   | Path                            | Operation                                                                                               |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/feedbacks/v1/pins`        | [List of Pinned and Unpinned Feedbacks](/en/reference/api/communications/get-api-feedbacks-v1-pins)     |
| `POST`   | `/api/feedbacks/v1/pins`        | [Pin Feedbacks](/en/reference/api/communications/post-api-feedbacks-v1-pins)                            |
| `DELETE` | `/api/feedbacks/v1/pins`        | [Unpin Feedback](/en/reference/api/communications/delete-api-feedbacks-v1-pins)                         |
| `GET`    | `/api/feedbacks/v1/pins/count`  | [Pinned and Unpinned Feedback Number](/en/reference/api/communications/get-api-feedbacks-v1-pins-count) |
| `GET`    | `/api/feedbacks/v1/pins/limits` | [Pinned Feedback Limits](/en/reference/api/communications/get-api-feedbacks-v1-pins-limits)             |

## Buyers Chat

| Method | Path                           | Operation                                                                                   |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/seller/chats`         | [Chats List](/en/reference/api/communications/get-api-v1-seller-chats)                      |
| `GET`  | `/api/v1/seller/events`        | [Chat Events](/en/reference/api/communications/get-api-v1-seller-events)                    |
| `POST` | `/api/v1/seller/message`       | [Send Message](/en/reference/api/communications/post-api-v1-seller-message)                 |
| `GET`  | `/api/v1/seller/download/{id}` | [Get File from the Message](/en/reference/api/communications/get-api-v1-seller-download-id) |

## Buyers Returns

| Method  | Path             | Operation                                                                        |
| ------- | ---------------- | -------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/claims` | [Buyers Return Applications](/en/reference/api/communications/get-api-v1-claims) |
| `PATCH` | `/api/v1/claim`  | [Answer Buyers Application](/en/reference/api/communications/patch-api-v1-claim) |
