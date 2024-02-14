import { IEggRecord } from 'egg.interface';
import { IOrderRecord } from 'order.interface';

export interface IOrderDetailRecord {
  id: number;
  order_id: number;
  egg_id: number;
  deal_price: number;
  quantity: number;
}

export interface IOrderDetailEntity extends IOrderDetailRecord {
  order: IOrderRecord;
  egg: IEggRecord;
}

export interface IOrderDetail {
  order_id: number;
  egg_id: number;
  deal_price: number;
  quantity: number;
}
