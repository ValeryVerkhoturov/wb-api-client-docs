---
title: "Marketing and Promotion"
description: "Module `promotion` has 42 operations."
---

# Marketing and Promotion · `promotion`

Module `promotion` has 42 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/promotion) · [All modules](/en/reference/api/)

Promo calendar, campaign management, bid settings, financial data accounting, and settings for with standard and custom bid and media campaigns.
Data synchronization from the database occurs every 3 minutes. Status changes occur every 1 minute. The bid change occurs every 30 seconds. The latest changes are saved within the intervals.

## Campaigns

| Method | Path                      | Operation                                                                      |
| ------ | ------------------------- | ------------------------------------------------------------------------------ |
| `GET`  | `/adv/v1/promotion/count` | [Campaigns Lists](/en/reference/api/promotion/get-adv-v1-promotion-count)      |
| `GET`  | `/api/advert/v2/adverts`  | [Campaigns Information](/en/reference/api/promotion/get-api-advert-v2-adverts) |

## Creating Campaigns

| Method | Path                        | Operation                                                                               |
| ------ | --------------------------- | --------------------------------------------------------------------------------------- |
| `POST` | `/api/advert/v1/bids/min`   | [Minimum Bids for Listings](/en/reference/api/promotion/post-api-advert-v1-bids-min)    |
| `POST` | `/adv/v2/seacat/save-ad`    | [Create Campaign](/en/reference/api/promotion/post-adv-v2-seacat-save-ad)               |
| `GET`  | `/adv/v1/supplier/subjects` | [Subcategories for Campaigns](/en/reference/api/promotion/get-adv-v1-supplier-subjects) |
| `POST` | `/adv/v2/supplier/nms`      | [Listings for Campaigns](/en/reference/api/promotion/post-adv-v2-supplier-nms)          |

## Campaign Management

| Method  | Path                                  | Operation                                                                                                            |
| ------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/adv/v0/delete`                      | [Delete Campaign](/en/reference/api/promotion/get-adv-v0-delete)                                                     |
| `POST`  | `/adv/v0/rename`                      | [Rename Campaign](/en/reference/api/promotion/post-adv-v0-rename)                                                    |
| `GET`   | `/adv/v0/start`                       | [Launch Campaign](/en/reference/api/promotion/get-adv-v0-start)                                                      |
| `GET`   | `/adv/v0/pause`                       | [Pause Campaign](/en/reference/api/promotion/get-adv-v0-pause)                                                       |
| `GET`   | `/adv/v0/stop`                        | [Stop Campaign](/en/reference/api/promotion/get-adv-v0-stop)                                                         |
| `PUT`   | `/adv/v0/auction/placements`          | [Changing Placements in Campaigns with Custom Bid](/en/reference/api/promotion/put-adv-v0-auction-placements)        |
| `PATCH` | `/api/advert/v1/bids`                 | [Changing Campaigns Bids](/en/reference/api/promotion/patch-api-advert-v1-bids)                                      |
| `PATCH` | `/adv/v0/auction/nms`                 | [Changing the Listings in Campaigns](/en/reference/api/promotion/patch-adv-v0-auction-nms)                           |
| `GET`   | `/api/advert/v0/bids/recommendations` | [Recommended bids for items and search clusters](/en/reference/api/promotion/get-api-advert-v0-bids-recommendations) |
| `GET`   | `/api/advert/v1/config`               | [Promotion Configuration Values](/en/reference/api/promotion/get-api-advert-v1-config)                               |
| `GET`   | `/api/advert/v0/daily-limits`         | [Get Campaign Daily Limits Settings](/en/reference/api/promotion/get-api-advert-v0-daily-limits)                     |
| `PUT`   | `/api/advert/v0/daily-limits`         | [Set Campaign Daily Limits](/en/reference/api/promotion/put-api-advert-v0-daily-limits)                              |

## Finances

| Method | Path                     | Operation                                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/balance`        | [Balance](/en/reference/api/promotion/get-adv-v1-balance)                                   |
| `POST` | `/api/advert/v2/budget`  | [Campaign Budget Balances](/en/reference/api/promotion/post-api-advert-v2-budget)           |
| `GET`  | `/adv/v1/budget`         | [Campaign Budget](/en/reference/api/promotion/get-adv-v1-budget)                            |
| `POST` | `/adv/v1/budget/deposit` | [Top-up of the Campaign Budget](/en/reference/api/promotion/post-adv-v1-budget-deposit)     |
| `GET`  | `/adv/v1/upd`            | [Receiving Costs History](/en/reference/api/promotion/get-adv-v1-upd)                       |
| `GET`  | `/adv/v1/payments`       | [Receiving the History of Account Top-ups](/en/reference/api/promotion/get-adv-v1-payments) |

