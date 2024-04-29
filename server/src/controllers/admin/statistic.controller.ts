import IController from 'IController';
import httpStatusCode from 'http-status-codes';
import { IOrderDetail } from 'order-detail.interface';
import { IOrderEntity } from 'order.interface';
import {
  IEggPriceQtyHistoryRecord,
  IEggPriceQtyHistoryEntity,
} from 'egg-price-qty-history.interface';

import application from '../../constants/application';
import orderService from '../../services/admin/order.service';
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import eggPriceQtyHistoryService from '../../services/admin/egg-price-qty-history.service';
import DateTimeUtility from '../../utilities/date-time.utility';
import eggService from '../../services/admin/egg.service';
import { IEggListParams } from 'egg.interface';

const todayOverview: IController = async (req, res) => {
  try {
    let yesterday = req.query.yesterday as string;
    let orderListParams = {
      limit: Number(req.query.limit as string),
      page: Number(req.query.page as string),
      date: req.query.date as string,
      status: application.status.SUCCESS,
    };
    // get order today with success status
    const { response: todayOrderList } = await orderService.list(
      orderListParams,
    );
    // get order yesterday with success status
    const { response: yesterdayOrderList } = await orderService.list({
      ...orderListParams,
      date: yesterday,
    });

    // return data: sum of total, sum of quantity, avg per unit
    let todayData = caculateRevenueByDate(todayOrderList);
    let yesterdayData = caculateRevenueByDate(yesterdayOrderList);

    let overViewData = {
      ...todayData,
      diffAvg: todayData.toDayAverage - yesterdayData.toDayAverage,
    };

    ApiResponse.result(res, overViewData, httpStatusCode.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCode.BAD_REQUEST, e);
  }
};

// helper function calculate yesterday Revenue
function caculateRevenueByDate(orderList: IOrderEntity[]) {
  // return data: sum of total, sum of quantity
  // calculate sum of total and sum of quantity
  let sumTotal = 0;
  let sumQty = 0;
  for (let order of orderList) {
    // sum of total
    let totalOfOrder = totalByOrderItems(order.items);
    sumTotal += totalOfOrder;

    // sum of quantity
    let totalOrderQty = quantityByOrderItems(order.items);
    sumQty += totalOrderQty;
  }
  let data = {
    sumTotal,
    sumQty,
    toDayAverage: Math.round(sumTotal / sumQty),
  };
  return data;
}
// helper function
function totalByOrderItems(orderItems: IOrderDetail[]) {
  let total = 0;
  for (let item of orderItems) {
    let totalOfItem = item.quantity * item.deal_price;
    total += totalOfItem;
  }
  return total;
}

// helper function
function quantityByOrderItems(orderItems: IOrderDetail[]) {
  let quantity = 0;
  for (let item of orderItems) {
    quantity += item.quantity;
  }
  return quantity;
}

const getEggPriceQtyHistory: IController = async (req, res) => {
  try {
    let startDate = ApiUtility.getQueryParam(req, 'start_date');
    let endDate = ApiUtility.getQueryParam(req, 'end_date');
    let isDeleted = ApiUtility.getQueryParam(req, 'isDeleted');

    let historyTableData = await eggPriceQtyHistoryService.list({
      startDate,
      endDate,
    });

    // get eggs
    let params: IEggListParams = {};
    if (isDeleted) params.isDeleted = isDeleted;
    let eggs = await eggService.list(params);

    // calculate labels and datasets
    let labels: string[] = getDateLabels(historyTableData, 'DESC');

    // calculate datasets
    // datasets is array of object
    // each object have to 2 field: label and data[]
    // each elements of data array is number calculate from async helper function
    let datasetsPromise = eggs.map(async (egg) => {
      let dataPromise = labels.map(async (date) => {
        return await getEggPriceInDate(egg.id, date);
      });
      let data = await Promise.all(dataPromise);
      return { label: egg.type_name, data };
    });

    let datasets = await Promise.all(datasetsPromise);

    ApiResponse.result(res, { labels, datasets }, httpStatusCode.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// helper function
async function getEggPriceInDate(egg_id: number, date: string) {
  let eggPricesInDate = await eggPriceQtyHistoryService.list({ date });

  for (let row of eggPricesInDate) {
    if (row.egg_id === egg_id) {
      return row.price_1;
    }
  }
  return null;
}

// helper function
function getDateLabels(
  data: IEggPriceQtyHistoryRecord[],
  sort?: 'ASC' | 'DESC',
) {
  let labels: string[] = [];
  for (let row of data) {
    if (!labels.includes(row.date)) {
      labels.push(row.date);
    }
  }
  if (sort === 'DESC') return labels.sort((a, b) => compareDate(a, b));

  // default is ascending, same with sort='ASC'
  labels.sort();

  return labels;
}

// helper function
function compareDate(date1: string, date2: string) {
  if (date1 >= date2) return -1;
  else return 1;
}
const getEggPriceQtyByDate: IController = async (req, res) => {
  try {
    const date = ApiUtility.getQueryParam(req, 'date');
    const yesterday = ApiUtility.getQueryParam(req, 'yesterday');

    let data = await eggPriceQtyHistoryService.list({ date });
    let yesterdayData = await eggPriceQtyHistoryService.list({
      date: yesterday,
    });

    ApiResponse.result(res, data, httpStatusCode.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// helper function
function comparePrice(
  todayPrice: IEggPriceQtyHistoryEntity[],
  yesterdayPrice: IEggPriceQtyHistoryEntity[],
) {
  let diffPrice: {};

  // loop throw each row of todayPrice and yesterdayPrice
  for (let iPrice of todayPrice) {
    for (let jPrice of yesterdayPrice) {
      if (iPrice.egg_id === jPrice.egg_id) {
        // compare 3 price of each type
        let diffP1 = iPrice.price_1 - jPrice.price_1;
        let diffP2 = jPrice.price_2 - jPrice.price_2;
        let diffP3 = jPrice.price_3 - jPrice.price_3;
        // diffPrice[`${iPrice.egg_id}` as any] = [diffP1, diffP2, diffP3];
      }
    }
  }

  for (let price of todayPrice) {
  }
}

export default {
  todayOverview,
  getEggPriceQtyHistory,
  getEggPriceQtyByDate,
};
