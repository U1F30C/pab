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
  IClient,
  Client,
  ClientRequestBody,
} from '../models/client.model';

@Injectable()
export class ClientsService extends BaseService<
  Client,
  ClientRequestBody
> {
  constructor(
    @InjectModel(Client)
    clientModel: ModelCtor<Client>,
    querist: Querist<Client>,
  ) {
    super(clientModel, querist);
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

  async insert(newClient: ClientRequestBody) {
    return super.insert(newClient);
  }

  async update(
    clientId: number,
    newData: Partial<ClientRequestBody>,
  ) {
    return super.update(clientId, <IClient>newData);
  }
}
