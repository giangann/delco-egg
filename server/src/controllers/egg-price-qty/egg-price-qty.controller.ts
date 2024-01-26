import IController from 'IController';
import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import eggPriceQtyService from '../../services/egg-price-qty/egg-price-qty.service';
import ApiResponse from '../../utilities/api-response.utility';

import httpStatusCodes from 'http-status-codes';

const list: IController = async (req, res) => {
  try {
    const data = await eggPriceQtyService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateEggPriceQty = {
      id: parseInt(req.params.id),
      ...req.body,
    };
    await eggPriceQtyService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default { list, update };
