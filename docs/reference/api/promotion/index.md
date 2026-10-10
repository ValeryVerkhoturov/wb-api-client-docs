---
title: "Маркетинг и продвижение"
description: "Операций модуля `promotion` — 42."
---

# Маркетинг и продвижение · `promotion`

Операций модуля `promotion` — 42.

[Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/promotion/) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/promotion) · [Все модули](/reference/api/)

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

| Метод | Путь                      | Операция                                                                     |
| ----- | ------------------------- | ---------------------------------------------------------------------------- |
| `GET` | `/adv/v1/promotion/count` | [Списки кампаний](/reference/api/promotion/get-adv-v1-promotion-count)       |
| `GET` | `/api/advert/v2/adverts`  | [Информация о кампаниях](/reference/api/promotion/get-api-advert-v2-adverts) |

## Создание кампаний

| Метод  | Путь                        | Операция                                                                                        |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------------- |
| `POST` | `/api/advert/v1/bids/min`   | [Минимальные ставки для карточек товаров](/reference/api/promotion/post-api-advert-v1-bids-min) |
| `POST` | `/adv/v2/seacat/save-ad`    | [Создать кампанию](/reference/api/promotion/post-adv-v2-seacat-save-ad)                         |
| `GET`  | `/adv/v1/supplier/subjects` | [Предметы для кампаний](/reference/api/promotion/get-adv-v1-supplier-subjects)                  |
| `POST` | `/adv/v2/supplier/nms`      | [Карточки товаров для кампаний](/reference/api/promotion/post-adv-v2-supplier-nms)              |

## Управление кампаниями

| Метод   | Путь                                  | Операция                                                                                                                           |
| ------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/adv/v0/delete`                      | [Удаление кампании](/reference/api/promotion/get-adv-v0-delete)                                                                    |
| `POST`  | `/adv/v0/rename`                      | [Переименование кампании](/reference/api/promotion/post-adv-v0-rename)                                                             |
| `GET`   | `/adv/v0/start`                       | [Запуск кампании](/reference/api/promotion/get-adv-v0-start)                                                                       |
| `GET`   | `/adv/v0/pause`                       | [Пауза кампании](/reference/api/promotion/get-adv-v0-pause)                                                                        |
| `GET`   | `/adv/v0/stop`                        | [Завершение кампании](/reference/api/promotion/get-adv-v0-stop)                                                                    |
| `PUT`   | `/adv/v0/auction/placements`          | [Изменение мест размещения в кампаниях с ручной ставкой](/reference/api/promotion/put-adv-v0-auction-placements)                   |
| `PATCH` | `/api/advert/v1/bids`                 | [Изменение ставок в кампаниях](/reference/api/promotion/patch-api-advert-v1-bids)                                                  |
| `PATCH` | `/adv/v0/auction/nms`                 | [Изменение списка карточек товаров в кампаниях](/reference/api/promotion/patch-adv-v0-auction-nms)                                 |
| `GET`   | `/api/advert/v0/bids/recommendations` | [Рекомендуемые ставки для карточек товаров и поисковых кластеров](/reference/api/promotion/get-api-advert-v0-bids-recommendations) |
| `GET`   | `/api/advert/v1/config`               | [Конфигурационные значения продвижения](/reference/api/promotion/get-api-advert-v1-config)                                         |
| `GET`   | `/api/advert/v0/daily-limits`         | [Получить настройки дневных лимитов кампаний](/reference/api/promotion/get-api-advert-v0-daily-limits)                             |
| `PUT`   | `/api/advert/v0/daily-limits`         | [Настройка дневных лимитов кампаний](/reference/api/promotion/put-api-advert-v0-daily-limits)                                      |

## Финансы

| Метод  | Путь                     | Операция                                                                           |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/balance`        | [Баланс](/reference/api/promotion/get-adv-v1-balance)                              |
| `POST` | `/api/advert/v2/budget`  | [Остатки бюджетов кампаний](/reference/api/promotion/post-api-advert-v2-budget)    |
| `GET`  | `/adv/v1/budget`         | [Бюджет кампании](/reference/api/promotion/get-adv-v1-budget)                      |
| `POST` | `/adv/v1/budget/deposit` | [Пополнение бюджета кампании](/reference/api/promotion/post-adv-v1-budget-deposit) |
| `GET`  | `/adv/v1/upd`            | [Получение истории затрат](/reference/api/promotion/get-adv-v1-upd)                |
| `GET`  | `/adv/v1/payments`       | [Получение истории пополнений счёта](/reference/api/promotion/get-adv-v1-payments) |

