export interface IBaseUpdate {
  id: number;
}

export type UnknownObj = { [key: string]: any };

export interface IPagination {
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
}
