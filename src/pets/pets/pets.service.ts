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
  IPet,
  Pet,
  PetRequestBody,
} from '../models/pet.model';

@Injectable()
export class PetsService extends BaseService<
  Pet,
  PetRequestBody
> {
  constructor(
    @InjectModel(Pet)
    petModel: ModelCtor<Pet>,
    querist: Querist<Pet>,
  ) {
    super(petModel, querist);
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

  async insert(newPet: PetRequestBody) {
    return super.insert(newPet);
  }

  async update(
    petId: number,
    newData: Partial<PetRequestBody>,
  ) {
    return super.update(petId, <IPet>newData);
  }
}
