---
title: "Поставки FBW"
description: "Операций модуля `orders-fbw` — 14."
---

# Поставки FBW · `orders-fbw`

Операций модуля `orders-fbw` — 14.

[Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbw) · [Все модули](/reference/api/)

Узнать больше о поставках FBW можно в [справочном центре](https://seller.wildberries.ru/instructions/subcategory/5a8e1202-0865-45b7-acae-5d0afc7add56?goBackOption=prevRoute&categoryId=479385c6-de01-4b4d-ad4e-ed941e65582e)

В разделе описаны методы получения:

- [информации для формирования поставок](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies)
- [информации о поставках](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation)
  Вы можете создавать карточки товара в песочнице [Контента](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov), а потом использовать баркоды товаров в [песочнице](https://dev.wildberries.ru/sandbox) Поставок

## Информация для формирования поставок

| Метод  | Путь                         | Операция                                                                       |
| ------ | ---------------------------- | ------------------------------------------------------------------------------ |
| `POST` | `/api/v1/acceptance/options` | [Опции приёмки](/reference/api/orders-fbw/post-api-v1-acceptance-options)      |
| `GET`  | `/api/v1/warehouses`         | [Список складов](/reference/api/orders-fbw/get-api-v1-warehouses)              |
| `GET`  | `/api/v1/transit-tariffs`    | [Транзитные направления](/reference/api/orders-fbw/get-api-v1-transit-tariffs) |

## Информация о поставках

| Метод  | Путь                                        | Операция                                                                                       |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `POST` | `/api/v1/supplies`                          | [Список поставок](/reference/api/orders-fbw/post-api-v1-supplies)                              |
| `GET`  | `/api/v1/supplies/{ID}`                     | [Детали поставки](/reference/api/orders-fbw/get-api-v1-supplies-id)                            |
| `GET`  | `/api/v1/supplies/{ID}/goods`               | [Товары поставки](/reference/api/orders-fbw/get-api-v1-supplies-id-goods)                      |
| `GET`  | `/api/v1/supplies/{ID}/package`             | [Упаковка поставки](/reference/api/orders-fbw/get-api-v1-supplies-id-package)                  |
| `GET`  | `/api/supplies/v1/discrepancies/{supplyId}` | [Расхождения в поставке](/reference/api/orders-fbw/get-api-supplies-v1-discrepancies-supplyid) |

## Черновики поставок

| Метод    | Путь                                      | Операция                                                                                             |
| -------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/supplies/v1/drafts`                 | [Список черновиков](/reference/api/orders-fbw/get-api-supplies-v1-drafts)                            |
| `POST`   | `/api/supplies/v1/drafts`                 | [Создать черновик](/reference/api/orders-fbw/post-api-supplies-v1-drafts)                            |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}`       | [Удалить черновик](/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid)                  |
| `GET`    | `/api/supplies/v1/drafts/{draftId}/items` | [Список товаров в черновике](/reference/api/orders-fbw/get-api-supplies-v1-drafts-draftid-items)     |
| `POST`   | `/api/supplies/v1/drafts/{draftId}/items` | [Добавить товары в черновик](/reference/api/orders-fbw/post-api-supplies-v1-drafts-draftid-items)    |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}/items` | [Удалить товары из черновика](/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid-items) |
