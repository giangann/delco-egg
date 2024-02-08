import { IEgg, IEggInfo } from "./egg";

export interface IEggPriceQty {
  egg: IEggInfo;
  egg_id: number;
  price_1: number;
  price_2: number;
  price_3: number;
  quantity: number;
  date: string;
}

export interface IEggQty {
  egg: IEgg;
  egg_id: number;
  quantity: number;
  date: string;
}

export type EggPrice = number | string | null;
export interface IEggPrice {
  egg: IEgg;
  egg_id: number;
  price_1: EggPrice;
  price_2: EggPrice;
  price_3: EggPrice;
}
