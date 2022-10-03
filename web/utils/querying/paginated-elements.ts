export interface PaginatedElements<T> {
  data: T[],
  count: number;
  skip: number;
  top: number;
}
