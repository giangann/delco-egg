import IController from 'IController';
import { IDeleteById } from 'common.interface';
import { IUpdateEgg } from 'egg.interface';
import httpStatusCodes from 'http-status-codes';
import constants from '../../constants';
import eggService from '../../services/admin/egg.service';
import ApiResponse from '../../utilities/api-response.utility';
import eggPriceQtyService from '../../services/admin/egg-price-qty.service';
import ApiUtility from '../../utilities/api.utility';
import orderService from '../../services/admin/order.service';
import application from '../../constants/application';

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
    let params = {
      isDeleted: ApiUtility.getQueryParam(req, 'isDeleted') as boolean,
    };
    const data = await eggService.list(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  const params: IDeleteById = { id: parseInt(req.params.id, 10) };
  try {
    // check is avaiable for delete
    const haveInWaitingOrder = await checkIsEggHaveInWaitingOrder(
      params.id,
    );
    if (haveInWaitingOrder) {
      return ApiResponse.error(
        res,
        httpStatusCodes.NOT_ACCEPTABLE,
        'Sản phẩm vẫn còn tồn tại trong đơn hàng chưa phê duyệt',
      );
    }

    // mark as isDeleted
    const data = await eggService.remove(params);

    // remove the corrsepond egg_id in eggPriceQty table
    const removeRow = await eggPriceQtyService.remove({
      egg_id: params.id,
    });
    if (data.affected > 0) {
      return ApiResponse.result(res, data, httpStatusCodes.OK);
    } else
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'Xóa thất bại',
      );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

// helper function
async function checkIsEggHaveInWaitingOrder(eggId: number) {
  const { response: listWaitingOrder } = await orderService.list({
    status: application.status.WAITING_APPROVAL,
    limit: null,
    page: null,
  });
  for (let order of listWaitingOrder) {
    if (order.status === application.status.WAITING_APPROVAL) {
      for (let orderItem of order.items) {
        if (orderItem.egg_id === eggId) return true;
      }
    }
  }
  return false;
}

export default {
  create,
  update,
  list,
  remove,
};