## Statistics

| Method | Path                      | Operation                                                                                   |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------- |
| `POST` | `/adv/v0/normquery/stats` | [Search Clusters Statistics](/en/reference/api/promotion/post-adv-v0-normquery-stats)       |
| `GET`  | `/adv/v3/fullstats`       | [Campaigns Statistics](/en/reference/api/promotion/get-adv-v3-fullstats)                    |
| `POST` | `/adv/v1/stats`           | [Media Campaign Statistics](/en/reference/api/promotion/post-adv-v1-stats)                  |
| `POST` | `/adv/v1/normquery/stats` | [Daily Search Clusters Statistics](/en/reference/api/promotion/post-adv-v1-normquery-stats) |

## Search Clusters

| Method   | Path                            | Operation                                                                                                                           |
| -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/adv/v0/normquery/get-bids`    | [List of Search Clusters Bids](/en/reference/api/promotion/post-adv-v0-normquery-get-bids)                                          |
| `POST`   | `/api/advert/v1/normquery/bids` | [Set Bids for Search Clusters in the Currency of the Seller Account](/en/reference/api/promotion/post-api-advert-v1-normquery-bids) |
| `POST`   | `/adv/v0/normquery/bids`        | [Set Bids for Search Clusters](/en/reference/api/promotion/post-adv-v0-normquery-bids)                                              |
| `DELETE` | `/adv/v0/normquery/bids`        | [Delete Bids from Search Clusters](/en/reference/api/promotion/delete-adv-v0-normquery-bids)                                        |
| `POST`   | `/adv/v0/normquery/get-minus`   | [List of Campaign Minus Phrases](/en/reference/api/promotion/post-adv-v0-normquery-get-minus)                                       |
| `POST`   | `/adv/v0/normquery/set-minus`   | [Setting and Deleting Minus Phrases](/en/reference/api/promotion/post-adv-v0-normquery-set-minus)                                   |
| `POST`   | `/adv/v0/normquery/list`        | [Active and Inactive Search Cluster Lists](/en/reference/api/promotion/post-adv-v0-normquery-list)                                  |

## Media

| Method | Path              | Operation                                                                         |
| ------ | ----------------- | --------------------------------------------------------------------------------- |
| `GET`  | `/adv/v1/count`   | [Media Campaigns Number](/en/reference/api/promotion/get-adv-v1-count)            |
| `GET`  | `/adv/v1/adverts` | [List of Media Campaigns](/en/reference/api/promotion/get-adv-v1-adverts)         |
| `GET`  | `/adv/v1/advert`  | [Information About Media Campaign](/en/reference/api/promotion/get-adv-v1-advert) |

## Promo Calendar

| Method | Path                                        | Operation                                                                                                                |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/calendar/promotions`               | [Promos List](/en/reference/api/promotion/get-api-v1-calendar-promotions)                                                |
| `GET`  | `/api/v1/calendar/promotions/details`       | [Promos Details](/en/reference/api/promotion/get-api-v1-calendar-promotions-details)                                     |
| `GET`  | `/api/v1/calendar/promotions/nomenclatures` | [List of Items for Participating in the Promo](/en/reference/api/promotion/get-api-v1-calendar-promotions-nomenclatures) |
| `POST` | `/api/v1/calendar/promotions/upload`        | [Add Item to the Promo](/en/reference/api/promotion/post-api-v1-calendar-promotions-upload)                              |
