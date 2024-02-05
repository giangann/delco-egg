import { IOrderDetail } from 'order-detail.interface';
import { OrderDetail } from '../../entities/order-detail/order-detail.entity';
import { getRepository } from 'typeorm';

const create = async (params: IOrderDetail) => {
  const createData = await getRepository(OrderDetail).save({
    ...params,
  });
  return createData;
};

const getByOrderId = async (orderId: number) => {
  const orderDetailRepo = getRepository(OrderDetail)
    .createQueryBuilder('order_detail')
    .where('order_id = :orderId', { orderId: orderId })
    .leftJoinAndSelect('order_detail.egg', 'egg');

  const orderDetailDataById = await orderDetailRepo.getMany();
  return orderDetailDataById;
};

export default {
  create,
  getByOrderId,
};
