import { NextFunction, Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import eggService from '../../services/egg/egg.service';
import ApiResponse from '../../utilities/api-response.utility';
import IController from 'IController';
import { IUpdateEgg } from 'egg.interface';
import { IDeleteById } from 'common.interface';
import constants from '../../constants';

const create: IController = async (req, res) => {
  try {
    const params = req.body;
    const eggCreateResult = await eggService.create(params);

    ApiResponse.result(res, eggCreateResult);
  } catch (e) {
    if ((e.code = constants.ERROR_CODE.DUPLICATED)) {
      return ApiResponse.error(
        res,
        httpStatusCodes.CONFLICT,
        'id of egg already exists',
      );
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

// if not work as expected, check the ... operator in asign params from req.body
const update: IController = async (req, res) => {
  try {
    const params: IUpdateEgg = {
      ...req.body,
    };
    await eggService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await eggService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  const params: IDeleteById = { id: parseInt(req.params.id, 10) };
  try {
    const data = await eggService.remove(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
  create,
  update,
  list,
  remove,
};