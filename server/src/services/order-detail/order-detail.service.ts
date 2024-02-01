import { IOrderDetail } from 'order-detail.interface';
import { OrderDetail } from '../../entities/order-detail/order-detail.entity';
import { getRepository } from 'typeorm';

const create = async (params: IOrderDetail) => {
  const createData = await getRepository(OrderDetail).save({
    ...params,
  });
  return createData;
};

export default {
    create
}
