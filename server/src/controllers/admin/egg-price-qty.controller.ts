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
    const newPrices: IUpdateEggPriceQty[] = req.body;

    newPrices.forEach(async (price) => {
      let params: IUpdateEggPriceQty = {
        egg_id: price.egg_id,
        price_1: price.price_1,
        price_2: price.price_2,
        price_3: price.price_3,
      };

      await eggPriceQtyService.update(params);
    });

    return ApiResponse.result(res, newPrices, httpStatusCodes.OK);
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
    const updateQtys = findSameElements(currQtys, newQtys);

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
    // if second .every method return true, it means
    // every row in array 1 don't have the egg_id same row2.egg_id
    // so in opposite, negative of this statement has meaning that
    // have at least 1 row in array 1 have the egg_id same row2.egg_id
    const inBothArray = !array1.every(
      (row1) => row1.egg_id !== row2.egg_id,
    );

    if (inBothArray) result.push(row2);
  });

  return result;
};

export default { list, update, updateDayPrice, updateDayQuantity };
