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
  console.log('login');
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
};