## Статистика

| Метод  | Путь                      | Операция                                                                                                         |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `POST` | `/adv/v0/normquery/stats` | [Статистика поисковых кластеров](/reference/api/promotion/post-adv-v0-normquery-stats)                           |
| `GET`  | `/adv/v3/fullstats`       | [Статистика кампаний](/reference/api/promotion/get-adv-v3-fullstats)                                             |
| `POST` | `/adv/v1/stats`           | [Статистика медиакампаний](/reference/api/promotion/post-adv-v1-stats)                                           |
| `POST` | `/adv/v1/normquery/stats` | [Статистика по поисковым кластерам с детализацией по дням](/reference/api/promotion/post-adv-v1-normquery-stats) |

## Поисковые кластеры

| Метод    | Путь                            | Операция                                                                                                                           |
| -------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/adv/v0/normquery/get-bids`    | [Список ставок поисковых кластеров](/reference/api/promotion/post-adv-v0-normquery-get-bids)                                       |
| `POST`   | `/api/advert/v1/normquery/bids` | [Установить ставки для поисковых кластеров в валюте аккаунта продавца](/reference/api/promotion/post-api-advert-v1-normquery-bids) |
| `POST`   | `/adv/v0/normquery/bids`        | [Установить ставки для поисковых кластеров](/reference/api/promotion/post-adv-v0-normquery-bids)                                   |
| `DELETE` | `/adv/v0/normquery/bids`        | [Удалить ставки поисковых кластеров](/reference/api/promotion/delete-adv-v0-normquery-bids)                                        |
| `POST`   | `/adv/v0/normquery/get-minus`   | [Список минус-фраз кампаний](/reference/api/promotion/post-adv-v0-normquery-get-minus)                                             |
| `POST`   | `/adv/v0/normquery/set-minus`   | [Установка и удаление минус-фраз](/reference/api/promotion/post-adv-v0-normquery-set-minus)                                        |
| `POST`   | `/adv/v0/normquery/list`        | [Списки активных и неактивных поисковых кластеров](/reference/api/promotion/post-adv-v0-normquery-list)                            |

## Медиа

| Метод | Путь              | Операция                                                                 |
| ----- | ----------------- | ------------------------------------------------------------------------ |
| `GET` | `/adv/v1/count`   | [Количество медиакампаний](/reference/api/promotion/get-adv-v1-count)    |
| `GET` | `/adv/v1/adverts` | [Список медиакампаний](/reference/api/promotion/get-adv-v1-adverts)      |
| `GET` | `/adv/v1/advert`  | [Информация о медиакампании](/reference/api/promotion/get-adv-v1-advert) |

## Календарь акций

| Метод  | Путь                                        | Операция                                                                                                    |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/calendar/promotions`               | [Список акций](/reference/api/promotion/get-api-v1-calendar-promotions)                                     |
| `GET`  | `/api/v1/calendar/promotions/details`       | [Детальная информация об акциях](/reference/api/promotion/get-api-v1-calendar-promotions-details)           |
| `GET`  | `/api/v1/calendar/promotions/nomenclatures` | [Список товаров для участия в акции](/reference/api/promotion/get-api-v1-calendar-promotions-nomenclatures) |
| `POST` | `/api/v1/calendar/promotions/upload`        | [Добавить товар в акцию](/reference/api/promotion/post-api-v1-calendar-promotions-upload)                   |
