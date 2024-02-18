import IController from 'IController';
import orderNotiService from '../../services/admin/order-noti.service';
import ApiResponse from '../../utilities/api-response.utility';
import httpStatusCode from 'http-status-codes';
const list: IController = async (req, res) => {
  try {
    const user = req.user;
    const listNoti = await orderNotiService.list({
      to_user_id: user.id,
      is_display: true,
    });
    ApiResponse.result(res, listNoti);
  } catch (e) {
    ApiResponse.error(res, httpStatusCode.BAD_REQUEST, e);
  }
};

const maskAsRead: IController = async (req, res) => {
  try {
    const notiId = parseInt(req.params.id);
    const updateNotiRes = orderNotiService.update({
      id: notiId,
      is_read: true,
    });
    ApiResponse.result(res, updateNotiRes);
  } catch (e) {
    ApiResponse.error(res, httpStatusCode.BAD_REQUEST, e);
  }
};

export default {
  list,
  maskAsRead,
};
