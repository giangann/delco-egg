import { IEgg } from "./egg";

export interface IOrderItem {
  egg: IEgg;
  quantity: number;
  deal_price: number;
}

export interface IOrder {
  date: string;
  time: string;
  orders: IOrderItem[];
}
