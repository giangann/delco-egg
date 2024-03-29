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
  console.log('order list params',params)
  const orderRepo = getRepository(Order).createQueryBuilder('order');

  orderRepo.leftJoinAndSelect('order.items', 'item');
  orderRepo.leftJoinAndSelect('order.user', 'user');

  const startDate = params.startDate;
  const endDate = params.endDate;
  if (startDate && endDate) {
    orderRepo.andWhere('order.date >= :startDate', { startDate });
    orderRepo.andWhere('order.date < :endDate + interval 1 day', {
      endDate,
    });
  }

  const orderStatus = params.status;
  if (orderStatus) {
    orderRepo.andWhere('order.status = :orderStatus', { orderStatus });
  }

  const date = params.date;
  if (date) {
    orderRepo.andWhere('order.date = :date', { date });
  }

  const userId = params.user_id;
  if (userId) {
    orderRepo.andWhere('order.user_id = :userId', { userId });
  }

  let listOrders = await orderRepo.getMany();

  const limit = params.limit;
  if (limit) {
    listOrders = listOrders.slice(0,limit)
  }

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
