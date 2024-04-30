import { createContext } from "react";
import { IUserRow } from "../shared/types/user";
import { IPagination } from "../shared/types/base";
import { defaultPagi } from "../shared/constants/common";

export type UserFilterParams = {
  phone_number?: string;
  fullname?: string;
  username?: string;
};

export type UserParams = {
  page?: number;
  limit?: number;
} & UserFilterParams;

export const UserListContext = createContext<{
  params: UserParams;
  setParams: (key: keyof UserParams, value: any) => void;
  clearParams: (key: keyof UserParams) => void;
  onViewDetail: (row: IUserRow) => void;
  userList: IUserRow[];
  pagination: IPagination;
}>({
  params: { page: 1, limit: 2 },
  setParams(_key, _value) {},
  clearParams(_key) {},
  onViewDetail(_user) {},
  userList: [],
  pagination: defaultPagi,
});
