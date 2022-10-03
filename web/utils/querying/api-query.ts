import { PaginatorData } from "../paginator-data";
import { ODataParams } from "./odata-params";

export interface ApiQuery extends PaginatorData {
  queryString?: string;
}

export function apiQueryToOdataParams(query: ApiQuery): ODataParams {
  return  {
    $skip: query.pageIndex * query.pageSize,
    $top: query.pageSize,
  }
}
