import IController from 'IController';
import orderNotiService from '../../services/client/order-noti.service';
import ApiResponse from '../../utilities/api-response.utility';
import httpStatusCode from 'http-status-codes';
const list: IController = async (req, res) => {
  try {
    const user = req.user;
    const listNoti = await orderNotiService.list({
      to_user_id: user.id,
    });
    return listNoti;
  } catch (e) {
    ApiResponse.error(res, httpStatusCode.BAD_REQUEST, e);
  }
};

export default {
  list,
};
