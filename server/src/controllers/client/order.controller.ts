import IController from 'IController';
import httpStatusCodes from 'http-status-codes';
import {
  ICreateOrder,
  IOrderQueryParams,
  IUpdateOrder,
  IUpdateStatusOrder,
} from 'order.interface';
import constants from '../../constants';
import application from '../../constants/application';
import { OrderDetail } from '../../entities/order-detail/order-detail.entity';
import orderDetailService from '../../services/client/order-detail.service';
import orderService from '../../services/client/order.service';
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import { IDetailById } from 'common.interface';
import { IOrderDetail } from 'order-detail.interface';
import { IOrderDetailParams } from 'order.interface';

const list: IController = async (req, res) => {
  try {
    const user = req.user;

    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');

    let params: IOrderQueryParams = {
      limit,
      page,
    };
    params.user_id = user.id;

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

    // ACCEPTED OR SUCCESS NOT REQUIRE "REASON"
    if (
      newStatus in
      [application.status.ACCEPTED, application.status.SUCCESS]
    ) {
      updateData = await orderService.updateStatus(params);
    }

    // REJECT OR CANCEL REQUIRE "REASON"
    if (
      newStatus in
      [application.status.REJECTED, application.status.CANCELED]
    ) {
      updateData = await orderService.rejectOrCancelOrder({
        ...params,
        reason: req.body.reason,
      });
    }

    ApiResponse.result(res, updateData, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
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
