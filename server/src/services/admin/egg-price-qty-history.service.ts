import {
  IEggPriceQtyHistoryCreate,
  IEggPriceQtyHistoryListParams,
  IEggPriceQtyHistoryUpdate,
} from 'egg-price-qty-history.interface';
import { getRepository } from 'typeorm';
import { EggPriceQtyHistory } from '../../entities/egg-price-qty-history/egg-price-qty-history.entity';
import DateTimeUtility from '../../utilities/date-time.utility';

const create = async (params: IEggPriceQtyHistoryCreate) => {
  const createdData = await getRepository(EggPriceQtyHistory).save({
    ...params,
    createdAt: DateTimeUtility.getCurrentTimeStamp(),
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
  return createdData;
};

const list = async (params: IEggPriceQtyHistoryListParams) => {
  console.log('params', params)
  const repo = getRepository(EggPriceQtyHistory).createQueryBuilder(
    'egg_price_qty_history',
  );
  repo.leftJoinAndSelect('egg_price_qty_history.egg', 'egg');

  const eggId = params.egg_id;
  if (eggId) {
    repo.andWhere('egg_price_qty_history.egg_id =:eggId', { eggId });
  }

  const date = params.date;
  if (date) {
    repo.andWhere('egg_price_qty_history.date =:date', { date });
  }

  const startDate = params.startDate;
  if (startDate) {
    repo.andWhere('egg_price_qty_history.date >= :startDate', {
      startDate,
    });
  }

  const endDate = params.endDate;
  if (endDate) {
    repo.andWhere('egg_price_qty_history.date <= :endDate', {
      endDate,
    });
  }

  const data = await repo.getMany();

  return data;
};

const update = async (params: IEggPriceQtyHistoryUpdate) => {
  return await getRepository(EggPriceQtyHistory).update(
    { egg_id: params.egg_id },
    {
      ...params,
      createdAt: DateTimeUtility.getCurrentTimeStamp(),
      updatedAt: DateTimeUtility.getCurrentTimeStamp(),
    },
  );
};

export default { create, list, update };
