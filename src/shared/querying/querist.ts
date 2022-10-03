import { Injectable } from '@nestjs/common';
import { has } from 'lodash';
import { parse } from 'odata-parser';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { FindAndCountOptions } from 'sequelize';
import parseOData from '../packages/odata-sequelize';

export interface OdataQueryParams {
  $select?: string;
  $filter?: string;
  $skip?: string;
  $top?: string;
  $orderby?: string;
}

export interface PaginationWrapper<T> {
  skip: number;
  top: number;
  data: T[];
  count: number;
}

function toString(oDataQuery: OdataQueryParams) {
  return (
    Object.entries(oDataQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join('&') || Querist.DefaultQueryString
  );
}

export function isValidOdataQuery(query: OdataQueryParams) {
  const queryString = toString(query);
  return !('error' in parse(queryString));
}

export type QueryCustomizer = (
  query: FindAndCountOptions,
  sequelize: Sequelize,
) => void;

@Injectable()
export class Querist<T extends Model> {
  static MaxRows = 100;
  static DefaultQueryString = `$skip=0&$top=${Querist.MaxRows}`;
  constructor(private sequelize: Sequelize) {}

  async query(
    oDataQuery: OdataQueryParams,
    set: ModelCtor<T>,
    customize: QueryCustomizer = () => {},
  ): Promise<PaginationWrapper<any>> {
    if (!isValidOdataQuery(oDataQuery)) throw new Error('Invalid odata query');
    const queryString = toString(oDataQuery);
    const options: FindAndCountOptions = parseOData(
      queryString,
      this.sequelize,
      set.name,
    );

    !options.offset && (options.offset = 0);
    !options.limit && (options.limit = Querist.MaxRows);
    options.distinct = true;
    customize(options, this.sequelize);

    return set.findAndCountAll(options).then((data) => ({
      data: data.rows,
      count: has(data.count, 'length')
        ? (<[]>(<unknown>data.count)).length
        : data.count,
      skip: options.offset,
      top: options.limit,
    }));
  }
}
