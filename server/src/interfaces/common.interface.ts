export interface IDeleteById {
  id: number;
}

export interface IDetailById {
  id: number;
}

export interface IDate {
  date: Date | string;
}

export interface IDateRange {
  startDate: Date | string;
  endDate: Date | string;
}
export interface IBaseStatisticParams extends Partial<IDateRange> {}

export interface IBaseQueryParams {
  limit: number;
  page: number;
}

export interface IOverrideRequest {
  // errors: {
  //   [key: string]: { name: string; message: string };
  // };
  [key: string]: { name: string; message: string };
}

export interface ICookie {
  key: string;
  value: string;
}

export interface IPagination {
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
}
