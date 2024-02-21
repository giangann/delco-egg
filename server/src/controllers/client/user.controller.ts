import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import { IDetailById } from '../../interfaces/common.interface';
import {
  ILoginUser,
  IUpdateUserInfo,
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
    const params: IUpdateUserInfo = {
      id: parseInt(req.params.id, 10),
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
    const params: IUpdateUserInfo = {
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
  logout,
  me,
  detail,
  update,
  updateMe,
  changePassword,
};
