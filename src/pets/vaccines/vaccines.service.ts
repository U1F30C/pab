import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import {
  OdataQueryParams,
  Querist,
  QueryCustomizer,
} from 'src/shared/querying/querist';
import {
  IVaccine,
  Vaccine,
  VaccineRequestBody,
} from '../models/vaccine.model';

@Injectable()
export class VaccinesService extends BaseService<
  Vaccine,
  VaccineRequestBody
> {
  constructor(
    @InjectModel(Vaccine)
    vaccineModel: ModelCtor<Vaccine>,
    querist: Querist<Vaccine>,
  ) {
    super(vaccineModel, querist);
  }

  findById(id: number, customize?) {
    return super.findById(id, (options) => {
      customize && customize(options);
    });
  }

  async findAll(query: OdataQueryParams, customize?: QueryCustomizer) {
    return super.findAll(query, (options, queryInterface) => {
      customize && customize(options, queryInterface);
    });
  }

  async insert(newVaccine: VaccineRequestBody) {
    return super.insert(newVaccine);
  }

  async update(
    vaccineId: number,
    newData: Partial<VaccineRequestBody>,
  ) {
    return super.update(vaccineId, <IVaccine>newData);
  }
}
