import { NotFoundException } from '@nestjs/common';
import { noop } from 'lodash';
import { FindOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import {
  OdataQueryParams,
  Querist,
  QueryCustomizer,
} from '../querying/querist';

export class BaseService<T extends Model, U> {
  set: ModelCtor<T>;
  constructor(set: ModelCtor<T>, private querist: Querist<T>) {
    this.set = set;
  }

  async findById(
    id: number,
    customize: (
      options: Omit<FindOptions<T['_attributes']>, 'where'>,
    ) => void = noop,
  ): Promise<T> {
    const options = {};
    customize(options);
    const entity = await this.set.findByPk(id, options);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async findAll(query: OdataQueryParams, customize?: QueryCustomizer) {
    return this.querist.query(query, this.set, customize);
  }

  insert(toInsert: U): Promise<T> {
    return this.set.create(toInsert);
  }

  update(id: number, newData: Partial<U>) {
    return this.set.update(newData, {
      where: {
        id: id,
      },
      individualHooks: true,
    });
  }
}
