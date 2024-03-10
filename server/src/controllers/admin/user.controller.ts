import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '../../interfaces/user.interface';
import {
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';

// Errors
import { StringError } from '../../errors/string.error';

// Services
import userService from '../../services/admin/user.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
import Encryption from '../../utilities/encryption.utility';
import ApiUtility from '../../utilities/api.utility';

// Constants
import constants from '../../constants';
import orderService from '../../services/admin/order.service';
import { IOrderEntity, IOrderQueryParams } from 'order.interface';
import application from '../../constants/application';
import { IOrderDetail } from 'order-detail.interface';
import eggService from '../../services/admin/egg.service';

const create: IController = async (req, res) => {
  try {
    const params: ICreateUser = {
      username: req.body.username,
      password: req.body.password,
      phone_number: req.body.phone_number,
      fullname: req.body.fullname,
      company_name: req.body?.company_name,
      note: req.body?.note,
    };
    const user = await userService.create(params);

    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(
        res,
        httpStatusCodes.CONFLICT,
        'Username already exists.',
      );
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const login: IController = async (req, res) => {
  try {
    const params: ILoginUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await userService.login(params);
    const cookie = await generateUserCookie(user.id);

    return ApiResponse.result(res, user, httpStatusCodes.OK, cookie);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      'Something went wrong',
    );
  }
};

const logout: IController = (req, res) => {
  try {
    return res
      .clearCookie(constants.COOKIE.COOKIE_USER)
      .status(200)
      .json({ success: true });
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e?.message || 'Something when wrong',
    );
  }
};

const me: IController = async (req, res) => {
  return ApiResponse.result(res, req.user, httpStatusCodes.OK);
};

const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    };
    const data = await userService.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const clientOrderEggStatistic: IController = async (req, res) => {
  try {
    let params = {
      user_id: parseInt(req.params.userId),
      startDate: ApiUtility.getQueryParam(req, 'start_date'),
      endDate: ApiUtility.getQueryParam(req, 'end_date'),
    };
    // get all eggs, even egg is deleted
    const eggs = await eggService.list();

    // get all orders
    const orders = await orderService.list({
      ...params,
      limit: null,
      page: null,
    });

    let labels: string[] = [];
    let qtyDatas: number[] = [];
    let totalDatas: number[] = [];

    // loop through eggs,
    // get type_name as label
    // calculate total and qty of each egg
    for (let egg of eggs) {
      // get label
      labels.push(egg.type_name);

      // calculate total and qty
      let sumQty = 0;
      let sumTotal = 0;
      for (let order of orders) {
        let { total, quantity } = getSumTotalAndQtyByEggInOrder(
          order,
          egg.id,
        );
        sumQty += quantity;
        sumTotal += total;
      }
      qtyDatas.push(sumQty);
      totalDatas.push(sumTotal);
    }

    ApiResponse.result(res, { labels, qtyDatas, totalDatas });
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// helper function
function getSumTotalAndQtyByEggInOrder(
  order: IOrderEntity,
  egg_id: number,
) {
  let qty = 0;
  let total = 0;
  for (let item of order.items) {
    if (
      item.egg_id === egg_id &&
      order.status === application.status.SUCCESS
    ) {
      qty += item.quantity;
      total += item.deal_price * item.quantity;
    }
  }
  return { quantity: qty, total: total };
}

const clientOrderOverview: IController = async (req, res) => {
  try {
    let params: IOrderQueryParams = {
      user_id: parseInt(req.params.userId),
      startDate: ApiUtility.getQueryParam(req, 'start_date'),
      endDate: ApiUtility.getQueryParam(req, 'end_date'),
      limit: null,
      page: null,
    };
    // params.startDate = '2024-01-01';
    // params.endDate = '2024-03-09';

    const ordersOfClient = await orderService.list(params);

    let status = {
      success: 0,
      waiting_approval: 0,
      accepted: 0,
      rejected: 0,
      cancel: 0,
    };
    let sumTotal = 0;
    let sumQuantity = 0;
    ordersOfClient.forEach((order) => {
      switch (order.status) {
        case application.status.SUCCESS:
          status.success += 1;
          let { total, quantity } = totalByOrderItems(order.items);
          sumTotal += total;
          sumQuantity += quantity;
          break;
        case application.status.WAITING_APPROVAL:
          status.waiting_approval += 1;
          break;
        case application.status.ACCEPTED:
          status.accepted += 1;
          break;
        case application.status.REJECTED:
          status.rejected += 1;
          break;
        case application.status.CANCELED:
          status.cancel += 1;
          break;
        default:
          break;
      }
    });

    ApiResponse.result(
      res,
      { status, total: sumTotal, quantity: sumQuantity },
      httpStatusCodes.OK,
    );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// helper function
export function totalByOrderItems(orderItems: IOrderDetail[]) {
  let total = 0;
  let quantity = 0;
  for (let item of orderItems) {
    let totalOfItem = item.quantity * item.deal_price;
    total += totalOfItem;
    quantity += item.quantity;
  }
  return { total, quantity };
}

// helper function
export function totalByAllOrder(orders: IOrderEntity[]) {
  let totalOfAllSuccessOrders = 0;
  for (let order of orders) {
    if (order.status === application.status.SUCCESS) {
      let { total } = totalByOrderItems(order.items);
      totalOfAllSuccessOrders += total;
    }
  }
  return totalOfAllSuccessOrders;
}

const update: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      id: parseInt(req.params.id, 10),
      username: req.body?.username,
      password: req.body?.password,
      phone_number: req.body?.phone_number,
      fullname: req.body?.fullname,
      company_name: req.body?.company_name,
      note: req.body?.note,
      isAdmin: req.body?.isAdmin,
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateMe: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      id: req.user.id,
      phone_number: req.body?.phone_number,
      fullname: req.body?.fullname,
      company_name: req.body?.company_name,
      note: req.body?.note,
    };
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};
const changePassword: IController = async (req, res) => {
  try {
    // get user and hash password in db
    const userWithPassword = await userService.detailWithPassword({
      id: req.user.id,
    });

    let currPw = req.body?.current_password;
    let newPw = req.body?.new_password;
    const verifyResult = await Encryption.verifyHash(
      currPw,
      userWithPassword.password,
    );

    if (verifyResult) {
      newPw = await Encryption.generateHash(newPw, 10);
      const updatedPassword = await userService.changePassword({
        user_id: userWithPassword.id,
        new_password: newPw,
      });

      ApiResponse.result(res, updatedPassword);
    } else
      ApiResponse.error(res, 400, 'Mật khẩu hiện tại không đúng', {
        current_password: {
          name: 'Sai',
          message: 'Mật khẩu hiện tại không đúng',
        },
      });
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const resetPasswordDefault: IController = async (req, res) => {
  try {
    const defaultPassword = '12345678';
    const newPw = await Encryption.generateHash(defaultPassword, 10);

    let params = {
      user_id: parseInt(req.params.userId),
      new_password: newPw,
    };

    const updatedPassword = await userService.changePassword(params);
    ApiResponse.result(res, updatedPassword, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const isAdmin = ApiUtility.getQueryParam(req, 'isAdmin');
    const username = ApiUtility.getQueryParam(req, 'username');
    const fullname = ApiUtility.getQueryParam(req, 'fullname');
    const phone_number = ApiUtility.getQueryParam(req, 'phone_number');
    const company_name = ApiUtility.getQueryParam(req, 'company_name');

    const params: IUserQueryParams = {
      limit,
      page,
      isAdmin,
      username,
      fullname,
      phone_number,
      company_name,
    };
    const data = await userService.list(params);
    return ApiResponse.result(
      res,
      data.response,
      httpStatusCodes.OK,
      null,
      data.pagination,
    );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id, 10),
    };
    await userService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.COOKIE.COOKIE_USER,
    value: await Encryption.generateCookie(
      constants.COOKIE.KEY_USER_ID,
      userId.toString(),
    ),
  };
};

export default {
  create,
  login,
  logout,
  me,
  detail,
  update,
  updateMe,
  list,
  remove,
  changePassword,
  resetPasswordDefault,
  clientOrderOverview,
  clientOrderEggStatistic,
};
