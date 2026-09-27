---
title: "Маркетинг и продвижение"
description: "Module `promotion` has 42 operations."
---

# Маркетинг и продвижение · `promotion`

Module `promotion` has 42 operations.

[WB documentation ↗](https://dev.wildberries.ru/openapi/promotion) · [All modules](/en/reference/api/)

Узнать больше о маркетинге и продвижении можно в [справочном центре](https://seller.wildberries.ru/instructions/category/59d92bd3-6ea0-40f2-b762-ca8835d7d42e?goBackOption=prevRoute&categoryId=479385c6-de01-4b4d-ad4e-ed941e65582e)

Методы маркетинга и продвижения позволяют:

1. Получать информацию о кампаниях [продвижения](https://dev.wildberries.ru/openapi/promotion#tag/campaigns) и [медиакампаниях](https://dev.wildberries.ru/openapi/promotion#tag/media)
2. [Создавать](https://dev.wildberries.ru/openapi/promotion#tag/creatingCampaigns) и [управлять](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement) кампаниями
3. Управлять [финансами](https://dev.wildberries.ru/openapi/promotion#tag/finances) кампаний
4. Выгружать [статистику](https://dev.wildberries.ru/openapi/promotion#tag/statistics) кампаний продвижения и медиакампаний
5. Работать с [календарём акций](https://dev.wildberries.ru/openapi/promotion#tag/promoCalendar)
   Данные синхронизируются с базой раз в 3 минуты. Статусы кампаний меняются раз в минуту. Ставки кампаний меняются раз в 30 секунд.

Вы можете протестировать методы продвижения в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/promotion) для управления тестовым балансом

## Кампании

| Method | Path                      | Operation                                                                       |
| ------ | ------------------------- | ------------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/promotion/count` | [Списки кампаний](/en/reference/api/promotion/get-adv-v1-promotion-count)       |
| `GET`  | `/api/advert/v2/adverts`  | [Информация о кампаниях](/en/reference/api/promotion/get-api-advert-v2-adverts) |

## Создание кампаний

| Method | Path                        | Operation                                                                                          |
| ------ | --------------------------- | -------------------------------------------------------------------------------------------------- |
| `POST` | `/api/advert/v1/bids/min`   | [Минимальные ставки для карточек товаров](/en/reference/api/promotion/post-api-advert-v1-bids-min) |
| `POST` | `/adv/v2/seacat/save-ad`    | [Создать кампанию](/en/reference/api/promotion/post-adv-v2-seacat-save-ad)                         |
| `GET`  | `/adv/v1/supplier/subjects` | [Предметы для кампаний](/en/reference/api/promotion/get-adv-v1-supplier-subjects)                  |
| `POST` | `/adv/v2/supplier/nms`      | [Карточки товаров для кампаний](/en/reference/api/promotion/post-adv-v2-supplier-nms)              |

## Управление кампаниями

| Method  | Path                                  | Operation                                                                                                                             |
| ------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/adv/v0/delete`                      | [Удаление кампании](/en/reference/api/promotion/get-adv-v0-delete)                                                                    |
| `POST`  | `/adv/v0/rename`                      | [Переименование кампании](/en/reference/api/promotion/post-adv-v0-rename)                                                             |
| `GET`   | `/adv/v0/start`                       | [Запуск кампании](/en/reference/api/promotion/get-adv-v0-start)                                                                       |
| `GET`   | `/adv/v0/pause`                       | [Пауза кампании](/en/reference/api/promotion/get-adv-v0-pause)                                                                        |
| `GET`   | `/adv/v0/stop`                        | [Завершение кампании](/en/reference/api/promotion/get-adv-v0-stop)                                                                    |
| `PUT`   | `/adv/v0/auction/placements`          | [Изменение мест размещения в кампаниях с ручной ставкой](/en/reference/api/promotion/put-adv-v0-auction-placements)                   |
| `PATCH` | `/api/advert/v1/bids`                 | [Изменение ставок в кампаниях](/en/reference/api/promotion/patch-api-advert-v1-bids)                                                  |
| `PATCH` | `/adv/v0/auction/nms`                 | [Изменение списка карточек товаров в кампаниях](/en/reference/api/promotion/patch-adv-v0-auction-nms)                                 |
| `GET`   | `/api/advert/v0/bids/recommendations` | [Рекомендуемые ставки для карточек товаров и поисковых кластеров](/en/reference/api/promotion/get-api-advert-v0-bids-recommendations) |
| `GET`   | `/api/advert/v1/config`               | [Конфигурационные значения продвижения](/en/reference/api/promotion/get-api-advert-v1-config)                                         |
| `GET`   | `/api/advert/v0/daily-limits`         | [Получить настройки дневных лимитов кампаний](/en/reference/api/promotion/get-api-advert-v0-daily-limits)                             |
| `PUT`   | `/api/advert/v0/daily-limits`         | [Настройка дневных лимитов кампаний](/en/reference/api/promotion/put-api-advert-v0-daily-limits)                                      |

## Финансы

| Method | Path                     | Operation                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/balance`        | [Баланс](/en/reference/api/promotion/get-adv-v1-balance)                              |
| `POST` | `/api/advert/v2/budget`  | [Остатки бюджетов кампаний](/en/reference/api/promotion/post-api-advert-v2-budget)    |
| `GET`  | `/adv/v1/budget`         | [Бюджет кампании](/en/reference/api/promotion/get-adv-v1-budget)                      |
| `POST` | `/adv/v1/budget/deposit` | [Пополнение бюджета кампании](/en/reference/api/promotion/post-adv-v1-budget-deposit) |
| `GET`  | `/adv/v1/upd`            | [Получение истории затрат](/en/reference/api/promotion/get-adv-v1-upd)                |
| `GET`  | `/adv/v1/payments`       | [Получение истории пополнений счёта](/en/reference/api/promotion/get-adv-v1-payments) |

## Статистика

| Method | Path                      | Operation                                                                                                           |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/adv/v0/normquery/stats` | [Статистика поисковых кластеров](/en/reference/api/promotion/post-adv-v0-normquery-stats)                           |
| `GET`  | `/adv/v3/fullstats`       | [Статистика кампаний](/en/reference/api/promotion/get-adv-v3-fullstats)                                             |
| `POST` | `/adv/v1/stats`           | [Статистика медиакампаний](/en/reference/api/promotion/post-adv-v1-stats)                                           |
| `POST` | `/adv/v1/normquery/stats` | [Статистика по поисковым кластерам с детализацией по дням](/en/reference/api/promotion/post-adv-v1-normquery-stats) |

## Поисковые кластеры

| Method   | Path                            | Operation                                                                                                                             |
| -------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/adv/v0/normquery/get-bids`    | [Список ставок поисковых кластеров](/en/reference/api/promotion/post-adv-v0-normquery-get-bids)                                       |
| `POST`   | `/api/advert/v1/normquery/bids` | [Установить ставки для поисковых кластеров в валюте аккаунта продавца](/en/reference/api/promotion/post-api-advert-v1-normquery-bids) |
| `POST`   | `/adv/v0/normquery/bids`        | [Установить ставки для поисковых кластеров](/en/reference/api/promotion/post-adv-v0-normquery-bids)                                   |
| `DELETE` | `/adv/v0/normquery/bids`        | [Удалить ставки поисковых кластеров](/en/reference/api/promotion/delete-adv-v0-normquery-bids)                                        |
| `POST`   | `/adv/v0/normquery/get-minus`   | [Список минус-фраз кампаний](/en/reference/api/promotion/post-adv-v0-normquery-get-minus)                                             |
| `POST`   | `/adv/v0/normquery/set-minus`   | [Установка и удаление минус-фраз](/en/reference/api/promotion/post-adv-v0-normquery-set-minus)                                        |
| `POST`   | `/adv/v0/normquery/list`        | [Списки активных и неактивных поисковых кластеров](/en/reference/api/promotion/post-adv-v0-normquery-list)                            |

## Медиа

| Method | Path              | Operation                                                                   |
| ------ | ----------------- | --------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/count`   | [Количество медиакампаний](/en/reference/api/promotion/get-adv-v1-count)    |
| `GET`  | `/adv/v1/adverts` | [Список медиакампаний](/en/reference/api/promotion/get-adv-v1-adverts)      |
| `GET`  | `/adv/v1/advert`  | [Информация о медиакампании](/en/reference/api/promotion/get-adv-v1-advert) |

## Календарь акций

| Method | Path                                        | Operation                                                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/calendar/promotions`               | [Список акций](/en/reference/api/promotion/get-api-v1-calendar-promotions)                                     |
| `GET`  | `/api/v1/calendar/promotions/details`       | [Детальная информация об акциях](/en/reference/api/promotion/get-api-v1-calendar-promotions-details)           |
| `GET`  | `/api/v1/calendar/promotions/nomenclatures` | [Список товаров для участия в акции](/en/reference/api/promotion/get-api-v1-calendar-promotions-nomenclatures) |
| `POST` | `/api/v1/calendar/promotions/upload`        | [Добавить товар в акцию](/en/reference/api/promotion/post-api-v1-calendar-promotions-upload)                   |
