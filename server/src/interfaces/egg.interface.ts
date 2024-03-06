// egg: id, type_name, weight, createdAt
// weight with unstable unit so should be string instead of int

import { IOptionalUpdateById } from 'generics.type';

export interface IEggRecord {
  id: number;
  type_name: string;
  weight: string;
  isDeleted: boolean;
}

export interface IEggListParams {
  isDeleted?: boolean;
}

export interface IEggEntity extends IEggRecord {}
export interface ICreateEgg {
  type_name: string;
  weight: string;
  isDeleted?: boolean;
}

export interface IUpdateEgg extends IOptionalUpdateById<ICreateEgg> {}
