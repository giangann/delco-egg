import IController from 'IController';
import eggPriceQtyService from '../../services/client/egg-price-qty.service';
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

export default { list };
