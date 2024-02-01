import {
  ICreateOrder,
  IOrderQueryParams,
  IUpdateOrder,
  IUpdateStatusOrder,
} from 'order.interface';
import { getRepository } from 'typeorm';
import { Order } from '../../entities/order/order.entity';
import { StringError } from '../../errors/string.error';
import ApiUtility from '../../utilities/api.utility';

const list = async (params: IOrderQueryParams) => {
  const orderRepo = getRepository(Order).createQueryBuilder('order');

  // get items of order
  orderRepo.leftJoinAndSelect('order.items', 'item');

  if (!params.user_id) {
    orderRepo.leftJoinAndSelect('order.user', 'user');
  }
  if (params.user_id) {
    orderRepo.andWhere('order.user_id = :user_id', {
      user_id: params.user_id,
    });
  }

  const listOrders = await orderRepo.getMany();

  return listOrders.map((order) => {
    return {
      ...order,
      username: order.user.username,
      fullname: order.user.fullname,
      phone_number: order.user.phone_number,
      company_name: order.user.company_name,
    };
  });
};
const create = async (params: ICreateOrder) => {
  const order = new Order();
  order.date = params.date;
  order.time = params.time;
  order.user_id = params.user_id;
  order.status = params.status;
  order.items = params.items;

  const createdOrder = await getRepository(Order).save(order);
  return createdOrder;
};

const updateStatus = async (params: IUpdateStatusOrder) => {
  const order = await getRepository(Order).findOne({ id: params.id });

  if (!order) throw new StringError('Order not exists');

  const updateData = await getRepository(Order).update(
    { id: params.id },
    { ...params },
  );

  return updateData;
};

const rejectOrCancelOrder = async (params: IUpdateStatusOrder) => {
  const order = await getRepository(Order).findOne({ id: params.id });

  if (!order) throw new StringError('Order not exists');

  const updateData = await getRepository(Order).update(
    { id: params.id },
    { ...params },
  );

  return updateData;
};

const update = async (params: IUpdateOrder) => {
  const order = await getRepository(Order).findOne({ id: params.id });

  if (!order) throw new StringError('Order not exists');

  const updateData = await getRepository(Order).update(
    { id: params.id },
    { ...params },
  );

  return updateData;
};

export default {
  list,
  create,
  updateStatus,
  update,
  rejectOrCancelOrder,
};
