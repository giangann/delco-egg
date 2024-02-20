import {
  ICreateOrder,
  IOrderDetailParams,
  IOrderQueryParams,
  IUpdateOrder,
  IUpdateStatusOrder,
} from 'order.interface';
import { getRepository } from 'typeorm';
import { Order } from '../../entities/order/order.entity';
import { StringError } from '../../errors/string.error';

const list = async (params: IOrderQueryParams) => {
  const orderRepo = getRepository(Order).createQueryBuilder('order');

  orderRepo.leftJoinAndSelect('order.items', 'item');
  orderRepo.leftJoinAndSelect('order.user', 'user');

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

const detail = async (params: IOrderDetailParams) => {
  const { id } = params;

  const orderRepo = getRepository(Order)
    .createQueryBuilder('order')
    .where('order.id = :id', { id: id })
    .leftJoinAndSelect('order.user', 'user');

  const order = await orderRepo.getOne();

  return order;
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
  detail,
};
