import { IBaseQueryParams, IBaseStatisticParams } from 'common.interface';
import { IEggEntity } from 'egg.interface';

export interface IEggPriceQtyHistoryRecord {
  egg_id: number;
  date: string;
  price_1?: number;
  price_2?: number;
  price_3?: number;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEggPriceQtyHistoryEntity
  extends IEggPriceQtyHistoryRecord {
  egg: IEggEntity;
}

export interface IEggPriceQtyHistoryListParams
  extends Partial<IEggPriceQtyHistoryRecord>,
    Partial<IBaseStatisticParams> {}

export interface IEggPriceQtyHistoryCreate
  extends IEggPriceQtyHistoryRecord {}

export interface IEggPriceQtyHistoryUpdate
  extends IEggPriceQtyHistoryCreate {}
