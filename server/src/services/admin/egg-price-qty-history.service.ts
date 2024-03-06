import {
  IEggPriceQtyHistoryCreate,
  IEggPriceQtyHistoryRecord,
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

const list = async (params: Partial<IEggPriceQtyHistoryRecord>) => {
  return await getRepository(EggPriceQtyHistory).find(params);
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
