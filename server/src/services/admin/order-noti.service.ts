import { INotiCreate } from 'noti.interface';
import { OrderNoti } from '../../entities/order-notification/order-notification.entity';
import { getRepository } from 'typeorm';

const list = async () => {};
const create = async (params: INotiCreate) => {
  try {
    const createOrderNotiData = await getRepository(OrderNoti).save({
      ...params,
    });
    return createOrderNotiData;
  } catch (e) {
    return false;
  }
};

// const sendNotiToListUser = async (
//   from_user_id: number,
//   to_list_user: number[],
// ) => {
//     const sendNotiResult = Promise.all(to_list_user.map(async(userId)=>{
//         const createNotiData = await create()
//     }))
// };

export { list, create };
