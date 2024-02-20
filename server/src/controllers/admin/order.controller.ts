import IController from 'IController';
import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import { IOrderDetail } from 'order-detail.interface';
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

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');

    let params: IOrderQueryParams = {
      limit,
      page,
    };

    const listOrder = await orderService.list(params);
    return ApiResponse.result(res, listOrder, httpStatusCodes.OK, null);
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
    order.notis = noties

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

    // get this order by if of order
    const thisOrder = await orderService.detail({ id: id });

    let params: IUpdateStatusOrder = {
      id: id,
      status: newStatus,
    };

    // REJECT OR CANCEL REQUIRE "REASON"
    if (
      newStatus === application.status.REJECTED ||
      newStatus === application.status.CANCELED
    ) {
      params.reason = req.body?.reason;
    }
    // update status
    updateData = await orderService.updateStatus(params);

    // IF NEWSTATUS IS ACCEPTED => DECREASE CORRESPONDING EGGQTYS
    // 1. get all item inside order {egg_id and quantity}[]
    // 2. each item, get corresponding currentQtys
    // 3. update qty
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

    // noti for reject/cancel/success
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

export default { list, detail, create, updateStatus, update };
