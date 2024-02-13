import { Response } from 'express';
import IController from 'IController';
import httpStatusCodes from 'http-status-codes';
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
import orderService from '../../services/admin/order.service';
import orderDetailService from '../../services/client/order-detail.service';
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import eggPriceQtyService from '../../services/admin/egg-price-qty.service';
import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import { IOrderDetail } from 'order-detail.interface';

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
    const user = req.user;

    let params: IOrderDetailParams = {
      id: parseInt(req.params.id),
    };
    if (!user.isAdmin) params.user_id = user.id;

    const order = await orderService.detail(params);
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
    }

    // NOTIFICATION SERVICE
    

    ApiResponse.result(res, updateData, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
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
