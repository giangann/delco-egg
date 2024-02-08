import {
  IEggPriceQty,
  IUpdateEggPriceQty,
} from 'egg-price-qty.interface';
import { getRepository } from 'typeorm';
import { EggPriceQty } from '../../entities/egg-price-qty/egg-price-qty.entity';
import { StringError } from '../../errors/string.error';

const list = async () => {
  const data = await getRepository(EggPriceQty)
    .createQueryBuilder('egg_price_qty')
    .innerJoinAndSelect('egg_price_qty.egg', 'egg')
    .getMany();

  return data;
};

const create = async (params: IUpdateEggPriceQty) => {
  const createdData = await getRepository(EggPriceQty).save({
    ...params,
  });
  return createdData;
};

const update = async (params: IUpdateEggPriceQty) => {
  const query = { egg_id: params.egg_id };
  const eggPriceQtyItem = await getRepository(EggPriceQty).findOne({
    ...query,
  });

  let updatedOrCreatedData;
  if (!eggPriceQtyItem) {
    updatedOrCreatedData = await getRepository(EggPriceQty).save({
      ...params,
    });
  }
  updatedOrCreatedData = await getRepository(EggPriceQty).update(
    query,
    {
      ...params,
    },
  );

  return updatedOrCreatedData;
};

const remove = async (params: Pick<IEggPriceQty, 'egg_id'>) => {
  const deletedRow = await getRepository(EggPriceQty).delete({
    ...params,
  });
  return deletedRow;
};

export default { list, create, update, remove };
