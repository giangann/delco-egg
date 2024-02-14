// egg: id, type_name, weight, createdAt
// weight with unstable unit so should be string instead of int

import { IOptionalUpdateById } from 'generics.type';

export interface IEggRecord {
  id: number;
  type_name: string;
  weight: string;
}

export interface IEggEntity extends IEggRecord {}
export interface ICreateEgg {
  type_name: string;
  weight: string;
}

export interface IUpdateEgg extends IOptionalUpdateById<ICreateEgg> {}
