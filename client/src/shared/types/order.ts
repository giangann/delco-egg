import { IEgg } from "./egg";
import { INoti } from "./noti";

export interface IOrderItem {
  egg_id: number;
  quantity: number;
  deal_price: number;
}

export interface IOrder {
  date: string;
  time: string;
  items: IOrderItem[];
}

export interface ISaveOrder {
  date: string | null;
  time: string | null;
  items: IOrderItem[] | null;
}

export interface IOrderRow {
  date: string;
  time: string;
  status: number;
  createdAt: string;
}

export interface IOrderItemDetail extends IOrderItem {
  egg?: IEgg;
}
export interface IOrderDetail extends IOrder {
  status: number;
  items: IOrderItemDetail[];
  notis: INoti[];
  createdAt?: string;
  reason?: string;
}
