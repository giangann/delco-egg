import IController from 'IController';
import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import { IOrderDetail } from 'order-detail.interface';
import { IOrderRecord } from 'order.interface';

import {
  ICreateOrder,
  IOrderDetailParams,
  IOrderQueryParams,
  IUpdateOrder,
  IUpdateStatusOrder,
} from 'order.interface';
import constants from '../../constants';
import application from '../../constants/application';
import { OrderDetail } from '../../entities/order-detail/order-detail.entity';
import eggPriceQtyService from '../../services/admin/egg-price-qty.service';
import orderNotiService from '../../services/admin/order-noti.service';
import orderService from '../../services/admin/order.service';
import orderDetailService from '../../services/client/order-detail.service';
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import webSocketService from '../../services/client/web-socket.service';

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const user_id = ApiUtility.getQueryParam(req, 'user_id');
    const status = parseInt(ApiUtility.getQueryParam(req, 'status'));
    const startDate = ApiUtility.getQueryParam(req, 'start_date');
    const endDate = ApiUtility.getQueryParam(req, 'end_date');
    const fullname = ApiUtility.getQueryParam(req, 'fullname');
    const phone_number = ApiUtility.getQueryParam(req, 'phone_number');

    let params: IOrderQueryParams = {
      limit,
      page,
      user_id,
      status,
      startDate,
      endDate,
      fullname,
      phone_number,
    };

    let { response: listOrder, pagination } = await orderService.list(
      params,
    );
    listOrder = listOrder.map((order) => {
      return { ...order, total: totalByOrderItems(order.items) };
    });

    return ApiResponse.result(
      res,
      listOrder,
      httpStatusCodes.OK,
      null,
      pagination,
    );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const detail: IController = async (req, res) => {
  try {
    let params: IOrderDetailParams = {
      id: parseInt(req.params.id),
    };
    const order = await orderService.detail(params);

    // get correspond items
    const itemsByOrderId = await orderDetailService.getByOrderId(
      params.id,
    );
    order.items = itemsByOrderId;

    // get correspond notis
    const noties = await orderNotiService.list({
      to_user_id: order.user_id,
      order_id: order.id,
    });
    order.notis = noties;

    return ApiResponse.result(res, order, httpStatusCodes.OK, null);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const create: IController = async (req, res) => {
  try {
    const user_id = req.user.id;

    const params: ICreateOrder = {
      user_id: user_id,
      date: req.body.date,
      time: req.body.time,
      status: constants.APPLICATION.status.WAITING_APPROVAL,
      items: req.body.orders,
    };
    let newOrder = await orderService.create(params);

    let createdItems: OrderDetail[] = [];

    // save items
    for (let item of params.items) {
      let itemDetail = await orderDetailService.create({
        order_id: newOrder.id,
        ...item,
      });
      createdItems.push(itemDetail);
    }
    newOrder.items = createdItems;

    ApiResponse.result(res, newOrder, httpStatusCodes.CREATED);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const updateStatus: IController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newStatus = req.body.status;
    let updateData;

    //------------- 1. GET DETAIL OF ORDER BY ID-------------
    const thisOrder = await orderService.detail({ id: id });

    //------------- 2. DEFINE PARAMS FOR UPDATE STATUS-------------
    let params: IUpdateStatusOrder = {
      id: id,
      status: newStatus,
    };
    // reject/cancel require <reason>
    if (
      newStatus === application.status.REJECTED ||
      newStatus === application.status.CANCELED
    ) {
      params.reason = req.body?.reason;
    }
    // update status
    updateData = await orderService.updateStatus(params);

    //------------- 3. MAKE SIDE EFFECT (NOTI, EGG-QTY):-------------
    // if accepted: decrese egg-qty, hide noti of admin, noti for user
    if (newStatus === application.status.ACCEPTED) {
      const orderItems: IOrderDetail[] = await orderDetailService.getByOrderId(
        id,
      );
      const decreseRes = await decreseEggQtys(orderItems, res);
      const notiAction = await handleNotiForAcceptOrder(
        req.user.id,
        thisOrder.user_id,
        id,
      );
    }

    // if reject/cancel/success, noti for user
    if (
      [
        application.status.REJECTED,
        application.status.CANCELED,
        application.status.SUCCESS,
      ].includes(newStatus)
    ) {
      let content;
      switch (newStatus) {
        case application.status.REJECTED:
          content = application.noti.content.REJECTED;
          break;
        case application.status.CANCELED:
          content = application.noti.content.CANCELED;
          break;
        case application.status.SUCCESS:
          content = application.noti.content.SUCCESS;
          break;
        default:
          break;
      }
      await orderNotiService.create({
        content,
        from_user_id: req.user.id,
        to_user_id: thisOrder.user_id,
        new_status: newStatus,
        order_id: id,
      });
    }

    // Web-socket noti service:
    await webSocketService.sendNotiToUser(thisOrder.user_id, id);

    //OTHER NOTIFICATION SERVICE LIKE: ZALO-OA

    ApiResponse.result(res, updateData, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const handleNotiForAcceptOrder = async (
  fromUserId: number,
  toUserId: number,
  orderId: number,
) => {
  // new_status of this noti is waiting, not accepted
  // find current noti
  const correspondingNoti = await orderNotiService.detail({
    order_id: orderId,
    new_status: application.status.WAITING_APPROVAL,
  });
  if (!correspondingNoti) {
    return false;
  }

  // update noti: hide for admin
  const disappearNoti = await orderNotiService.update({
    id: correspondingNoti.id,
    is_display: false,
  });

  // create new noti for client
  const newNotiForClient = await orderNotiService.create({
    content: application.noti.content.ACCEPTED,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    new_status: application.status.ACCEPTED,
    order_id: orderId,
  });
};

const decreseEggQtys = async (
  orderEggQtys: IOrderDetail[],
  res: Response,
) => {
  const decreseRes = await Promise.all(
    orderEggQtys.map(async (eggQty) => {
      const currEggQty = await eggPriceQtyService.byEggId(
        eggQty.egg_id,
      );
      // if current quantity is less than newEggQty then throw message for admin
      if (currEggQty.quantity < eggQty.quantity) {
        ApiResponse.error(
          res,
          httpStatusCodes.BAD_REQUEST,
          `${eggQty.egg_id} hết hàng`,
        );
      }
      const newEggQty: IUpdateEggPriceQty = {
        egg_id: currEggQty.egg_id,
        quantity: currEggQty.quantity - eggQty.quantity,
      };
      await eggPriceQtyService.update(newEggQty);
    }),
  );
  return decreseRes;
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateOrder = {
      id: parseInt(req.params.id),
      user_id: req.user.id,
      date: req.body?.date,
      time: req.body?.time,
      note: req.body?.note,
    };

    const updateData = orderService.update(params);
    ApiResponse.result(res, updateData, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const orderStatisticByStatus: IController = async (req, res) => {
  try {
    const { response: orderListByTimeRange } = await orderService.list({
      limit: req.body.limit,
      page: req.body.page,
      startDate: req.query.start_date as string,
      endDate: req.query.end_date as string,
    });

    let dataSets = [0, 0, 0, 0, 0];
    orderListByTimeRange.forEach((order) => {
      switch (order.status) {
        case application.status.ACCEPTED:
          dataSets[0] += 1;
          break;
        case application.status.REJECTED:
          dataSets[1] += 1;
          break;
        case application.status.SUCCESS:
          dataSets[2] += 1;
          break;
        case application.status.CANCELED:
          dataSets[3] += 1;
          break;
        case application.status.WAITING_APPROVAL:
          dataSets[4] += 1;
          break;

        default:
          break;
      }
    });

    ApiResponse.result(res, dataSets, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const orderStatisticByTotal: IController = async (req, res) => {
  try {
    let limit = ApiUtility.getQueryParam(req, 'limit');
    const {
      response: successOrderListByTimeRange,
    } = await orderService.list({
      limit: null,
      page: ApiUtility.getQueryParam(req, 'page'),
      startDate: ApiUtility.getQueryParam(req, 'start_date'),
      endDate: ApiUtility.getQueryParam(req, 'end_date'),
      user_id: ApiUtility.getQueryParam(req, 'user_id'),
      status: application.status.SUCCESS,
    });

    let statisticData = successOrderListByTimeRange.map((order) => {
      return {
        ...order,
        total: totalByOrderItems(order.items),
      };
    });

    let sortedData = sortOrderByTotal(statisticData);

    if (limit) {
      sortedData = sortedData.slice(0, limit);
    }
    ApiResponse.result(res, sortedData, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

// helper function
export function totalByOrderItems(orderItems: IOrderDetail[]) {
  let total = 0;
  for (let item of orderItems) {
    let totalOfItem = item.quantity * item.deal_price;
    total += totalOfItem;
  }
  return total;
}

// helper function
interface IOrderStatistic extends IOrderRecord {
  total: number;
}
function sortOrderByTotal(orderList: IOrderStatistic[]) {
  let sortedOrderList = orderList.sort((a, b) => b.total - a.total);
  return sortedOrderList;
}
export default {
  list,
  detail,
  create,
  updateStatus,
  update,
  orderStatisticByStatus,
  orderStatisticByTotal,
};
