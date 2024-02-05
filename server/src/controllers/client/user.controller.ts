import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
  IDetailById
} from '../../interfaces/common.interface';
import {
  ILoginUser,
  IUpdateUser
} from '../../interfaces/user.interface';

// Errors
import { StringError } from '../../errors/string.error';

// Services
import userService from '../../services/client/user.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
import Encryption from '../../utilities/encryption.utility';

// Constants
import constants from '../../constants';

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
      id: parseInt(req.params.id, 10),
      username: req.body?.username,
      password: req.body?.password,
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
  login,
  me,
  detail,
  update,
  updateMe,
};
