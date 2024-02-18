import {
  INotiCreate,
  INotiListParams,
  INotiUpdate,
} from 'noti.interface';
import { OrderNoti } from '../../entities/order-notification/order-notification.entity';
import { getRepository } from 'typeorm';

const list = async (params: INotiListParams) => {
  const to_user_id = params.to_user_id;

  const orderNotiRepo = getRepository(OrderNoti).createQueryBuilder(
    'order_notification',
  );

  if (to_user_id) {
    orderNotiRepo.where('to_user_id = :user_id', {
      user_id: to_user_id,
    });
    orderNotiRepo.leftJoinAndSelect(
      'order_notification.from_user',
      'from_user',
    );
  }
  const listNotiData = await orderNotiRepo.getMany()
  return listNotiData
};
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

const createMany = async (listParams: INotiCreate[]) => {
  const sendNotiResult = await Promise.all(
    listParams.map(async (params) => {
      const createNotiData = await create(params);
      return createNotiData;
    }),
  );

  return sendNotiResult;
};
const update = async (params: INotiUpdate) => {
  const updatedNoti = await getRepository(OrderNoti).update(
    { id: params.id },
    { ...params },
  );

  return updatedNoti;
};

export default { list, create, createMany, update };
