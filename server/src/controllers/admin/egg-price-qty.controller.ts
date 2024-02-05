import IController from 'IController';
import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import eggPriceQtyService from '../../services/admin/egg-price-qty.service';
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

const updateDayPrice: IController = async (req, res) => {
  try {
    console.log(req.body);
    console.log(Object.keys(req.body));

    const updateObject = req.body;
    const keys = Object.keys(req.body);

    keys.forEach(async (key, index) => {
      let params: IUpdateEggPriceQty = {
        egg_id: updateObject[key].egg_id,
        price_1: updateObject[key].price_1,
        price_2: updateObject[key].price_2,
        price_3: updateObject[key].price_3,
      };
      await eggPriceQtyService.update(params);
    });

    return ApiResponse.result(res, updateObject, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateDayQuantity: IController = async (req, res) => {
  try {
    console.log(req.body);
    console.log(Object.keys(req.body));

    const updateObject = req.body;
    const keys = Object.keys(req.body);

    keys.forEach(async (key, index) => {
      let params: IUpdateEggPriceQty = {
        egg_id: updateObject[key].egg_id,
        quantity: updateObject[key].quantity,
      };
      await eggPriceQtyService.update(params);
    });

    return ApiResponse.result(res, updateObject, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default { list, update, updateDayPrice, updateDayQuantity };
