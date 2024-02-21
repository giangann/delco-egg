// Interfaces
import { IOptionalUpdateById } from 'generics.type';
import { IBaseQueryParams } from './common.interface';

// username, password, phone_number, fullname, company_name, note, *softdelete
export interface IUserRecord {
  id: number;
  username: string;
  password: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
  note?: string;
  isAdmin?: boolean;
}

export interface ICreateUser {
  username: string;
  password: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
  note?: string;
  isAdmin?: boolean;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IUpdateUser extends IOptionalUpdateById<ICreateUser> {}
export interface IUpdateUserInfo
  extends Omit<
    IOptionalUpdateById<ICreateUser>,
    'username' | 'password'
  > {}

export interface IUserQueryParams
  extends IBaseQueryParams,
    Partial<ICreateUser> {}

export interface IUserChangePasswordParams {
  user_id: number;
  new_password: string;
}
