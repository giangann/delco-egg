import IController from 'IController';
import httpStatusCode from 'http-status-codes';
import { IOrderDetail } from 'order-detail.interface';
import { IOrderEntity } from 'order.interface';
import application from '../../constants/application';
import orderService from '../../services/admin/order.service';
import ApiResponse from '../../utilities/api-response.utility';

const todayOverview: IController = async (req, res) => {
  try {
    let yesterday = req.query.yesterday as string;
    let orderListParams = {
      limit: req.body.limit,
      page: req.body.page,
      date: req.query.date as string,
      status: application.status.SUCCESS,
    };
    // get order today with success status
    const todayOrderList = await orderService.list(orderListParams);
    // get order yesterday with success status
    const yesterdayOrderList = await orderService.list({
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

export default {
  todayOverview,
};
