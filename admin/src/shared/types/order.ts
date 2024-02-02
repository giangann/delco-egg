import { IEgg } from "./egg";

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
  status: number;
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
}

export interface IOrderUserInfo {
  username: string;
  fullname: string;
  company_name: string;
}
