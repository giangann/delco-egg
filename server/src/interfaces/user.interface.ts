// Interfaces
import { IBaseQueryParams } from './common.interface';

// username, password, phone_number, fullname, company_name, note, *softdelete

export interface ICreateUser {
  username: string;
  password: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
  note?: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IUpdateUser {
  id: number;
  username?: string;
  password?: string;
  fullname?: string;
  phone_number?: string;
  company_name?: string;
  note?: string;
}

export interface IUserQueryParams extends IBaseQueryParams {
  keyword?: string;
}
