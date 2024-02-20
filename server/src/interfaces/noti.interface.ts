import { IOptionalUpdateById } from 'generics.type';
import { IOrderRecord } from 'order.interface';
import { IUserRecord } from 'user.interface';

export interface INotiRecord {
  id: number;
  from_user_id: number;
  to_user_id: number;
  order_id: number;
  new_status: number;
  is_read: boolean;
  is_display: boolean;
  content?: string;
}

export interface INotiCreate {
  from_user_id: number;
  to_user_id: number;
  order_id: number;
  new_status: number;
  content?: string;
}

export interface INotiListParams {
  to_user_id: number;
  from_user_id?: number;
  order_id?: number;
  is_display?: boolean;
}

export interface INotiUpdate extends IOptionalUpdateById<INotiRecord> {}

export interface INotiEntity extends INotiRecord {
  from_user: IUserRecord;
  to_user: IUserRecord;
  order: IOrderRecord;
}
