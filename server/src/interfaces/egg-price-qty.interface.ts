import { IOptionalUpdateById } from 'generics.type';

export interface IEggPriceQty {
  egg_id: number;
  price_1?: number;
  price_2?: number;
  price_3?: number;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUpdateEggPriceQty extends IEggPriceQty {}
