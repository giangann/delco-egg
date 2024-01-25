import { IBaseUpdate } from "./base";

export interface IEggInfo {
  type_name: string;
  weight: string;
}

export interface IEggUpdate extends IBaseUpdate {
  type_name: string;
  weight: string;
}
