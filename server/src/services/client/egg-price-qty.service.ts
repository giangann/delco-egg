import { IUpdateEggPriceQty } from 'egg-price-qty.interface';
import { getRepository } from 'typeorm';
import { EggPriceQty } from '../../entities/egg-price-qty/egg-price-qty.entity';
import { StringError } from '../../errors/string.error';

const list = async () => {
  const data = await getRepository(EggPriceQty)
    .createQueryBuilder('egg_price_qty')
    .innerJoinAndSelect('egg_price_qty.egg', 'egg')
    .andWhere('price_1 IS NOT NULL')
    .getMany();

  return data;
};

export default { list };
