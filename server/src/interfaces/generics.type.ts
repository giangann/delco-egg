export type IOptionalUpdateById<T> = {
  id: number;
} & Partial<T>

export type IStrictUpdateById<T>={
    id: number
} & T