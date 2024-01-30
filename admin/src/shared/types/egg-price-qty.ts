import { IEggInfo } from "./egg";

export interface IEggPriceQty {
  egg: IEggInfo;
  egg_id: number;
  price_1: number;
  price_2: number;
  price_3: number;
  quantity: number;
  date: string;
}
