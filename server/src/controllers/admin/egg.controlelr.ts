import IController from 'IController';
import { IDeleteById } from 'common.interface';
import { IUpdateEgg } from 'egg.interface';
import httpStatusCodes from 'http-status-codes';
import constants from '../../constants';
import eggService from '../../services/admin/egg.service';
import ApiResponse from '../../utilities/api-response.utility';

const create: IController = async (req, res) => {
  try {
    const params = req.body;
    const newEgg = await eggService.create(params);

    ApiResponse.result(res, newEgg, httpStatusCodes.CREATED);
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
      id: parseInt(req.params.id),
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
