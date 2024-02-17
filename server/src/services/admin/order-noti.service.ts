import {
  INotiCreate,
  INotiListParams,
  INotiRecord,
  INotiUpdate,
} from 'noti.interface';
import { getRepository } from 'typeorm';
import { OrderNoti } from '../../entities/order-notification/order-notification.entity';

const list = async (params: INotiListParams) => {
  const notiRepo = getRepository(OrderNoti)
    .createQueryBuilder('order_notification')
    .leftJoinAndSelect('order_notification.from_user', 'from_user')
    .where('order_notification.to_user_id = :to_user_id', {
      to_user_id: params.to_user_id,
    });

  if (params.is_display) {
    notiRepo.andWhere('order_notification.is_display = :is_display', {
      is_display: params.is_display,
    });
  }

  const listNotiData = await notiRepo.getMany();

  return listNotiData;
};
const create = async (params: INotiCreate) => {
  const createOrderNotiData = await getRepository(OrderNoti).save({
    ...params,
  });
  return createOrderNotiData;
};

const update = async (params: INotiUpdate) => {
  const updatedNoti = await getRepository(OrderNoti).update(
    { id: params.id },
    { ...params },
  );

  return updatedNoti;
};

const detail = async (params: Partial<INotiRecord>) => {
  const detailNoti = await getRepository(OrderNoti).findOne({
    ...params,
  });
  return detailNoti;
};

// const sendNotiToListUser = async (
//   from_user_id: number,
//   to_list_user: number[],
// ) => {
//     const sendNotiResult = Promise.all(to_list_user.map(async(userId)=>{
//         const createNotiData = await create()
//     }))
// };

export default { list, create, update, detail };
