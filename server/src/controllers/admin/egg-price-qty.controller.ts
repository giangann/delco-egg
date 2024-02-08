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
    const newQtys: IUpdateEggPriceQty[] = req.body;
    const currQtys: IUpdateEggPriceQty[] = await eggPriceQtyService.list();

    const addQtys = findExcludeElements(currQtys, newQtys);
    const removeQtys = findExcludeElements(newQtys, currQtys);
    const updateQtys = findSameElements(newQtys, currQtys);

    console.log('addQtys', addQtys);
    console.log('removeQtys', removeQtys);
    console.log('updateQtys', updateQtys);

    // update egg_id that haved before
    if (updateQtys.length) {
      updateQtys.forEach(async (qty) => {
        let params: IUpdateEggPriceQty = {
          egg_id: qty.egg_id,
          quantity: qty.quantity,
        };
        await eggPriceQtyService.update(params);
      });
    }

    // create new rows that egg_id don't have before
    if (addQtys.length) {
      addQtys.forEach(async (qty) => {
        let params: IUpdateEggPriceQty = {
          egg_id: qty.egg_id,
          quantity: qty.quantity,
        };
        await eggPriceQtyService.create(params);
      });
    }

    // delete current rows that don't have in new data
    if (removeQtys.length) {
      removeQtys.forEach(async (qty) => {
        await eggPriceQtyService.remove({ egg_id: qty.egg_id });
      });
    }

    let result = {
      addQtys,
      removeQtys,
      updateQtys,
    };
    return ApiResponse.result(res, result, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// return array that array1+array = array2
const findExcludeElements = (
  array1: IUpdateEggPriceQty[],
  array2: IUpdateEggPriceQty[],
) => {
  let result: IUpdateEggPriceQty[] = [];

  array2.forEach((row2) => {
    const inArray2ButNotInArray1 = array1.every(
      (row1) => row1.egg_id !== row2.egg_id,
    );
    if (inArray2ButNotInArray1) result.push(row2);
  });

  return result;
};

// return array that array1+array = array2
const findSameElements = (
  array1: IUpdateEggPriceQty[],
  array2: IUpdateEggPriceQty[],
) => {
  let result: IUpdateEggPriceQty[] = [];

  array2.forEach((row2) => {
    const inArray2ButNotInArray1 = array1.every(
      (row1) => row1.egg_id === row2.egg_id,
    );
    if (inArray2ButNotInArray1) result.push(row2);
  });

  return result;
};

export default { list, update, updateDayPrice, updateDayQuantity };
