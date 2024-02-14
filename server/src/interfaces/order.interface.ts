import { IOptionalUpdateById } from 'generics.type';
import { IOrderDetail } from 'order-detail.interface';
import { OrderDetail } from '../entities/order-detail/order-detail.entity';
import { IBaseQueryParams, IDetailById } from 'common.interface';

export interface IOrderRecord {
  id: number;
  status: number;
  user_id: number;
  date: string;
  time: string;
  reason?: string;
  note?: string;
}

export interface IOrderEntity extends IOrderRecord {
  items: OrderDetail[];
}
export interface ICreateOrder {
  status: number;
  user_id: number;
  date: string;
  time: string;
  reason?: string;
  note?: string;
  items: OrderDetail[];
}

export type IUpdateOrder = IOptionalUpdateById<ICreateOrder>;

export type IUpdateStatusOrder = {
  id: number;
} & Pick<ICreateOrder, 'status' | 'reason'>;

export interface IOrderQueryParams
  extends IBaseQueryParams,
    Partial<ICreateOrder> {}

export interface IOrderDetailParams extends IDetailById {
  user_id?: number;
}
