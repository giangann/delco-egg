import { IEgg } from "./egg";
import { INoti } from "./noti";

export interface IOrderItem {
  egg_id: number;
  quantity: number;
  deal_price: number;
  egg?: IEgg;
}

export interface IOrder {
  id: number;
  date: string;
  time: string;
  items: IOrderItem[];
  user?: IOrderUserInfo;
  notis: INoti[];
  status: number;
  createdAt?: string;
  reason?: string;
}

export interface IOrderRow {
  id: number | string;
  date: string;
  time: string;
  status: number;
  createdAt: string;
  username: string;
  fullname: string;
  phone_number: string;
  company_name: string;
  items?: IOrderItem[];
}

export interface IOrderUserInfo {
  id?: number;
  username: string;
  fullname: string;
  company_name: string;
  phone_number: string;
}
